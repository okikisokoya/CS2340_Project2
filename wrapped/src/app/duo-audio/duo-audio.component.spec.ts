import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuoAudioComponent } from './duo-audio.component';

describe('DuoAudioComponent', () => {
  let component: DuoAudioComponent;
  let fixture: ComponentFixture<DuoAudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DuoAudioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DuoAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
