import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToyService, ToyCreateDto } from '../../services/toy/toy.service';
import { catchError, finalize, switchMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { ImageService } from '../../services/utils/image.service';

@Component({
  selector: 'app-toy-form',
  standalone: false,
  templateUrl: './toy-form.component.html',
  styleUrl: './toy-form.component.scss'
})
export class ToyFormComponent implements OnInit {
  toyForm: FormGroup;
  isLoading = false;
  isUploadingImage = false;
  isEditMode = false;
  toyId: string | null = null;
  imagePreview: string | null | undefined = null;
  imageFile: File | null = null;
  
  // Categories from backend
  toyCategories = [
    'Muñecas',
    'Carros',
    'Juegos de mesa',
    'Peluches',
    'Legos',
    'Figuras de acción',
    'Bicicletas',
    'Juguetes educativos',
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private location: Location,
    private toyService: ToyService,
    public imageService: ImageService
  ) {
    this.toyForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      category: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      review: ['', Validators.required],
      rating: [1, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  ngOnInit(): void {
    // Check if we're in edit mode
    this.toyId = this.route.snapshot.paramMap.get('id');
    
    if (this.toyId) {
      this.isEditMode = true;
      this.loadToyData(this.toyId);
    }
  }

  loadToyData(id: string): void {
    this.isLoading = true;
    
    this.toyService.getToyById(id)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (toyData) => {
          this.toyForm.patchValue({
            title: toyData.title,
            category: toyData.category,
            description: toyData.description,
            review: toyData.review || '',
            rating: toyData.rating || 1
          });
          
          // Si hay una imagen de portada, establecer la vista previa
          if (toyData.cover) {
            this.imagePreview = this.imageService.getFullImageUrl(toyData.cover);
          } 
          // Si no hay portada pero hay imágenes, usar la primera imagen
          else if (toyData.images && toyData.images.length > 0) {
            this.imagePreview = this.imageService.getFullImageUrl(toyData.images[0].url);
          }
        },
        error: (error) => {
          console.error('Error al cargar el juguete:', error);
          this.snackBar.open(
            'Error al cargar la información del juguete. Por favor, intenta de nuevo.',
            'Cerrar',
            { duration: 5000 }
          );
          this.router.navigate(['/admin']);
        }
      });
  }

  onSubmit(): void {
    if (this.toyForm.invalid) {
      return;
    }
    
    this.isLoading = true;
    const formData: ToyCreateDto = this.toyForm.value;
    
    if (this.isEditMode && this.toyId) {
      this.updateToy(this.toyId, formData);
    } else {
      this.createToy(formData);
    }
  }
  
  private createToy(formData: ToyCreateDto): void {
    this.toyService.createToy(formData)
      .pipe(
        switchMap(response => {
          // Si hay una imagen para cargar después de crear el juguete
          if (this.imageFile && response._id) {
            this.isUploadingImage = true;
            return this.toyService.uploadToyImages(response._id, this.imageFile).pipe(
              catchError(error => {
                console.error('Error al cargar la imagen:', error);
                this.snackBar.open(
                  'El juguete se creó correctamente, pero hubo un error al cargar la imagen.',
                  'Cerrar',
                  { duration: 5000 }
                );
                return of(response); // Devolver la respuesta original para continuar el flujo
              })
            );
          }
          return of(response);
        }),
        finalize(() => {
          this.isLoading = false;
          this.isUploadingImage = false;
        })
      )
      .subscribe({
        next: (response) => {
          console.log('Toy created successfully:', response);
          this.snackBar.open('¡Juguete creado con éxito!', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/admin']);
        },
        error: (error) => {
          console.error('Error creating toy:', error);
          this.snackBar.open(
            'Error al crear el juguete. Por favor intenta de nuevo.',
            'Cerrar',
            { duration: 5000 }
          );
        }
      });
  }
  
  private updateToy(id: string, formData: Partial<ToyCreateDto>): void {
    this.toyService.updateToy(id, formData)
      .pipe(
        switchMap(response => {
          // Si hay una nueva imagen para cargar después de actualizar el juguete
          if (this.imageFile && response._id) {
            this.isUploadingImage = true;
            return this.toyService.uploadToyImages(response._id, this.imageFile).pipe(
              catchError(error => {
                console.error('Error al cargar la imagen:', error);
                this.snackBar.open(
                  'El juguete se actualizó correctamente, pero hubo un error al cargar la imagen.',
                  'Cerrar',
                  { duration: 5000 }
                );
                return of(response); // Devolver la respuesta original para continuar el flujo
              })
            );
          }
          return of(response);
        }),
        finalize(() => {
          this.isLoading = false;
          this.isUploadingImage = false;
        })
      )
      .subscribe({
        next: (response) => {
          console.log('Juguete actualizado con éxito:', response);
          this.snackBar.open('¡Juguete actualizado con éxito!', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/admin']);
        },
        error: (error) => {
          console.error('Error al actualizar juguete:', error);
          this.snackBar.open(
            'Error al actualizar el juguete. Por favor intenta de nuevo.',
            'Cerrar',
            { duration: 5000 }
          );
        }
      });
  }

  onCancel(): void {
    this.location.back();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    
    if (input.files && input.files.length) {
      const file = input.files[0];
      this.imageFile = file;
      
      // Preview the selected image
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.imagePreview = null;
    this.imageFile = null;
  }
}
