import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministradorRoutingModule } from './administrador-routing.module';
import { HomeComponent } from './home/home.component';
import { UsuarioComponent } from './pages/usuario/usuario/usuario.component';
import { ProductoComponent } from './pages/producto/producto/producto.component';
import { PedidoComponent } from './pages/pedido/pedido/pedido.component';
import { ConsultarComponent } from './pages/usuario/consultar/consultar.component';
import { ConsultarPedidoComponent } from './pages/pedido/consultar-pedido/consultar-pedido.component';
import { ConsultarProductoComponent } from './pages/producto/consultar-producto/consultar-producto.component';
import { MaterialModule } from '../design/material.module';
import { PrimeNgModule } from '../design/prime-ng.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InputFiltroComponent } from './components/input-filtro/input-filtro.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    UsuarioComponent,
    ProductoComponent,
    PedidoComponent,
    ConsultarComponent,
    ConsultarPedidoComponent,
    ConsultarProductoComponent,
    InputFiltroComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
    AdministradorRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    PrimeNgModule,
    MaterialModule,
  ]
})
export class AdministradorModule { }
