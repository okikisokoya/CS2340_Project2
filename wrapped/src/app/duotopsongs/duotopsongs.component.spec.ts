import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuotopsongsComponent } from './duotopsongs.component';

describe('DuotopsongsComponent', () => {
  let component: DuotopsongsComponent;
  let fixture: ComponentFixture<DuotopsongsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DuotopsongsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DuotopsongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
