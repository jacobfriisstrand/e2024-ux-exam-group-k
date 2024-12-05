# KEA Web Development - E2024 - User Experience Exam Project

## Project Setup for Development

1. Clone the backend repository:

```bash
git clone https://github.com/arturomorarioja/py_library_api_v2.git
```

2. Start Docker Desktop

3. In the command line, navigate to the project directory and run:

```bash
docker-compose up -d
```

4. The API will be available at `http://localhost:8080`

## Available API Endpoints

### User Endpoints

- GET `/books?n=<number_of_books>` - Retrieve random books
- GET `/books?s=<search_text>` - Search books by title
- GET `/books?a=<author_id>` - Get books by author
- GET `/books/<book_id>` - Get specific book details
- GET `/authors` - List all authors
- GET `/publishers` - List all publishers
- GET `/users/<user_id>` - Get user information
- POST `/users` - Create new user
- PUT `/users/<user_id>` - Update user information
- DELETE `/users/<user_id>` - Delete user
- POST `/users/login` - User login
- POST `/users/<user_id>/books/<book_id>` - Loan a book

### Admin Endpoints

- GET `/admin/books/<book_id>` - Get book details with loan history
- POST `/admin/books` - Create new book
- POST `/admin/authors` - Create new author
- POST `/admin/publishers` - Create new publisher

For detailed API documentation and response formats, please refer to the [API Documentation](https://github.com/arturomorarioja/py_library_api_v2).
