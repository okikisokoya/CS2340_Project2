import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LocalstorageService } from '../localstorage.service';
import { RouterLink, Router } from '@angular/router';  

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent implements OnInit {

  constructor(private authService: AuthService, private localStorageService: LocalstorageService, private router: Router) {}

  ngOnInit() {
    const username = this.localStorageService.getItem('username');
    const password = this.localStorageService.getItem('password');
    if (username && password) {
      this.authService.setSession(username, password).subscribe((response) => {
        this.router.navigate(['/dashboard']);
      }); // Reinitialize session
    } 
  }

}
