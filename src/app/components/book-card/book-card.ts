import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { Book } from '../../interfaces/book';
import { Etat } from '../../enums/etat';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-book-card',
  imports: [MatCardModule, MatChipsModule, NgClass],
  templateUrl: './book-card.html',
  styleUrl: './book-card.css',
})
export class BookCard {
  @Input({ required: true }) book!: Book;
  private router = inject(Router);

  navigateToDetail(): void {
    this.router.navigate(['/books', this.book.id]);
  }

  get badgeClass(): string {
    const classes: Partial<Record<Etat, string>> = {
      [Etat.EMPRUNTABLE]:  'badge-green',
      [Etat.EMPRUNTE]:     'badge-blue',
      [Etat.RESERVE]:      'badge-yellow',
      [Etat.RETARD]:       'badge-red',
      [Etat.INDISPONIBLE]: 'badge-grey',
    };
    return classes[this.book!.state] ?? '';
  }

  get badgeLabel(): string {
    const labels: Record<Etat, string> = {
      [Etat.EMPRUNTABLE]: 'Disponible',
      [Etat.RESERVE]: 'Réservé',
      [Etat.EMPRUNTE]: 'Emprunté',
      [Etat.RETARD]: 'En retard',
      [Etat.INDISPONIBLE]: 'Consultable sur place',
    };
    return labels[this.book.state];
  }
}