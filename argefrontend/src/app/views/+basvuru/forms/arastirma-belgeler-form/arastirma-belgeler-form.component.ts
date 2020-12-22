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

  private mapProduct(fileNames: FileResponse[]) {
    this.aform.setValue({
      ozGecmisBelgesi: fileNames[0]?.fileName || "",
      etikKurulOnayBelgesi: fileNames[1]?.fileName || "",
      anketOlcekFormu: fileNames[2]?.fileName || "",
      uzmanlikvbTeziBelge: fileNames[3]?.fileName || "",
      ekBelge: fileNames[4]?.fileName || "",
    });
    this.uploading = true;
    /* return {
      ...this.aform.value,
      ozGecmisBelgesi: fileNames[0].fileName,
      etikKurulOnayBelgesi: fileNames[1].fileName,
      anketOlcekFormu: fileNames[2].fileName,
      uzmanlikvbTeziBelge: fileNames[3].fileName,
      ekBelge: fileNames[3].fileName,
    }; */
  }
  private uploadDocuments() {
    this.upfiles = [];
    console.log("s" + "ssdassss")
    const ozGecmisBelgesi = ArrayHelper.isNullOrEmpty(this.aform.controls['ozGecmisBelgesi'].value) ? "" : <File>this.aform_controls['ozGecmisBelgesi'].value?.files[0];
    const etikKurulOnayBelgesi = ArrayHelper.isNullOrEmpty(this.aform.controls['etikKurulOnayBelgesi'].value) ? "" : <File>this.aform_controls['etikKurulOnayBelgesi'].value?.files[0];
    const anketOlcekFormu = ArrayHelper.isNullOrEmpty(this.aform.controls['anketOlcekFormu'].value) ? "" : <File>this.aform_controls['anketOlcekFormu'].value?.files[0];
    const uzmanlikvbTeziBelge = ArrayHelper.isNullOrEmpty(this.aform.controls['uzmanlikvbTeziBelge'].value) ? "" : <File>this.aform_controls['uzmanlikvbTeziBelge'].value?.files[0];

    const ekBelge = ArrayHelper.isNullOrEmpty(this.aform.controls['ekBelge'].value) ? "" : <File>this.aform_controls['ekBelge'].value?.files[0];
    /*
       const ozGecmisBelgesi = <File>this.aform_controls['ozGecmisBelgesi'].value?.files[0] ?? "1";
      const etikKurulOnayBelgesi = <File>this.aform_controls['etikKurulOnayBelgesi'].value?.files[0] ?? "1";
      const anketOlcekFormu = <File>this.aform_controls['anketOlcekFormu'].value?.files[0] ?? "1";
      const uzmanlikvbTeziBelge = <File>this.aform_controls['uzmanlikvbTeziBelge'].value?.files[0] ?? "1";
      const ekBelge = <File>this.aform_controls['ekBelge'].value?.files[0] ?? "1"; 
      */
    const files = [];
    console.log("123121s" + ozGecmisBelgesi)
    this.addArray(ozGecmisBelgesi);
    this.addArray(etikKurulOnayBelgesi);
    this.addArray(anketOlcekFormu);
    this.addArray(uzmanlikvbTeziBelge);
    this.addArray(ekBelge);
    /*  const files = [
       ozGecmisBelgesi,
       etikKurulOnayBelgesi,
       anketOlcekFormu,
       uzmanlikvbTeziBelge,
       ekBelge]; */

    return this.uploadDownloadService.uploadFiles(this.upfiles);
  }
  Yukle() {
    this.uploadDocuments().subscribe((result) => {

      if (result.type === HttpEventType.UploadProgress) {
        this.uploadP = Math.round(100 * (result.loaded / result.total));
      } else if (result.type === HttpEventType.Response) {

        const fileNames = result.body;
        console.log("sade", fileNames)

        const product = this.mapProduct(fileNames);


      }
    });
  }

  addArray(ek: any) {

    if (ek === "") {

    }
    else {
      this.upfiles.push(ek);
    }


  }
}