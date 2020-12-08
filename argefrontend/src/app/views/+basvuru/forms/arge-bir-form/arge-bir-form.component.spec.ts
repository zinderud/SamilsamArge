import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArgeBirFormComponent } from './arge-bir-form.component';

describe('ArgeBirFormComponent', () => {
  let component: ArgeBirFormComponent;
  let fixture: ComponentFixture<ArgeBirFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArgeBirFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArgeBirFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
