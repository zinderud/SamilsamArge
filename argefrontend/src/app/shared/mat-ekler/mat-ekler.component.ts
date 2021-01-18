import { HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidatorFn } from '@angular/forms';
import { UploadDownloadService } from '@app/core/services/upload-download.service';
import { Subscription } from 'rxjs';
type FormGroupConfig<T> = {
  [P in keyof T]: [
    T[P] | { value: T[P]; disabled: boolean },
    (AbstractControlOptions | ValidatorFn | ValidatorFn[])?
  ]
};
export class eklerform {

  belge?: string;

}

@Component({
  selector: 'app-mat-ekler',
  templateUrl: './mat-ekler.component.html',
  styleUrls: ['./mat-ekler.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MatEklerComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MatEklerComponent),
      multi: true
    }
  ]
})
export class MatEklerComponent implements OnInit {
  @Output() formReady = new EventEmitter<FormGroup>();

  @Input() aform: FormGroup = this.fb.group({ belge: "" })
  @Input() labelname: string = ""
  uploadingfile = false;
  onChange: any = () => { };
  onTouched: any = () => { };
  subscriptions: Subscription[] = [];
  uploadP: number;
  constructor(private fb: FormBuilder, private uploadDownloadService: UploadDownloadService,) {
    const config: FormGroupConfig<eklerform> = {
      belge: ['']
    };
    this.aform = this.fb.group(config);
    this.subscriptions.push(
      this.aform.valueChanges.subscribe(value => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  ngOnInit(): void {
  }
  get aformValue(): eklerform {
    return this.aform.value;
  }


  public get aform_controls(): { [key: string]: AbstractControl } {
    return this.aform.controls;
  }

  createGroup() {
    const config: FormGroupConfig<eklerform> = {

      belge: [''],

    }
    this.aform = this.fb.group(config);
    return this.aform;
  }

  belgeYukle() {
    const file = <File>this.aform_controls['belge'].value.files[0];
    const files = [
      file,
    ];
    this.uploadDownloadService.uploadFiles(files).subscribe((result) => {

      if (result.type === HttpEventType.UploadProgress) {
        this.uploadP = Math.round(100 * (result.loaded / result.total));
      } else if (result.type === HttpEventType.Response) {

        const fileNames = result.body;
        this.aform.controls["belge"].setValue(fileNames[0]?.fileName || "",)


        this.uploadingfile = true;
      }
    });

  }


}
