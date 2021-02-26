import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GonulluPopOnizleComponent } from './gonullu-pop-onizle.component';

describe('GonulluPopOnizleComponent', () => {
  let component: GonulluPopOnizleComponent;
  let fixture: ComponentFixture<GonulluPopOnizleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GonulluPopOnizleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GonulluPopOnizleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
