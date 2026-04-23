import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
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
  private router = inject(Router);

  navigateToDetail(): void {
    this.router.navigate(['/books', this.book.id]);
  }

  get badgeColor(): string {
    return this.book.state === Etat.EMPRUNTABLE ? 'primary' : 'warn';
  }

  get badgeLabel(): string {
    const labels: Record<Etat, string> = {
      [Etat.EMPRUNTABLE]: 'Disponible',
      [Etat.RESERVE]: 'Réservé',
      [Etat.EMPRUNTE]: 'Emprunté',
      [Etat.RETARD]: 'En retard',
      [Etat.INDISPONIBLE]: 'Indisponible',
    };
    return labels[this.book.state];
  }
}