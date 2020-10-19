import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTableLoadingComponent } from './mat-table-loading.component';

describe('MatTableLoadingComponent', () => {
  let component: MatTableLoadingComponent;
  let fixture: ComponentFixture<MatTableLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatTableLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatTableLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
