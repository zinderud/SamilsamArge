import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArastirmaFormComponent } from './arastirma-form.component';

describe('ArastirmaFormComponent', () => {
  let component: ArastirmaFormComponent;
  let fixture: ComponentFixture<ArastirmaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArastirmaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArastirmaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
