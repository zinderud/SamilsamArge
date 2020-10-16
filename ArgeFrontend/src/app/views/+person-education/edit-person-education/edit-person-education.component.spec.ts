import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPersonEducationComponent } from './edit-person-education.component';

describe('EditPersonEducationComponent', () => {
  let component: EditPersonEducationComponent;
  let fixture: ComponentFixture<EditPersonEducationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPersonEducationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPersonEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
