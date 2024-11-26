import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopgenresComponent } from './topgenres.component';

describe('TopgenresComponent', () => {
  let component: TopgenresComponent;
  let fixture: ComponentFixture<TopgenresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopgenresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopgenresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
