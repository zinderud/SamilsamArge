import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAreaDetailComponent } from './user-area-detail.component';

describe('UserAreaDetailComponent', () => {
  let component: UserAreaDetailComponent;
  let fixture: ComponentFixture<UserAreaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAreaDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAreaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
