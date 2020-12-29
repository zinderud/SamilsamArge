import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArgeUcFormComponent } from './arge-uc-form.component';

describe('ArgeUcFormComponent', () => {
  let component: ArgeUcFormComponent;
  let fixture: ComponentFixture<ArgeUcFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArgeUcFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArgeUcFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
