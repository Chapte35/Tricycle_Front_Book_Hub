import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { BookService } from '../../services/book-service';
import { CategoryService } from '../../services/category-service';
import { Book } from '../../interfaces/book';
import { Category } from '../../interfaces/category';
import { Etat } from '../../enums/etat';
import { ImageUploadComponent } from '../../components/image-upload/image-upload';
import { RouterLink } from '@angular/router';
import { SearchBar, SearchFilters } from '../../components/search-bar/search-bar';


@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [CommonModule, SearchBar, ReactiveFormsModule, ImageUploadComponent, RouterLink],
  templateUrl: './home-admin.html',
})
export class HomeAdminComponent implements OnInit {

  private fb              = inject(FormBuilder);
  private bookService     = inject(BookService);
  private categoryService = inject(CategoryService);
  protected readonly etats = Object.values(Etat);

  books: Book[]         = [];
  categories: Category[] = [];
  editingBook: Book | null = null;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  formOpen = false;

  form!: FormGroup;

  ngOnInit() {
    this.buildForm();
    this.loadBooks();
    this.loadCategories();
  }

  onImageUploaded(url: string) {
    this.form.patchValue({ cover: url });
  }

  buildForm(book?: Book) {
    this.form = this.fb.group({
      title:       [book?.title       ?? '', [Validators.required, Validators.minLength(2)]],
      author:      [book?.author      ?? '', [Validators.required, Validators.minLength(2)]],
      description: [book?.description ?? '', Validators.required],
      ISBN:        [book?.ISBN        ?? '', Validators.required],
      cover:       [book?.cover       ?? '', Validators.required],
      categoryId:  [book?.category?.id ?? null, Validators.required],
      state:       [book?.state       ?? Etat.EMPRUNTABLE, Validators.required],
    });
  }

  loadBooks(filters?: SearchFilters) {
    if (!filters || (!filters.query && !filters.categoryId && filters.available === undefined)) {
      this.bookService.getAll().subscribe({
        next: (books) => this.books = books,
        error: () => this.errorMessage = 'Erreur lors du chargement des livres.'
      });
      return;
    }
  
    this.bookService.search(filters.query, filters.categoryId, filters.available, filters.sort).subscribe({
      next: (books) => this.books = books,
      error: () => this.errorMessage = 'Erreur lors du chargement des livres.'
    });
  }
  
  onSearch(filters: SearchFilters): void {
    this.loadBooks(filters);
  }

  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: (cats) => this.categories = cats,
      error: () => this.errorMessage = 'Erreur lors du chargement des catégories.'
    });
  }

  startEdit(book: Book) {
    this.editingBook = book;
    this.buildForm(book);
    this.formOpen = true;
    this.errorMessage = null;
    this.successMessage = null;
  }

  cancelEdit() {
    this.editingBook = null;
    this.buildForm();
    this.errorMessage = null;
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
  
    const { categoryId, ...rest } = this.form.value;
    const payload = {
      ...rest,
      cover: this.form.value.cover || this.editingBook?.cover || '',
      category: { id: categoryId }
    };
  
    if (this.editingBook) {
      this.bookService.update(this.editingBook.id, payload).subscribe({
        next: () => {
          this.successMessage = 'Livre mis à jour.';
          this.editingBook = null;
          this.buildForm();
          this.loadBooks();
        },
        error: (err) => this.errorMessage = err?.error?.message ?? 'Erreur lors de la mise à jour.'
      });
    } else {
      this.bookService.create(payload).subscribe({
        next: () => {
          this.successMessage = 'Livre ajouté.';
          this.buildForm();
          this.loadBooks();
        },
        error: (err) => this.errorMessage = err?.error?.message ?? 'Erreur lors de la création.'
      });
    }
  }

  delete(book: Book) {
    if (!confirm(`Supprimer "${book.title}" ?`)) return;

    this.bookService.delete(book.id).subscribe({
      next: () => {
        this.successMessage = 'Livre supprimé.';
        this.loadBooks();
      },
      error: (err) => this.errorMessage = err?.error?.message ?? 'Erreur lors de la suppression.'
    });
  }
}