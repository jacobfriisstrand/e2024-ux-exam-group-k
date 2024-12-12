import { handleLoan } from "../services/bookService.js";
import { createPopover } from "../services/popoverService.js";

export function createLoanButton(bookId) {
  const button = document.createElement("button");
  button.className = "primary-button loan-button";
  button.dataset.bookId = bookId;
  button.innerHTML = `
    <span>Loan book</span>
    <svg class="svg-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path fill="currentColor" d="M8 16q.425 0 .713-.288T9 15V5q0-.425-.288-.712T8 4t-.712.288T7 5v10q0 .425.288.713T8 16m11 6H6q-1.25 0-2.125-.875T3 19V5q0-1.25.875-2.125T6 2h6.8q-.85.875-1.325 2.025T11 6.5q0 2.575 1.738 4.425T17 12.975V16q0 .825-.587 1.413T15 18H6q-.425 0-.712.288T5 19t.288.713T6 20h13v-7.175q.55-.125 1.05-.337t.95-.513V20q0 .825-.587 1.413T19 22m-1.5-10q0-2.3 1.6-3.9T23 6.5q-2.3 0-3.9-1.6T17.5 1q0 2.3-1.6 3.9T12 6.5q2.3 0 3.9 1.6t1.6 3.9"/>
    </svg>
  `;

  button.addEventListener("click", async (e) => {
    if (!isUserLoggedIn()) {
      createPopover("Please login or sign up to loan books", "warning", button);
      return;
    }

    try {
      const success = await handleLoan(bookId);
      if (success) {
        createPopover("Book loaned successfully! You will receive an email with the access link for the e-book.", "success", button);
        updateButtonToLoaned(button);
      }
    } catch (error) {
      console.error("Error in loan button click handler:", error);
      createPopover("Failed to loan the book. Please try again later.", "error", button);
    }
  });

  return button;
}

function updateButtonToLoaned(button) {
  button.disabled = true;
  button.innerHTML = `
    <span>Loaned</span>
    <svg class="svg-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path fill="currentColor" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
    </svg>
  `;
}

function isUserLoggedIn() {
  return !!sessionStorage.getItem('user_id');
}
