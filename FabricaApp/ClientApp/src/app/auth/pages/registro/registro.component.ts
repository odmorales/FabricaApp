import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/administrador/classes/usuario';
import { UsuarioService } from 'src/app/administrador/services/usuario.service';
import { ValidarService } from 'src/app/shared/services/validar.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  usuario?: Usuario
  miFormulario: FormGroup = this.fb.group({
    usuNombre: ['', Validators.required],
    usuPass: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, 
    public validarService: ValidarService,
    private usuarioService: UsuarioService,
    private router: Router) {
    this.validarService.recibirFomulario(this.miFormulario);
  }

  ngOnInit(): void {

  }

  guardar(){
    if ( this.miFormulario.invalid ) {
      this.miFormulario.markAllAsTouched();
      return;
    }

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
    this.router.navigate(['auth/login']);
  }
}
