import { Component } from '@angular/core';
import { AuthFormComponent } from '../../components/auth-form/auth-form';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [AuthFormComponent],
  templateUrl: './register.html',
})
export class RegisterComponent {
  constructor(private router: Router) {}

  onRegister(data: any) {
    console.log('DATA:', data);

    // ici plus tard → appel API
    this.router.navigate(['/login']);
  }
}
