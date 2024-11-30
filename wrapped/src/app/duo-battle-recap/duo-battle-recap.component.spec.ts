import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuoBattleRecapComponent } from './duo-battle-recap.component';

describe('DuoBattleRecapComponent', () => {
  let component: DuoBattleRecapComponent;
  let fixture: ComponentFixture<DuoBattleRecapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DuoBattleRecapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DuoBattleRecapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
