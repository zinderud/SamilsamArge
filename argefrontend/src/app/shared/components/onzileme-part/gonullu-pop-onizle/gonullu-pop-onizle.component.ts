import { Component, Input, OnInit } from '@angular/core';
import { Basvuru } from '@app/core/models/basvuru/basvuru';

@Component({
  selector: 'app-gonullu-pop-onizle',
  templateUrl: './gonullu-pop-onizle.component.html',
  styleUrls: ['./gonullu-pop-onizle.component.scss']
})
export class GonulluPopOnizleComponent implements OnInit {
  _basvuru: Basvuru;
  @Input('basvuru') basvuru
  set input(val) {

    this._basvuru = val;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
