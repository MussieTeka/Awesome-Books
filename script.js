/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */

class BookList {
  constructor() {
    this.titleInput = document.querySelector('.title-input');
    this.authorInput = document.querySelector('.author-input');
    this.addBtn = document.querySelector('.add-btn');
    this.bookList = document.querySelector('.book-list');

    // Adding event listeners
    this.addBtn.addEventListener('click', this.addBook.bind(this));
    this.bookList.addEventListener('click', this.removeBook.bind(this));

    // Retrieve from localStorage when the page loads
    this.getFromLocalStorage();
  }

  // Function to add a new book to the list
  addBook() {
    const title = this.titleInput.value.trim();
    const author = this.authorInput.value.trim();

    if (!title || !author) {
      return;
    }

    const book = this.createBookElement(title, author);
    this.bookList.appendChild(book);
    this.bookList.style.display = 'flex';
    this.bookList.style.flexDirection = 'column';

    // Save to localStorage
    this.saveToLocalStorage(this.bookList.innerHTML);

    // Clearing the input fields
    this.titleInput.value = '';
    this.authorInput.value = '';
  }

  // Function to remove a book from the list
  removeBook(event) {
    const button = event.target;

    if (!button.classList.contains('remove-btn')) {
      return;
    }

    const book = button.closest('.book');
    this.bookList.removeChild(book);

    // Save to localStorage
    this.saveToLocalStorage(this.bookList.innerHTML);
  }

  createBookElement(title, author) {
    const book = document.createElement('div');
    book.classList.add('book');

    const bookTitle = document.createElement('p');
    bookTitle.classList.add('book-title');
    bookTitle.textContent = title;

    const bookAuthor = document.createElement('p');
    bookAuthor.classList.add('book-author');
    bookAuthor.textContent = `by ${author}`;

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-btn');
    removeBtn.textContent = 'Remove';

    book.appendChild(bookTitle);
    book.appendChild(bookAuthor);

    const separator = document.createElement('hr');
    separator.classList.add('book-separator');
    separator.setAttribute('dir', 'rtl');
    book.appendChild(separator);

    book.appendChild(removeBtn);

    return book;
  }

  // Function to save the book list to localStorage
  saveToLocalStorage(bookListHtml) {
    localStorage.setItem('bookList', bookListHtml);
  }

  // Function to retrieve the book list from localStorage
  getFromLocalStorage() {
    const bookListHtml = localStorage.getItem('bookList');
    if (bookListHtml) {
      this.bookList.innerHTML = bookListHtml;
    }
  }
}

const myBookList = new BookList();
