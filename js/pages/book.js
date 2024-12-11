import { getBookDetails } from "../services/bookService.js";
import { createErrorDisplay, ERROR_MESSAGES } from "../utils/errorHandling.js";

// Get book ID from URL
const params = new URLSearchParams(window.location.search);
const bookId = params.get("id");

// Get DOM elements
const bookCover = document.getElementById("bookCover");
const bookTitle = document.getElementById("bookTitle");
const bookAuthor = document.getElementById("bookAuthor");
const bookYear = document.getElementById("bookYear");
const bookPublisher = document.getElementById("bookPublisher");
const loanBtn = document.getElementById("loanBtn");

// Load book details

async function loadBookDetails(bookId) {
  const contentContainer = document.querySelector(".book-details-container");

  try {
    const book = await getBookDetails(bookId);
    // Update page title
    document.title = `${book.title} - E-Book Library`;

    // Update DOM
    bookCover.src = book.cover || "https://via.placeholder.com/200x300/f0f0f0/666666?text=No+Image+Available";
    bookCover.alt = book.title;
    bookTitle.textContent = book.title;
    bookAuthor.textContent = book.author;
    bookYear.textContent = book.publishing_year;
    bookPublisher.textContent = book.publishing_company;
  } catch (error) {
    const errorDisplay = createErrorDisplay(ERROR_MESSAGES.FETCH, () => loadBookDetails(bookId));
    contentContainer.innerHTML = "";
    contentContainer.appendChild(errorDisplay);
  }
}

// Show error message
function showError(message) {
  const container = document.querySelector(".book-container");
  container.innerHTML = `<p class="error">${message}</p>`;
}

// Start loading when page loads
loadBookDetails(bookId);
