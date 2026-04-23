
import { Component, Input, OnInit, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoanService } from '../../services/loan-service'; 
import { UserService, UserSummary } from './../../services/user-service';
import { LoanResponse } from '../../interfaces/loan'; 

@Component({
  selector: 'app-loan-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './loan-form.html',
})
export class LoanFormComponent implements OnInit {

  @Input() bookId!: number;
  @Output() loanCreated = new EventEmitter<LoanResponse>();

  private fb         = inject(FormBuilder);
  private loanService = inject(LoanService);
  private userService = inject(UserService);

  users: UserSummary[] = [];
  filteredUsers: UserSummary[] = [];
  errorMessage: string | null = null;
  successLoan: LoanResponse | null = null;

  form = this.fb.group({
    userId:     [null as number | null, Validators.required],
    userSearch: ['']
  });

  ngOnInit() {
    this.userService.getAll().subscribe({
      next: (users) => {
        this.users = users;
        this.filteredUsers = users;
      },
      error: () => this.errorMessage = 'Impossible de charger les utilisateurs.'
    });

    // Filtre textuel sur la liste
    this.form.get('userSearch')!.valueChanges.subscribe((search) => {
      const term = (search ?? '').toLowerCase();
      this.filteredUsers = this.users.filter(u =>
        `${u.firstName} ${u.lastName} ${u.email}`.toLowerCase().includes(term)
      );
    });
  }

  selectUser(user: UserSummary) {
    this.form.patchValue({
      userId: user.id,
      userSearch: `${user.firstName} ${user.lastName} (${user.email})`
    });
    this.filteredUsers = [];
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.errorMessage = null;
    this.successLoan  = null;

    this.loanService.createLoan({
      bookId: this.bookId,
      userId: this.form.value.userId!
    }).subscribe({
      next: (loan) => {
        this.successLoan = loan;
        this.loanCreated.emit(loan);
        this.form.reset();
      },
      error: (err) => {
        this.errorMessage = err?.error?.message ?? 'Une erreur est survenue.';
      }
    });
  }
}