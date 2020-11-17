import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-unvan',
  templateUrl: './unvan.component.html',
  styleUrls: ['./unvan.component.scss']
})
export class UnvanComponent implements OnInit {
  @Input() unvanGrup: FormGroup;
  @Input() index: number;
  @Output() deleteUnvan: EventEmitter<number> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

}
