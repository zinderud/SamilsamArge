import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArastirmaKapsamFormComponent } from './arastirma-kapsam-form.component';

describe('ArastirmaKapsamFormComponent', () => {
  let component: ArastirmaKapsamFormComponent;
  let fixture: ComponentFixture<ArastirmaKapsamFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArastirmaKapsamFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArastirmaKapsamFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
