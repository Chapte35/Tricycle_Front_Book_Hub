import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../../services/reservation-service';
import { ReservationResponse } from '../../interfaces/reservation';

@Component({
  selector: 'app-reservation-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservation-button.html',
})
export class ReservationButtonComponent {

  @Input() bookId!: number;
  @Output() reserved = new EventEmitter<ReservationResponse>();

  private reservationService = inject(ReservationService);

  isLoading = false;
  errorMessage: string | null = null;
  success: ReservationResponse | null = null;

  reserve() {
    this.isLoading = true;
    this.errorMessage = null;

    this.reservationService.create(this.bookId).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.success = res;
        this.reserved.emit(res);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err?.error?.message ?? 'Erreur lors de la réservation.';
      }
    });
  }
}