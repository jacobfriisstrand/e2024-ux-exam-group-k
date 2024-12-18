import { createErrorDisplay, ERROR_MESSAGES } from "../utils/errorHandling.js";
import { getBooks, handleLoan } from "../services/bookService.js";
import { createBookCard, createLoadingBookCard } from "../utils/domHelpers.js";

// Get the books container
const booksGrid = document.querySelector(".books-grid");

// Show error for the featured books section
function showError() {
  const errorDisplay = createErrorDisplay(ERROR_MESSAGES.FETCH, () => loadBooks());
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
    displayLoadingPlaceholders(5);
    const books = await getBooks(5);

    if (!books || books.length === 0) {
      showError();
      return;
    }

    // Clear existing content
    booksGrid.innerHTML = "";

    // Get random book for featured spot
    const randomIndex = Math.floor(Math.random() * books.length);
    const featuredBook = books[randomIndex];

    // Remove featured book from regular display
    const regularBooks = books.filter((_, index) => index !== randomIndex);

    // Add featured book
    const featuredElement = document.querySelector(".featured-book");
    if (featuredElement) {
      const featuredBookCard = createBookCard(featuredBook);
      featuredBookCard.classList.add("loaded", "featured");
      featuredElement.innerHTML = "";
      featuredElement.appendChild(featuredBookCard);
    }

    // Create new book cards directly for remaining books
    regularBooks.forEach((book) => {
      const bookCard = createBookCard(book);
      bookCard.classList.add("loaded");
      booksGrid.appendChild(bookCard);
    });
  } catch (error) {
    console.error("Error loading books:", error);
    showError();
  }
}

// Start loading books when page loads
loadBooks();
