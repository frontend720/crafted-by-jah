
Paint & Sip Scheduler

Overview

Welcome to Paint & Sip Scheduler, a full-stack application designed to connect aspiring artists with talented models and instructors for engaging paint and sip sessions. This platform allows users to browse model profiles, book upcoming sessions, and manage their personal profiles. Models can create and manage their profiles, showcase their work, and schedule teaching sessions. The store owner will have ultimate read and write access to all model and customer data, ensuring comprehensive oversight and management.
Features

User Features

 * User Profiles: Create and manage editable personal profiles.
 * Browse Models: Discover and view profiles of available paint and sip models.
 * Session Booking: Easily book upcoming paint and sip sessions directly from a model's profile.
 * View Bookings: See a comprehensive list of all booked sessions.

 Tindr like user-interface with an additional search textfield for direct model search

Model/Instructor Features

 * Model Profiles: Create and manage editable model profiles, including portfolios and biographies.
 * Session Creation: Intuitive form-based system for creating and scheduling new teaching sessions, including date, time, and session details.
 * Manage Sessions: View and manage all created teaching sessions.

Store Owner Features

 * Ultimate Access: Full read and write permissions for all customer and model profiles.
 * Data Management: Ability to view, edit, and delete any user or model information.

General Features

 * Next Session Display: Each model's profile prominently displays their next available sitting session or teaching session date and time.
 * Responsive Design: Optimized for a seamless experience across various devices.

Tech Stack

The Paint & Sip Scheduler is built with the MERN stack, offering a robust and scalable architecture:
 * MongoDB: A NoSQL database for flexible and efficient data storage.
 * Express.js: A fast, unopinionated, minimalist web framework for Node.js, used for building the RESTful API.
 * React: A JavaScript library for building user interfaces, providing a dynamic and interactive front-end experience.
 * Node.js: A JavaScript runtime built on Chrome's V8 JavaScript engine, used for the back-end server.

Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites

 * Node.js (LTS version recommended)
 * npm (comes with Node.js) or Yarn
 * MongoDB (local installation or a cloud service like MongoDB Atlas)

Installation

 * Clone the repository:
   git clone <repository_url>
cd paint-sip-scheduler

 * Install client dependencies:
   cd client
npm install # or yarn install

 * Install server dependencies:
   cd ../server
npm install # or yarn install

 * Configure environment variables:
   Create a .env file in the server directory and add the following:
   PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

# Add any other necessary environment variables

   Replace your_mongodb_connection_string with your actual MongoDB connection string and your_jwt_secret_key with a strong, random string.
Running the Application
 * Start the back-end server:
   cd server
npm start # or yarn start

   The server will typically run on http://localhost:5000 (or the port specified in your .env file).
 * Start the front-end development server:
   cd client
npm start # or yarn start

   The React app will typically open in your browser at http://localhost:3000.
API Endpoints
(This section would typically be more detailed with specific routes, request bodies, and response structures. For brevity, a general outline is provided.)
User Endpoints
 * POST /api/auth/register - Register a new user
 * POST /api/auth/login - User login
 * GET /api/users/:id - Get user profile
 * PUT /api/users/:id - Update user profile
 * GET /api/users/:id/bookings - Get user's bookings
 * POST /api/bookings - Book a session
Model Endpoints
 * POST /api/models - Create a new model profile
 * GET /api/models - Get all model profiles
 * GET /api/models/:id - Get a single model profile
 * PUT /api/models/:id - Update a model profile
 * POST /api/models/:id/sessions - Create a new teaching session for a model
 * GET /api/models/:id/sessions - Get all teaching sessions for a model
Session Endpoints
 * GET /api/sessions - Get all sessions (teaching and sitting)
 * GET /api/sessions/:id - Get a single session
Project Structure
paint-sip-scheduler/
├── client/                     # React frontend
│   ├── public/                 # Public assets
│   ├── src/                    # React source code
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── server/                     # Node.js/Express backend
    ├── config/                 # Database configuration
    ├── controllers/            # API logic
    ├── models/                 # Mongoose schemas
    ├── routes/                 # API routes
    ├── .env.example
    ├── server.js               # Main server file
    └── package.json

Contributing
We welcome contributions! Please feel free to fork the repository, create a new branch, and submit a pull request.
License
This project is licensed under the MIT License - see the LICENSE.md file for details.
Contact
For any questions or inquiries, please contact [frontend720@gmail.com].
Let me know if you'd like any other details added or modified!