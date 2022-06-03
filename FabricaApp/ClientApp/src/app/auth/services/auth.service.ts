import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _usuario!: Usuario;
  
  get usuario() {
    return { ...this._usuario };
  }

  constructor(private http: HttpClient) { }

  login(usuNombre: string, usuPass: string) {
    const body = {usuNombre, usuPass};

    return this.http.post<Usuario>( `${this.baseUrl}/Login`, body )
      .pipe(
        tap(resp => {
          localStorage.setItem('token', resp.token);
          this._usuario = resp
        }),
        catchError(error => of(error))
      );
  }

  validarToken(): Observable<boolean> {
    
    return this.http.get<Usuario>(`${this.baseUrl}/Login/RenovarToken`)
      .pipe(
        map(resp => {
          localStorage.setItem('token', resp.token);
          this._usuario = resp
            return true;
        }),
        catchError( err => of(false))
      );
  }

  logout() {
    localStorage.removeItem('token');
  }
}
