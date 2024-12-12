import { handleLoan } from "../services/bookService.js";
import { createLoanButton } from "../components/loanButton.js";

// Create loading placeholder for book card
export function createLoadingBookCard() {
  return `
    <article class="book-card">
      <div class="loading-placeholder"></div>
    </article>
  `;
}

// Create book card with actual data
export function createBookCard(book) {
  const article = document.createElement("article");
  article.className = "book-card";

  article.innerHTML = `
    <img 
      src="${book.cover || "/assets/images/image-not-found.jpg"}" 
      alt="${book.cover ? book.title : "No cover available"}" 
      class="book-cover"
    />
    <div>
      <p class="author">${book.author}</p>
      <header>
        <h3 class="book-title">${book.title}</h3>
      </header>
    </div>
    <p class="year">Published in ${book.publishing_year}</p>
    <div class="book-actions">
      <a href="book.html?id=${book.book_id}" class="book-link">
        <span>Read more</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" viewBox="0 0 24 24">
          <path fill="currentColor" d="M16.175 13H4v-2h12.175l-5.6-5.6L12 4l8 8l-8 8l-1.425-1.4z" />
        </svg>
      </a>
    </div>
  `;

  // Add loan button
  const bookActions = article.querySelector(".book-actions");
  const loanButton = createLoanButton(book.book_id);
  bookActions.insertBefore(loanButton, bookActions.firstChild);

  return article;
}

// Add a function to attach event listeners
export function attachLoanButtonListeners() {
  const loanButtons = document.querySelectorAll(".loan-button");
  loanButtons.forEach((button) => {
    button.addEventListener("click", async (e) => {
      const bookId = e.currentTarget.dataset.bookId;
      try {
        await handleLoan(bookId);
      } catch (error) {
        console.error("Error in loan button click handler:", error);
      }
    });
  });
}
