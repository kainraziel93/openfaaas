import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  user_id = '';
  password = '';
  otp_code = '';
  message = '';
  success = false;

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.login(this.user_id, this.password, this.otp_code).subscribe({
      next: (res: any) => {
        this.message = res.message || 'Authentification réussie';
        this.success = true;
      },
      error: (err) => {
        this.message = err.error?.error || 'Erreur de connexion';
        this.success = false;
      }
    });
  }
}
