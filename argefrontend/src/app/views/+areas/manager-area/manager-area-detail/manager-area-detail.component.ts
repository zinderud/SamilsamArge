import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '@app/core/services/core';
import { environment as env } from '@env/environment';
@Component({
  selector: 'app-manager-area-detail',
  templateUrl: './manager-area-detail.component.html',
  styleUrls: ['./manager-area-detail.component.scss']
})
export class ManagerAreaDetailComponent implements OnInit {
  items: any[] = [];
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private httpClient: HttpClient,
    private authservice: AuthService,
  ) { }

  ngOnInit(): void {
    this.managerList();

  }

  managerList() {
    this.items = [];

    this.httpClient.get<any>(`${env.serverUrl}/user/usersroles`).subscribe((data: any) => {

      console.log("data", data);

      if (data.succeeded) {

        // console.log()

      }

    });


  }

}
