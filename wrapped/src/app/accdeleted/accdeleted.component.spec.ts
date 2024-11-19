import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccdeletedComponent } from './accdeleted.component';

describe('AccdeletedComponent', () => {
  let component: AccdeletedComponent;
  let fixture: ComponentFixture<AccdeletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccdeletedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccdeletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
