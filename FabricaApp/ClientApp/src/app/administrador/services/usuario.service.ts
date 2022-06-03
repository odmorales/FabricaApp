import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Usuario } from '../classes/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  get(){
    return this.http.get<Usuario[]>(`${ this.baseUrl }/Usuario`)
      .pipe(
        map(resp => {
          return resp;
        }),
        catchError(error => of(error))
      );
  }  

  getId(id: number) {
    return this.http.get<Usuario>(`${ this.baseUrl }/Usuario/${ id }`)
      .pipe(
        map(resp => {
          return resp;
        }),
        catchError(error => of(error))
      );
  }

  post(usuario: Usuario) {
    return this.http.post<Usuario>(`${ this.baseUrl }/Usuario`, usuario)
      .pipe(
        map(resp => {
          return resp;
        }),
        catchError(error => of(error))
      );
  }

  put(usuario: Usuario) {
    return this.http.put<Usuario>(`${ this.baseUrl }/Usuario/${usuario.id}`, usuario)
      .pipe(
        map(resp => {
          return resp;
        }),
        catchError(error => of(error))
      );
  }

  delete(id: number) {
    return this.http.delete<string>(`${ this.baseUrl }/Usuario/${ id }`)
      .pipe(
        map(resp => {
          return resp;
        }),
        catchError(error => of(error))
      );
  }
}
