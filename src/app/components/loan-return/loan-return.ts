import { Component, Input, OnInit, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanService } from '../../services/loan-service';
import { Loan } from '../../interfaces/loan';
import { LoanResponse } from '../../interfaces/loan';

@Component({
  selector: 'app-loan-return',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loan-return.html',
})
export class LoanReturnComponent implements OnInit {

  @Input() bookId!: number;
  @Output() loanReturned = new EventEmitter<void>();

  private loanService = inject(LoanService);

  activeLoan: LoanResponse | null = null;
  errorMessage: string | null = null;
  isLoading = false;

  ngOnInit() {
    this.loanService.getActiveByBook(this.bookId).subscribe({
      next: (loan) => this.activeLoan = loan,
      error: () => this.errorMessage = 'Impossible de charger l\'emprunt actif.'
    });
  }

  return() {
    if (!this.activeLoan) return;
    this.isLoading = true;

    this.loanService.return(this.activeLoan.id).subscribe({
      next: () => {
        this.isLoading = false;
        this.loanReturned.emit();
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err?.error?.message ?? 'Une erreur est survenue.';
      }
    });
  }
}