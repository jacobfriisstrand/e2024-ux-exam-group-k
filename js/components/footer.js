// footer.js
fetch('footer.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('footer-placeholder').outerHTML = data; // Replace the footer placeholder with the actual footer
  })
  .catch(error => console.error('Error loading footer:', error));
