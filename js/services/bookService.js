import { get, post } from "./apiService.js";
import CONFIG from "../utils/config.js";

// TODO: remove simulation of error handling

// Get random books
async function getBooks(count = 12) {
  try {
    if (CONFIG.SIMULATE_ERROR) {
      throw new Error("Simulated API failure");
    }

    const books = await get(`${CONFIG.ENDPOINTS.BOOKS}?n=${count}`);

    if (books.error) {
      throw new Error(books.error);
    }

    const booksWithDetails = await Promise.all(
      books.map(async (book) => {
        const details = await getBookDetails(book.book_id);
        return {
          ...book,
          cover: details.cover || "",
        };
      })
    );

    return booksWithDetails;
  } catch (error) {
    console.error("Error in getBooks:", error);
    throw error;
  }
}

// Search books by title
async function searchBooks(searchTerm) {
  if (CONFIG.SIMULATE_ERROR) {
    throw new Error("Simulated API failure");
  }

  const books = await get(CONFIG.ENDPOINTS.BOOKS, { s: searchTerm });
  const booksWithCovers = await Promise.all(
    books.map(async (book) => {
      const details = await getBookDetails(book.book_id);
      return { ...book, cover: details.cover };
    })
  );

  return booksWithCovers;
}

// Get books by author
async function getBooksByAuthor(authorId) {
  if (CONFIG.SIMULATE_ERROR) {
    throw new Error("Simulated API failure");
  }

  const books = await get(CONFIG.ENDPOINTS.BOOKS, { a: authorId });
  const booksWithCovers = await Promise.all(
    books.map(async (book) => {
      const details = await getBookDetails(book.book_id);
      return { ...book, cover: details.cover };
    })
  );

  return booksWithCovers;
}

// Get single book details
async function getBookDetails(bookId) {
  if (CONFIG.SIMULATE_ERROR) {
    throw new Error("Simulated API failure");
  }

  return get(`${CONFIG.ENDPOINTS.BOOKS}/${bookId}`);
}

// Get all authors
async function getAllAuthors() {
  if (CONFIG.SIMULATE_ERROR) {
    throw new Error("Simulated API failure");
  }

  return get(CONFIG.ENDPOINTS.AUTHORS);
}

// Get all publishers
async function getAllPublishers() {
  if (CONFIG.SIMULATE_ERROR) {
    throw new Error("Simulated API failure");
  }

  return get(CONFIG.ENDPOINTS.PUBLISHERS);
}

// Loan a book
async function loanBook(userId, bookId) {
  if (CONFIG.SIMULATE_ERROR) {
    throw new Error("Simulated API failure");
  }

  return post(`${CONFIG.ENDPOINTS.USERS}/${userId}/${CONFIG.ENDPOINTS.BOOKS}/${bookId}`);
}

// Show all Loans as admin
async function getAllLoans(bookId) {
  if (CONFIG.SIMULATE_ERROR) {
    throw new Error("Simulated API failure");
  }

  return get(`${CONFIG.ENDPOINTS.ADMIN}/${CONFIG.ENDPOINTS.BOOKS}/${bookId}`);
}

export { getBooks, searchBooks, getBooksByAuthor, getBookDetails, getAllAuthors, getAllPublishers, loanBook, getAllLoans };
