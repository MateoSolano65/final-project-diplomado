import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToyService, ToyResponse } from '../../services/toy/toy.service';
import { finalize } from 'rxjs/operators';
import { ImageService } from '../../services/utils/image.service';

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
    public imageService: ImageService
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
    if (confirm(`¿Estás seguro de eliminar el juguete "${toy.title}"?`)) {
      this.toyService.deleteToy(toy._id).subscribe({
        next: () => {
          this.toys = this.toys.filter(t => t._id !== toy._id);
          this.dataSource = this.dataSource.filter(t => t._id !== toy._id);
          this.snackBar.open('Juguete eliminado con éxito', 'Cerrar', {
            duration: 3000
          });
        },
        error: (error) => {
          console.error('Error al eliminar juguete:', error);
          this.snackBar.open('Error al eliminar el juguete', 'Cerrar', {
            duration: 3000
          });
        }
      });
    }
  }
}
