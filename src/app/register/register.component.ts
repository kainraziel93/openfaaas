import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  user_id = '';
  password = '';               
  qrCodeBase64 = '';
  message = '';
  success = false;

  constructor(private authService: AuthService) {}

  onRegister() {
    this.message = '';
    this.success = false;
    this.qrCodeBase64 = '';
    this.password = '';

    this.authService.register({ user_id: this.user_id }).subscribe({
      next: (res: any) => {
        this.password = res.password;
        this.message = 'Compte créé avec succès. Génération du QR Code...';
        this.qrCodeBase64 = res['qr_code_base64'];
        this.authService.setupTwoFA({ user_id: this.user_id }).subscribe({
          next: (res: any) => {
            this.success = true;
            this.message = 'Inscription complète. Scannez le QR code.';
          },
          error: (err) => {
            this.message = err.error?.error || 'Erreur QR code';
          }
        });
      },
      error: (err) => {
        this.message = err.error?.error || 'Erreur lors de l’inscription.';
        this.success = false;
      }
    });
  }
}
