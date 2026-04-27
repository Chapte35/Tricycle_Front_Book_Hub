import { Etat } from '../enums/etat';

export interface ReservationResponse {
  id: number;
  bookTitle: string;
  bookCover: string;
  reservationDate: string;
  bookState: Etat;
  userId: number;
}