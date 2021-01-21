import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBasvuruListComponent } from './user-basvuru-list.component';

describe('UserBasvuruListComponent', () => {
  let component: UserBasvuruListComponent;
  let fixture: ComponentFixture<UserBasvuruListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBasvuruListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBasvuruListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
