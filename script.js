const titleInput = document.querySelector('.title-input');
const authorInput = document.querySelector('.author-input');
const addBtn = document.querySelector('.add-btn');
const bookList = document.querySelector('.book-list');

function createBookElement(title, author) {
  const book = document.createElement('div');
  book.classList.add('book');

  const bookTitle = document.createElement('p');
  bookTitle.classList.add('book-title');
  bookTitle.textContent = title;

  const bookAuthor = document.createElement('p');
  bookAuthor.classList.add('book-author');
  bookAuthor.textContent = author;

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
function saveToLocalStorage(bookListHtml) {
  localStorage.setItem('bookList', bookListHtml);
}

// Function to add a new book to the list
function addBook() {
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();

  if (!title || !author) {
    return;
  }

  const book = createBookElement(title, author);
  bookList.appendChild(book);
  bookList.style.display = 'block';

  // Save to localStorage
  saveToLocalStorage(bookList.innerHTML);

  // Clearing the input fields
  titleInput.value = '';
  authorInput.value = '';
}

// Function to remove a book from the list
function removeBook(event) {
  const button = event.target;

  if (!button.classList.contains('remove-btn')) {
    return;
  }

  const book = button.closest('.book');
  bookList.removeChild(book);

  // Save to localStorage
  saveToLocalStorage(bookList.innerHTML);
}


// Function to retrieve the book list from localStorage
function getFromLocalStorage() {
  const bookListHtml = localStorage.getItem('bookList');
  if (bookListHtml) {
    bookList.innerHTML = bookListHtml;
  }
}

// Adding event listeners
addBtn.addEventListener('click', addBook);
bookList.addEventListener('click', removeBook);

// Retrieve from localStorage when the page loads
getFromLocalStorage();
