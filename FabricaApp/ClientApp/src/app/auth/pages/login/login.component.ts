import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidarService } from 'src/app/shared/services/validar.service';
import { AuthService } from '../../services/auth.service';

import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    usuNombre: ['', Validators.required],
    usuPass: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, 
    public validarService: ValidarService,
    private authService: AuthService,
    private router: Router) {
    this.validarService.recibirFomulario(this.miFormulario);
  }

  ngOnInit(): void {

  }

  login() {
    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return;
    }
    
    const { usuNombre, usuPass} = this.miFormulario.value;
    
    this.authService.login(usuNombre, usuPass)
      .subscribe(resp => {
        if ( resp.ok !== false ) {
          this.router.navigate(['/user/consultar-usuario']);
        }else {
          Swal.fire('Error', resp.error, 'error');
        }
      });
  }

}
