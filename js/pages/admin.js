import { post, get } from "../services/apiService.js";
import CONFIG from "../utils/config.js";
import { createErrorDisplay, ERROR_MESSAGES } from "../utils/errorHandling.js";

// Get form elements
const addBookForm = document.getElementById("addBookForm");
const addAuthorForm = document.getElementById("addAuthorForm");
const addPublisherForm = document.getElementById("addPublisherForm");

// Get dropdown elements
const authorSelect = document.getElementById("author");
const publisherSelect = document.getElementById("publishingCompany");

// Populate dropdowns with authors and publishers
async function populateDropdowns() {
  try {
    // Fetch authors
    const authors = await get("/authors");
    if (authors && Array.isArray(authors)) {
      authors.forEach(author => {
        const option = document.createElement("option");
        option.value = author.author_id;
        option.textContent = author.author_name;
        authorSelect.appendChild(option);
      });
    } else {
      throw new Error("Failed to fetch authors");
    }

    // Fetch publishers
    const publishers = await get("/publishers");
    if (publishers && Array.isArray(publishers)) {
      publishers.forEach(publisher => {
        const option = document.createElement("option");
        option.value = publisher.publisher_id;
        option.textContent = publisher.publisher_name;
        publisherSelect.appendChild(option);
      });
    } else {
      throw new Error("Failed to fetch publishers");
    }
  } catch (error) {
    console.error("Error loading authors or publishers:", error);
    showError(addBookForm, "Failed to load authors or publishers.");
  }
}

// Handle book form submission
addBookForm.onsubmit = async function (e) {
  e.preventDefault();
  const formData = new FormData(addBookForm);

  try {
    const response = await post("/admin/books", formData);
    if (response.book_id) {
      alert("Book added successfully!");
      addBookForm.reset();
    } else {
      throw new Error(response.error || "Failed to add book");
    }
  } catch (error) {
    console.error("Error adding book:", error);
    showError(addBookForm, error.message);
  }
};

// Handle author form submission
addAuthorForm.onsubmit = async function (e) {
  e.preventDefault();
  const formData = new FormData(addAuthorForm);

  try {
    const response = await post("/admin/authors", formData);
    if (response.author_id) {
      alert("Author added successfully!");
      addAuthorForm.reset();
    } else {
      throw new Error(response.error || "Failed to add author");
    }
  } catch (error) {
    console.error("Error adding author:", error);
    showError(addAuthorForm, error.message);
  }
};

// Handle publisher form submission
addPublisherForm.onsubmit = async function (e) {
  e.preventDefault();
  const formData = new FormData(addPublisherForm);

  try {
    const response = await post("/admin/publishers", formData);
    if (response.publisher_id) {
      alert("Publisher added successfully!");
      addPublisherForm.reset();
    } else {
      throw new Error(response.error || "Failed to add publisher");
    }
  } catch (error) {
    console.error("Error adding publisher:", error);
    showError(addPublisherForm, error.message);
  }
};

// Show error message
function showError(form, message) {
  const errorDisplay = createErrorDisplay(message);
  form.appendChild(errorDisplay);
}

// Initialize dropdowns on page load
document.addEventListener("DOMContentLoaded", populateDropdowns);
