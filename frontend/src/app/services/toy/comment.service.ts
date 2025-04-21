import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ToyComment {
  _id: string;
  content: string;
  toy: string;
  user: {
    _id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ToyCommentCreateDto {
  content: string;
}

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  /**
   * Gets all comments for a toy
   * @param toyId The ID of the toy
   * @returns Observable with the list of comments
   */
  getComments(toyId: string): Observable<ToyComment[]> {
    return this.http.get<ToyComment[]>(
      `${environment.apiUrl}/toys/${toyId}/comments`
    );
  }

  /**
   * Creates a new comment for a toy
   * @param toyId The ID of the toy
   * @param commentData The comment data
   * @returns Observable with the created comment
   */
  createComment(
    toyId: string,
    commentData: ToyCommentCreateDto
  ): Observable<ToyComment> {
    return this.http.post<ToyComment>(
      `${environment.apiUrl}/toys/${toyId}/comments`,
      commentData
    );
  }

  /**
   * Updates a comment
   * @param toyId The ID of the toy
   * @param commentId The ID of the comment to update
   * @param commentData The updated comment data
   * @returns Observable with the updated comment
   */
  updateComment(
    toyId: string,
    commentId: string,
    commentData: ToyCommentCreateDto
  ): Observable<ToyComment> {
    return this.http.put<ToyComment>(
      `${environment.apiUrl}/toys/${toyId}/comments/${commentId}`,
      commentData
    );
  }

  /**
   * Deletes a comment
   * @param toyId The ID of the toy
   * @param commentId The ID of the comment to delete
   * @returns Observable with the response
   */
  deleteComment(toyId: string, commentId: string): Observable<any> {
    return this.http.delete(
      `${environment.apiUrl}/toys/${toyId}/comments/${commentId}`
    );
  }
}
