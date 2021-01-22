import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNotComponent } from './user-not.component';

describe('UserNotComponent', () => {
  let component: UserNotComponent;
  let fixture: ComponentFixture<UserNotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserNotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
