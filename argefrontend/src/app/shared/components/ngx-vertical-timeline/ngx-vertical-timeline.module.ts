import { NgModule } from '@angular/core';
import { NgxVerticalTimelineComponent } from './ngx-vertical-timeline.component';
import { CommonModule } from '@angular/common';
import { NbCardModule } from '@nebular/theme';

@NgModule({
  declarations: [NgxVerticalTimelineComponent],
  imports: [
    CommonModule,
    NbCardModule
  ],
  exports: [NgxVerticalTimelineComponent]
})
export class NgxVerticalTimelineModule { }
