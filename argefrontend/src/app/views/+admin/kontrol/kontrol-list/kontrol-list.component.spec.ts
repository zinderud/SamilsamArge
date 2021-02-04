import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KontrolListComponent } from './kontrol-list.component';

describe('KontrolListComponent', () => {
  let component: KontrolListComponent;
  let fixture: ComponentFixture<KontrolListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KontrolListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KontrolListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
