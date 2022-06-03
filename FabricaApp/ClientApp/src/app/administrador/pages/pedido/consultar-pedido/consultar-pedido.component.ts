import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/administrador/classes/pedido';
import { PedidoService } from 'src/app/administrador/services/pedido.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-consultar-pedido',
  templateUrl: './consultar-pedido.component.html',
  styles: [
  ]
})
export class ConsultarPedidoComponent implements OnInit {

  pedidos: Pedido[] = [];
  pedido?: Pedido;

  constructor(private pedidoService: PedidoService,
              private router: Router) { }

  ngOnInit(): void {
    this.pedidoService.get().subscribe( pedidos => {
      this.pedidos = pedidos;
    });
  }

  registrar(){
    this.router.navigate(['user/registrar-pedido']);
  }

  eliminar(pedido: Pedido){
    this.pedidoService.delete(pedido.id)
      .pipe(
        switchMap( (_) => this.pedidoService.get() )
      )
      .subscribe( resp => this.pedidos = resp );
  }
}
