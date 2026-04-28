import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../../services/reservation-service';
import { ReservationResponse } from '../../interfaces/reservation';
import { Etat } from '../../enums/etat';
import { MatIconModule } from '@angular/material/icon';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-my-reservations',
  standalone: true,
  imports: [CommonModule, NgClass, MatIconModule],
  templateUrl: './my-reservations.html',
})
export class MyReservationsComponent implements OnInit {

  private reservationService = inject(ReservationService);

  reservations: ReservationResponse[] = [];
  errorMessage: string | null = null;
  protected readonly Etat = Etat;

  ngOnInit() {
    this.load();
  }

  load() {
    this.reservationService.getMy().subscribe({
      next: (data) => this.reservations = data,
      error: () => this.errorMessage = 'Erreur lors du chargement des réservations.'
    });
  }

  cancel(id: number) {
    if (!confirm('Annuler cette réservation ?')) return;
    this.reservationService.cancel(id).subscribe({
      next: () => this.load(),
      error: (err) => this.errorMessage = err?.error?.message ?? 'Erreur lors de l\'annulation.'
    });
  }

  getBadgeClass(state: Etat): string {
    const classes: Partial<Record<Etat, string>> = {
      [Etat.EMPRUNTABLE]:  'badge-green',
      [Etat.EMPRUNTE]:     'badge-blue',
      [Etat.RESERVE]:      'badge-yellow',
      [Etat.RETARD]:       'badge-red',
      [Etat.INDISPONIBLE]: 'badge-grey',
    };
    return classes[state] ?? '';
  }

  getStateLabel(state: Etat): string {
    const labels: Record<Etat, string> = {
      [Etat.EMPRUNTABLE]:  'Disponible — venez le chercher !',
      [Etat.EMPRUNTE]:     'En cours d\'emprunt',
      [Etat.RESERVE]:      'Réservé par quelqu\'un d\'autre',
      [Etat.RETARD]:       'En retard de retour',
      [Etat.INDISPONIBLE]: 'Indisponible',
    };
    return labels[state] ?? state;
  }
}