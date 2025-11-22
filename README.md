# CourseFlow - A Full-Stack Course Management System

CourseFlow is a modern, full-stack web application designed to provide a seamless experience for students and instructors. Users can browse a wide range of courses, enroll with a single click, and manage their learning journey. Instructors can add, update, and manage their own courses through a secure dashboard.

### 🔴 **Live Website:** [https://course-management-bd.web.app/](https://course-management-bd.web.app/)

---

## Key Features

### General Features
* **User Authentication:** Secure user registration and login system using Firebase Authentication (Email/Password).
* **JWT-Powered Security:** API endpoints are protected using Firebase ID Tokens (JWT) to ensure secure data transactions.
* **Fully Responsive Design:** The user interface is optimized for a seamless experience on desktops, tablets, and mobile devices.
* **Dynamic Homepage:** An engaging homepage featuring an animated banner slider, sections for popular and latest courses, testimonials, and top instructors.

### Student Features
* **Browse & Search:** Students can browse the full catalog of available courses and search for specific topics.
* **Detailed Course View:** Each course has a detailed page with information about the curriculum, instructor, duration, and seat availability.
* **One-Click Enrollment:** Students can easily enroll in courses. There is a limit of **3 concurrent enrollments** per student.
* **My Enrolled Courses:** A personalized dashboard where students can view all the courses they are currently enrolled in and un-enroll if needed.

### Instructor Features
* **Course Management (CRUD):** Instructors can **C**reate, **R**ead, **U**pdate, and **D**elete their own courses.
* **Secure Dashboard:** Instructors can only manage the courses they have created, ensuring data integrity and ownership.
* **Limited Seats:** Instructors can specify a limited number of seats for each course.

---

## Technologies Used

* **Frontend:**
    * React
    * Vite
    * Tailwind CSS (with DaisyUI)
    * React Router
    * Axios (for API calls)
    * Firebase (for authentication)
    * Framer Motion (for animations)
    * React Slick (for carousel)
    * SweetAlert2 & React Hot Toast (for notifications)

* **Backend:**
    * Node.js
    * Express.js
    * MongoDB
    * CORS
    * JSON Web Token (JWT) - via Firebase Admin SDK

* **Database:**
    * MongoDB Atlas

* **Deployment:**
    * **Frontend (Client):** Firebase Hosting
    * **Backend (Server):** Vercel

---

## Getting Started (Local Setup)

To run this project on your local machine, please follow the steps below.

### Prerequisites
* Node.js and npm installed on your machine.
* A MongoDB Atlas account.
* A Firebase project with Authentication enabled.
* A Vercel account.

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd <your-project-folder>
```

### 2. Backend Setup
```bash
# Navigate to the server directory
cd server

# Install dependencies
npm install

# Create a .env file in the 'server' directory
# and add the following variables
```
**`server/.env` file:**
```
MONGO_URI="your_mongodb_connection_string_here"
# If using custom JWT
# JWT_SECRET="your_jwt_secret_here" 
# If using Firebase Admin
# FIREBASE_SERVICE_ACCOUNT='your_firebase_service_account_json_content_here'
```

```bash
# Run the server
npm run dev
```

### 3. Frontend Setup
```bash
# Open a new terminal and navigate to the client directory
cd client

# Install dependencies
npm install

# Create a .env.local file in the 'client' directory
# and add your Firebase configuration
```
**`client/.env.local` file:**
```
VITE_API_KEY="your_firebase_api_key"
VITE_AUTH_DOMAIN="your_firebase_auth_domain"
VITE_PROJECT_ID="your_firebase_project_id"
VITE_STORAGE_BUCKET="your_firebase_storage_bucket"
VITE_MESSAGING_SENDER_ID="your_firebase_messaging_sender_id"
VITE_APP_ID="your_firebase_app_id"
```
```bash
# Run the client application
npm run dev
```

The application should now be running on `http://localhost:5173`.