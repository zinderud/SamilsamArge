import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArgeFormOnizlemeComponent } from './arge-form-onizleme.component';

describe('ArgeFormOnizlemeComponent', () => {
  let component: ArgeFormOnizlemeComponent;
  let fixture: ComponentFixture<ArgeFormOnizlemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArgeFormOnizlemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArgeFormOnizlemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
