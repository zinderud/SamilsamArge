import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { environment as env } from '@env/environment';
import { Basvuru } from '@app/core/models/basvuru/basvuru';
import { TimelineItem } from '@app/shared/components/ngx-vertical-timeline/timeline-item';
@Component({
  selector: 'app-basvuru-incele',
  templateUrl: './basvuru-incele.component.html',
  styleUrls: ['./basvuru-incele.component.scss']
})
export class BasvuruInceleComponent implements OnInit {
  items: TimelineItem[] = [];
  durumForm: FormGroup;
  editbasvuru: Basvuru = {};
  public src = {};
  itemId: string;
  loading = false;
  basvuru: any = {};
  constructor(private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private httpClient: HttpClient
  ) {
    this.durumForm = this.fb.group({
      durum: {}
    });
  }

  ngOnInit(): void {
    this.itemId = this.activatedRoute.snapshot.params.id;
    this.httpClient.get(`${env.serverUrl}/basvuru/selected/${this.itemId}`).subscribe((data: any) => {
      this.loading = false;
      const basform = JSON.parse(data.value.basvuruForm);
      this.basvuru = { ...data.value }
      this.editbasvuru = { ...data.value };
      this.basvuru.basvuruForm = basform;
      this.durumForm.patchValue({
        durum: this.editbasvuru.durum
      }
      );

    });

    this.items.push({
      label: 'Ahmet Bilir',
      icon: 'fa fa-plus',
      content: `Başvuru Yapildi.`,
      title: '11  Kasım 2020',

    });
    this.items.push({
      label: 'Nihat Demre',
      icon: 'fa fa-plus',
      content: ` Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      title: '12 aralık 2020',

    });

  }



  onErrorPdf(onErrorPdf: any) {
    // do anything
    console.log("hata pdf" + onErrorPdf);
  }
  onDurumEdit(): void {
    if (this.durumForm.valid) {
      this.durumForm.disable();

      this.editbasvuru.durum = this.durumForm.value.durum

      const p = { ...this.editbasvuru };
      this.httpClient.patch(`${env.serverUrl}/basvuru/${this.itemId}`, p
      ).subscribe((data: any) => {

        if (data.succeeded) {
          this.snackBar.open(`basvuru  ${this.durumForm.value.durum} düzenlendi`, 'X', { duration: 3000 });
          this.router.navigate(['inceleme']);
        }
        this.loading = false;

      }, (error: HttpErrorResponse) => {
        this.loading = false;
        this.durumForm.enable();
        this.snackBar.open(error.error, 'X', { duration: 3000 });
      });

    } else {
      console.log('Form not valid');
    }


  }
}
