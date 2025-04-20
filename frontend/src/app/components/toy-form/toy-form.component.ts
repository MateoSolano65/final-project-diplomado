import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

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
    private location: Location
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
    
    // In a real app, you would call your service here to get toy data
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
    const formData = this.toyForm.value;
    
    // Here you would call your service to save the toy
    console.log('Form data to submit:', formData);
    
    // Simulate API call
    setTimeout(() => {
      this.isLoading = false;
      this.snackBar.open(
        this.isEditMode ? '¡Juguete actualizado con éxito!' : '¡Juguete creado con éxito!',
        'Cerrar',
        { duration: 3000 }
      );
      
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
