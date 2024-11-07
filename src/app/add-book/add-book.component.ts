import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../book';
import { BooksService } from '../book.service';


@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
  
})
export class AddBookComponent {
  book: Book = {
    id: 0,
    bookName: '',
    price: 0
  };

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private booksService: BooksService, private router: Router) { }

  addBook(): void {
    console.log('Adding book:', this.book); // Check if this logs the book data
    this.booksService.addBook(this.book)
      .subscribe(() => {
        this.successMessage = 'Book added successfully!';
        this.router.navigate(['/book-list']);
      }, error => {
        this.errorMessage = 'Error adding book: ' + error.message;
      });
  }
  

  viewBookList(): void {
    this.router.navigate(['/book-list']); // Navigate to book list page
  }
  updateBook(): void {
    this.booksService.updateBook(this.book).subscribe(
      () => {
        this.successMessage = 'Book updated successfully!';
        this.router.navigate(['/book-list']); // Navigate to book list page
      },
      error => {
        this.errorMessage = 'Error updating book: ' + error.message;
      }
    );
  }
  



}
