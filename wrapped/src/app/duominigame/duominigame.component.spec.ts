import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuominigameComponent } from './duominigame.component';

describe('DuominigameComponent', () => {
  let component: DuominigameComponent;
  let fixture: ComponentFixture<DuominigameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DuominigameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DuominigameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
