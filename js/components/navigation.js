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
    const adminLi = document.getElementById("adminIcon").closest("li");

    // Show/hide buttons based on user login status
    const userId = sessionStorage.getItem("user_id");
    const isAdmin = sessionStorage.getItem("is_admin") === "true";

    const headerHeight = header.getBoundingClientRect().height;
    navList.style.maxHeight = `calc(100svh - ${headerHeight}px)`;

    logoutLi.style.display = userId ? "inline" : "none";
    loginLi.style.display = signupLi.style.display = userId ? "none" : "inline";
    adminLi.style.display = isAdmin ? "inline" : "none";

    // Toggle the navigation menu and hamburger icon on click
    hamburgerBtn.addEventListener("click", () => {
      const isExpanded = navList.classList.toggle("show");
      hamburgerBtn.classList.toggle("open", isExpanded);
      hamburgerBtn.setAttribute("aria-expanded", isExpanded);
      body.style.overflow = isExpanded ? "hidden" : "";
    });

    // Close the menu if the screen is resized beyond mobile
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        navList.classList.remove("show");
        hamburgerBtn.classList.remove("open");
        hamburgerBtn.setAttribute("aria-expanded", "false");
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
