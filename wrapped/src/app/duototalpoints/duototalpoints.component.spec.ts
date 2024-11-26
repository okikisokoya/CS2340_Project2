import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuototalpointsComponent } from './duototalpoints.component';

describe('DuototalpointsComponent', () => {
  let component: DuototalpointsComponent;
  let fixture: ComponentFixture<DuototalpointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DuototalpointsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DuototalpointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
