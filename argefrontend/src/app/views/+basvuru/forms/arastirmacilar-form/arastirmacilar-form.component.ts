import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { AbstractControlOptions, ValidatorFn, NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ArastirmacilarForm } from '../model/arastirmacilar';
type FormGroupConfig<T> = {
  [P in keyof T]: [
    T[P] | { value: T[P]; disabled: boolean },
    (AbstractControlOptions | ValidatorFn | ValidatorFn[])?
  ]
};
@Component({
  selector: 'app-arastirmacilar-form',
  templateUrl: './arastirmacilar-form.component.html',
  styleUrls: ['./arastirmacilar-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ArastirmacilarFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ArastirmacilarFormComponent),
      multi: true
    }
  ]
})
export class ArastirmacilarFormComponent implements ControlValueAccessor {

  @Input() aform: FormGroup;
  @Input() index: number;
  cform: FormGroup;
  subscriptions: Subscription[] = [];
  onChange: any = () => { };
  onTouched: any = () => { };
  constructor(private fb: FormBuilder) {
    const config: FormGroupConfig<ArastirmacilarForm> = {
      arastirmaciTuru: [''],
      ad: [''],
      soyad: [''],
      unvan: [''],
      uzmanlikAlani: [''],
      isAdresi: [''],
      eposta: [''],
      faks: [''],



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
    const config: FormGroupConfig<ArastirmacilarForm> = {
      arastirmaciTuru: [''],
      ad: [''],
      soyad: [''],
      unvan: [''],
      uzmanlikAlani: [''],
      isAdresi: [''],
      eposta: [''],
      faks: [''],
    };
    this.aform = this.fb.group(config);
    return this.aform;
  }



  get aformValue(): ArastirmacilarForm {
    return this.aform.value;
  }

  set aformValue(value: ArastirmacilarForm) {
    this.aform.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  writeValue(value: ArastirmacilarForm): void {
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

}
