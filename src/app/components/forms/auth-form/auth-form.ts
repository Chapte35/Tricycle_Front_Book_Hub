import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from '../../button/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Button],
  templateUrl: './auth-form.html',
})
export class AuthFormComponent {
  private fb = inject(FormBuilder);

  @Input() mode: 'register' | 'login' = 'register';
  @Output() formSubmit = new EventEmitter<any>();

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  submit() {
    if (this.form.invalid) return;
    this.formSubmit.emit(this.form.value);
  }
}

export class AuthForm {
}
