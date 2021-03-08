import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Timeline } from '@app/core/models/timeline';
import { AuthService } from '@app/core/services/core';
import { TimelineService } from '@app/core/services/timeline.service';
import { TimelineItem } from '@app/shared/components/ngx-vertical-timeline/timeline-item';
import { environment as env } from '@env/environment';
@Component({
  selector: 'app-user-timeline',
  templateUrl: './user-timeline.component.html',
  styleUrls: ['./user-timeline.component.scss']
})
export class UserTimelineComponent implements OnInit {
  items: TimelineItem[] = [];
  itemId: string;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private httpClient: HttpClient,
    private authservice: AuthService,
    private timelineservice: TimelineService,
    private cdr: ChangeDetectorRef) {
    this.items = [];
  }

  ngOnInit(): void {
    this.itemId = this.activatedRoute.snapshot.params.id;
    this.timelinelist();
  }

  timelinelist() {
    this.items = [];

    this.httpClient.get(`${env.serverUrl}/timeline/selecttedPrivate/${this.itemId}`).subscribe((data: any) => {

      console.log("timeline", data);

      if (data.succeeded) {

        data.value.forEach((e: Timeline) => {


          const timline: TimelineItem = {
            label: "" + e.user.firstname + e.user.lastname, icon: 'fa fa-plus',
            content: e.not, title: new Date(e.tarih).toLocaleDateString() + " ", durum: e.durum,
          }
          this.items.push(timline);

        });
        this.cdr.markForCheck();

      }

    });


  }

}
