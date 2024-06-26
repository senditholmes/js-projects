class Bookshelf {
  constructor() {
    this.favoriteBooks = [];
  }

  addFavoriteBook(bookName) {
    if (!bookName.includes("Great")) {
      this.favoriteBooks.push(bookName);
    }
  }

  printFavoriteBooks() {
    console.log(`Favorite Books: ${String(this.favoriteBooks.length)}`);
    for (let bookName of this.favoriteBooks) {
      console.log(bookName);
    }
  }
}

function loadBooks(bookshelf) {
  fakeAjax(BOOK_API, function getBooks(books) {
    for (let book of books) {
      bookshelf.addFavoriteBook(book);
    }
    bookshelf.printFavoriteBooks();
  });
}

const testBookshelf = new Bookshelf();
loadBooks(testBookshelf);

var BOOK_API = "https://some.url/api";

// ***********************

// NOTE: don't modify this function at all
function fakeAjax(url, cb) {
  setTimeout(function fakeLoadingDelay() {
    cb([
      "A Song of Ice and Fire",
      "The Great Gatsby",
      "Crime & Punishment",
      "Great Expectations",
      "You Don't Know JS",
    ]);
  }, 500);
}
