// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { RegistrationComponent } from './registration.component';

// describe('RegistrationComponent', () => {
//   let component: RegistrationComponent;
//   let fixture: ComponentFixture<RegistrationComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [RegistrationComponent]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(RegistrationComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationComponent } from './registration.component';
import { FormsModule } from '@angular/forms';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with three inputs and a button', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('input').length).toBe(3);
    expect(compiled.querySelector('button').textContent).toContain('Board my spaceship!');
  });
});

