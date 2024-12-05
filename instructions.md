## Role

You are a junior web developer, creating a front-end web application for an online e-book library system.

You must create all the neccesary files, and code examples for all the features listed below.

You must use simple, plain javascript, but make it extensible, and modular.

You must not use any javascript directly in HTML files, but only import necccesary files that are used in the pages.

You must create the following HTML pages
index.html
browse.html
login.html
signup.html

also, create a simple navigation.

## Features

### User Access

- **Authentication**

  - Sign up
  - Log in/out
  - Edit profile information (except password and membership date)
  - Account deletion

- **Book Management**
  - View random books list
  - Search books by title
  - View books by author
  - View specific book details
  - Loan books (30-day period, requires login)

### Admin Access

- **Authentication**

  - Login credentials:
    - Email: admin.library@mail.com
    - Password: WebUdvikling24!

- **Management Features**
  - View book information including loan history
  - Add new books
  - Add new authors
  - Add new publishers

## Technical Requirements

### Core Technologies

- HTML5
- CSS3
- JavaScript (Vanilla)

### Restrictions

- No front-end libraries (Bootstrap, Tailwind, etc.)
- No JavaScript libraries (jQuery, etc.)
- No JavaScript frameworks (React, Angular, Vue, Svelte)

### Code Standards

#### HTML

- Use semantic HTML with focus on landmark elements
- HTML5 syntax (not XHTML)
- Entry point must be `index.html`
- Use `<em>` and `<strong>` instead of `<i>` and `<b>`
- Avoid `<br>` tags
- All paths must be relative

#### CSS

- Colors and font families must use CSS custom properties
- Avoid pixel units except for:
  - Breakpoints
  - Fixed sizes (e.g., images)
  - 1px borders
- Fonts must be loaded in CSS
- Full responsive design implementation
- Use of modern layout tools (flexbox, grid)

#### JavaScript

- Use of `const` and `let`
- Modular code structure
- Session storage for user authentication

### Accessibility Requirements

- Color contrast compliance
- Simple, readable fonts
- Keyboard navigation support
- ARIA labels implementation
- Appropriate form input types
- Semantic use of `<a>` and `<button>`
- Minimum touch element sizes

### Performance Considerations

- Optimized image formats and sizes
- Efficient external font loading
- Deferred CSS loading when applicable
- Lazy loading of JavaScript when applicable
- Module-based JavaScript implementation

### User Authentication

- Sign-up requirements:
  - Valid email address
  - Password requirements:
    - Minimum 8 characters
    - Lowercase letters
    - Uppercase letters
    - Numbers
    - Special characters
    - Password confirmation match

## API Integration

The application connects to the Library API for all data operations. Refer to the [API documentation](https://github.com/arturomorarioja/py_library_api_v2) for available endpoints and usage.

## Development Notes

- Code should remain readable (no minification/bundling)
- Focus on maintainable and clean code structure
- Implement proper error handling
- Ensure responsive design across all viewport sizes
