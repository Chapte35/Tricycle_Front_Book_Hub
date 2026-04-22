import { Component, Input } from '@angular/core';
import { BookCard } from '../book-card/book-card';
import { Book } from '../../interfaces/book';

@Component({
  selector: 'app-book-list',
  imports: [BookCard],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
})
export class BookList {
  @Input({ required: true }) books!: Book[];
}