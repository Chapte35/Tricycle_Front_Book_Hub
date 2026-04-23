import { Component, EventEmitter, Input, Output, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './auth-form.html',
})
export class AuthFormComponent implements OnInit {

  private fb = inject(FormBuilder);

  @Input() mode: 'register' | 'login' = 'register';
  @Output() formSubmit = new EventEmitter<any>();

  form!: FormGroup;

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
        phone: ['']
      });
    } else {
      this.form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
      });
    }
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.mode === 'register') {
      const { password, confirmPassword } = this.form.value;
      if (password !== confirmPassword) {
        this.form.get('confirmPassword')?.setErrors({ mismatch: true });
        return;
      }
    }

    this.formSubmit.emit(this.form.value);
  }
}
