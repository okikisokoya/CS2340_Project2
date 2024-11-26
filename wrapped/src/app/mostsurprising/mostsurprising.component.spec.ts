import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostsurprisingComponent } from './mostsurprising.component';

describe('MostsurprisingComponent', () => {
  let component: MostsurprisingComponent;
  let fixture: ComponentFixture<MostsurprisingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostsurprisingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostsurprisingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
