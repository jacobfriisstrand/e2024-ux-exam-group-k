fetch('navigation.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('navigation-placeholder').outerHTML = data;

    const body = document.body;
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navList = document.getElementById('navList');
    const logoutBtn = document.getElementById('logoutBtn');
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const adminIcon = document.getElementById('adminIcon'); // Admin icon

    // Show/hide buttons based on user login status
    const userId = sessionStorage.getItem('user_id'); // or localStorage.getItem('user_id');
    const isAdmin = sessionStorage.getItem('is_admin') === 'true'; // Check admin status

    logoutBtn.style.display = userId ? 'inline' : 'none';
    loginBtn.style.display = signupBtn.style.display = userId ? 'none' : 'inline';

    // Show/hide admin icon based on admin login status
    adminIcon.style.display = isAdmin ? 'inline' : 'none';

    // Toggle the navigation menu and hamburger icon on click
    hamburgerBtn.addEventListener('click', () => {
      const isExpanded = navList.classList.toggle('show');
      hamburgerBtn.classList.toggle('open', isExpanded);
      hamburgerBtn.setAttribute('aria-expanded', isExpanded);
      body.style.overflow = isExpanded ? 'hidden' : '';
    });

    // Close the menu if the screen is resized beyond mobile
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        navList.classList.remove('show');
        hamburgerBtn.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
      }
    });

    // Highlight the active navigation link
    const currentPath = window.location.pathname.split('/').pop();
    document.querySelectorAll('nav a').forEach(link => {
      if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  })
  .catch(error => console.error('Error loading navigation:', error));
