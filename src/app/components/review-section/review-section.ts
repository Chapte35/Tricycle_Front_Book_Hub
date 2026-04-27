import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReviewService } from '../../services/review-service';
import { AuthService } from '../../services/auth-service';
import { ReviewResponse } from '../../interfaces/review';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-review-section',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDivider],
  templateUrl: './review-section.html',
})
export class ReviewSectionComponent implements OnInit {

  @Input() bookId!: number;

  private reviewService = inject(ReviewService);
  private authService   = inject(AuthService);
  private fb            = inject(FormBuilder);

  reviews: ReviewResponse[]  = [];
  average: number            = 0;
  editingReview: ReviewResponse | null = null;
  errorMessage: string | null = null;
  showForm = false;

  form = this.fb.group({
    comment: ['', Validators.required],
    rating:  [0,  [Validators.required, Validators.min(1), Validators.max(5)]]
  });

  get isLoggedIn() { return this.authService.isLoggedIn(); }
  get hasOwnReview() { return this.reviews.some(r => r.owner); }

  ngOnInit() {
    this.loadReviews();
    this.loadAverage();
  }

  loadReviews() {
    this.reviewService.getByBook(this.bookId).subscribe({
      next: (data) => this.reviews = data,
      error: () => this.errorMessage = 'Erreur lors du chargement des avis.'
    });
  }

  loadAverage() {
    this.reviewService.getAverage(this.bookId).subscribe({
      next: (data) => this.average = data.average
    });
  }

  startEdit(review: ReviewResponse) {
    this.editingReview = review;
    this.form.patchValue({ comment: review.comment, rating: review.rating });
    this.showForm = true;
  }

  cancelForm() {
    this.editingReview = null;
    this.form.reset({ comment: '', rating: 0 });
    this.showForm = false;
    this.errorMessage = null;
  }

  setRating(value: number) {
    this.form.patchValue({ rating: value });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = {
      comment: this.form.value.comment!,
      rating:  this.form.value.rating!
    };

    if (this.editingReview) {
      this.reviewService.update(this.bookId, this.editingReview.id, payload).subscribe({
        next: () => { this.cancelForm(); this.loadReviews(); this.loadAverage(); },
        error: (err) => this.errorMessage = err?.error?.message ?? 'Erreur.'
      });
    } else {
      this.reviewService.create(this.bookId, payload).subscribe({
        next: () => { this.cancelForm(); this.loadReviews(); this.loadAverage(); },
        error: (err) => this.errorMessage = err?.error?.message ?? 'Erreur.'
      });
    }
  }

  delete(review: ReviewResponse) {
    if (!confirm('Supprimer cet avis ?')) return;
    this.reviewService.delete(this.bookId, review.id).subscribe({
      next: () => { this.loadReviews(); this.loadAverage(); }
    });
  }

  stars(n: number): number[] {
    return Array.from({ length: n });
  }
}