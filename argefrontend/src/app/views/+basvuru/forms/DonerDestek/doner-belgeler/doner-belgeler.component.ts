import { HttpEventType } from '@angular/common/http';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { AbstractControlOptions, ValidatorFn, NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { FileResponse, UploadDownloadService } from '@app/core/services/upload-download.service';
import { ArrayHelper } from '@app/shared/lib/helpers/arrayHelper';
import { Subscription } from 'rxjs';
import { ArastirmaBelgelerForm } from '../../model/arastirma-belgeler-model';
import { DonerBelgeler } from '../../model/doner-belgeler';

type FormGroupConfig<T> = {
  [P in keyof T]: [
    T[P] | { value: T[P]; disabled: boolean },
    (AbstractControlOptions | ValidatorFn | ValidatorFn[])?
  ]
};

@Component({
  selector: 'app-doner-belgeler',
  templateUrl: './doner-belgeler.component.html',
  styleUrls: ['./doner-belgeler.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DonerBelgelerComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DonerBelgelerComponent),
      multi: true
    }
  ]
})
export class DonerBelgelerComponent implements ControlValueAccessor {

  @Input() aform: FormGroup;
  @Input() index: number;
  uploading = false;
  uploadingozGecmisBelgesi = false;
  uploadingetikKurulOnayBelgesi = false;
  uploadinganketOlcekFormu = false;
  uploadinguzmanlikvbTeziBelge = false;
  uploadingekBelge = false;
  uploadingBakanlikOnayi = false;
  uploadingProtokolOzeti = false;
  uploadingGonulluOlur = false;
  uploadingolguRapor = false;
  uploadingbutce = false;
  uploadingcalismayaKatilanMerkezler = false;
  uploadingakisSemasi = false;
  uploadinglitaratur1 = false;
  uploadinglitaratur2 = false;
  uploadinglitaratur3 = false;
  loading = false;
  uploadP: number;
  cform: FormGroup;
  subscriptions: Subscription[] = [];
  onChange: any = () => { };
  onTouched: any = () => { };
  upfiles = []
  constructor(private fb: FormBuilder, private uploadDownloadService: UploadDownloadService,) {
    const config: FormGroupConfig<DonerBelgeler> = {
      ozGecmisBelgesi: [''],
      etikKurulOnayBelgesi: [''],
      anketOlcekFormu: [''],
      uzmanlikvbTeziBelge: [''],
      ekBelge: [''],
      BakanlikOnayi: [''],
      ProtokolOzeti: [''],
      GonulluOlur: [''],
      olguRapor: [''],
      butce: [''],
      calismayaKatilanMerkezler: [''],
      akisSemasi: [''],
      litaratur1: [''],
      litaratur2: [''],
      litaratur3: [''],





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
    const config: FormGroupConfig<DonerBelgeler> = {
      ozGecmisBelgesi: [''],
      etikKurulOnayBelgesi: [''],
      anketOlcekFormu: [''],
      uzmanlikvbTeziBelge: [''],
      ekBelge: [''],
      BakanlikOnayi: [''],
      ProtokolOzeti: [''],
      GonulluOlur: [''],
      olguRapor: [''],
      butce: [''],
      calismayaKatilanMerkezler: [''],
      akisSemasi: [''],
      litaratur1: [''],
      litaratur2: [''],
      litaratur3: [''],

    }
    this.aform = this.fb.group(config);
    return this.aform;
  }



  get aformValue(): DonerBelgeler {
    return this.aform.value;
  }

  set aformValue(value: DonerBelgeler) {
    this.aform.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  writeValue(value: DonerBelgeler): void {
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
  BakanlikOnayiYukle() {
    const file = <File>this.aform_controls['BakanlikOnayi'].value.files[0];
    const files = [
      file,
    ];
    this.uploadDownloadService.uploadFiles(files).subscribe((result) => {

      if (result.type === HttpEventType.UploadProgress) {
        this.uploadP = Math.round(100 * (result.loaded / result.total));
      } else if (result.type === HttpEventType.Response) {

        const fileNames = result.body;
        this.aform.controls["BakanlikOnayi"].setValue(fileNames[0]?.fileName || "",)


        this.uploadingBakanlikOnayi = true;
      }
    });

  }


  ProtokolOzetiYukle() {
    const file = <File>this.aform_controls['ProtokolOzeti'].value.files[0];
    const files = [
      file,
    ];
    this.uploadDownloadService.uploadFiles(files).subscribe((result) => {

      if (result.type === HttpEventType.UploadProgress) {
        this.uploadP = Math.round(100 * (result.loaded / result.total));
      } else if (result.type === HttpEventType.Response) {

        const fileNames = result.body;
        this.aform.controls["ProtokolOzeti"].setValue(fileNames[0]?.fileName || "",)


        this.uploadingProtokolOzeti = true;
      }
    });

  }

  GonulluOlurYukle() {
    const file = <File>this.aform_controls['GonulluOlur'].value.files[0];
    const files = [
      file,
    ];
    this.uploadDownloadService.uploadFiles(files).subscribe((result) => {

      if (result.type === HttpEventType.UploadProgress) {
        this.uploadP = Math.round(100 * (result.loaded / result.total));
      } else if (result.type === HttpEventType.Response) {

        const fileNames = result.body;
        this.aform.controls["GonulluOlur"].setValue(fileNames[0]?.fileName || "",)


        this.uploadingGonulluOlur = true;
      }
    });

  }

  olguRaporYukle() {
    const file = <File>this.aform_controls['olguRapor'].value.files[0];
    const files = [
      file,
    ];
    this.uploadDownloadService.uploadFiles(files).subscribe((result) => {

      if (result.type === HttpEventType.UploadProgress) {
        this.uploadP = Math.round(100 * (result.loaded / result.total));
      } else if (result.type === HttpEventType.Response) {

        const fileNames = result.body;
        this.aform.controls["olguRapor"].setValue(fileNames[0]?.fileName || "",)


        this.uploadingolguRapor = true;
      }
    });

  }

  butceYukle() {
    const file = <File>this.aform_controls['butce'].value.files[0];
    const files = [
      file,
    ];
    this.uploadDownloadService.uploadFiles(files).subscribe((result) => {

      if (result.type === HttpEventType.UploadProgress) {
        this.uploadP = Math.round(100 * (result.loaded / result.total));
      } else if (result.type === HttpEventType.Response) {

        const fileNames = result.body;
        this.aform.controls["butce"].setValue(fileNames[0]?.fileName || "",)


        this.uploadingbutce = true;
      }
    });

  }


  calismayaKatilanMerkezlerYukle() {
    const file = <File>this.aform_controls['calismayaKatilanMerkezler'].value.files[0];
    const files = [
      file,
    ];
    this.uploadDownloadService.uploadFiles(files).subscribe((result) => {

      if (result.type === HttpEventType.UploadProgress) {
        this.uploadP = Math.round(100 * (result.loaded / result.total));
      } else if (result.type === HttpEventType.Response) {

        const fileNames = result.body;
        this.aform.controls["calismayaKatilanMerkezler"].setValue(fileNames[0]?.fileName || "",)


        this.uploadingcalismayaKatilanMerkezler = true;
      }
    });

  }



  akisSemasiYukle() {
    const file = <File>this.aform_controls['akisSemasi'].value.files[0];
    const files = [
      file,
    ];
    this.uploadDownloadService.uploadFiles(files).subscribe((result) => {

      if (result.type === HttpEventType.UploadProgress) {
        this.uploadP = Math.round(100 * (result.loaded / result.total));
      } else if (result.type === HttpEventType.Response) {

        const fileNames = result.body;
        this.aform.controls["akisSemasi"].setValue(fileNames[0]?.fileName || "",)


        this.uploadingakisSemasi = true;
      }
    });

  }

  litaratur1Yukle() {
    const file = <File>this.aform_controls['litaratur1'].value.files[0];
    const files = [
      file,
    ];
    this.uploadDownloadService.uploadFiles(files).subscribe((result) => {

      if (result.type === HttpEventType.UploadProgress) {
        this.uploadP = Math.round(100 * (result.loaded / result.total));
      } else if (result.type === HttpEventType.Response) {

        const fileNames = result.body;
        this.aform.controls["litaratur1"].setValue(fileNames[0]?.fileName || "",)


        this.uploadinglitaratur1 = true;
      }
    });

  }


  litaratur2Yukle() {
    const file = <File>this.aform_controls['litaratur2'].value.files[0];
    const files = [
      file,
    ];
    this.uploadDownloadService.uploadFiles(files).subscribe((result) => {

      if (result.type === HttpEventType.UploadProgress) {
        this.uploadP = Math.round(100 * (result.loaded / result.total));
      } else if (result.type === HttpEventType.Response) {

        const fileNames = result.body;
        this.aform.controls["litaratur2"].setValue(fileNames[0]?.fileName || "",)


        this.uploadinglitaratur2 = true;
      }
    });

  }

  litaratur3Yukle() {
    const file = <File>this.aform_controls['litaratur3'].value.files[0];
    const files = [
      file,
    ];
    this.uploadDownloadService.uploadFiles(files).subscribe((result) => {

      if (result.type === HttpEventType.UploadProgress) {
        this.uploadP = Math.round(100 * (result.loaded / result.total));
      } else if (result.type === HttpEventType.Response) {

        const fileNames = result.body;
        this.aform.controls["litaratur3"].setValue(fileNames[0]?.fileName || "",)


        this.uploadinglitaratur3 = true;
      }
    });

  }





}
