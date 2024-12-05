import { createErrorDisplay, ERROR_MESSAGES } from "../utils/errorHandling.js";
import { getBooks } from "../services/bookService.js";
import { createBookCard, createLoadingBookCard } from "../utils/domHelpers.js";

// Get the books container
const booksGrid = document.querySelector(".books-grid");

// Show error for the featured books section
function showError() {
  const errorDisplay = createErrorDisplay(
    ERROR_MESSAGES.FETCH,
    () => loadBooks() // Pass the function reference, don't call it immediately
  );
  booksGrid.innerHTML = "";
  booksGrid.appendChild(errorDisplay);
}

// Display loading placeholders
function displayLoadingPlaceholders(count) {
  booksGrid.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const bookCard = document.createElement("article");
    bookCard.className = "book-card";
    bookCard.dataset.index = i;
    bookCard.innerHTML = createLoadingBookCard();
    booksGrid.appendChild(bookCard);
  }
}

// Load and display books
async function loadBooks() {
  try {
    displayLoadingPlaceholders(8);
    const books = await getBooks(8);

    if (!books || books.length === 0) {
      showError();
      return;
    }

    // Clear existing content
    booksGrid.innerHTML = "";

    // Create new book cards directly
    books.forEach((book) => {
      const bookCard = document.createElement("article");
      bookCard.className = "book-card loaded";
      bookCard.innerHTML = createBookCard(book);
      booksGrid.appendChild(bookCard);
    });
  } catch (error) {
    console.error("Error loading books:", error);
    showError();
  }
}

// Start loading books when page loads
document.addEventListener("DOMContentLoaded", () => {
  loadBooks();
});
