import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Usuario } from 'src/app/administrador/classes/usuario';
import { UsuarioService } from 'src/app/administrador/services/usuario.service';
import { ValidarService } from 'src/app/shared/services/validar.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: [
  ]
})
export class UsuarioComponent implements OnInit {

  usuario: Usuario
  miFormulario: FormGroup = this.fb.group({
    usuNombre: [{value: '', disabled: this.router.url.includes('editar')}, Validators.required,],
    usuPass: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, 
    public validarService: ValidarService,
    private usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.validarService.recibirFomulario(this.miFormulario);
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    if(!this.router.url.includes('editar')){
      return;
    }


    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.usuarioService.getId(id) )
      )
      .subscribe( usuario => {
        this.usuario = usuario;
        this.miFormulario.reset(this.usuario);
      });
  }

  consultar() {
    this.router.navigate(['user/consultar-usuario']);
  }

  guardar(){
    if ( this.miFormulario.invalid ) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    if(this.usuario.id){
      this.editar();
    }else{
      var usuario = new Usuario();
      usuario = this.miFormulario.value;
  
      this.usuarioService.post(usuario).subscribe(resp => {
        if (resp.ok !== false) {
          Swal.fire('Usuario registrado correctamente', resp.error, 'success');
          this.miFormulario.reset();
        } else {
          Swal.fire('Error', resp.error, 'error');
        }
      });
      this.router.navigate(['user/consultar-usuario']);
    }

  }

  editar() {

    var usuario = new Usuario();
    usuario = this.miFormulario.value;
    usuario.id = this.usuario.id;
    usuario.usuNombre = this.usuario.usuNombre;
    
    this.usuarioService.put(usuario).subscribe(resp => {
      Swal.fire('usuario modificado correctamente', resp.id, 'success');
      this.router.navigate(['user/consultar-usuario']);
    });
  }

}
