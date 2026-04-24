import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../interfaces/book';
import { API_ROUTES } from '../constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private http = inject(HttpClient);

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(API_ROUTES.books.getAll);
  }

  getById(id: number): Observable<Book> {
    return this.http.get<Book>(API_ROUTES.books.getById(id));
  }

  search(query?: string, categoryId?: number, available?: boolean, sort?: string): Observable<Book[]> {
    let params: any = {};
      if (query) params['query'] = query;
      if (categoryId) params['categoryId'] = categoryId;
      if (available !== undefined && available !== null) params['available'] = available;
      if (sort) params['sort'] = sort;
      return this.http.get<Book[]>(API_ROUTES.books.search, { params });
    }

  create(book: Omit<Book, 'id'>): Observable<Book> {
    return this.http.post<Book>(API_ROUTES.books.create, book);
  }

  update(id: number, book: Partial<Book>): Observable<Book> {
    return this.http.put<Book>(API_ROUTES.books.update(id), book);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(API_ROUTES.books.delete(id));
  }
}