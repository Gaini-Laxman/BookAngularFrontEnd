import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  rememberMe: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  login(): void {
    this.userService.login({ username: this.username, password: this.password }).subscribe(
      (response: any) => {
        // Assuming the response contains user data and possibly a token
        if (response && response.token) { // Adjust based on actual response structure
          if (this.rememberMe) {
            localStorage.setItem('username', this.username);
            localStorage.setItem('836f2e82-00aa-46b0-bd9e-54c18343e141', response.token); // Store token for authentication
          } else {
            localStorage.removeItem('username');
          }
          // Navigate to the profile page
          this.router.navigate(['/profile']); // Adjust to your actual profile route
        } else {
          this.errorMessage = 'Login failed. Please try again.';
        }
      },
      (error: any) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Bad Credentials'; // Handle error accordingly
      }
    );
  }
}
