import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitefriendComponent } from './invitefriend.component';

describe('InvitefriendComponent', () => {
  let component: InvitefriendComponent;
  let fixture: ComponentFixture<InvitefriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvitefriendComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvitefriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
