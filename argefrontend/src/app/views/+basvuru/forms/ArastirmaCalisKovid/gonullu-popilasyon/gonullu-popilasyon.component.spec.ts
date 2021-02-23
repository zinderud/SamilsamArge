import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GonulluPopilasyonComponent } from './gonullu-popilasyon.component';

describe('GonulluPopilasyonComponent', () => {
  let component: GonulluPopilasyonComponent;
  let fixture: ComponentFixture<GonulluPopilasyonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GonulluPopilasyonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GonulluPopilasyonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
