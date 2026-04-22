import { Book } from './book';
import { User } from './user';

export interface Review {
  id: number;
  date: Date;
  comment: string;
  rating: number;
  books: Book;
  user: User;
}