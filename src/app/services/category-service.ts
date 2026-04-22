import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category';
import { API_ROUTES } from '../constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(API_ROUTES.categories.getAll);
  }

  getById(id: number): Observable<Category> {
    return this.http.get<Category>(API_ROUTES.categories.getById(id));
  }

  create(category: Omit<Category, 'id'>): Observable<Category> {
    return this.http.post<Category>(API_ROUTES.categories.create, category);
  }

  update(id: number, category: Partial<Category>): Observable<Category> {
    return this.http.put<Category>(API_ROUTES.categories.update(id), category);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(API_ROUTES.categories.delete(id));
  }
}