import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SithComponent } from './sith.component';

describe('SithComponent', () => {
  let component: SithComponent;
  let fixture: ComponentFixture<SithComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SithComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SithComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
