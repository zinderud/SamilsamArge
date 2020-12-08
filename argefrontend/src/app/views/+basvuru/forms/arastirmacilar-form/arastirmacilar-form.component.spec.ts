import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArastirmacilarFormComponent } from './arastirmacilar-form.component';

describe('ArastirmacilarFormComponent', () => {
  let component: ArastirmacilarFormComponent;
  let fixture: ComponentFixture<ArastirmacilarFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArastirmacilarFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArastirmacilarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
