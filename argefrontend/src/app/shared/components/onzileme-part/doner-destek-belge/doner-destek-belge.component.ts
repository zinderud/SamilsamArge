import { Component, Input, OnInit } from '@angular/core';
import { Basvuru } from '@app/core/models/basvuru/basvuru';
import { environment as env } from '@env/environment';

@Component({
  selector: 'app-doner-destek-belge',
  templateUrl: './doner-destek-belge.component.html',
  styleUrls: ['./doner-destek-belge.component.scss']
})
export class DonerDestekBelgeComponent implements OnInit {

  _basvuru: Basvuru;
  @Input('basvuru') basvuru
  set input(val) {

    this._basvuru = val;
  }



  fileUrl = "";
  constructor() { }

  ngOnInit(): void {
    this.fileUrl = env.fileUrl;
  }

  onErrorPdf(onErrorPdf: any) {
    // do anything
    console.log("hata pdf" + onErrorPdf);
  }
}


