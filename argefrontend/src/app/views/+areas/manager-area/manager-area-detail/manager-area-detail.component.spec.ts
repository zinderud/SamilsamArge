import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerAreaDetailComponent } from './manager-area-detail.component';

describe('ManagerAreaDetailComponent', () => {
  let component: ManagerAreaDetailComponent;
  let fixture: ComponentFixture<ManagerAreaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerAreaDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerAreaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
