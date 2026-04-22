import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../interfaces/review';
import { API_ROUTES } from '../constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private http = inject(HttpClient);

  create(bookId: number, review: Omit<Review, 'id' | 'books' | 'user'>): Observable<Review> {
    return this.http.post<Review>(API_ROUTES.ratings.create(bookId), review);
  }

  update(id: number, review: Partial<Review>): Observable<Review> {
    return this.http.put<Review>(API_ROUTES.ratings.update(id), review);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(API_ROUTES.ratings.delete(id));
  }
}