import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormBuilder, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessor } from '@angular/forms';
import { AbstractControlOptions, FormGroup, ValidatorFn } from '@angular/forms';
import { Subscription } from 'rxjs';

import { GonulluPopilasyon } from '../../model/gonullu-popilasyon';
type FormGroupConfig<T> = {
  [P in keyof T]: [
    T[P] | { value: T[P]; disabled: boolean },
    (AbstractControlOptions | ValidatorFn | ValidatorFn[])?
  ]
};
@Component({
  selector: 'app-gonullu-popilasyon',
  templateUrl: './gonullu-popilasyon.component.html',
  styleUrls: ['./gonullu-popilasyon.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GonulluPopilasyonComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => GonulluPopilasyonComponent),
      multi: true
    }
  ]
})
export class GonulluPopilasyonComponent implements ControlValueAccessor {

  @Input() st = "1212"
  aform: FormGroup;
  subscriptions: Subscription[] = [];
  onChange: any = () => { };
  onTouched: any = () => { };
  constructor(private fb: FormBuilder) {
    const config: FormGroupConfig<GonulluPopilasyon> = {
      saglikliGonulluler: [''],
      Hastalar: [''],
      OzelHassasPopilasyonlar: [''],
      GebeKadinlar: [''],
      EmzirenKadinlar: [''],
      AcilOlgular: [''],
      SahsenOlurVeremiyecekler: [''],
      Aciklama: [''],


    };
    this.aform = this.fb.group(config);
    this.subscriptions.push(
      this.aform.valueChanges.subscribe(value => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }


  createGroup() {
    const config: FormGroupConfig<GonulluPopilasyon> = {
      saglikliGonulluler: [''],
      Hastalar: [''],
      OzelHassasPopilasyonlar: [''],
      GebeKadinlar: [''],
      EmzirenKadinlar: [''],
      AcilOlgular: [''],
      SahsenOlurVeremiyecekler: [''],
      Aciklama: [''],
    };
    this.aform = this.fb.group(config);
    return this.aform;
  }



  get aformValue(): GonulluPopilasyon {
    return this.aform.value;
  }

  set aformValue(value: GonulluPopilasyon) {
    this.aform.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  writeValue(value: GonulluPopilasyon): void {
    if (value) {
      this.aformValue = value;
    }

    if (value === null) {
      this.aform.reset();
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  get invazivmi(): string {
    return this.aform.get('invazivmi').value;
  }
}
