import { logout } from "../services/userService.js";

fetch("navigation.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("navigation-placeholder").outerHTML = data;

    const body = document.body;
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const navList = document.getElementById("navList");
    const header = document.querySelector("header");
    const logoutBtn = document.getElementById("logoutBtn");
    const logoutLi = document.getElementById("logoutBtn").closest("li");
    const loginLi = document.getElementById("loginBtn").closest("li");
    const signupLi = document.getElementById("signupBtn").closest("li");
    const adminLi = document.getElementById("adminBtn").closest("li");
    const profileIcon = document.getElementById("profileIcon");

    // Show/hide elements based on user login status
    const userId = sessionStorage.getItem("user_id");
    const isAdmin = sessionStorage.getItem("is_admin") === "true";

    const headerHeight = header.getBoundingClientRect().height;
    navList.style.maxHeight = `calc(100svh - ${headerHeight}px)`;

    // Show the profile icon only when the user is logged in and not an admin
    profileIcon.style.display = userId && !isAdmin ? "inline" : "none";
    logoutLi.style.display = userId ? "inline" : "none";

    // Hide login and signup links when the user is logged in
    loginLi.style.display = signupLi.style.display = userId ? "none" : "inline";

    // Show the admin page link only for admins
    adminLi.style.display = isAdmin ? "inline" : "none";

    // Toggle the navigation menu and hamburger icon on click
    hamburgerBtn.addEventListener("click", () => {
      const isExpanded = navList.classList.toggle("show");
      hamburgerBtn.classList.toggle("open", isExpanded);
      hamburgerBtn.setAttribute("aria-expanded", isExpanded);

      // Update aria-label based on the menu state
      const newAriaLabel = isExpanded ? "Close menu" : "Open menu";
      hamburgerBtn.setAttribute("aria-label", newAriaLabel);

      body.style.overflow = isExpanded ? "hidden" : "";
    });

    // Close the menu if the screen is resized beyond mobile
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        navList.classList.remove("show");
        hamburgerBtn.classList.remove("open");
        hamburgerBtn.setAttribute("aria-expanded", "false");
        hamburgerBtn.setAttribute("aria-label", "Open menu"); // Reset to "Open menu"
        body.style.overflow = "";
      }
    });

    // Highlight the active navigation link
    const currentPath = window.location.pathname.split("/").pop();
    document.querySelectorAll("nav a").forEach((link) => {
      if (link.getAttribute("href") === currentPath) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      }
    });

    logoutBtn.addEventListener("click", () => {
      logout();
    });
  })
  .catch((error) => console.error("Error loading navigation:", error));
