import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service'; 
import { User } from '../user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  user: User = { username: '', email: '', password: '' };
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  signUp(): void {
    if (!this.user.username || !this.user.email || !this.user.password) {
      this.errorMessage = 'Please fill out all fields.';
      return;
    }
  
    this.userService.signUp(this.user).subscribe(
      response => {
        this.successMessage = 'Sign up successful! Please log in.';
        this.errorMessage = '';
        this.resetForm();
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error => {
        this.errorMessage = error.error || 'Error signing up. Please try again.'; // More specific error handling
        this.successMessage = '';
        console.error('Sign up error: ', error);
      }
    );
  }
  

  resetForm(): void {
    this.user = { username: '', email: '', password: '' };
  }
}
