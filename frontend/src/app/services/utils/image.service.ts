import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor() {}

  /**
   * Construye una URL completa para una imagen basada en la ruta relativa
   * @param imagePath Ruta relativa de la imagen o URL completa
   * @returns URL completa de la imagen
   */
  getFullImageUrl(imagePath: string | undefined | null): string {
    // Si no hay ruta, devolver imagen por defecto
    if (!imagePath) {
      return 'assets/icon/toy_blog_logo.png';
    }

    // Si ya es una URL completa, devolverla tal cual
    if (imagePath.startsWith('http')) {
      return imagePath;
    }

    // Si la ruta ya comienza con /, usarla directamente con la URL base
    if (imagePath.startsWith('/')) {
      return `${environment.baseUrl}${imagePath}`;
    }

    // En caso contrario, añadir / entre la URL base y la ruta
    return `${environment.baseUrl}/${imagePath}`;
  }

  /**
   * Procesa un array de objetos de imágenes para obtener la primera URL completa
   * @param images Array de objetos de imagen del backend
   * @returns URL completa de la primera imagen, o null si no hay imágenes
   */
  getFirstImageUrl(
    images: Array<{ url: string; _id: string }> | undefined
  ): string {
    if (!images || images.length === 0) {
      return 'assets/icon/toy_blog_logo.png';
    }

    return this.getFullImageUrl(images[0].url);
  }
}
