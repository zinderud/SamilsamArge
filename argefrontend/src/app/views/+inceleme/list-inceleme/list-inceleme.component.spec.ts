import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListIncelemeComponent } from './list-inceleme.component';

describe('ListIncelemeComponent', () => {
  let component: ListIncelemeComponent;
  let fixture: ComponentFixture<ListIncelemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListIncelemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListIncelemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
