import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { API_ROUTES } from '../constants/api.constants';

export interface UserSummary {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

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
export class UserService {
  private http = inject(HttpClient);

  getAll(): Observable<UserSummary[]> {
    return this.http.get<UserSummary[]>(API_ROUTES.users.getAll);
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(API_ROUTES.users.getById(id));
  }

  update(id: number, user: Partial<User>): Observable<User> {
    return this.http.put<User>(API_ROUTES.users.update(id), user);
  }

  updateProfile(id: number, data: UpdateProfileRequest): Observable<User> {
      return this.update(id, data);
    }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(API_ROUTES.users.delete(id));
  }
}