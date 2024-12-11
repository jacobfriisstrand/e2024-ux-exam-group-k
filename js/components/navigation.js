// Load the navigation into the placeholder
fetch('navigation.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('navigation-placeholder').outerHTML = data;

    // Now that the navigation is loaded, add the event listener for the hamburger menu
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navList = document.getElementById('navList');

    // Add event listener for the hamburger button
    hamburgerBtn.addEventListener('click', () => {
      // Toggle the 'show' class on the navigation menu
      navList.classList.toggle('show');

      // Toggle the 'aria-expanded' attribute on the hamburger button
      const isExpanded = navList.classList.contains('show');
      hamburgerBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    });

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
