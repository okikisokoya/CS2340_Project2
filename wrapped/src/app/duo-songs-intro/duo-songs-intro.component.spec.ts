import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuoSongsIntroComponent } from './duo-songs-intro.component';

describe('DuoSongsIntroComponent', () => {
  let component: DuoSongsIntroComponent;
  let fixture: ComponentFixture<DuoSongsIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DuoSongsIntroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DuoSongsIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
