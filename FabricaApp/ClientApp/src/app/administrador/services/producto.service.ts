import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from '../classes/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<Producto[]>(`${ this.baseUrl }/Producto`)
      .pipe(
        map(resp => {
          return resp;
        }),
        catchError(error => of(error))
      );
  }  

  getId(id: number) {
    return this.http.get<Producto>(`${ this.baseUrl }/Producto/${ id }`)
      .pipe(
        map(resp => {
          return resp;
        }),
        catchError(error => of(error))
      );
  }

  post(producto: Producto) {
    return this.http.post<Producto>(`${ this.baseUrl }/Producto`, producto)
      .pipe(
        map(resp => {
          return resp;
        }),
        catchError(error => of(error))
      );     
  }

  put(producto: Producto) {
    return this.http.put<Producto>(`${ this.baseUrl }/Producto/${producto.id}`, producto)
      .pipe(
        map(resp => {
          return resp;
        }),
        catchError(error => of(error))
      );
  }

  delete(id: number) {
    return this.http.delete<string>(`${ this.baseUrl }/Producto/${ id }`)
      .pipe(
        map(resp => {
          return resp;
        }),
        catchError(error => of(error))
      );
  }
}
