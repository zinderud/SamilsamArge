import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasvuruInceleComponent } from './basvuru-incele.component';

describe('BasvuruInceleComponent', () => {
  let component: BasvuruInceleComponent;
  let fixture: ComponentFixture<BasvuruInceleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasvuruInceleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasvuruInceleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
