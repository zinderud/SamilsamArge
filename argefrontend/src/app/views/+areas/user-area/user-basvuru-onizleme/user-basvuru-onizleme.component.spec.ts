import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBasvuruOnizlemeComponent } from './user-basvuru-onizleme.component';

describe('UserBasvuruOnizlemeComponent', () => {
  let component: UserBasvuruOnizlemeComponent;
  let fixture: ComponentFixture<UserBasvuruOnizlemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBasvuruOnizlemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBasvuruOnizlemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
