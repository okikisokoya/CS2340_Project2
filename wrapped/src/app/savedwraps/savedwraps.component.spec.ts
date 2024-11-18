import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedwrapsComponent } from './savedwraps.component';

describe('SavedwrapsComponent', () => {
  let component: SavedwrapsComponent;
  let fixture: ComponentFixture<SavedwrapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedwrapsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedwrapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
