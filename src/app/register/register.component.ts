import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  user = { user_id: '' };
  registrationResult: any;

  constructor(private authService: AuthService) {}

  onRegister() {
    this.authService.register(this.user).subscribe({
      next: (res) => {
        this.registrationResult = res;
      },
      error: (err) => {
        alert(err.error?.error || 'Registration failed');
      }
    });
  }
}
