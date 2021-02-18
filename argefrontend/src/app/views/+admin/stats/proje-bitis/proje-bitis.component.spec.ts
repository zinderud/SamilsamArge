import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjeBitisComponent } from './proje-bitis.component';

describe('ProjeBitisComponent', () => {
  let component: ProjeBitisComponent;
  let fixture: ComponentFixture<ProjeBitisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjeBitisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjeBitisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
