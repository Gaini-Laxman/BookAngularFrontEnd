import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private apiUrl = 'http://localhost:9091/api/'; // Make sure this is the correct base URL for your API

  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}books`); // Correct URL usage
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}books/${id}`); // Correct URL usage
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}books`, book); // Correct URL usage
  }

  updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}books/${book.id}`, book); // Correct URL usage
  }

  deleteBookById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}books/${id}`); // Correct URL usage
  }
}
