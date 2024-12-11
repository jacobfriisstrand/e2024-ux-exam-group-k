// Load the navigation into the placeholder
fetch('navigation.html')
.then(response => response.text())
.then(data => {
  document.getElementById('navigation-placeholder').outerHTML = data;

  // Add active class after the navigation is inserted
  const currentPath = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
})
.catch(error => console.error('Error loading navigation:', error));