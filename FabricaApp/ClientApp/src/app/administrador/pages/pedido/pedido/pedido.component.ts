import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PedidoService } from 'src/app/administrador/services/pedido.service';
import { ValidarService } from 'src/app/shared/services/validar.service';
import { Pedido } from 'src/app/administrador/classes/pedido';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';
import { map, Observable, startWith, switchMap } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Usuario } from 'src/app/administrador/classes/usuario';
import { UsuarioService } from 'src/app/administrador/services/usuario.service';
import { ProductoService } from '../../../services/producto.service';
import { Producto } from 'src/app/administrador/classes/producto';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styles: [
  ]
})
export class PedidoComponent implements OnInit {

  pedido: Pedido;
  pedidos: Pedido[] = [];
  usuarios: Usuario[] = [];
  productos: Producto[] = [];
  editanto?: boolean;
  filteredOptions?: Observable<Usuario[]>;

  miFormulario: FormGroup = this.fb.group({
    idUsuario: [{value: '', disabled: this.router.url.includes('editar')}, Validators.required],
    idProducto: ['', Validators.required],
    pdVrUnit: ['', Validators.required],
    pedCant: ['', Validators.required],
    pedIVA: [{ value: 0.19, disabled: true }, , Validators.required],
  });

  constructor(private fb: FormBuilder,
    private pedidoService: PedidoService,
    private usuarioService: UsuarioService,
    public  validarService: ValidarService,
    private productoService: ProductoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    validarService.recibirFomulario(this.miFormulario);
    this.pedido = new Pedido();
  }

  ngOnInit(): void {
      this.ruta();
      this.lista();
      this.productoService.get().subscribe( productos => this.productos = productos );
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent){

    if(!event.option.value) {
      this.miFormulario.reset({
        idUsuario: 0,
        pedIVA: 0.19
      });
    }else{
      const usuario: Usuario = event.option.value;
      this.miFormulario.reset({
        idUsuario: usuario.id,
        pedIVA: 0.19
      });
    }

  }

  lista() {
    this.usuarioService.get().subscribe( resp => {
      this.usuarios = resp;

      this.filteredOptions = this.miFormulario?.get('idUsuario')?.valueChanges.pipe(
        startWith(''),
        map(name => (name ? this._filter(name) : this.usuarios.slice())),
      );
    });
  }

  private _filter(name: string): any[] {
    const filterValue = name.toString().toLowerCase();

    return this.usuarios.filter(option => option.usuNombre?.toLowerCase().includes(filterValue));
  }

  ruta() {
    this.editanto = this.router.url.includes('editar');
    if (!this.editanto) {
      return;
    }

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.pedidoService.getId(id))
      )
      .subscribe(pedido => {
        this.pedido = pedido;
        this.miFormulario.reset(this.pedido);
      });
  }

  consultar() {
    this.router.navigate(['user/consultar-pedido']);
  }

  guardar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    if (this.pedido.id) {
      this.editar();
    } else {
      var pedido = new Pedido();
      pedido = this.miFormulario.value;
      pedido.pedIVA = 0.19;

      this.pedidoService.post(pedido).subscribe(resp => {
        if (resp.ok !== false) {
          Swal.fire('Pedido registrado correctamente', resp.error, 'success');
          this.miFormulario.reset();
        } else {
          Swal.fire('Error', resp.error, 'error');
        }
      });
    }

  }

  editar() {

    var pedido = new Pedido();
    pedido = this.miFormulario.value;
    pedido.id = this.pedido.id;
    pedido.pedIVA = 0.19;
    pedido.idUsuario = this.pedido.idProducto;
    console.log(pedido);

    this.pedidoService.put(pedido).subscribe(resp => {
      Swal.fire('Pedido modificado correctamente', resp.id, 'success');
      this.router.navigate(['user/consultar-pedido']);
    });

  }
}
