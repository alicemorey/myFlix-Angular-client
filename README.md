# MyFlixAngularClient

MyFlix is an Angular-based client-side application for a movie database, allowing users to browse movies, view details about directors, genres, and add/remove favorites. The app uses an API that provides data for movies, directors, and users.

**Features**
- User Registration and Login
- Browse a list of movies
- View details about specific movies, genres, and directors
- Add or remove movies from a personal list of favorite movies
- Edit user profile information
- Delete User
  
**Technologies Used**

Angular: Framework used for building the application.
Angular Material: Used for UI components.
TypeScript: Strongly-typed superset of JavaScript.
TypeDoc: For generating documentation.
SCSS: Styling.
API Integration: Communicates with the MyFlix API (created with Node.js/Express).

# Installation and Setup Instructions

**Prerequisites**
Node.js (Version 20.11.0 or later)
Angular CLI (Version 18.2.0 or later)

# Steps to Install:
** 1. Clone the repository:**


`git clone https://github.com/your-username/myFlix-Angular-client.git`

`cd myFlix-Angular-client`


**2. Install the dependencies:**

`npm install`


# Development Server
To start the application, run:

`ng serve`

Navigate to `http://localhost:4200/`to see the app in action. 
The app will reload automatically if you make changes to any source files.

# Build for Production
To build the project for production, run:

`ng build --prod`

The build artifacts will be stored in the dist/ directory. This is the folder that can be deployed to a web server.

**Running Unit Tests**
To run unit tests using Karma, run:

`ng test`

**Running End-to-End Tests**
To run end-to-end tests using a platform of your choice (e.g., Protractor), first install the required package and then run:

`ng e2e`

# API Endpoints
The application communicates with the Movies API hosted at `https://myflix-movies2024-b07bf2b16bbc.herokuapp.com/` The key endpoints are:

`/movies`:a list of all movies
`/movies/:title`: Retrieve details of a specific movie.
`/movies/:title/directors`: Retrieve the director of a specific movie.
`/movies/:title/genres`: Retrieve genres associated with a specific movie.
`/users`: Manage user registration and profile.
`/users/:userId/movies/:movieId`: Add/remove movies from favorites.

# User Stories
- As a user, I want to register, log in, and log out.
- As a user, I want to browse through a list of movies.
- As a user, I want to be able to information on a movies, such as directors and genres.
- As a user, I want to add or remove movies from my favorites list.
- As a user, I want to edit my profile information, such as username, email, and date of birth.
- As a user, I want to be able to delete my user profile.
  
# Deployment
This project is currently deployed using GitHub Pages. You can view the live version at:

- [Live App]("https://alicemorey.github.io/myFlix-Angularapp/")

To deploy, run the following command:

`ng deploy --base-href=/myFlix-Angular-client/`

# Documentation
You can find detailed API documentation generated with JSDoc for the API and TypeDoc for the Angular client.

***TypeDoc:*** Generates documentation for the Angular app.
***JSDoc:*** Generates documentation for the Node.js API.

**To generate the TypeDoc documentation:**

`npx typedoc`

