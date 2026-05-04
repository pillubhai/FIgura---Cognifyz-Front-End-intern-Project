FIGURA — Frontend Internship Project
=====================================
Cognifyz Technologies | Frontend Development Tasks
Developer: Aryan Anand Pilankar

FILE STRUCTURE
--------------
index.html           → Home page
about.html           → About Us page
products.html        → Shop page
contact.html         → Contact page
login.html           → Login page
signup.html          → Sign Up page
forgot-password.html → Forgot Password page
styles.css           → All CSS styling
script.js            → All JavaScript
README.txt           → This file

TASK BREAKDOWN
--------------

TASK 1 — Basic HTML Structure
  File: index.html
  - Proper DOCTYPE, <html>, <head>, <body>
  - Semantic tags: <nav>, <section>, <main>, <footer>
  - <title> tag, meta charset and viewport

TASK 2 — CSS Styling (Inline)
  File: index.html
  - Inline styles on hero-badge and hero-tag elements
  - Demonstrates inline CSS alongside external stylesheet

TASK 3 — Responsive Design
  File: styles.css (bottom — Responsive Media Queries section)
  - 900px: hero collapses to single column, collections stack
  - 600px: hamburger menu, 2-col product grid, sidebar becomes horizontal
  - 380px: single column product grid

TASK 4 — JavaScript DOM Manipulation
  File: script.js + index.html
  - Theme switcher: 4 themes (Light, Dark, Cream, Midnight)
    updates CSS variables so entire page changes
  - Cart counter updates on Add to Cart
  - Navbar shrinks on scroll
  - Hamburger toggles mobile nav

TASK 5 — API Integration
  Files: products.html, script.js
  - Fetches all products from https://fakestoreapi.com/products
  - Sidebar category filter (Men, Women, Jewelery, Electronics)
  - Sidebar sort (Default, Price Low-High, Price High-Low, Top Rated)
  - URL param support: products.html?cat=electronics auto-filters
  - New Arrivals section on home fetches first 3 products

TASK 6 — Form Validation
  Files: contact.html, login.html, signup.html, forgot-password.html, script.js
  - Contact: name, email, phone, subject, message validation
  - Login: email format, password min 6 chars
  - Signup: name, email, password min 8 chars, confirm match
  - Forgot Password: email format check
  - Inline error messages, success banners

TASK 7 — Bootstrap Integration
  Files: all HTML files
  - Bootstrap 5.3 via CDN
  - Bootstrap grid (row/col) for values and about sections
  - Bootstrap form-control, form-select on contact/auth forms
  - Bootstrap utility classes throughout (d-flex, gap, container, py-5 etc.)

ADDITIONAL FEATURES
-------------------
- Cart Drawer: slides in from right, shows items, prices, remove button, total
- Search Bar: expands in navbar, filters product cards live as you type
- Scroll To Top: button appears after scrolling 400px, smooth scrolls back up
- Marquee ticker: scrolling announcement bar below hero
- Men/Women collection banners with redirect to shop
- Featured Pieces: category buttons redirect to filtered shop page
- Brand intro section with link to About page
- About page: hero, mission, values, team, CTA
- Auth pages: Login, Sign Up, Forgot Password with full validation
- Theme switcher: 4 color themes using CSS variables
- Creator section: Aryan Anand Pilankar — Cognifyz Technologies

WHAT I LEARNED
--------------
While building this project, I learned how the Fetch API works by loading
products from FakeStore API and rendering them inside the page with JavaScript.

I also practiced the async and await JavaScript concept. Earlier, API calls felt
confusing, but using async/await helped me understand how to wait for the data
before updating the UI.

I faced some CSS styling issues while making the layout responsive, especially
with the navbar, product cards, cart drawer, and mobile screen spacing. Fixing
those parts helped me understand media queries, grids, spacing, and reusable
CSS variables better.

HOW TO RUN
----------
1. Open index.html in any modern browser
2. Use Live Server (VS Code) for best results
3. Internet required for: Bootstrap CDN, Google Fonts, FakeStore API

PAGES
-----
index.html           → Home
about.html           → About Us
products.html        → Shop (with sidebar filter + sort)
contact.html         → Contact Form
login.html           → Login
signup.html          → Sign Up
forgot-password.html → Forgot Password
