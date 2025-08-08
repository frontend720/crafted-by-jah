# **Project Title: Session Tracker**

## **Project Description**

Session Tracker is a full-stack web application designed for personal trainers to streamline their business operations. The application's core feature is a modular session-tracking system that moves beyond traditional session packages. Trainees can purchase and use 20-minute session "units" to book flexible sessions, while trainers can easily manage their schedules and redeem units with a simple, automated process. This project is built using the MERN stack.

## **Key Features**

  * **User Authentication**: Secure sign-up and login for both trainers and trainees.
  * **Modular Session Units**: A unique system where all sessions are based on 20-minute units. Trainees can book 20-minute (1 unit), 40-minute (2 units), or 60-minute (3 units) meetings.
  * **Trainer Dashboard**: A dedicated interface for trainers to view their schedule, manage their client list, and redeem session units.
  * **Trainee Dashboard**: A clean dashboard for trainees to track their remaining session units, view their session history, and book new appointments.
  * **Flexible Packages**: Supports the purchase of session packages (e.g., 10 units) as well as the option to purchase individual units.
  * **Automated Redemption**: When a session is marked as complete by the trainer, the correct number of units is automatically deducted from the trainee's account.

## **Technologies Used**

### **Backend**

  * **Node.js**: The runtime environment for the server.
  * **Express.js**: The web framework used to build the RESTful API.
  * **MongoDB**: A NoSQL database for storing user data, sessions, and client information.
  * **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
  * **bcrypt**: For hashing passwords and securing user accounts.
  * **JWT (JSON Web Tokens)**: For user authentication and authorization.

### **Frontend**

  * **React**: The JavaScript library for building the user interface.
  * **React Router**: For handling client-side routing.
  * **State Management**: (e.g., React Context, Redux, or Zustand)
  * **Styling**: (e.g., CSS, SASS, or a styling library like Tailwind CSS or Material-UI)

## **Installation and Setup**

Follow these steps to get the project up and running on your local machine.

### **Prerequisites**

  * Node.js (v14.x or higher)
  * MongoDB (locally or via a cloud service like MongoDB Atlas)

### **Backend Setup**

1.  Clone the repository:
    ```bash
    git clone [Your Repository URL]
    cd [Project Folder Name]
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the root directory with the following variables:
    ```
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    PORT=5000
    ```
4.  Start the backend server:
    ```bash
    npm start
    ```

### **Frontend Setup**

1.  Navigate to the client directory:
    ```bash
    cd client
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Start the React development server:
    ```bash
    npm start
    ```

The application should now be running on `http://localhost:3000` for the frontend and `http://localhost:5000` for the backend API.

## **Contribution Guidelines**

(This section is for if you plan to have others work on the project with you. You can fill this in with details on how you want others to contribute.)

## **License**

This project is licensed under the MIT License - see the LICENSE.md file for details.