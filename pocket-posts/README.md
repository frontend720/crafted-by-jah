#Pocket Posts
##About The Project
Twitter is a fantastic source of timely video content, but its built-in bookmarking feature is a catch-all for tweets, articles, and images. I wanted to create a tool specifically for video enthusiasts—a personal, searchable library of just the clips they love.
This application is a frontend-only tool that allows users to sign up for an account, search for any public Twitter user, and browse through their video history. With a single click, a user can save a video's URL to their private collection. The "Saves" page provides a custom video player experience to view and manage their curated library.

Key Features
User Authentication: Secure user sign-up and login functionality to ensure every user has their own private collection, powered by Firebase Authentication.

Search by Twitter Handle: Dynamically fetches and displays a user's video media by querying the Twitter API.

"Infinite Scroll": A "Continue" button allows users to load more tweets and browse deeper into a user's media history.

One-Click Saving: Easily save any video from the search results to your personal collection.

Personal Video Library: A dedicated "Saves" page to view and manage all your saved video clips, stored securely in Firebase Firestore.

Custom Video Player: A clean, modern video player with playback speed controls and auto-play functionality.

Built With
This project is a single-page application built with modern frontend tools and a robust backend-as-a-service.

Ionic React

React.js

React Context API (for state management)

Firebase Authentication (for user management)

Firebase Firestore (for the video library)

Axios (for Twitter API requests)

React Player

Day.js (for relative timestamps)

Swiper.js (for touch sliders)

styled-components (for component styling)

Challenges & Lessons Learned
Moving from a full-stack MERN application to a frontend-only project with Firebase brought a new set of challenges and provided invaluable experience in modern application development.

User Authentication & Data Storage: The most challenging part was migrating the authentication and database logic to Firebase. I learned the power of a backend-as-a-service, which simplified user sign-up and login. I had to carefully design my Firestore data model, creating a root collection for users with a subcollection of their saved videos, which is a robust and scalable pattern.

Real-time Data and Firestore Queries: This project forced me to move beyond simple REST API calls. I learned to work with Firestore's asynchronous listeners, which provide real-time updates to the UI when the database changes. Implementing the "Saves" page required me to master Firestore queries, specifically using the where method to filter videos by the authenticated user's ID.

State Management & UI Synchronization: I learned the importance of having a reliable, centralized state management system. Using React's Context API, I created an AuthContext to handle user state and an AxiosContext to handle API functions. A key lesson was learning how to properly trigger UI updates after a database operation (like deleting a video) by creating a "trigger state" that forces a re-fetch of the data.

Debugging Asynchronous Logic: I encountered a persistent issue where Firestore data wasn't appearing on the "Saves" page. By using Firebase's browser tools and strategic console.log statements, I traced the issue to misconfigured Firebase security rules that were silently denying read access to the data. This taught me to never make assumptions about backend-as-a-service data flow and always verify security rules.

Mastering Modern Firebase (v9+) Syntax: While implementing data fetching, I ran into a TypeError: collection is not a function. This was a valuable lesson in the shift from Firebase SDK v8's class-based syntax (e.g., db.collection()) to the modern, modular v9 syntax. I learned to import functions like collection and getDocs directly. This also provided an opportunity to refactor traditional .then() promise chains into the cleaner and more readable async/await syntax, improving the overall quality of my asynchronous code.

Administrative Tooling vs. Client-Side APIs: During development, I accidentally created over 200 test users. When I tried to delete them, I learned a critical lesson about security boundaries: the client-side Web API is untrusted and can only manage the currently logged-in user. To solve this, I had to master the Firebase CLI. This experience taught me how to perform bulk administrative tasks, export user data for analysis, and manage the correct project environment from the command line using firebase use <project-id>. It solidified the difference between client-side operations and secure, administrative backend management.

Getting Started
To get a local copy up and running, follow these simple steps.

Prerequisites
Node.js (v16 or later)

npm

A Firebase account

Installation
Clone the repo

git clone [https://github.com/frontend720/twitclippy.git](https://github.com/frontend720/twitclippy.git)


Install NPM packages

npm install


Set up Firebase

Create a new project in the Firebase console.

Enable Authentication and Firestore Database.

Go to Project Settings and copy your Firebase SDK snippet.

Create a .env.local file in the root directory and add your environment variables:

VITE_FIREBASE_API_KEY='your_api_key'
VITE_FIREBASE_AUTH_DOMAIN='your_auth_domain'
VITE_FIREBASE_PROJECT_ID='your_project_id'
VITE_FIREBASE_STORAGE_BUCKET='your_storage_bucket'
VITE_FIREBASE_MESSAGING_SENDER_ID='your_messaging_sender_id'
VITE_FIREBASE_APP_ID='your_app_id'
VITE_TWITTER_API_KEY='your_twitter_api_key'
VITE_TWITTER_AUTH_DOMAIN='twitter154.p.rapidapi.com'


Start the app

ionic serve


Future Improvements
Allow users to create and manage multiple, named collections.

Add search and filter functionality to the "Saves" page.

Implement folder organization for saved clips.

Fetch and display video thumbnails in the search results.

Contact
Jared Manwaring - [frontend720@gmail.com]

Project Link: [https://github.com/frontend720/crafted-by-jah/tree/main/pocket-posts]