import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatEklerComponent } from './mat-ekler.component';

describe('MatEklerComponent', () => {
  let component: MatEklerComponent;
  let fixture: ComponentFixture<MatEklerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatEklerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatEklerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
