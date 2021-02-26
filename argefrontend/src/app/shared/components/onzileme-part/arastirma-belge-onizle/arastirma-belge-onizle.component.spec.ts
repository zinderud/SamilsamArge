import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArastirmaBelgeOnizleComponent } from './arastirma-belge-onizle.component';

describe('ArastirmaBelgeOnizleComponent', () => {
  let component: ArastirmaBelgeOnizleComponent;
  let fixture: ComponentFixture<ArastirmaBelgeOnizleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArastirmaBelgeOnizleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArastirmaBelgeOnizleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
