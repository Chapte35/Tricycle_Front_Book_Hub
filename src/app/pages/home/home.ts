import { Component, inject, OnInit } from '@angular/core';
import { BookList } from '../../components/book-list/book-list';
import { Book } from '../../interfaces/book';
import { BookService } from '../../services/book-service';
import { SearchFilters, SearchBar } from '../../components/search-bar/search-bar';

@Component({
  selector: 'app-home',
  imports: [ BookList, SearchBar],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private bookService = inject(BookService);
  books: Book[] = [];

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.bookService.getAll().subscribe({
      next: (data) => this.books = data,
      error: (err) => console.error(err)
    });
  }

  onSearch(filters: SearchFilters): void {
    if (!filters.query && !filters.categoryId && filters.available === undefined) {
      this.loadAll();
      return;
    }
    this.bookService.search(filters.query, filters.categoryId, filters.available, filters.sort).subscribe({
      next: (data) => this.books = data,
      error: (err) => console.error(err)
    });
  }
}