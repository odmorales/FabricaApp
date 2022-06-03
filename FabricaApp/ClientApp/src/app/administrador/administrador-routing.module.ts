import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConsultarComponent } from './pages/usuario/consultar/consultar.component';
import { ConsultarPedidoComponent } from './pages/pedido/consultar-pedido/consultar-pedido.component';
import { ConsultarProductoComponent } from './pages/producto/consultar-producto/consultar-producto.component';
import { PedidoComponent } from './pages/pedido/pedido/pedido.component';
import { ProductoComponent } from './pages/producto/producto/producto.component';
import { UsuarioComponent } from './pages/usuario/usuario/usuario.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'consultar-usuario', component: ConsultarComponent},
      { path: 'editar-usuario/:id', component: UsuarioComponent },
      { path: 'consultar-producto', component: ConsultarProductoComponent },
      { path: 'consultar-pedido', component: ConsultarPedidoComponent },
      { path: 'registrar-producto', component: ProductoComponent },
      { path: 'editar-producto/:id', component: ProductoComponent},
      { path: 'registrar-pedido', component: PedidoComponent },
      { path: 'editar-pedido/:id', component: PedidoComponent},
      { path: '**', redirectTo:'consultar-usuario' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
