import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NbComponentSize, NbComponentStatus, NbMediaBreakpointsService, NbThemeService } from '@nebular/theme';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-stats-badge',

  styleUrls: ['./stats-badge.component.scss'],
  template: `
  <nb-card>
    <div class="icon-container">
      <div class="icon h4">
   
                 {{icon}}
             
      </div>
    </div>

    <div class="details">
      <div class="title h6">{{ title }}</div>
    </div>

  
  </nb-card>
`,
})

export class StatsBadgeComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  @Input() title: string;

  @Input() icon: string;


  currentTheme: string;
  buttonSize: NbComponentSize;

  constructor(
    private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService,
  ) { }

  ngOnInit() {
    this.themeService.getJsTheme()
      .pipe(takeUntil(this.destroy$))
      .subscribe(theme => {
        this.currentTheme = theme.name;
      });

    const { xxl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xxl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXxl: boolean) => {
        this.buttonSize = isLessThanXxl
          ? 'small'
          : 'large';
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


}
