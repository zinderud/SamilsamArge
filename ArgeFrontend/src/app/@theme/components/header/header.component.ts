import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

 
 
import { map, takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { LayoutService } from '@app/core/services/layout.service';
import { AuthService } from '@app/core/services/core';
import { Router } from '@angular/router';
import { environment as env } from '@env/environment';
@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  envName = env.envName;
  appName = env.appName;
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  username: string="";
  isLoggedIn$: Observable<boolean>;
  userMenu = [ { title: 'Profile' }, { title: 'Log out' } ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private authService: AuthService,
            /* private userService: ,   */
            private router: Router,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService) {
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isAuthenticated();
    this.username=this.authService.getUsername();

    /* this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => this.user = users.nick); */

    const { xl } = this.breakpointService.getBreakpointsMap();
 

    
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['auth/login']);
  }

}
