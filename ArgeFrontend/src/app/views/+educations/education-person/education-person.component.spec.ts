import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationPersonComponent } from './education-person.component';

describe('EducationPersonComponent', () => {
  let component: EducationPersonComponent;
  let fixture: ComponentFixture<EducationPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
