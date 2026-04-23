import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.html',
})
export class ProfileComponent {

  private fb = inject(FormBuilder);

  @Output() save = new EventEmitter<Partial<User>>();

  profileForm: FormGroup = this.fb.group({
    firstName: [''],
    lastName: [''],
    phone: [''],
    email: [{ value: '', disabled: true }]
  });

  @Input() set user(value: User | null) {
    if (value) {
      this.profileForm.patchValue({
        firstName: value.firstName,
        lastName: value.lastName,
        phone: value.phone,
        email: value.email
      });
    }
  }

  updateProfile() {
    if (this.profileForm.valid) {
      this.save.emit(this.profileForm.getRawValue());
    }
  }
}