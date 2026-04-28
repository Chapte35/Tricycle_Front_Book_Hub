import { ErrorMessages } from './../../../../../node_modules/zod-to-json-schema/dist/types/errorMessages.d';
import { Component, EventEmitter, Input, Output, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './auth-form.html',
})
export class AuthFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  @Input() mode: 'register' | 'login' = 'register';
  @Input() errorMessage: string | null = null;
  @Output() formSubmit = new EventEmitter<any>();

  form!: FormGroup;
  formError: string | null = null;

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    if (this.mode === 'register') {
      this.form = this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
        phone: [''],
      });
    } else {
      this.form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
      });
    }
  }

  submit() {
    console.log('SUBMIT CLICKED');
    // RESET
    this.formError = null;
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      if (this.form.get('email')?.invalid) {
        this.formError = 'Email invalide.';
      } else if (this.form.get('password')?.invalid) {
        this.formError = 'Mot de passe invalide (8 caractères minimum).';
      } else {
        this.formError = 'Veuillez corriger le formulaire.';
      }
      return;
    }

    if (this.mode === 'register') {
      const { password, confirmPassword } = this.form.value;
      if (password !== confirmPassword) {
        this.form.get('confirmPassword')?.setErrors({ mismatch: true });
        return;
      }
      console.log('FORM VALUE', this.form.value);
    }
    console.log('FORM VALID → EMIT');

    this.formSubmit.emit(this.form.value);
  }
}
