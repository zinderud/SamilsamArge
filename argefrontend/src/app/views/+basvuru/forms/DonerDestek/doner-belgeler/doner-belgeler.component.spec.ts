import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonerBelgelerComponent } from './doner-belgeler.component';

describe('DonerBelgelerComponent', () => {
  let component: DonerBelgelerComponent;
  let fixture: ComponentFixture<DonerBelgelerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonerBelgelerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonerBelgelerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
