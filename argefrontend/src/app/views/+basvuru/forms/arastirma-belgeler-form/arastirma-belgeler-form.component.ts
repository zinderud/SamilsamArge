import { HttpEventType } from '@angular/common/http';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { AbstractControlOptions, ValidatorFn, NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { FileResponse, UploadDownloadService } from '@app/core/services/upload-download.service';
import { ArrayHelper } from '@app/shared/lib/helpers/arrayHelper';
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
  uploadingozGecmisBelgesi = false;
  uploadingetikKurulOnayBelgesi = false;
  uploadinganketOlcekFormu = false;
  uploadinguzmanlikvbTeziBelge = false;
  uploadingekBelge = false;
  loading = false;
  uploadP: number;
  cform: FormGroup;
  subscriptions: Subscription[] = [];
  onChange: any = () => { };
  onTouched: any = () => { };
  upfiles = []
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



  ozGecmisBelgesiYukle() {
    const ozGecmisBelgesi = <File>this.aform_controls['ozGecmisBelgesi'].value.files[0];
    const files = [
      ozGecmisBelgesi,
    ];
    this.uploadDownloadService.uploadFiles(files).subscribe((result) => {

      if (result.type === HttpEventType.UploadProgress) {
        this.uploadP = Math.round(100 * (result.loaded / result.total));
      } else if (result.type === HttpEventType.Response) {

        const fileNames = result.body;
        this.aform.controls["ozGecmisBelgesi"].setValue(fileNames[0]?.fileName || "",)


        this.uploadingozGecmisBelgesi = true;
      }
    });

  }

  etikKurulOnayBelgesiYukle() {
    const file = <File>this.aform_controls['etikKurulOnayBelgesi'].value.files[0];
    const files = [
      file,
    ];
    this.uploadDownloadService.uploadFiles(files).subscribe((result) => {

      if (result.type === HttpEventType.UploadProgress) {
        this.uploadP = Math.round(100 * (result.loaded / result.total));
      } else if (result.type === HttpEventType.Response) {

        const fileNames = result.body;
        this.aform.controls["etikKurulOnayBelgesi"].setValue(fileNames[0]?.fileName || "",)


        this.uploadingetikKurulOnayBelgesi = true;
      }
    });

  }


  anketOlcekFormuYukle() {
    const file = <File>this.aform_controls['anketOlcekFormu'].value.files[0];
    const files = [
      file,
    ];
    this.uploadDownloadService.uploadFiles(files).subscribe((result) => {

      if (result.type === HttpEventType.UploadProgress) {
        this.uploadP = Math.round(100 * (result.loaded / result.total));
      } else if (result.type === HttpEventType.Response) {

        const fileNames = result.body;
        this.aform.controls["anketOlcekFormu"].setValue(fileNames[0]?.fileName || "",)


        this.uploadinganketOlcekFormu = true;
      }
    });

  }
  uzmanlikvbTeziBelgeYukle() {
    const file = <File>this.aform_controls['uzmanlikvbTeziBelge'].value.files[0];
    const files = [
      file,
    ];
    this.uploadDownloadService.uploadFiles(files).subscribe((result) => {

      if (result.type === HttpEventType.UploadProgress) {
        this.uploadP = Math.round(100 * (result.loaded / result.total));
      } else if (result.type === HttpEventType.Response) {

        const fileNames = result.body;
        this.aform.controls["uzmanlikvbTeziBelge"].setValue(fileNames[0]?.fileName || "",)


        this.uploadinguzmanlikvbTeziBelge = true;
      }
    });

  }
  ekBelgeYukle() {
    const file = <File>this.aform_controls['ekBelge'].value.files[0];
    const files = [
      file,
    ];
    this.uploadDownloadService.uploadFiles(files).subscribe((result) => {

      if (result.type === HttpEventType.UploadProgress) {
        this.uploadP = Math.round(100 * (result.loaded / result.total));
      } else if (result.type === HttpEventType.Response) {

        const fileNames = result.body;
        this.aform.controls["ekBelge"].setValue(fileNames[0]?.fileName || "",)


        this.uploadingekBelge = true;
      }
    });

  }

}