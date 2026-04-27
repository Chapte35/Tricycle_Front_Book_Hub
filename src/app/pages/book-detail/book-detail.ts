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
import { LoanFormComponent } from '../../components/loan-form/loan-form';
import { LoanResponse } from '../../interfaces/loan';
import { LoanReturnComponent } from '../../components/loan-return/loan-return';
import { ReservationButtonComponent } from '../../components/reservation-button/reservation-button';
import { ReservationResponse } from '../../interfaces/reservation';
import { NgClass } from '@angular/common';
import { ReviewSectionComponent } from '../../components/review-section/review-section';

@Component({
  selector: 'app-book-detail',
  imports: [LoanReturnComponent, ReviewSectionComponent, NgClass, ReservationButtonComponent, MatCardModule, MatChipsModule, MatButtonModule, MatDividerModule, MatDialogModule, LoanFormComponent],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.css',
})
export class BookDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private bookService = inject(BookService);
  protected authService = inject(AuthService);
  protected readonly Etat = Etat;

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

  get badgeClass(): string {
    const classes: Partial<Record<Etat, string>> = {
      [Etat.EMPRUNTABLE]:  'badge-green',
      [Etat.EMPRUNTE]:     'badge-blue',
      [Etat.RESERVE]:      'badge-yellow',
      [Etat.RETARD]:       'badge-red',
      [Etat.INDISPONIBLE]: 'badge-grey',
    };
    return this.book ? (classes[this.book.state] ?? '') : '';
  }

  onReserved(reservation: ReservationResponse): void {
    if (this.book) {
      this.book.state = Etat.RESERVE;
      this.book.isAvailable = false;
    }
  }

  onLoanCreated(loan: LoanResponse): void {
    if (this.book) {
      this.book.state = Etat.EMPRUNTE;
      this.book.isAvailable = false;
    }
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.bookService.getById(id).subscribe({
      next: (data) => this.book = data,
      error: (err) => console.error('Erreur chargement livre', err)
    });
  }

  onLoanReturned(): void {
    if (this.book) {
      this.book.state = Etat.EMPRUNTABLE;
      this.book.isAvailable = true;
    }
  }
}