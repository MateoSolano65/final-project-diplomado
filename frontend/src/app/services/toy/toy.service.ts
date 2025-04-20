import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.dev';

export interface ToyCreateDto {
  title: string;
  category: string;
  description: string;
  review: string;
  rating: number;
}

export interface ToyResponse {
  _id: string;
  title: string;
  category: string;
  description: string;
  review?: string;
  rating?: number;
  cover?: string;
  images?: Array<{ _id: string; url: string }>;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class ToyService {
  private apiUrl = `${environment.apiUrl}/toys`;

  constructor(private http: HttpClient) {}

  /**
   * Gets all toys
   * @returns Observable with the list of toys
   */
  getAllToys(): Observable<ToyResponse[]> {
    return this.http.get<ToyResponse[]>(this.apiUrl);
  }

  /**
   * Creates a new toy
   * @param toyData Data for the new toy
   * @returns Observable with the created toy data
   */
  createToy(toyData: ToyCreateDto): Observable<ToyResponse> {
    // El interceptor añadirá automáticamente el token de autorización si existe
    return this.http.post<ToyResponse>(this.apiUrl, toyData);
  }

  /**
   * Gets a toy by ID
   * @param id The ID of the toy to retrieve
   * @returns Observable with the toy data
   */
  getToyById(id: string): Observable<ToyResponse> {
    return this.http.get<ToyResponse>(`${this.apiUrl}/${id}`);
  }

  /**
   * Updates an existing toy
   * @param id The ID of the toy to update
   * @param toyData New data for the toy
   * @returns Observable with the updated toy data
   */
  updateToy(
    id: string,
    toyData: Partial<ToyCreateDto>
  ): Observable<ToyResponse> {
    // El interceptor añadirá automáticamente el token de autorización si existe
    return this.http.put<ToyResponse>(`${this.apiUrl}/${id}`, toyData);
  }

  /**
   * Deletes a toy
   * @param id The ID of the toy to delete
   * @returns Observable with the deletion response
   */
  deleteToy(id: string): Observable<any> {
    // El interceptor añadirá automáticamente el token de autorización si existe
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
