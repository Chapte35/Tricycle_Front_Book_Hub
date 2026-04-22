import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Loan } from '../interfaces/loan';
import { API_ROUTES } from '../constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  private http = inject(HttpClient);

  create(bookId: number): Observable<Loan> {
    return this.http.post<Loan>(API_ROUTES.loans.create, { bookId });
  }

  getMy(): Observable<Loan[]> {
    return this.http.get<Loan[]>(API_ROUTES.loans.getMy);
  }

  getAll(): Observable<Loan[]> {
    return this.http.get<Loan[]>(API_ROUTES.loans.getAll);
  }

  return(id: number): Observable<Loan> {
    return this.http.put<Loan>(API_ROUTES.loans.return(id), {});
  }
}