import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeningmoodComponent } from './listeningmood.component';

describe('ListeningmoodComponent', () => {
  let component: ListeningmoodComponent;
  let fixture: ComponentFixture<ListeningmoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeningmoodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeningmoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
