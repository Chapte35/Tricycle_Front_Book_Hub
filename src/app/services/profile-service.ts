import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { UserService } from './user-service';

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private userService = inject(UserService);

  getUser(id: number): Observable<User> {
    return this.userService.getById(id);
  }

  updateProfile(id: number, data: UpdateProfileRequest): Observable<User> {
    return this.userService.update(id, data);
  }

  deleteAccount(id: number): Observable<void> {
    return this.userService.delete(id);
  }
}