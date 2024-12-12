import { getBooks, searchBooks, getBooksByAuthor, getAllAuthors, handleLoan } from "../services/bookService.js";
import { createBookCard, createLoadingBookCard } from "../utils/domHelpers.js";
import { createErrorDisplay, disableInteractiveElements, enableInteractiveElements, ERROR_MESSAGES } from "../utils/errorHandling.js";

// Get DOM elements
const booksGrid = document.querySelector(".books-grid");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const authorSelect = document.getElementById("authorFilter");
const loadMoreBtn = document.getElementById("loadMoreBtn");

let currentBooks = [];
const booksPerPage = 12;

// Display loading placeholders
function displayLoadingPlaceholders(count) {
  booksGrid.innerHTML = ""; // Clear existing content
  for (let i = 0; i < count; i++) {
    const bookCard = document.createElement("article");
    bookCard.className = "book-card";
    bookCard.dataset.index = i; // Add index for tracking
    bookCard.innerHTML = createLoadingBookCard();
    booksGrid.appendChild(bookCard);
  }
}

// Replace placeholder with actual book content
function replacePlaceholderWithBook(book, index) {
  const existingCard = booksGrid.querySelector(`.book-card[data-index="${index}"]`);
  if (existingCard) {
    const newCard = createBookCard(book);
    newCard.dataset.index = index;
    newCard.classList.add("loaded");
    existingCard.replaceWith(newCard);
  }
}

// Load and display initial books
async function loadBooks() {
  try {
    displayLoadingPlaceholders(booksPerPage);
    const books = await getBooks(booksPerPage);
    currentBooks = books;

    // Replace each placeholder with actual book content
    books.forEach((book, index) => {
      replacePlaceholderWithBook(book, index);
    });

    loadMoreBtn.style.display = "block";
  } catch (error) {
    showError("Could not load books");
    loadMoreBtn.style.display = "none";
  }
}

// Load more books
async function loadMoreBooks() {
  try {
    loadMoreBtn.disabled = true;
    const startIndex = currentBooks.length;

    // Add new placeholders
    for (let i = 0; i < booksPerPage; i++) {
      const bookCard = document.createElement("article");
      bookCard.className = "book-card";
      bookCard.dataset.index = startIndex + i;
      bookCard.innerHTML = createLoadingBookCard();
      booksGrid.appendChild(bookCard);
    }

    const newBooks = await getBooks(booksPerPage);

    // Replace new placeholders with content
    newBooks.forEach((book, index) => {
      replacePlaceholderWithBook(book, startIndex + index);
    });

    currentBooks = [...currentBooks, ...newBooks];
    loadMoreBtn.disabled = false;
  } catch (error) {
    console.error("Error loading more books:", error);
    showError("Could not load more books");
    loadMoreBtn.disabled = false;
  }
}

// Handle search
async function handleSearch() {
  const searchTerm = searchInput.value.trim();
  if (!searchTerm) {
    loadBooks();
    return;
  }

  try {
    booksGrid.innerHTML = "";
    displayLoadingPlaceholders(booksPerPage);
    const books = await searchBooks(searchTerm);

    // Clear existing placeholders
    booksGrid.innerHTML = "";

    if (books.length === 0) {
      booksGrid.innerHTML = `<p class="no-results">No book titles matching the search</p>`;
    } else {
      books.forEach((book) => {
        const bookCard = createBookCard(book);
        bookCard.classList.add("loaded");
        booksGrid.appendChild(bookCard);
      });
    }

    loadMoreBtn.style.display = books.length < booksPerPage ? "none" : "block";
  } catch (error) {
    showError("Search failed");
    loadMoreBtn.style.display = "none";
  }
}

// Handle author filter
async function handleAuthorFilter() {
  const authorId = authorSelect.value;
  if (!authorId) {
    loadBooks();
    return;
  }

  try {
    booksGrid.innerHTML = "";
    displayLoadingPlaceholders(booksPerPage);
    const books = await getBooksByAuthor(authorId);

    // Clear existing placeholders
    booksGrid.innerHTML = "";

    if (books.length === 0) {
      booksGrid.innerHTML = `<p class="no-results">No books found for this author</p>`;
    } else {
      books.forEach((book) => {
        const bookCard = createBookCard(book);
        bookCard.classList.add("loaded");
        booksGrid.appendChild(bookCard);
      });
    }

    loadMoreBtn.style.display = "none"; // Hide load more button for author filter
  } catch (error) {
    showError("Could not filter books");
    loadMoreBtn.style.display = "none";
  }
}

// Show error message
function showError(message, retryCallback = null) {
  const errorDisplay = createErrorDisplay(message, retryCallback);
  booksGrid.innerHTML = "";
  booksGrid.appendChild(errorDisplay);

  // Disable interactive elements
  const interactiveElements = [loadMoreBtn, authorSelect, searchBtn, searchInput, document.getElementById("clearFilterBtn")];

  disableInteractiveElements(interactiveElements);
}

// Load authors for the filter dropdown
async function loadAuthors() {
  try {
    const authors = await getAllAuthors();
    authors.forEach((author) => {
      const option = document.createElement("option");
      option.value = author.author_id;
      option.textContent = author.author_name;
      authorSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error loading authors:", error);
    showError("Could not load authors");
  }
}

// Clear author filter
function clearAuthorFilter() {
  authorSelect.value = ""; // Reset the author select dropdown
  loadBooks(); // Reload all books
}

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  // Load initial books
  loadBooks();

  // Load authors for filter
  loadAuthors();

  // Add event listeners
  searchBtn.addEventListener("click", handleSearch);
  authorSelect.addEventListener("change", handleAuthorFilter);
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSearch();
  });
  loadMoreBtn.addEventListener("click", loadMoreBooks);
  document.getElementById("clearFilterBtn").addEventListener("click", clearAuthorFilter);
});
