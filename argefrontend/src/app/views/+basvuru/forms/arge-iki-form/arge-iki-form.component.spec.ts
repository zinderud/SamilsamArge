import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArgeIkiFormComponent } from './arge-iki-form.component';

describe('ArgeIkiFormComponent', () => {
  let component: ArgeIkiFormComponent;
  let fixture: ComponentFixture<ArgeIkiFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArgeIkiFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArgeIkiFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
