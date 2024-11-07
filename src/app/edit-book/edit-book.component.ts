import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../book';
import { BooksService } from '../book.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css'],
})
export class EditBookComponent implements OnInit {
  book: Book = {
    id: 0,
    bookName: '',
    price: 0
  };
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private booksService: BooksService
  ) { }

  ngOnInit(): void {
    this.getBook();
  }

  getBook(): void {
    const idString = this.route.snapshot.paramMap.get('id');
    if (idString) {
      const id = +idString;
      this.booksService.getBookById(id).subscribe(
        book => this.book = book,
        error => console.error("Error fetching book: ", error)
      );
    } else {
      console.error("Error: Book ID not provided in route");
    }
  }

  updateBook(): void {
    this.booksService.updateBook(this.book).subscribe(
      () => {
        this.successMessage = 'Book updated successfully!';
        this.router.navigate(['/book-list']); // Navigate to the book list page
      },
      error => {
        this.errorMessage = 'Error updating book: ' + error.message;
      }
    );
  }
}
