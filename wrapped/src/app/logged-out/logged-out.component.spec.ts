// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { LoggedOutComponent } from './logged-out.component';

// describe('LoggedOutComponent', () => {
//   let component: LoggedOutComponent;
//   let fixture: ComponentFixture<LoggedOutComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [LoggedOutComponent]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(LoggedOutComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LoggedOutComponent } from './logged-out.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoggedOutComponent', () => {
  let component: LoggedOutComponent;
  let fixture: ComponentFixture<LoggedOutComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoggedOutComponent],
      imports: [RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LoggedOutComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call onLogin and navigate to /login', () => {
    spyOn(router, 'navigate');
    component.onLogin();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
