import { Component, inject } from '@angular/core';
import { AuthFormComponent } from '../../components/forms/auth-form/auth-form';
import { Router } from '@angular/router';
import { AuthService, LoginRequest } from '../../services/auth-service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthFormComponent],
  templateUrl: './login.html',
})
export class LoginComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  errorMessage : any;

  onLogin(data: LoginRequest) {

    console.log("PARENT RECOIT EVENT", data);
    console.log("ON LOGIN TRIGGERED", data);

    this.authService.login(data).subscribe({
      next: (response) => {

        console.log("SUCCESS");

        this.authService.saveToken(response.token);
        this.authService.saveUser(response);
        this.router.navigate(['/']);
      },
      error: (err: HttpErrorResponse ) => {
        console.log("ERROR:", err);

        this.errorMessage = err.error?.message ?? err.message;
      }
    });
  }
}
