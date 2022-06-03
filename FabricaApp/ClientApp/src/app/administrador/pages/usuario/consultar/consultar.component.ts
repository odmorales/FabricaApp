import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/administrador/classes/pedido';
import { Usuario } from 'src/app/administrador/classes/usuario';
import { UsuarioService } from 'src/app/administrador/services/usuario.service';

import Swal from 'sweetalert2';
import { switchMap } from 'rxjs';
import { PedidoService } from '../../../services/pedido.service';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styles: [
  ]
})
export class ConsultarComponent implements OnInit {

  usuarios: Usuario[] = [];
  pedidos: Pedido[] = [];

  constructor(private usuarioService: UsuarioService,
              private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.usuarioService.get().subscribe(usuarios => {
     this.usuarios = usuarios;
    });
  }

  registrar(){

  }

  eliminar(usuario: Usuario) {
    this.pedidoService.get().subscribe(resp => {
      this.pedidos = resp;
      if (this.pedidos.find(pedido => pedido.idUsuario == usuario.id)) {
        this.alertConfirmar(usuario.id);
      } else {
        this.usuarioService.delete(usuario.id)
          .pipe(
            switchMap((_) => this.usuarioService.get())
          )
          .subscribe(resp => this.usuarios = resp);
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
        this.usuarioService.delete(id)
          .pipe(
            switchMap((_) => this.usuarioService.get())
          )
          .subscribe(resp => this.usuarios = resp);
      }
    })
  }
}
