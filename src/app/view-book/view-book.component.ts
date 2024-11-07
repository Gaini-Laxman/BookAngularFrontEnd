import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../book';
import { BooksService } from '../book.service';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css'],
})
export class ViewBookComponent implements OnInit {
  book: Book | null = null;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService,
    private router: Router // Make sure to inject Router
  ) { }

  ngOnInit(): void {
    this.getBook();
  }

  getBook(): void {
    const idString = this.route.snapshot.paramMap.get('id');
    if (idString) {
      const id = +idString;
      this.booksService.getBookById(id).subscribe(
        book => {
          this.book = book;
          console.log('Fetched book:', this.book);
        },
        error => {
          this.errorMessage = 'Error fetching book: ' + error.message;
          console.error("Error fetching book: ", error);
        }
      );
    } else {
      this.errorMessage = "Error: Book ID not provided in route";
      console.error(this.errorMessage);
    }
  }
  
  goBack(): void {
    this.router.navigate(['/book-list']); // Update this to the correct route if needed
  }
}
