import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pedido } from '../classes/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<Pedido[]>(`${ this.baseUrl }/Pedido`)
      .pipe(
        map(resp => {
          return resp;
        }),
        catchError(error => of(error))
      );
  }  

  getId(id: number) {
    return this.http.get<Pedido>(`${ this.baseUrl }/Pedido/${ id }`)
      .pipe(
        map(resp => {
          return resp;
        }),
        catchError(error => of(error))
      );
  }

  post(pedido: Pedido) {
    return this.http.post<Pedido>(`${ this.baseUrl }/Pedido`, pedido)
      .pipe(
        map(resp => {
          return resp;
        }),
        catchError(error => of(error))
      );
  }

  put(pedido: Pedido) {
    return this.http.put<Pedido>(`${ this.baseUrl }/Pedido/${pedido.id}`, pedido)
      .pipe(
        map(resp => {
          return resp;
        }),
        catchError(error => of(error))
      );
  }

  delete(id: number) {
    return this.http.delete<string>(`${ this.baseUrl }/Pedido/${ id }`)
      .pipe(
        map(resp => {
          return resp;
        }),
        catchError(error => of(error))
      );
  }
}
