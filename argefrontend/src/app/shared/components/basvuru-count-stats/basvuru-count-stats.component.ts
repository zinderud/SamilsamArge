import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CountStats } from '@app/core/models/countstats.model';
import { environment as env } from '@env/environment';
@Component({
  selector: 'app-basvuru-count-stats',
  templateUrl: './basvuru-count-stats.component.html',
  styleUrls: ['./basvuru-count-stats.component.scss']
})
export class BasvuruCountStatsComponent implements OnInit {
  countStats: CountStats = {};
  constructor(private httpClient: HttpClient,) { }

  ngOnInit(): void {
    this.httpClient.get(`${env.serverUrl}/stats/basvuruCountStats`).subscribe((data: any) => {


      this.countStats = { ...data }
      console.log("basvuruCountStats countStats" + this.countStats.toplamBasvuruSayisi);



    });
  }

}
