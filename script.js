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

    const index = this.bookList.children.length;
    if (index % 2 === 0) {
      book.style.backgroundColor = '#fff';
    } else {
      book.style.backgroundColor = '#ddd';
    }

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
  saveToLocalStorage() {
    localStorage.setItem('bookList', this.bookList.innerHTML);
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

// Define the DOM elements
const elements = {
  newBook: document.querySelector('#list'),
  bookList: document.querySelector('#books-list'),
  introduceBook: document.querySelector('#introduce-book'),
  addBookSection: document.querySelector('#add-book-form'),
  contactUsBtn: document.querySelector('#contact-us'),
  contactUs: document.querySelector('#contact-info'),
};

// Define the functions to handle the events
function showBooksList() {
  elements.bookList.style.display = 'flex';
  elements.bookList.style.marginTop = '100px';
  elements.bookList.style.marginBottom = '100px';
  elements.addBookSection.style.display = 'none';
  elements.contactUs.style.display = 'none';
}

function showAddBookForm() {
  elements.bookList.style.display = 'none';
  elements.addBookSection.style.display = 'flex';
  elements.addBookSection.style.marginTop = '100px';
  elements.addBookSection.style.marginBottom = '100px';
  elements.contactUs.style.display = 'none';
}

function showContactUs() {
  elements.bookList.style.display = 'none';
  elements.addBookSection.style.display = 'none';
  elements.contactUs.style.display = 'flex';
  elements.contactUs.style.marginTop = '100px';
  elements.contactUs.style.marginBottom = '100px';
}

// Add the event listeners to the elements
elements.newBook.addEventListener('click', showBooksList);
elements.introduceBook.addEventListener('click', showAddBookForm);
elements.contactUsBtn.addEventListener('click', showContactUs);

function updateTime() {
  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();
  const dateTime = `${date} ${time}`;
  document.getElementById('current-time').querySelector('p').textContent = dateTime;
}

updateTime();
setInterval(updateTime, 1000);
