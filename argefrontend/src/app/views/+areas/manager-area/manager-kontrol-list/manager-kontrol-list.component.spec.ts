import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerKontrolListComponent } from './manager-kontrol-list.component';

describe('ManagerKontrolListComponent', () => {
  let component: ManagerKontrolListComponent;
  let fixture: ComponentFixture<ManagerKontrolListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerKontrolListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerKontrolListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
