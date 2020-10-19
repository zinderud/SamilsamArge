import { Component, OnInit, ViewChild } from '@angular/core';
import { PersonEducation } from '@app/core/models/personEducation';
import { MatTableDataSource, MatPaginator, MatSort, MatTable, MatSnackBar } from '@angular/material';
import { Person } from '@app/core/models/person';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment as env } from '@env/environment';
@Component({
  selector: 'app-person-education',
  templateUrl: './person-education.component.html',
  styleUrls: ['./person-education.component.scss']
})
export class PersonEducationComponent implements OnInit {
  itemId: string;
  loading = true;
  resultsLength = 0;
  personEducationsSource: MatTableDataSource<Person>;
  personEducations: PersonEducation[] = [];
  person: Person;

  personEducationDisplayedColumns: string[] = ['id', 'subject', 'management',
    'renewalPeriod', 'educationType', 'educationPlace', 'educationDate', 'educationTime', 'certification', 'check', 'renewalDate', 'isArchived', 'edit'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private httpClient: HttpClient,
  ) {
    this.loading = true;
  }

  ngOnInit() {
    this.personEducationsSource = new MatTableDataSource<PersonEducation>([]);
    this.itemId = this.activatedRoute.snapshot.params.id;


    this.httpClient.get(`${env.serverUrl}/persons/${this.itemId}`).subscribe((data: any) => {
      this.person = data.value;
      console.log(data);
      this.loading = false;
    },
      (error: HttpErrorResponse) => {

        this.snackBar.open(error.error, 'X', { duration: 3000 });

        console.log(error);
      },

      () => {
        this.getPersonEducations();

      }
    );


  }

  onPersonEducationPageChanged(e) {
    const firstCut = e.pageIndex * e.pageSize;
    const secondCut = firstCut + e.pageSize;
    this.personEducationsSource = new MatTableDataSource<Person>(this.personEducations.slice(firstCut, secondCut));
  }

  getPersonEducations() {
    this.httpClient.get(`${env.serverUrl}/persons/personeducations/${this.itemId}`).subscribe((data: any) => {
      console.log(data);
      this.resultsLength = data.value.length;
      this.personEducations = data.value;
      this.personEducationsSource = new MatTableDataSource<Person>(this.personEducations.slice(0, 5));
    },
      (error: HttpErrorResponse) => {

        this.snackBar.open(error.error, 'X', { duration: 3000 });
        console.log(error);
      },

      () => { }

    );

  }

}
