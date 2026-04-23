import { Component } from '@angular/core';
import { AuthFormComponent } from '../../components/forms/auth-form/auth-form';
import { Router } from '@angular/router';
import { AuthService, RegisterRequest } from "../../services/auth-service.ts"

@Component({
  selector: 'app-auth',
  imports: [
    AuthFormComponent
  ],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class AuthComponent {
   private router = inject(Router);
   private authService = inject(AuthService);

onRegister(data: RegisterRequest) {

  this.authService.register(data).subscribe({

    next: (response) => {

      this.authService.saveToken(response.token);

      this.router.navigate(['/']);

    },

    error: (err) => console.error('Erreur register', err)

  });

}

}
