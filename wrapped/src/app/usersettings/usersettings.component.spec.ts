// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { UsersettingsComponent } from './usersettings.component';

// describe('UsersettingsComponent', () => {
//   let component: UsersettingsComponent;
//   let fixture: ComponentFixture<UsersettingsComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [UsersettingsComponent]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(UsersettingsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersettingsComponent } from './usersettings.component';

describe('SettingsComponent', () => {
  let component: UsersettingsComponent;
  let fixture: ComponentFixture<UsersettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersettingsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have three buttons', () => {
    const compiled = fixture.nativeElement;
    const buttons = compiled.querySelectorAll('button');
    expect(buttons.length).toBe(3);
    expect(buttons[0].textContent).toContain('Change email address');
    expect(buttons[1].textContent).toContain('Change my password');
    expect(buttons[2].textContent).toContain('Delete my account');
  });
});


