import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment as env } from '@env/environment';
@Component({
  selector: 'app-basvuru-count-stats',
  templateUrl: './basvuru-count-stats.component.html',
  styleUrls: ['./basvuru-count-stats.component.scss']
})
export class BasvuruCountStatsComponent implements OnInit {

  constructor(private httpClient: HttpClient,) { }

  ngOnInit(): void {
    this.httpClient.get(`${env.serverUrl}/stats/basvuruCountStats`).subscribe((data: any) => {

      console.log("basvuruCountStats" + data.value);



    });
  }

}
