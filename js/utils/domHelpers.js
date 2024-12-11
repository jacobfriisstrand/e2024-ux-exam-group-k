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
  return `
    <article class="book-card">
      <a href="book.html?id=${book.book_id}" class="book-link">
        <img 
          src="${book.cover || "https://picsum.photos/200/300"}" 
          alt="${book.cover ? book.title : "No cover available"}" 
          class="book-cover"
        />
        <h3>${book.title}</h3>
        <p class="author">by ${book.author}</p>
        <p class="year">Published: ${book.publishing_year}</p>
      </a>
    </article>
  `;
}
