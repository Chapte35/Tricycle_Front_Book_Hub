import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Loan } from '../interfaces/loan';
import { LoanRequest, LoanResponse } from './../interfaces/loan';
import { API_ROUTES } from '../constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  private http = inject(HttpClient);

  createLoan(data: LoanRequest): Observable<LoanResponse> {
    return this.http.post<LoanResponse>(API_ROUTES.loans.create, data);
  }

  create(bookId: number, userId: number): Observable<Loan> {
    return this.http.post<Loan>(API_ROUTES.loans.create, { bookId, userId });
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

  getActiveByBook(bookId: number): Observable<LoanResponse> {
    return this.http.get<LoanResponse>(API_ROUTES.loans.getActiveByBook(bookId));
  }
}