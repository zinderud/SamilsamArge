import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArastirmaBelgelerFormComponent } from './arastirma-belgeler-form.component';

describe('ArastirmaBelgelerFormComponent', () => {
  let component: ArastirmaBelgelerFormComponent;
  let fixture: ComponentFixture<ArastirmaBelgelerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArastirmaBelgelerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArastirmaBelgelerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
