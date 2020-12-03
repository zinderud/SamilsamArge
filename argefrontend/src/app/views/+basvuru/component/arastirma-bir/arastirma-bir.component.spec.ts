import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArastirmaBirComponent } from './arastirma-bir.component';

describe('ArastirmaBirComponent', () => {
  let component: ArastirmaBirComponent;
  let fixture: ComponentFixture<ArastirmaBirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArastirmaBirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArastirmaBirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
