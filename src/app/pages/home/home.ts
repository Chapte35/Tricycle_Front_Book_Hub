import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '../../components/button/button';
import { BookList } from '../../components/book-list/book-list';
import { Book } from '../../interfaces/book';
import { BookService } from '../../services/book-service';

@Component({
  selector: 'app-home',
  imports: [ BookList],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private bookService = inject(BookService);
  books: Book[] = [];

  ngOnInit(): void {
    this.bookService.getAll().subscribe({
      next: (data) => this.books = data,
      error: (err) => console.error('Erreur chargement livres', err)
    });
  }
}