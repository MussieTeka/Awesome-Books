// Get elements from the DOM
const bookList = document.querySelector(".book-list");
const titleInput = document.querySelector(".title-input");
const authorInput = document.querySelector(".author-input");
const addBtn = document.querySelector(".add-btn");

// Define books array
const books = [];

// Create book element from title and author
function createBookElement(title, author) {
  const book = { title, author };
  const bookElement = document.createElement("div");
  bookElement.classList.add("book");

  const bookTitle = document.createElement("p");
  bookTitle.classList.add("book-title");
  bookTitle.textContent = book.title;
  bookElement.appendChild(bookTitle);

  const bookAuthor = document.createElement("p");
  bookAuthor.classList.add("book-author");
  bookAuthor.textContent = book.author;
  bookElement.appendChild(bookAuthor);

  const removeBtn = document.createElement("button");
  removeBtn.classList.add("remove-btn");
  removeBtn.textContent = "Remove";
  bookElement.appendChild(removeBtn);

  const separator = document.createElement("hr");
  separator.classList.add("book-separator");
  separator.setAttribute("dir", "rtl");
  bookElement.appendChild(separator);

  books.push(book);
  return bookElement;
}

// Save the book list to localStorage
function saveToLocalStorage() {
  localStorage.setItem("bookList", bookList.innerHTML);
}

// Add a new book to the list
function addBook() {
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  if (!title || !author) {
    return;
  }
  const book = createBookElement(title, author);
  bookList.appendChild(book);
  bookList.style.display = "block";

  // Save to localStorage
  saveToLocalStorage();

  // Clear input fields
  titleInput.value = "";
  authorInput.value = "";
}

// Remove a book from the list
function removeBook(event) {
  if (!event.target.classList.contains("remove-btn")) {
    return;
  }
  const book = event.target.closest(".book");
  bookList.removeChild(book);

  // Save to localStorage
  saveToLocalStorage();
}

// Retrieve the book list from localStorage
function getFromLocalStorage() {
  const bookListHtml = localStorage.getItem("bookList");
  if (bookListHtml) {
    bookList.innerHTML = bookListHtml;
  }
}

// Add event listeners
addBtn.addEventListener("click", addBook);
bookList.addEventListener("click", removeBook);

// Retrieve from localStorage when the page loads
getFromLocalStorage();
