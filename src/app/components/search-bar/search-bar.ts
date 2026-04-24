import { Component, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Category } from '../../interfaces/category';
import { CategoryService } from '../../services/category-service';
import { CommonModule } from '@angular/common';

export interface SearchFilters {
  query?: string;
  categoryId?: number;
  available?: boolean;
  sort?: string;
}

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './search-bar.html',
})
export class SearchBar implements OnInit {
  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);

  @Output() search = new EventEmitter<SearchFilters>();

  categories: Category[] = [];

  form: FormGroup = this.fb.group({
    query:      [''],
    categoryId: [null],
    available:  [null],
    sort:       ['title'],
  });

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(cats => this.categories = cats);
  }

  onSearch(): void {
    const val = this.form.value;
    this.search.emit({
      query:      val.query      || undefined,
      categoryId: val.categoryId || undefined,
      available:  val.available === 'true' ? true : val.available === 'false' ? false : undefined,
      sort:       val.sort       || 'title',
    });
  }

  onReset(): void {
    this.form.reset({ query: '', categoryId: null, available: null, sort: 'title' });
    this.search.emit({});
  }
}