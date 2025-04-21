import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToyService, ToyResponse } from '../../services/toy/toy.service';
import { ImageService } from '../../services/utils/image.service';
import { AuthService } from '../../services/user/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-toy-details',
  standalone: false,
  templateUrl: './toy-details.component.html',
  styleUrls: ['./toy-details.component.scss'],
})
export class ToyDetailsComponent implements OnInit, AfterViewInit {
  toy: ToyResponse | null = null;
  isLoading = true;
  isLoggedIn = false;
  isAdmin = false;
  currentImageIndex = 0;
  allImages: string[] = [];

  @ViewChild('commentsSection') commentsSection: ElementRef | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toyService: ToyService,
    private snackBar: MatSnackBar,
    public imageService: ImageService,
    private authService: AuthService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.checkAuthStatus();

    const toyId = this.route.snapshot.paramMap.get('id');
    if (toyId) {
      this.loadToyDetails(toyId);
    } else {
      this.snackBar.open('ID de juguete no encontrado', 'Cerrar', {
        duration: 3000,
      });
      this.router.navigate(['/']);
    }

    // Verificar si debemos hacer scroll a los comentarios
    this.route.fragment.subscribe((fragment) => {
      if (fragment === 'comments') {
        // Scroll a los comentarios después de que los datos se hayan cargado
        setTimeout(() => this.scrollToComments(), 300);
      }
    });
  }

  ngAfterViewInit(): void {
    // Verificar si debemos hacer scroll a los comentarios
    this.route.fragment.subscribe((fragment) => {
      if (fragment === 'comments') {
        this.scrollToComments();
      }
    });
  }

  scrollToComments(): void {
    if (this.commentsSection) {
      this.commentsSection.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }

  checkAuthStatus(): void {
    this.authService.authStatus$.subscribe((isAuthenticated) => {
      this.isLoggedIn = isAuthenticated;
      if (this.isLoggedIn) {
        const userData = this.authService.getUserSession();
        this.isAdmin = userData?.user?.role === 'admin';
      } else {
        this.isAdmin = false;
      }
    });
  }

  loadToyDetails(id: string): void {
    this.isLoading = true;
    this.toyService.getToyById(id).subscribe({
      next: (toyData) => {
        this.toy = toyData;

        // Preparar el array de todas las imágenes disponibles
        this.allImages = [];

        // Agregar la imagen de portada si existe
        if (toyData.cover) {
          this.allImages.push(
            this.imageService.getFullImageUrl(toyData.cover) || ''
          );
        }

        // Agregar todas las imágenes del array images
        if (toyData.images && toyData.images.length > 0) {
          for (const image of toyData.images) {
            const imgUrl = this.imageService.getFullImageUrl(image.url);
            if (imgUrl) {
              this.allImages.push(imgUrl);
            }
          }
        }

        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar los detalles del juguete:', error);
        this.snackBar.open(
          'Error al cargar los detalles del juguete. Por favor, intenta de nuevo.',
          'Cerrar',
          { duration: 5000 }
        );
        this.isLoading = false;
        this.router.navigate(['/']);
      },
    });
  }

  prevImage(): void {
    if (this.allImages.length <= 1) return;

    this.currentImageIndex--;
    if (this.currentImageIndex < 0) {
      this.currentImageIndex = this.allImages.length - 1;
    }
  }

  nextImage(): void {
    if (this.allImages.length <= 1) return;

    this.currentImageIndex++;
    if (this.currentImageIndex >= this.allImages.length) {
      this.currentImageIndex = 0;
    }
  }

  selectImage(index: number): void {
    if (index >= 0 && index < this.allImages.length) {
      this.currentImageIndex = index;
    }
  }

  onEdit(): void {
    if (this.toy && this.isAdmin) {
      this.router.navigate(['/admin/edit', this.toy._id]);
    }
  }

  onDelete(): void {
    if (!this.toy || !this.isAdmin) return;

    if (confirm(`¿Estás seguro de eliminar el juguete "${this.toy.title}"?`)) {
      this.toyService.deleteToy(this.toy._id).subscribe({
        next: () => {
          this.snackBar.open('Juguete eliminado con éxito', 'Cerrar', {
            duration: 3000,
          });
          this.router.navigate(['/admin']);
        },
        error: (error) => {
          console.error('Error al eliminar juguete:', error);
          this.snackBar.open('Error al eliminar el juguete', 'Cerrar', {
            duration: 3000,
          });
        },
      });
    }
  }

  onBack(): void {
    this.location.back();
  }
}
