import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KontrolFormComponent } from './kontrol-form.component';

describe('KontrolFormComponent', () => {
  let component: KontrolFormComponent;
  let fixture: ComponentFixture<KontrolFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KontrolFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KontrolFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
