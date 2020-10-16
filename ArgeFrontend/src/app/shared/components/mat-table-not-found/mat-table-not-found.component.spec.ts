import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTableNotFoundComponent } from './mat-table-not-found.component';

describe('MatTableNotFoundComponent', () => {
  let component: MatTableNotFoundComponent;
  let fixture: ComponentFixture<MatTableNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatTableNotFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatTableNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
