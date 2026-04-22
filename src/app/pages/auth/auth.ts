import { Component } from '@angular/core';
import { AuthFormComponent } from '../../components/forms/auth-form/auth-form';
import { Router } from '@angular/router';
import {RegisterFormComponent} from '../../components/forms/register-form/register-form';

@Component({
  selector: 'app-auth',
  imports: [
    RegisterFormComponent,
    AuthFormComponent
  ],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class AuthComponent {
  constructor(private router: Router) {}

  onRegister(data: any) {
    console.log('DATA:', data);

    this.router.navigate(['/login']);
}
}
