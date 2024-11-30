import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreatTasteComponent } from './great-taste.component';

describe('GreatTasteComponent', () => {
  let component: GreatTasteComponent;
  let fixture: ComponentFixture<GreatTasteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GreatTasteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GreatTasteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
