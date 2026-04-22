import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { API_ROUTES } from '../constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(API_ROUTES.users.getAll);
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(API_ROUTES.users.getById(id));
  }

  update(id: number, user: Partial<User>): Observable<User> {
    return this.http.put<User>(API_ROUTES.users.update(id), user);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(API_ROUTES.users.delete(id));
  }
}