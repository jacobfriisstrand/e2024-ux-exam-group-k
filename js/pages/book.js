import { getBookDetails } from "../services/bookService.js";
import { loanBook } from "../services/bookService.js";
import { getAllLoans } from "../services/bookService.js";
import { getUserProfile } from "../services/userService.js";
import { createErrorDisplay, ERROR_MESSAGES } from "../utils/errorHandling.js";

// Get book ID from URL
const params = new URLSearchParams(window.location.search);
const bookId = params.get("id");

// Get user ID and admin status from session storage
const userId = sessionStorage.getItem("user_id");
const isAdmin = sessionStorage.getItem("is_admin") === "true"; // Ensure this key is set correctly

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

    // If admin, load loans
    if (isAdmin) {
      await loadLoans(bookId);
    }

  } catch (error) {
    const errorDisplay = createErrorDisplay(ERROR_MESSAGES.FETCH, () => loadBookDetails(bookId));
    contentContainer.innerHTML = "";
    contentContainer.appendChild(errorDisplay);
  }
}

async function loadLoans(bookId) {
  const adminLoansSection = document.getElementById("adminLoansSection");
  const loansList = document.getElementById("loansList");

  try {
    const response = await getAllLoans(bookId);
    const loans = response.loans || []; // Access the loans array

    // Clear previous content
    loansList.innerHTML = "";

    if (loans.length === 0) {
      const noLoansMessage = document.createElement("li");
      noLoansMessage.textContent = "No loans for this book.";
      loansList.appendChild(noLoansMessage);
    } else {
      for (const loan of loans) {
        const user = await getUserProfile(loan.user_id); // Fetch user profile for each loan

        const loanItem = document.createElement("li");
        loanItem.innerHTML = `
          <div class="loan-grid">
            <div class="loan-user">
              <span class="user-name">${user.first_name}</span>
              <span class="user-email">${user.email}</span>
            </div>
            <div class="loan-date-container">
              <span>Loan date</span> <span class="loan-date">${loan.loan_date}</span>
            </div>
          </div>
        `;



        loansList.appendChild(loanItem);
      }
    }

    // Show the admin loans section
    adminLoansSection.style.display = "block";
  } catch (error) {
    console.error("Error loading loans:", error);
    const errorMessage = document.createElement("li");
    errorMessage.textContent = "Failed to load loans.";
    errorMessage.classList.add("error");
    loansList.appendChild(errorMessage);
  }
}


async function handleLoan() {
  if (!userId) {
    alert("You must be logged in to loan a book.");
    return;
  }

  try {
    await loanBook(userId, bookId); // Call the loanBook function
    alert("Book loaned successfully!"); // Provide feedback to the user
    loanBtn.disabled = true; // Optionally disable the button to prevent duplicate loans
  } catch (error) {
    console.error("Error loaning book:", error);
    alert("Failed to loan the book. Please try again later.");
  }
}

// Attach event listener to the Loan button
if (loanBtn) {
  loanBtn.addEventListener("click", handleLoan);
}

// Show error message
function showError(message) {
  const container = document.querySelector(".book-container");
  container.innerHTML = `<p class="error">${message}</p>`;
}

// Start loading when page loads
loadBookDetails(bookId);
