import { post, get } from "../services/apiService.js";
import CONFIG from "../utils/config.js";
import { createErrorDisplay, ERROR_MESSAGES } from "../utils/errorHandling.js";
import { createPopover } from "../services/popoverService.js";

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

// Validate form inputs
function validateForm(form) {
  let isValid = true;
  const inputs = form.querySelectorAll("input, select");

  inputs.forEach((input) => {
    const errorSpan = document.getElementById(`${input.id}Error`);
    if (!input.checkValidity()) {
      errorSpan.textContent = input.validationMessage;
      isValid = false;
    } else {
      errorSpan.textContent = "";
    }
  });

  return isValid;
}

// Handle book form submission
addBookForm.onsubmit = async function (e) {
  e.preventDefault();
  if (!validateForm(addBookForm)) return;

  const formData = new FormData(addBookForm);

  try {
    const response = await post("/admin/books", formData);
    if (response.book_id) {
      createPopover("Book added successfully!", "success", addBookForm);
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
  if (!validateForm(addAuthorForm)) return;

  const formData = new FormData(addAuthorForm);

  try {
    const response = await post("/admin/authors", formData);
    if (response.author_id) {
      createPopover("Author added successfully!", "success", addAuthorForm);
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
  if (!validateForm(addPublisherForm)) return;

  const formData = new FormData(addPublisherForm);

  try {
    const response = await post("/admin/publishers", formData);
    if (response.publisher_id) {
      createPopover("Publisher added successfully!", "success", addPublisherForm);
      addPublisherForm.reset();
    } else {
      throw new Error(response.error || "Failed to add publisher");
    }
  } catch (error) {
    console.error("Error adding publisher:", error);
    showError(addPublisherForm, error.message);
  }
};

// Show error message using popover
function showError(form, message) {
  const targetElement = form.querySelector('.error-display') || form;
  createPopover(message, 'error', targetElement);
}

// Initialize dropdowns on page load
document.addEventListener("DOMContentLoaded", populateDropdowns);
