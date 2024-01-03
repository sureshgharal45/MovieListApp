# MovieListApp

A movie list application that allows users to browse movies year-wise by scrolling up and down, filter by genre, search for specific movies, and view detailed information about each movie through modal.

# Folder Structure
# Main Project Folder
 1. gitignore
 2. package.json
 3. package-lock.json
 4. README.md

# Public
 1. favicon.io
 2. index.html
 3. manifest.json
 4. robots.txt

# src
 1. App.js
 2. App.css
 3. index.js
 4. index.css

# src/Components
  1. Header.jsx
  2. Movie.jsx
  3. MovieCard.jsx
  4. MovieDetailsModel.jsx
  5. Navbar.jsx

# src/Pages
  1. Home.js

# src/Styles
  1. moviecard.css
  2. moviedetailsmodel.css

# Covered Features
# Year-Wise Movie Listing
 1. Displays movies categorized by year with 20 movies per year. When a user lands on the page, displaying a list of movies of the year 2012 by default.
 2. Smooth Scrolling functionality loads the next year's movies as users scroll down until the current year and previous years movies as users scroll up.

# Genre Filtering
1. Genre Tabs for different genres allow users to filter movies based on their preferred genres.
2. Genre filtering is applicable both in the main movie list and search results data as well.

# Detailed Movie Information
1. Clicking on a movie card opens up modal and fetches the detailed information such as movie title, image, genre, cast, director and short description.

# Search Functionality
1. Search input box allows users to search for specific movies by title.
2. Search results dynamically update based on user input.
3. Genre filtering can be applied to the search results data for a refined search experience.

# Uncovered Features
  None.

# Usage
1. Year-wise Browsing: Scroll to navigate through movies categorized by year. (previous and next years and by default movie listing would be for 2012 year).
2. Genre Filtering: Click on genre tabs to filter movies based on specific genres that is being displayed.
3. Detailed Movie View: Click on a movie card and opens up modal to view detailed information such as movie title, image, description, cast, and directors for that movie.
4. Search functionality: Use the search input box to find movies by title. Apply genre filters to the search results data for a more targeted search.

# Prerequisite to run the project
1. Nodejs
2. Package Manager: Either npm which comes with Node.js or Yarn. You can install Yarn from yarnpkg.com

# Installation and Setup (To run the project)
1. Clone the respository using `git clone https://github.com/username/MovieListApp`
2. Navigate to the project directory using cd.
3. Install dependencies using npm install or yarn install.
4. Run the application using npm start or yarn start.

# Technologies and Libraries Used:
1. HMTL
2. CSS
3. JS
4. React
5. axios
6. react-curved-text

# Project status
Completed and open for your contributions.

# License
  None.
