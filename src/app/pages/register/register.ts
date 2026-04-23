import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, RegisterRequest } from '../../services/auth-service';
import { AuthFormComponent } from '../../components/forms/auth-form/auth-form';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [AuthFormComponent],
  templateUrl: './register.html',
})
export class RegisterComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  onRegister(data: RegisterRequest) {
    console.log("register qui onRegister");
    
    this.authService.register(data).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        this.authService.saveUser(response);
        this.router.navigate(['/']);
      },
      error: (err: Error) => console.error('Erreur register', err)
    });
  }
}
