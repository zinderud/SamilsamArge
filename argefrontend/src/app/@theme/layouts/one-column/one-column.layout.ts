import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '@app/core/services/core';

@Component({
  selector: 'ngx-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  template: `
    <nb-layout windowMode>
      <nb-layout-header *ngIf="(isLoggedIn$ | async)"  fixed>
        <ngx-header></ngx-header>
   <!--  <ng-content select="div[class=head-er]"></ng-content> -->
      </nb-layout-header>

      <nb-sidebar  *ngIf="(isLoggedIn$ | async)"  class="menu-sidebar" tag="menu-sidebar" responsive>
        <ng-content select="nb-menu[class=menu-1]"></ng-content>
        <br> 
        <ng-content select="nb-menu[class=menu-2]"></ng-content>
      <!-- <ng-content select="nb-menu"></ng-content> -->
      </nb-sidebar>

      <nb-layout-column>
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

      <nb-layout-footer fixed>
        <ngx-footer></ngx-footer>
      </nb-layout-footer>
    </nb-layout>
  `,
})
export class OneColumnLayoutComponent  implements OnInit {
  isLoggedIn$: Observable<boolean>;

  constructor( 
    private authService: AuthService,
 ) {
}

ngOnInit() {
this.isLoggedIn$ = this.authService.isAuthenticated();
 



}

}
