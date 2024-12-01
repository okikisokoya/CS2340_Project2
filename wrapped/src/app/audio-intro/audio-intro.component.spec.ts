import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioIntroComponent } from './audio-intro.component';

describe('AudioIntroComponent', () => {
  let component: AudioIntroComponent;
  let fixture: ComponentFixture<AudioIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AudioIntroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudioIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
