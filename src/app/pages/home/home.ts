import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookList } from '../../components/book-list/book-list';
import { Book } from '../../interfaces/book';
import { Etat } from '../../enums/etat';

@Component({
  selector: 'app-home',
  imports: [BookList],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  books: Book[] = [
    {
      id: 1,
      title: 'Clean Code',
      author: 'Robert C. Martin',
      description: '',
      ISBN: '9780132350884',
      cover: 'https://m.media-amazon.com/images/I/41xShlnTZTL.jpg',
      isAvailable: true,
      state: Etat.DISPO,
      category: { id: 1, libelle: 'Informatique' }
    },
    {
      id: 2,
      title: 'Berk',
      author: 'Deubz C. Crotez',
      description: '',
      ISBN: '9780132456884',
      cover: 'https://m.media-amazon.com/images/I/41xShlnTZTL.jpg',
      isAvailable: true,
      state: Etat.EMPRUNTE,
      category: { id: 1, libelle: 'Informatique' }
    }
  ];
}