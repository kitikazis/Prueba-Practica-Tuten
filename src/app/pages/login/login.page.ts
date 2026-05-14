import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class LoginPage {
  // Datos requeridos por el documento
  loginData = {
    user: 'testapis@tuten.cl',
    pass: '1234',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onLogin() {
    this.authService.login(this.loginData.user, this.loginData.pass).subscribe(
      (response) => {
        if (response.status === 'success' && response.sessionTokenBck) {
          localStorage.setItem('token', response.sessionTokenBck);
          localStorage.setItem('user', response.user);
          console.log('✅ Token guardado con éxito 🔑');
          this.router.navigate(['/home']);
        } else {
          console.error('❌ Login fallido:', response.message);
          alert('Error: ' + response.message);
        }
      },
      (error) => {
        console.error('❌ Error en el login:', error);
        alert('Error de autenticación');
      },
    );
  }
}
