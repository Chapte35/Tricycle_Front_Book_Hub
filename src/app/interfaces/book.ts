import { Category } from './category';
import { Etat } from '../enums/etat';

export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  ISBN: string;
  cover: string;
  isAvailable: boolean;
  state: Etat;
  category: Category;
}

export interface BookFormData {
  title: string;
  author: string;
  description: string;
  ISBN: string;
  cover: string;
  categoryId: number;
}