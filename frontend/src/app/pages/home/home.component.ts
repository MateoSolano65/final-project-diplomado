import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToyService, ToyResponse } from '../../services/toy/toy.service';
import { AuthService } from '../../services/user/auth.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  toys: ToyResponse[] = [];
  filteredToys: ToyResponse[] = [];
  isLoading = true;
  searchTerm = '';
  isLoggedIn = false;
  isAdmin = false;

  constructor(
    private toyService: ToyService, 
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadToys();
    this.checkAuthStatus();
  }

  checkAuthStatus(): void {
    this.authService.authStatus$.subscribe(isAuthenticated => {
      this.isLoggedIn = isAuthenticated;
      if (this.isLoggedIn) {
        const userData = this.authService.getUserSession();
        this.isAdmin = userData?.user?.role === 'admin';
      } else {
        this.isAdmin = false;
      }
    });
  }

  loadToys(): void {
    this.isLoading = true;
    this.toyService.getAllToys().subscribe({
      next: (toys) => {
        this.toys = toys;
        this.applyFilter();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error cargando juguetes', error);
        this.snackBar.open('Error al cargar los juguetes', 'Cerrar', {
          duration: 3000,
        });
        this.isLoading = false;
      },
    });
  }

  applyFilter(): void {
    if (!this.searchTerm.trim()) {
      this.filteredToys = [...this.toys];
      return;
    }

    const search = this.searchTerm.toLowerCase().trim();
    this.filteredToys = this.toys.filter(
      (toy) =>
        toy.title.toLowerCase().includes(search) ||
        toy.description.toLowerCase().includes(search)
    );
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.applyFilter();
  }

  onVote(toyId: string): void {
    // Esta función tendrá que implementarse cuando tengas el endpoint correspondiente
    console.log('Votando por el juguete:', toyId);
    this.snackBar.open('Funcionalidad de votación pendiente de implementar', 'Cerrar', {
      duration: 2000
    });
  }

  onDelete(toyId: string): void {
    if (!this.isAdmin) {
      this.snackBar.open('No tienes permisos para eliminar juguetes', 'Cerrar', {
        duration: 3000
      });
      return;
    }

    this.toyService.deleteToy(toyId).subscribe({
      next: () => {
        this.toys = this.toys.filter(t => t._id !== toyId);
        this.applyFilter();
        this.snackBar.open('Juguete eliminado correctamente', 'Cerrar', {
          duration: 2000
        });
      },
      error: (error) => {
        console.error('Error al eliminar juguete', error);
        this.snackBar.open('Error al eliminar el juguete', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }
}
