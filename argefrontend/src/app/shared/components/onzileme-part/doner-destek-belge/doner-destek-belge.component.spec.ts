import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonerDestekBelgeComponent } from './doner-destek-belge.component';

describe('DonerDestekBelgeComponent', () => {
  let component: DonerDestekBelgeComponent;
  let fixture: ComponentFixture<DonerDestekBelgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonerDestekBelgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonerDestekBelgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
