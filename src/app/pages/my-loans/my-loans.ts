import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { Loan } from '../../interfaces/loan';
import { LoanService } from '../../services/loan-service';


@Component({
  selector: 'app-myloans',
  imports: [CommonModule,
    MatTableModule,
    MatPaginator],
  templateUrl: './my-loans.html',
  styleUrl: './my-loans.css',
})

export class Myloans implements OnInit, AfterViewInit{

    private loanService = inject(LoanService);

  // mettre les ng-cintainer de mes colonnes ici
  displayedColumns: string[] = ['title', 'author', 'loanDate', 'returnDate']
  dataSource = new MatTableDataSource<Loan>();

  @ViewChild(MatPaginator) paginator!: MatPaginator

  ngOnInit(): void {      
    this.loanService.getAll().subscribe({
      next: (data) => this.dataSource.data = data,
      error: (err) => console.error('Erreur chargement des emprunts', err)
    });
  }

  ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
}

}
