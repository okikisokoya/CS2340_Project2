import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuotopartistsComponent } from './duotopartists.component';

describe('DuotopartistsComponent', () => {
  let component: DuotopartistsComponent;
  let fixture: ComponentFixture<DuotopartistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DuotopartistsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DuotopartistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
