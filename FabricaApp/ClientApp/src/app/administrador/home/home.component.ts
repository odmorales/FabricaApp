import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { delay } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
      .toolbar-sidenav{
        background: #3f51b5;
        color: #ffff;
        border: 0;
      }

      mat-sidenav{
        background: #3f51b5;
        width: 260px;
      }
      
      .active {
        background: rgba(0,0,0,.2);
      }

      .texto-blanco {
        color: #ffff;
      }

      mat-toolbar {
        position: sticky;
        position: -webkit-sticky; /* For macOS/iOS Safari */
        top: 0; /* Sets the sticky toolbar to be on top */
        z-index: 1000; /* Ensure that your app's content doesn't overlap the toolbar */
      }
    `
  ]
})
export class HomeComponent implements OnInit {

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  sticky: boolean = false;
  cambiar: boolean = true;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService : AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.breakpointObserver
      .observe([
        Breakpoints.Medium,
        Breakpoints.Small,
        Breakpoints.XSmall
      ])
      .pipe(delay(1))
      .subscribe((state: BreakpointState) => {
        if (this.sidenav) {
          if (state.matches) {
            this.sidenav.mode = 'over';
            this.sidenav.close();
          } else {
            this.sidenav.mode = 'side';
            this.sidenav.open();
          }
        }
      });
  }
  cerrarSidenav() {
    if (this.sidenav.mode === "over") {
      this.sidenav.toggle()
    }
  }

  CambiarIcono() {
    return this.cambiar = this.cambiar ? false : true;
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['auth/login']);
  }
}
