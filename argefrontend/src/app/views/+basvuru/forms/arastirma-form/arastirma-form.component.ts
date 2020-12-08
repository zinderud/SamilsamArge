import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormBuilder, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessor } from '@angular/forms';
import { AbstractControlOptions, FormGroup, ValidatorFn } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ArastirmaForm } from '../model/arastirma-form';
type FormGroupConfig<T> = {
  [P in keyof T]: [
    T[P] | { value: T[P]; disabled: boolean },
    (AbstractControlOptions | ValidatorFn | ValidatorFn[])?
  ]
};
@Component({
  selector: 'app-arastirma-form',
  templateUrl: './arastirma-form.component.html',
  styleUrls: ['./arastirma-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ArastirmaFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ArastirmaFormComponent),
      multi: true
    }
  ]
})
export class ArastirmaFormComponent implements ControlValueAccessor {

  @Input() st = "1212"
  aform: FormGroup;
  subscriptions: Subscription[] = [];
  onChange: any = () => { };
  onTouched: any = () => { };
  constructor(private fb: FormBuilder) {
    const config: FormGroupConfig<ArastirmaForm> = {
      baslik: [""],
      statu: [""],
      diger: [""]
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
    const config: FormGroupConfig<ArastirmaForm> = {
      baslik: [""],
      statu: [""],
      diger: [""]
    };
    this.aform = this.fb.group(config);
    return this.aform;
  }



  get aformValue(): ArastirmaForm {
    return this.aform.value;
  }

  set aformValue(value: ArastirmaForm) {
    this.aform.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  writeValue(value: ArastirmaForm): void {
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
