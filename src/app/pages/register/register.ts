import { Component } from '@angular/core';
import { RegisterFormComponent } from '../../components/forms/register-form/register-form';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RegisterFormComponent],
  templateUrl: './register.html',
})
export class RegisterComponent {
  constructor(private router: Router) {}

  onRegister(data: any) {
    console.log('DATA:', data);

    this.router.navigate(['/register']);
  }
}
