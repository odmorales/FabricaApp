import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/administrador/classes/producto';
import { PedidoService } from 'src/app/administrador/services/pedido.service';
import { ProductoService } from 'src/app/administrador/services/producto.service';
import { Pedido } from 'src/app/administrador/classes/pedido';

import Swal from 'sweetalert2';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-consultar-producto',
  templateUrl: './consultar-producto.component.html',
  styles: [
  ]
})
export class ConsultarProductoComponent implements OnInit {

  productos: Producto[] = [];
  pedidos: Pedido[] = [];

  constructor(private productoService: ProductoService,
    private pedidoService: PedidoService,
    private router: Router) { }

  ngOnInit(): void {

    this.productoService.get().subscribe(productos => {
      this.productos = productos;
    });
  }

  registrar() {
    this.router.navigate(['user/registrar-producto']);
  }

  eliminar(producto: Producto) {
    this.pedidoService.get().subscribe(resp => {
      this.pedidos = resp;
      if (this.pedidos.find(pedido => pedido.idProducto == producto.id)) {
        this.alertConfirmar(producto.id);
      } else {
        this.productoService.delete(producto.id)
          .pipe(
            switchMap((_) => this.productoService.get())
          )
          .subscribe(resp => this.productos = resp);
      }
    });
  }

  alertConfirmar(id: number) {
    Swal.fire({
      title: 'Desea elminarlo?',
      text: "Hay un pedido asociado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.delete(id)
          .pipe(
            switchMap((_) => this.productoService.get())
          )
          .subscribe(resp => this.productos = resp);
      }
    })
  }
}
