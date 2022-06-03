import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidarService } from 'src/app/shared/services/validar.service';
import { Producto } from 'src/app/administrador/classes/producto';
import { ProductoService } from 'src/app/administrador/services/producto.service';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styles: [
  ]
})
export class ProductoComponent implements OnInit {

  producto: Producto;

  miFormulario: FormGroup = this.fb.group({
    proDesc: [''],
    proValor: ['', Validators.required]
  });

  constructor(private fb: FormBuilder,
    private productoService: ProductoService,
    public validarService: ValidarService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.validarService.recibirFomulario(this.miFormulario);
    this.producto = new Producto();
  }

  ngOnInit(): void {

    if(!this.router.url.includes('editar')){
      return;
    }


    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.productoService.getId(id) )
      )
      .subscribe( producto => {
        this.producto = producto;
        this.miFormulario.reset(this.producto);
      });
  }

  consultar() {
    this.router.navigate(['user/consultar-producto']);
  }

  guardar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    if(this.producto.id){
      this.editar();
    }else{
      var producto = new Producto();
      producto = this.miFormulario.value;
  
      this.productoService.post(producto).subscribe(resp => {
        if (resp.ok !== false) {
          Swal.fire('Pedido correctamente', resp.error, 'success');
          this.miFormulario.reset();
        } else {
          Swal.fire('Error', resp.error, 'error');
        }
      });
    }

  }

  editar() {

    var producto = new Producto();
    producto = this.miFormulario.value;
    producto.id = this.producto.id;

    this.productoService.put(producto).subscribe(resp => {
      Swal.fire('Producto modificado correctamente', resp.id, 'success');
      this.router.navigate(['user/consultar-producto']);
    });
  }

}