import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KontrolAtamaComponent } from './kontrol-atama.component';

describe('KontrolAtamaComponent', () => {
  let component: KontrolAtamaComponent;
  let fixture: ComponentFixture<KontrolAtamaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KontrolAtamaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KontrolAtamaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
