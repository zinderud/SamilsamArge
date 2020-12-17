import { HttpEventType } from '@angular/common/http';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { AbstractControlOptions, ValidatorFn, NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { FileResponse, UploadDownloadService } from '@app/core/services/upload-download.service';
import { Subscription } from 'rxjs';
import { ArastirmaBelgelerForm } from '../model/arastirma-belgeler-model';

type FormGroupConfig<T> = {
  [P in keyof T]: [
    T[P] | { value: T[P]; disabled: boolean },
    (AbstractControlOptions | ValidatorFn | ValidatorFn[])?
  ]
};
@Component({
  selector: 'app-arastirma-belgeler-form',
  templateUrl: './arastirma-belgeler-form.component.html',
  styleUrls: ['./arastirma-belgeler-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ArastirmaBelgelerFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ArastirmaBelgelerFormComponent),
      multi: true
    }
  ]
})
export class ArastirmaBelgelerFormComponent implements ControlValueAccessor {

  @Input() aform: FormGroup;
  @Input() index: number;
  uploading = false;
  uploadP: number;
  cform: FormGroup;
  subscriptions: Subscription[] = [];
  onChange: any = () => { };
  onTouched: any = () => { };
  constructor(private fb: FormBuilder, private uploadDownloadService: UploadDownloadService,) {
    const config: FormGroupConfig<ArastirmaBelgelerForm> = {
      ozGecmisBelgesi: [''],
      etikKurulOnayBelgesi: [''],
      anketOlcekFormu: [''],
      uzmanlikvbTeziBelge: [''],
      ekBelge: [''],





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
    const config: FormGroupConfig<ArastirmaBelgelerForm> = {
      ozGecmisBelgesi: [''],
      etikKurulOnayBelgesi: [''],
      anketOlcekFormu: [''],
      uzmanlikvbTeziBelge: [''],
      ekBelge: [''],

    }
    this.aform = this.fb.group(config);
    return this.aform;
  }



  get aformValue(): ArastirmaBelgelerForm {
    return this.aform.value;
  }

  set aformValue(value: ArastirmaBelgelerForm) {
    this.aform.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  writeValue(value: ArastirmaBelgelerForm): void {
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
  public get aform_controls(): { [key: string]: AbstractControl } {
    return this.aform.controls;
  }

  private mapProduct(fileNames: FileResponse[]): ArastirmaBelgelerForm {
    return {
      ...this.aform.value,
      ozGecmisBelgesi: fileNames[0].fileName,
      etikKurulOnayBelgesi: fileNames[1].fileName,
      anketOlcekFormu: fileNames[2].fileName,
      uzmanlikvbTeziBelge: fileNames[3].fileName,
      ekBelge: fileNames[3].fileName,
    };
  }
  private uploadDocuments() {
    console.log(this.aform);
    const ozGecmisBelgesi = <File>this.aform_controls['ozGecmisBelgesi'].value.files[0];
    const etikKurulOnayBelgesi = <File>this.aform_controls['etikKurulOnayBelgesi'].value.files[0];
    const anketOlcekFormu = <File>this.aform_controls['anketOlcekFormu'].value.files[0];
    const uzmanlikvbTeziBelge = <File>this.aform_controls['uzmanlikvbTeziBelge'].value.files[0];
    const ekBelge = <File>this.aform_controls['ekBelge'].value.files[0];
    console.log(this.aform);

    const files = [
      ozGecmisBelgesi,
      etikKurulOnayBelgesi,
      anketOlcekFormu,
      uzmanlikvbTeziBelge,
      ekBelge];
    this.uploading = true;

    return this.uploadDownloadService.uploadFiles(files);
  }
  dene() {
    this.uploadDocuments().subscribe((result) => {
      if (result.type === HttpEventType.UploadProgress) {
        this.uploadP = Math.round(100 * (result.loaded / result.total));
      } else if (result.type === HttpEventType.Response) {
        const fileNames = result.body;
        this.uploading = false;
        const product = this.mapProduct(fileNames);
        console.log(product);

      }
    });
  }
}