import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuotopgenresComponent } from './duotopgenres.component';

describe('DuotopgenresComponent', () => {
  let component: DuotopgenresComponent;
  let fixture: ComponentFixture<DuotopgenresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DuotopgenresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DuotopgenresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
