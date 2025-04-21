import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor() {}

  /**
   * Construye una URL completa para una imagen basada en la ruta relativa
   * @param imagePath Ruta relativa de la imagen o URL completa
   * @returns URL completa de la imagen o undefined si no hay imagen
   */
  getFullImageUrl(imagePath: string | undefined | null): string | undefined {
    // Si no hay ruta, devolver undefined para mostrar la imagen rota
    if (!imagePath) {
      return undefined;
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
   * @returns URL completa de la primera imagen, o undefined si no hay imágenes
   */
  getFirstImageUrl(
    images: Array<{ url: string; _id: string }> | undefined
  ): string | undefined {
    if (!images || images.length === 0) {
      return undefined;
    }

    return this.getFullImageUrl(images[0].url);
  }
}
