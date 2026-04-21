import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from '../../button/button';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Button],
  templateUrl: './register-form.html',
})
export class RegisterFormComponent {
  private fb = inject(FormBuilder);

  @Input() mode: 'register' | 'login' = 'register';
  @Output() formSubmit = new EventEmitter<any>();

  form = this.fb.group({
    firstName: [''],
    lastName: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: []
  });

  ngOnInit() {
    if (this.mode === 'register') {
      this.form.get('firstName')?.setValidators(Validators.required);
      this.form.get('lastName')?.setValidators(Validators.required);
      this.form.get('confirmPassword')?.setValidators(Validators.required);
    } else {
      this.form.get('firstName')?.clearValidators();
      this.form.get('lastName')?.clearValidators();
    }

    this.form.updateValueAndValidity();
  }

  submit() {
    if (this.form.invalid) return;

    if (this.mode === 'register') {
      const password = this.form.value.password;
      const confirm = this.form.value.confirmPassword;

      if (password !== confirm) {
        console.log('Passwords do not match');
        return;
      }
    }

    this.formSubmit.emit(this.form.value);
  }
}
