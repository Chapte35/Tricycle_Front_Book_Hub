import { Component, inject } from '@angular/core';
import { AuthFormComponent } from '../../components/forms/auth-form/auth-form';
import { Router } from '@angular/router';
import { AuthService, LoginRequest } from '../../services/auth-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthFormComponent],
  templateUrl: './login.html',
})
export class LoginComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  onLogin(data: LoginRequest) {
    this.authService.login(data).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        this.authService.saveUser(response);
        this.router.navigate(['/']);
      },
      error: (err: Error) => console.error('Erreur login', err)
    });
  }
}
