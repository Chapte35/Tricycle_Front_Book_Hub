import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { Book } from '../../interfaces/book';
import { Etat } from '../../enums/etat';

@Component({
  selector: 'app-book-card',
  imports: [MatCardModule, MatChipsModule],
  templateUrl: './book-card.html',
  styleUrl: './book-card.css',
})
export class BookCard {
  @Input({ required: true }) book!: Book;

  get badgeColor(): string {
    return this.book.state === Etat.DISPO ? 'primary' : 'warn';
  }

  get badgeLabel(): string {
    const labels: Record<Etat, string> = {
      [Etat.DISPO]: 'Disponible',
      [Etat.RESERVE]: 'Réservé',
      [Etat.EMPRUNTE]: 'Emprunté',
      [Etat.RETARD]: 'En retard',
    };
    return labels[this.book.state];
  }
}