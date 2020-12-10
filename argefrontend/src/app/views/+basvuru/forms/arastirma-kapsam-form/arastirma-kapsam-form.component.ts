import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormBuilder, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessor } from '@angular/forms';
import { AbstractControlOptions, FormGroup, ValidatorFn } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ArastirmaForm } from '../model/arastirma-form';
import { ArastirmaKapsam } from '../model/arastirma-kapsam-model';
type FormGroupConfig<T> = {
  [P in keyof T]: [
    T[P] | { value: T[P]; disabled: boolean },
    (AbstractControlOptions | ValidatorFn | ValidatorFn[])?
  ]
};
@Component({
  selector: 'app-arastirma-kapsam-form',
  templateUrl: './arastirma-kapsam-form.component.html',
  styleUrls: ['./arastirma-kapsam-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ArastirmaKapsamFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ArastirmaKapsamFormComponent),
      multi: true
    }
  ]
})
export class ArastirmaKapsamFormComponent implements ControlValueAccessor {

  @Input() st = "1212"
  aform: FormGroup;
  subscriptions: Subscription[] = [];
  onChange: any = () => { };
  onTouched: any = () => { };
  constructor(private fb: FormBuilder) {
    const config: FormGroupConfig<ArastirmaKapsam> = {
      amac: [''],
      genelBilgi: [''],
      arastirmaTuru: [''],
      arYapilacagiYer: [''],
      arEvrenOrneklem: [''],
      hipotez: [''],
      veriToplamaYontemi: [''],
      arastirmaKisitlari: [''],
      arastirmaTarihAraligi: [''],
      invazivmi: [''],
      invazAcikla: [''],
      tibbiDurumVarmi: [''],
      tibbiDurumAcikla: [''],
      arastirmaRuhsalSoru: [''],
      arastirmaRuhsalSoruAcikla: [''],
      gonulluKatilimSoru: [''],
      gonulluKatilimSoruAcikla: [''],
      bireyselYarar: [''],
      kurumsalYarar: [''],
      toplumsalYarar: [''],
      bilimselYarar: [''],
      destekleyicisiVarmi: [''],
      destekleyicisiAcikla: [''],
      bizdenTalepVarmi: [''],
      bizdenTalepAcikla: [''],


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
    const config: FormGroupConfig<ArastirmaKapsam> = {
      amac: [''],
      genelBilgi: [''],
      arastirmaTuru: [''],
      arYapilacagiYer: [''],
      arEvrenOrneklem: [''],
      hipotez: [''],
      veriToplamaYontemi: [''],
      arastirmaKisitlari: [''],
      arastirmaTarihAraligi: [''],
      invazivmi: [''],
      invazAcikla: [''],
      tibbiDurumVarmi: [''],
      tibbiDurumAcikla: [''],
      arastirmaRuhsalSoru: [''],
      arastirmaRuhsalSoruAcikla: [''],
      gonulluKatilimSoru: [''],
      gonulluKatilimSoruAcikla: [''],
      bireyselYarar: [''],
      kurumsalYarar: [''],
      toplumsalYarar: [''],
      bilimselYarar: [''],
      destekleyicisiVarmi: [''],
      destekleyicisiAcikla: [''],
      bizdenTalepVarmi: [''],
      bizdenTalepAcikla: ['']
    };
    this.aform = this.fb.group(config);
    return this.aform;
  }



  get aformValue(): ArastirmaKapsam {
    return this.aform.value;
  }

  set aformValue(value: ArastirmaKapsam) {
    this.aform.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  writeValue(value: ArastirmaKapsam): void {
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
