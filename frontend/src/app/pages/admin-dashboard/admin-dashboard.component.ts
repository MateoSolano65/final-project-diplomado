import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ToyService, ToyResponse } from '../../services/toy/toy.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent implements OnInit {
  isLoading = false;
  toys: ToyResponse[] = [];
  searchTerm = '';
  dataSource: ToyResponse[] = [];
  displayedColumns: string[] = ['id', 'image', 'title', 'category', 'createdAt', 'actions'];

  constructor(
    private toyService: ToyService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadToys();
  }

  loadToys(): void {
    this.isLoading = true;
    this.toyService
      .getAllToys()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (toys) => {
          console.log('Toys loaded successfully:', toys);
          this.toys = toys;
          this.dataSource = [...toys];
          this.applyFilter();
        },
        error: (error) => {
          console.error('Error loading toys:', error);
          this.snackBar.open(
            'Error al cargar los juguetes. Por favor, intenta de nuevo.',
            'Cerrar',
            { duration: 5000 }
          );
        },
      });
  }

  applyFilter(): void {
    if (!this.searchTerm.trim()) {
      this.dataSource = [...this.toys];
      return;
    }

    const filterValue = this.searchTerm.toLowerCase();
    this.dataSource = this.toys.filter(
      (toy) =>
        toy.title.toLowerCase().includes(filterValue) ||
        toy.description.toLowerCase().includes(filterValue)
    );
  }

  onDelete(toy: ToyResponse): void {
    // Implementation will be added later
    console.log('Delete toy', toy);
  }
}
