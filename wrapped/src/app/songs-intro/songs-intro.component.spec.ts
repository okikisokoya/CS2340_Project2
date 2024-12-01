import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongsIntroComponent } from './songs-intro.component';

describe('SongsIntroComponent', () => {
  let component: SongsIntroComponent;
  let fixture: ComponentFixture<SongsIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongsIntroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongsIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
