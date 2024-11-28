import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuointroComponent } from './duointro.component';

describe('DuointroComponent', () => {
  let component: DuointroComponent;
  let fixture: ComponentFixture<DuointroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DuointroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DuointroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
