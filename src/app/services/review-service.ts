import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReviewRequest, ReviewResponse } from '../interfaces/review';
import { API_ROUTES } from '../constants/api.constants';

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private http = inject(HttpClient);

  getByBook(bookId: number): Observable<ReviewResponse[]> {
    return this.http.get<ReviewResponse[]>(API_ROUTES.reviews.getByBook(bookId));
  }

  getAverage(bookId: number): Observable<{ average: number }> {
    return this.http.get<{ average: number }>(API_ROUTES.reviews.getAverage(bookId));
  }

  create(bookId: number, data: ReviewRequest): Observable<ReviewResponse> {
    return this.http.post<ReviewResponse>(API_ROUTES.reviews.create(bookId), data);
  }

  update(bookId: number, reviewId: number, data: ReviewRequest): Observable<ReviewResponse> {
    return this.http.put<ReviewResponse>(API_ROUTES.reviews.update(bookId, reviewId), data);
  }

  delete(bookId: number, reviewId: number): Observable<void> {
    return this.http.delete<void>(API_ROUTES.reviews.delete(bookId, reviewId));
  }
}