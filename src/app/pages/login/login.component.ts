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
  qrCodeBase64 = '';
  message = '';
  success = false;
  step = 1;

  constructor(private authService: AuthService) {}

  verifyCredentials() {
    this.authService.login(this.user_id, this.password, '').subscribe({
      next: (res: any) => {
        this.message = 'Identifiants valides. Veuillez scanner le QR code et entrer votre code OTP.';
        this.qrCodeBase64 = res['qr_code'];
        this.success = true;

        this.step = 2; 
      },
      error: (err) => {
        this.message = err.error?.error || 'Erreur de connexion';
        this.success = false;
      }
    });
  }

  submitOtp() {
    this.authService.login(this.user_id, this.password, this.otp_code).subscribe({
      next: (res: any) => {
        this.message = res.message || 'Authentification réussie';
   
        this.success = true;
      },
      error: (err) => {
        this.message = err.error?.error || 'Échec de la vérification du code OTP';
        this.success = false;
      }
    });
  }
}
