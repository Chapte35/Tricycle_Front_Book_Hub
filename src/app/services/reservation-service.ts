import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReservationResponse } from '../interfaces/reservation';
import { API_ROUTES } from '../constants/api.constants';

@Injectable({ providedIn: 'root' })
export class ReservationService {
  private http = inject(HttpClient);

  create(bookId: number): Observable<ReservationResponse> {
    return this.http.post<ReservationResponse>(API_ROUTES.reservations.create(bookId), {});
  }

  getMy(): Observable<ReservationResponse[]> {
    return this.http.get<ReservationResponse[]>(API_ROUTES.reservations.getMy);
  }

  cancel(id: number): Observable<void> {
    return this.http.delete<void>(API_ROUTES.reservations.delete(id));
  }
}