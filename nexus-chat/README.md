Nexus-Chat
An intelligent, real-time chat application built with the MERN stack and integrated with the Venice.ai LLM. Nexus-Chat is designed to be a modern, scalable, and monetizable PWA.

About The Project
Nexus-Chat is a full-stack chat application created to showcase modern web development practices. Users can engage in real-time conversations with an AI, with plans for subscription-based features. The project leverages a Node.js/Express.js backend for handling AI model routing and a MongoDB database for storing conversation history. The frontend is a responsive React application, installable as a Progressive Web App (PWA).

Built With
Frontend: React, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB

Real-time Engine: Socket.IO

Authentication: JSON Web Tokens (JWT)

AI Integration: Venice.ai

Project Roadmap
This project is being built iteratively. Below is a breakdown of features planned for the initial production build and those on the to-do list for future releases.

✅ Initial Production Build (v1.0)
The goal for the first release is to have a secure, functional, and real-time chat experience. The core features include:

User Authentication: Secure user registration and login using JWT and password hashing (bcrypt.js).

Real-Time Chat Interface: A clean UI where users can send messages and receive responses instantly.

WebSocket Communication: Integration with Socket.IO to push messages between the server and client in real-time.

AI Response Streaming: Use Server-Sent Events (SSE) to stream the AI's response token-by-token for an improved user experience.

Conversation History: Save and retrieve user conversations from the MongoDB database.

Responsive Design: A mobile-first design that works seamlessly across all device sizes.

📝 To-Do List (Future Features)
These features are planned for future releases to enhance the application's functionality, user experience, and commercial viability.

[ ] Advanced State Management: Implement Zustand or Redux Toolkit to manage complex frontend state.

[ ] PWA Offline Support: Cache conversations with a service worker to allow users to view their history while offline.

[ ] Stripe Payment Integration: Introduce subscription tiers for users who want more chat and image completions.

[ ] API Rate Limiting: Protect the backend and manage costs by limiting API requests per user.

[ ] Professional UI Overhaul: Refine the user interface using a component library like shadcn/ui.

[ ] Containerization: Create Dockerfile and docker-compose.yml files to containerize the application for easy and consistent deployment.

Getting Started
To get a local copy up and running follow these simple steps.

Prerequisites
Node.js

npm

npm install npm@latest -g

MongoDB Atlas account or local MongoDB installation.

Installation
Clone the repo

git clone [https://github.com/frontend720/crafted-by-jah.git](https://github.com/frontend720/crafted-by-jah.git)

Install NPM packages for the server

cd server
npm install

Install NPM packages for the client

cd client
npm install

Create a .env file in the server directory and add your environment variables (e.g., MONGO_URI, JWT_SECRET, VENICE_API_KEY).

License
Distributed under the MIT License. See LICENSE.txt for more information.

Contact
Jah Anthony - frontend720@gmail.com

Project Link: https://github.com/frontend720/crafted-by-jah