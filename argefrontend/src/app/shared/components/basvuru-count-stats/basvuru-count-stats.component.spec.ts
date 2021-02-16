import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasvuruCountStatsComponent } from './basvuru-count-stats.component';

describe('BasvuruCountStatsComponent', () => {
  let component: BasvuruCountStatsComponent;
  let fixture: ComponentFixture<BasvuruCountStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasvuruCountStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasvuruCountStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
