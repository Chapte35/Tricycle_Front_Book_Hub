import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { BookService } from '../../services/book-service';
import { CategoryService } from '../../services/category-service';
import { Book } from '../../interfaces/book';
import { Category } from '../../interfaces/category';
import { Etat } from '../../enums/etat';
import { ImageUploadComponent } from '../../components/image-upload/image-upload';

@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ImageUploadComponent],
  templateUrl: './home-admin.html',
})
export class HomeAdminComponent implements OnInit {

  private fb              = inject(FormBuilder);
  private bookService     = inject(BookService);
  private categoryService = inject(CategoryService);

  books: Book[]         = [];
  categories: Category[] = [];
  editingBook: Book | null = null;
  errorMessage: string | null = null;
  successMessage: string | null = null;

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
    });
  }

  loadBooks() {
    this.bookService.getAll().subscribe({
      next: (books) => this.books = books,
      error: () => this.errorMessage = 'Erreur lors du chargement des livres.'
    });
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