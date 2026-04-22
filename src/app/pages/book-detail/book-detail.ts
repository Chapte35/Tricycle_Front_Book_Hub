import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { BookService } from '../../services/book-service';
import { AuthService } from '../../services/auth-service';
import { Book } from '../../interfaces/book';
import { Etat } from '../../enums/etat';

@Component({
  selector: 'app-book-detail',
  imports: [MatCardModule, MatChipsModule, MatButtonModule, MatDividerModule, MatDialogModule],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.css',
})
export class BookDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private bookService = inject(BookService);
  protected authService = inject(AuthService);

  book?: Book;

  get badgeLabel(): string {
    const labels: Record<Etat, string> = {
      [Etat.EMPRUNTABLE]: 'Disponible',
      [Etat.RESERVE]: 'Réservé',
      [Etat.EMPRUNTE]: 'Emprunté',
      [Etat.RETARD]: 'En retard',
      [Etat.INDISPONIBLE]: 'Indisponible',
    };
    return this.book ? labels[this.book.state] : '';
  }

  get badgeColor(): string {
    return this.book?.state === Etat.EMPRUNTABLE ? 'primary' : 'warn';
  }

  get canReserve(): boolean {
    return this.authService.isLoggedIn() && this.book?.state === Etat.EMPRUNTABLE;
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.bookService.getById(id).subscribe({
      next: (data) => this.book = data,
      error: (err) => console.error('Erreur chargement livre', err)
    });
  }

  onReserve(): void {
    // on branchera la réservation quand le back sera prêt
    console.log('Réserver le livre', this.book?.id);
  }
}