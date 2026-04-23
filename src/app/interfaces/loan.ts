import { Book } from './book';
import { User } from './user';
import { Statut } from '../enums/statut';

export interface Loan {
  id: number;
  loanDate: Date;
  returnDate?: Date;
  status: Statut;
  books: Book;
  user: User;
}

export interface LoanRequest {
  bookId: number;
  userId: number;
}

export interface LoanResponse {
  id: number;
  bookTitle: string;
  userEmail: string;
  loanDate: string;
  returnDate: string;
  status: Statut;
}