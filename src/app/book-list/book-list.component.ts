import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../book';
import { BooksService } from '../book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];

  constructor(private booksService: BooksService, private router: Router) {}

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks(): void {
    this.booksService.getAllBooks().subscribe((books: Book[]) => {
      this.books = books;
    });
  }

  navigateToAddBook(): void {
    this.router.navigate(['/add-book']);
  }

  navigateToViewBook(id: number): void {
    this.router.navigate(['/view-book', id]); // Ensure the route is correct
  }

  navigateToUpdateBook(id: number): void {
    this.router.navigate(['/edit-book', id]);
  }

  deleteBook(id: number): void {
    if (confirm("Are you sure you want to delete this book?")) {
      this.booksService.deleteBookById(id).subscribe(() => {
        this.fetchBooks();
      }, error => {
        console.error("Error deleting book: ", error);
      });
    }
  }
}
