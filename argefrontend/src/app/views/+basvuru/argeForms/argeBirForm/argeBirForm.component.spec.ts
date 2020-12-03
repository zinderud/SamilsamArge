import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasvuruFormComponent } from './basvuru-form.component';

describe('BasvuruFormComponent', () => {
  let component: BasvuruFormComponent;
  let fixture: ComponentFixture<BasvuruFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasvuruFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasvuruFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
