import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Loan } from '../../interfaces/loan';
import { LoanService } from '../../services/loan-service';

@Component({
  selector: 'app-myloans',
  imports: [CommonModule, FormsModule],
  templateUrl: './my-loans.html',
  styleUrl: './my-loans.css',
})
export class Myloans implements OnInit {

  private loanService = inject(LoanService);

  loans: Loan[] = [];

  // Pagination
  pageSize: number = 5;
  pageSizeOptions: number[] = [5, 10, 25];
  currentPage: number = 1;

  // Tri
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  ngOnInit(): void {
    this.loanService.getAll().subscribe({
      next: (data) => this.loans = data,
      error: (err) => console.error('Erreur chargement des emprunts', err)
    });
  }

  get totalPages(): number {
    return Math.ceil(this.filteredLoans.length / this.pageSize);
  }

get filteredLoans(): Loan[] {   
  if (!this.sortColumn) return this.loans;   
  return [...this.loans].sort((a, b) => {     
    const getVal = (loan: Loan): string => {       
      if (this.sortColumn === 'title') 
        return loan.books.title ?? '';       
      if (this.sortColumn === 'author') 
        return `${loan.user.firstName} ${loan.user.lastName}`;       
      if (this.sortColumn === 'loanDate') 
        return loan.loanDate?.toString() ?? '';       
      if (this.sortColumn === 'returnDate') 
        return loan.returnDate?.toString() ?? '';       
      return '';     };     
      return this.sortDirection === 'asc'       
      ? getVal(a).localeCompare(getVal(b))       
      : getVal(b).localeCompare(getVal(a));   
    }); 
  }

  get pagedLoans(): Loan[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredLoans.slice(start, start + this.pageSize);
  }

  sort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.currentPage = 1;
  }

  onPageSizeChange(): void {
    this.currentPage = 1;
  }
}