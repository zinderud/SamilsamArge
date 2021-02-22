import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArgeDortFormComponent } from './arge-dort-form.component';

describe('ArgeDortFormComponent', () => {
  let component: ArgeDortFormComponent;
  let fixture: ComponentFixture<ArgeDortFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArgeDortFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArgeDortFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
