import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChangePasswordRequest } from '../../../services/user-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css',
})
export class ChangePasswordComponent {
  private fb = inject(FormBuilder)

  @Output() save = new EventEmitter<ChangePasswordRequest>();

  passwordForm: FormGroup = this.fb.group({

    currentPassword:['', Validators.required],
    newPassword: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });

  get passwordUnMatch(): boolean {
    return this.passwordForm.value.newPassword !== this.passwordForm.value.confirmPassword
  }

  submit() {
    if (this.passwordForm.valid && !this.passwordUnMatch) {
      this.save.emit({
        currentPassword: this.passwordForm.value.currentPassword,
        newPassword: this.passwordForm.value.newPassword,
      });
    }
  }
}
