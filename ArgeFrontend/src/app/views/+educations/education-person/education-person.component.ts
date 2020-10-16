import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatPaginator, MatSort, MatTable, MatTableDataSource, MatDialog } from '@angular/material';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment as env } from '@env/environment';
import { Education } from '@app/core/models/educations';
import { EducationShareService } from '../education-share.service';
import { Person } from '@app/core/models/person';
import { PersonEducation } from '@app/core/models/personEducation';
import { ConfirmComponent } from '@app/shared/components/confirm/confirm.component';
@Component({
  selector: 'app-education-person',
  templateUrl: './education-person.component.html',
  styleUrls: ['./education-person.component.scss']
})
export class EducationPersonComponent implements OnInit {
  itemId: string;
  loading = true;
  education: Education;
  persons: Person[] = [];
  personEducations: PersonEducation[] = [];
  dataSource = [];
  PersonEducationresultsLength = 0;
  resultsLength = 0;
  personsSource: MatTableDataSource<Person>;
  personEducationsSource: MatTableDataSource<Person>;
  personDisplayedColumns: string[] = ['id', 'name', 'surname', 'email',
    'title',
    'phone', 'unit'];

  personEducationDisplayedColumns: string[] = ['id', 'name', 'surname',
    'phone', 'unit', 'check', 'renewalDate', 'isArchived'];
  activePageDataChunk = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private httpClient: HttpClient,
    private educationShareService: EducationShareService,
    private dialog: MatDialog

  ) {

    this.loading = true;
  }

  ngOnInit() {

    this.personsSource = new MatTableDataSource<Person>([]);
    this.personEducationsSource = new MatTableDataSource<PersonEducation>([]);
    this.itemId = this.activatedRoute.snapshot.params.id;

    this.httpClient.get(`${env.serverUrl}/educations/${this.itemId}`).subscribe((data: any) => {
      this.education = data.value;
      console.log(data);
    },
      (error: HttpErrorResponse) => {

        this.snackBar.open(error.error, 'X', { duration: 3000 });
        console.log(error);
      },

      () => {
        this.getPersonList();
      }
    );
  }
  getPersonList() {

    this.httpClient.post(`${env.serverUrl}/educations/listpersontitles/${this.itemId}`, { ...this.education }).subscribe((data: any) => {
      this.loading = false;
      console.log('person list', data);
      this.resultsLength = data.value.length;
      this.persons = data.value;
      this.personsSource = new MatTableDataSource<Person>(this.persons.slice(0, 5));

    }
    );
  }
  onPersonPageChanged(e) {
    const firstCut = e.pageIndex * e.pageSize;
    const secondCut = firstCut + e.pageSize;
    this.personsSource = new MatTableDataSource<Person>(this.persons.slice(firstCut, secondCut));
  }
  onPersonEducationPageChanged(e) {
    const firstCut = e.pageIndex * e.pageSize;
    const secondCut = firstCut + e.pageSize;
    this.personEducationsSource = new MatTableDataSource<Person>(this.personEducations.slice(firstCut, secondCut));
  }

  setPersonEducationforTitles() {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        message: `Ünvanlara Göre Eğitim Atanacaktır. Onaylıyormusunuz?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {


        this.httpClient.post(`${env.serverUrl}/educations/peredufortitles`, { ...this.education }).subscribe((data: any) => {
          console.log(data);
          this.personEducations = data.value;
          this.PersonEducationresultsLength = data.value.length;
          this.personEducationsSource = new MatTableDataSource<Person>(this.personEducations.slice(0, 5));
        },
          (error: HttpErrorResponse) => {

            this.snackBar.open(error.error, 'X', { duration: 3000 });
            console.log(error);
          }, () => { });

      }

    });

  }

}
