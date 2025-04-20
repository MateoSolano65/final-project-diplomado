import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToyService, ToyCreateDto } from '../../services/toy/toy.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-toy-form',
  standalone: false,
  templateUrl: './toy-form.component.html',
  styleUrl: './toy-form.component.scss'
})
export class ToyFormComponent implements OnInit {
  toyForm: FormGroup;
  isLoading = false;
  isEditMode = false;
  toyId: string | null = null;
  imagePreview: string | null = null;
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
    private toyService: ToyService
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
      // In a real app, we would fetch the toy data here
      this.loadToyData(this.toyId);
    }
  }

  // Placeholder for loading toy data in edit mode
  loadToyData(id: string): void {
    this.isLoading = true;
    
    // Here you would call the toyService to get the toy by ID
    // For now, let's just simulate a delay
    setTimeout(() => {
      // Mock data - in a real app this would come from a service
      const mockToy = {
        title: 'Ejemplo de Juguete',
        category: 'Muñecas',
        description: 'Esta es una descripción de ejemplo para el juguete',
        review: 'Reseña de ejemplo para el juguete',
        rating: 4
      };
      
      this.toyForm.patchValue(mockToy);
      this.isLoading = false;
    }, 1000);
  }

  onSubmit(): void {
    if (this.toyForm.invalid) {
      return;
    }
    
    this.isLoading = true;
    const formData: ToyCreateDto = this.toyForm.value;
    
    if (this.isEditMode && this.toyId) {
      // Edit mode logic would go here
      // You would call toyService.updateToy(this.toyId, formData)
      this.simulateSubmit('¡Juguete actualizado con éxito!');
    } else {
      // Create new toy
      this.toyService.createToy(formData)
        .pipe(
          finalize(() => this.isLoading = false)
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
  }

  // Helper method for simulating API response in edit mode
  private simulateSubmit(message: string): void {
    setTimeout(() => {
      this.isLoading = false;
      this.snackBar.open(message, 'Cerrar', { duration: 3000 });
      this.router.navigate(['/admin']);
    }, 1500);
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
