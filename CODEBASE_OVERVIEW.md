# Learnify - Codebase Overview

## 1. Project Purpose

**Learnify** is a modern, full-stack Course Management System (CMS) designed to provide a seamless learning experience for both students and instructors. The platform enables:

- **Students** to browse, search, and enroll in courses, track their learning progress, and manage their enrolled courses
- **Instructors** to create, update, and manage their own courses through a dedicated dashboard
- **Admins** to oversee the entire platform, manage users, courses, and view analytics

### Problem Solved
Learnify addresses the need for an intuitive, scalable online learning platform that connects instructors with learners while providing robust management capabilities for course content, user roles, and enrollment tracking.

---

## 2. Tech Stack

### Frontend
- **React 18.3.1** - Modern UI library with hooks and concurrent features
- **Vite 6.3.5** - Fast build tool and development server
- **React Router 7.6.2** - Client-side routing with browser router
- **Tailwind CSS 4.1.7** - Utility-first CSS framework
- **DaisyUI 5.0.35** - Tailwind CSS component library

### Authentication
- **Firebase 11.10.0** - Authentication provider (Email/Password + Google OAuth)
- **JWT Tokens** - Session management via access tokens

### UI Libraries & Components
- **Lucide React 0.511.0** - Modern icon library
- **React Icons 5.5.0** - Popular icon sets
- **Framer Motion 12.18.1** - Animation library
- **Lottie React 2.4.1** - Lottie animation renderer
- **React Slick 0.31.0** - Carousel/slider component
- **React Awesome Reveal 4.3.1** - Scroll animations
- **React Simple Typewriter 5.0.1** - Typewriter text effect

### Forms & User Experience
- **React Hook Form 7.57.0** - Form validation and management
- **React Hot Toast 2.5.2** - Toast notifications
- **SweetAlert2 11.22.0** - Beautiful alert modals
- **React Tooltip 5.28.1** - Accessible tooltips

### HTTP Client
- **Axios 1.9.0** - Promise-based HTTP client with interceptors

### Other Utilities
- **React Helmet Async 2.0.5** - Document head management

### Build Tools & Dev Dependencies
- **ESLint 9.25.0** - Code linting
- **Vite Plugin React 4.5.2** - React support for Vite

---

## 3. Architecture Overview

Learnify follows a **feature-based architecture** with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────┐
│                     Main Entry Point                      │
│                  (main.jsx + index.html)                 │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│                    AuthProvider Context                   │
│          (Firebase Auth + JWT Token Management)          │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│                    RouterProvider                         │
│              (React Router with Route Guards)            │
└──────────────────────┬──────────────────────────────────┘
                       │
       ┌───────────────┼───────────────┐
       │               │               │
       ▼               ▼               ▼
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│   Public    │ │   Private   │ │    Role     │
│   Routes    │ │   Routes    │ │   Routes    │
│             │ │             │ │             │
│  - Home     │ │ - Dashboard │ │ - Admin     │
│  - Login    │ │ - Enrolled  │ │ - Instructor│
│  - Courses  │ │ - Add/Edit  │ │ - Student   │
└──────┬──────┘ └──────┬──────┘ └──────┬──────┘
       │               │               │
       └───────────────┼───────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│                  API Service Layer                        │
│     (Axios with Interceptors + Service Modules)          │
│                                                           │
│  - api.js (base axios instance)                          │
│  - axiosSecure.js (secure instance with auth)            │
│  - courseService.js (course CRUD operations)             │
│  - userService.js (user management)                      │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│              External REST API Backend                    │
│   https://course-management-system-server-woad           │
│              .vercel.app/api                             │
└─────────────────────────────────────────────────────────┘
```

### Key Architectural Patterns

1. **Context Pattern**: `AuthProvider` wraps the entire app for authentication state
2. **Service Layer**: Centralized API calls in service modules
3. **Custom Hooks**: Reusable state logic (`useCourses`, `useEnrollments`, `useAuth`)
4. **Route Guards**: Protected routes with role-based access control
5. **Component Composition**: Shared UI components in `components/common` and `components/ui`
6. **Feature Modules**: Self-contained feature folders with related pages/logic

---

## 4. Key Directories and Modules

```
src/
├── assets/                  # Static assets (images, logos, SVGs)
│   ├── banner/             # Banner images
│   └── logo/               # Logo assets
│
├── components/             # Reusable UI components
│   ├── common/            # Common components (Navbar, Footer, CourseCard)
│   ├── forms/             # Form components (AuthForm, CourseForm)
│   └── ui/                # Base UI components (Button, Card, Input, Modal)
│
├── context/               # React Context providers
│   └── AuthProvider.jsx   # Authentication context with Firebase
│
├── features/              # Feature-based modules
│   ├── auth/             # Authentication pages (Login, Register)
│   ├── courses/          # Course management pages
│   ├── dashboard/        # Dashboard components
│   └── users/            # User role pages (Admin, Instructor, Student)
│
├── firebase/              # Firebase configuration
│   └── firebase.config.js # Firebase initialization
│
├── hooks/                 # Custom React hooks
│   ├── useAuth.js        # Hook for accessing auth context
│   ├── useCourses.js     # Hook for course data/operations
│   └── useEnrollments.js # Hook for enrollment operations
│
├── layout/                # Layout components
│   └── MainLayout.jsx    # Main app layout (Navbar + Outlet + Footer)
│
├── pages/                 # Page components
│   ├── public/           # Public pages (Home, Banner, Categories, etc.)
│   └── ErrorPage.jsx     # 404 error page
│
├── routes/                # Routing configuration
│   ├── Router.jsx        # Main router configuration
│   ├── PrivateRoute.jsx  # Authentication guard
│   ├── AdminRoute.jsx    # Admin role guard
│   ├── InstructorRoute.jsx # Instructor role guard
│   └── StudentRoute.jsx  # Student role guard
│
├── services/              # API service layer
│   ├── api.js            # Base axios instance
│   ├── axiosSecure.js    # Secure axios with interceptors
│   ├── courseService.js  # Course API methods
│   └── userService.js    # User API methods
│
├── utils/                 # Utility functions and constants
│   ├── constants.js      # App constants (API_BASE_URL, roles, categories)
│   └── helpers.js        # Helper functions (formatDate, formatPrice, etc.)
│
├── App.jsx               # Root App component
├── main.jsx              # Application entry point
└── index.css             # Global styles (Tailwind imports)
```

---

## 5. Frontend

### UI Framework
- **Tailwind CSS 4** with **DaisyUI** for rapid UI development
- Custom dark theme with purple/indigo accent colors
- Responsive design with mobile-first approach

### Pages and Routes

#### Public Routes
- **`/`** - Home page with banner, latest courses, categories, testimonials
- **`/Auth/login`** - Login page (email/password + Google)
- **`/Auth/register`** - Registration page
- **`/courses`** - All courses catalog with filtering
- **`/courses/category/:category`** - Courses filtered by category
- **`/course/:id`** - Course details page with enrollment

#### Private Routes (Authentication Required)
- **`/dashboard`** - User dashboard with enrolled courses
- **`/add-course`** - Add new course (instructors)
- **`/edit-course/:id`** - Edit existing course
- **`/my-enrolled-courses`** - View all enrolled courses
- **`/manage-courses`** - Manage instructor's courses

#### Role-Based Routes
- **`/admin`** - Admin dashboard (user & course management, analytics)
- **`/instructor`** - Instructor dashboard (course analytics, enrollments)
- **`/student`** - Student dashboard (learning progress, certificates)

### Key Components

#### Common Components
- **Navbar** - Responsive navigation with auth state, role-based menu
- **Footer** - Site footer with links and social media
- **CourseCard** - Reusable course card with image, stats, pricing
- **DataTable** - Generic table with search, sort, pagination
- **SearchBar** - Search input with debounce
- **StatsCard** - Dashboard statistics card
- **Breadcrumb** - Navigation breadcrumb trail
- **LoadingSpinner** - Loading state indicator

#### UI Components
- **Button** - Styled button with variants
- **Card** - Container card component
- **Input** - Form input with validation
- **Modal** - Dialog/modal component
- **Spinner** - Loading spinner

#### Form Components
- **AuthForm** - Login/register form with validation
- **CourseForm** - Course creation/editing form

### State Management
- **Context API** - Global auth state via `AuthProvider`
- **Custom Hooks** - Feature-specific state (`useCourses`, `useEnrollments`)
- **Local State** - Component-level state with `useState`

---

## 6. Backend

### API Structure
The backend is a separate REST API hosted on Vercel:
- **Base URL**: `https://course-management-system-server-woad.vercel.app/api`

### Authentication Flow
1. User logs in via Firebase (email/password or Google)
2. Frontend sends Firebase user email to `/api/jwt`
3. Backend returns JWT access token
4. Token stored in `localStorage` as `access-token`
5. All subsequent API requests include token in `Authorization` header

### API Endpoints

#### Authentication
- `POST /api/jwt` - Exchange Firebase email for JWT token

#### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `GET /api/courses/category/:category` - Get courses by category
- `POST /api/courses` - Create new course (instructor/admin)
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

#### Enrollments
- `POST /api/enrollments` - Enroll in a course
- `GET /api/my-enrollments` - Get user's enrolled courses

#### Users
- `GET /api/users` - Get all users (admin)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/profile` - Update user profile
- `PATCH /api/users/:id/role` - Update user role (admin)
- `DELETE /api/users/:id` - Delete user (admin)

#### Admin
- `GET /api/admin/stats` - Get platform statistics
- `GET /api/admin/recent-users` - Get recent users
- `GET /api/admin/recent-courses` - Get recent courses
- `GET /api/admin/instructors` - Get all instructors
- `POST /api/admin/users/:id/:action` - User actions (activate/deactivate)

### Request Interceptors
- Automatically adds JWT token to all requests
- Handles 401/403 errors by logging out user
- Redirects to login on authentication failures

---

## 7. Database

### Database Type
**MongoDB** (NoSQL document database) - inferred from `_id` fields in responses

### Main Collections

#### Users Collection
```javascript
{
  _id: ObjectId,
  email: String,
  displayName: String,
  photoURL: String,
  role: String, // 'student', 'instructor', 'admin'
  createdAt: Date,
  // Firebase UID likely stored for reference
}
```

#### Courses Collection
```javascript
{
  _id: ObjectId,
  title: String,
  short_description: String,
  detailed_description: String,
  category: String,
  level: String, // 'beginner', 'intermediate', 'advanced'
  price: Number,
  discount_price: Number,
  duration: String,
  image: String, // URL to course image
  rating: Number,
  enrollmentCount: Number,
  instructor: {
    name: String,
    email: String,
    photoURL: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

#### Enrollments Collection
```javascript
{
  _id: ObjectId,
  enrollmentId: String,
  userId: ObjectId, // Reference to Users
  courseId: ObjectId, // Reference to Courses
  enrolledAt: Date,
  progress: Number, // 0-100
  completion_certificate: Boolean,
  // Populated course data for queries
}
```

### Relationships
- **Users ↔ Courses**: Many-to-many through Enrollments
- **Instructors → Courses**: One-to-many (instructor creates multiple courses)
- **Students → Enrollments**: One-to-many (student enrolls in multiple courses)

---

## 8. Key Features

### 1. Authentication & Authorization
- **Email/Password Authentication** via Firebase
- **Google OAuth** social login
- **JWT Token Management** for API authentication
- **Role-Based Access Control** (Student, Instructor, Admin)
- **Protected Routes** with authentication guards
- **Profile Management** with photo and name updates

### 2. Course Management
- **Course Catalog** with search, filter, and category browsing
- **Course Details** page with full description, instructor info, pricing
- **Add/Edit Courses** with form validation (instructors/admins)
- **Course Cards** with image, stats, pricing, ratings
- **Category Filtering** for easy course discovery
- **Latest & Popular Courses** sections on home page

### 3. Enrollment System
- **One-Click Enrollment** from course details page
- **My Enrolled Courses** view with progress tracking
- **Enrollment Analytics** for instructors
- **Certificate Generation** (placeholder for completion certificates)

### 4. Dashboard Features

#### Student Dashboard
- Enrolled courses overview
- Learning progress tracking
- Certificate count
- Quick access to continue learning

#### Instructor Dashboard
- Course creation and management
- View enrollment statistics
- Edit/delete own courses
- Course analytics

#### Admin Dashboard
- Platform-wide statistics (users, courses, revenue)
- User management (view, edit roles, delete)
- Course management (view, edit, delete any course)
- Recent users and courses lists
- Instructor management

### 5. UI/UX Features
- **Responsive Design** - Mobile, tablet, desktop optimized
- **Dark Theme** - Modern dark UI with purple/indigo accents
- **Animations** - Framer Motion, Lottie, scroll reveals
- **Carousels** - React Slick for testimonials, instructor showcases
- **Toast Notifications** - React Hot Toast for user feedback
- **Modal Dialogs** - SweetAlert2 for confirmations and alerts
- **Loading States** - Spinners and skeleton screens
- **Error Handling** - Error page and inline error messages
- **Form Validation** - React Hook Form with validation rules

### 6. Marketing & Content
- **Hero Banner** with typewriter effect and CTA
- **Latest Courses** section with dynamic data
- **Popular Courses** section
- **Categories** overview with icons
- **Top Instructors** showcase
- **Testimonials** carousel
- **Newsletter** signup (placeholder)

---

## 9. File Organization

### Organization Strategy
Learnify uses a **hybrid approach** combining:
1. **Feature-based structure** for major features (`features/`)
2. **Component-based structure** for shared UI (`components/`)
3. **Layered architecture** for services, hooks, and utilities

### Benefits of This Structure
- **Scalability**: Easy to add new features without restructuring
- **Maintainability**: Related code is co-located
- **Reusability**: Shared components and hooks prevent duplication
- **Separation of Concerns**: Clear boundaries between UI, logic, and data

### Naming Conventions
- **PascalCase**: Components, Contexts, Pages (`CourseCard.jsx`, `AuthProvider.jsx`)
- **camelCase**: Hooks, services, utilities (`useCourses.js`, `courseService.js`)
- **UPPER_SNAKE_CASE**: Constants (`API_BASE_URL`, `USER_ROLES`)
- **kebab-case**: Routes in URLs (`/my-enrolled-courses`)

---

## 10. Dependencies

### Core Dependencies

#### React Ecosystem
- **react** (18.3.1) - Core UI library
- **react-dom** (18.3.1) - DOM rendering
- **react-router** (7.6.0) - Routing library
- **react-router-dom** (7.6.2) - Browser routing

#### Build & Development
- **vite** (6.3.5) - Lightning-fast build tool and dev server
- **@vitejs/plugin-react** (4.5.2) - React support for Vite

#### Styling
- **tailwindcss** (4.1.7) - Utility-first CSS framework for rapid UI development
- **@tailwindcss/vite** (4.1.7) - Vite plugin for Tailwind
- **daisyui** (5.0.35) - Component library built on Tailwind, provides pre-styled components

#### Authentication
- **firebase** (11.10.0) - Backend-as-a-Service for authentication
  - Email/password authentication
  - Google OAuth provider
  - User session management

#### HTTP Client
- **axios** (1.9.0) - Promise-based HTTP client
  - Request/response interceptors for JWT handling
  - Error handling and retries

#### Form Management
- **react-hook-form** (7.57.0) - Performant form library
  - Form validation
  - Error handling
  - Reduced re-renders

#### User Feedback
- **react-hot-toast** (2.5.2) - Lightweight toast notifications
- **sweetalert2** (11.22.0) - Beautiful, responsive alert modals
- **react-tooltip** (5.28.1) - Accessible tooltip component

#### Icons
- **lucide-react** (0.511.0) - Modern, clean icon library (primary)
- **react-icons** (5.5.0) - Comprehensive icon collection (Font Awesome, etc.)

#### Animations
- **framer-motion** (12.18.1) - Production-ready motion library
  - Page transitions
  - Component animations
  - Gesture animations
- **lottie-react** (2.4.1) - Lottie animation player
  - Complex vector animations
- **react-awesome-reveal** (4.3.1) - Scroll-based reveal animations
- **react-simple-typewriter** (5.0.1) - Typewriter text effect

#### UI Components
- **react-slick** (0.31.0) + **slick-carousel** (1.8.1) - Carousel/slider
  - Testimonials carousel
  - Course showcases
- **react-helmet-async** (2.0.5) - Document head manager
  - SEO optimization
  - Dynamic page titles

#### Development Tools
- **eslint** (9.25.0) - Code linting and quality
- **eslint-plugin-react-hooks** (5.2.0) - React hooks linting
- **eslint-plugin-react-refresh** (0.4.19) - React refresh linting
- **@eslint/js** (9.25.0) - ESLint JavaScript support
- **globals** (16.0.0) - Global identifiers

---

## Development Workflow

### Getting Started
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Environment Variables
Create a `.env.local` file in the root with Firebase credentials:
```env
VITE_APIKEY=your_firebase_api_key
VITE_AUTHDOMAIN=your_firebase_auth_domain
VITE_PROJECTID=your_firebase_project_id
VITE_STORAGEBUCKET=your_firebase_storage_bucket
VITE_MESSAGINGSENDERID=your_firebase_messaging_sender_id
VITE_APPID=your_firebase_app_id
```

### Project Configuration
- **Vite** for fast HMR and optimized builds
- **ESLint** for code quality
- **Tailwind CSS** via Vite plugin
- **Firebase** for authentication
- **Axios interceptors** for API authentication

---

## Design Patterns & Best Practices

### 1. Custom Hooks Pattern
Encapsulate complex logic in reusable hooks:
```javascript
const { courses, loading, createCourse } = useCourses();
```

### 2. Service Layer Pattern
Centralize API calls for maintainability:
```javascript
courseService.getAllCourses()
userService.updateProfile(data)
```

### 3. Route Guard Pattern
Protect routes based on authentication and roles:
```javascript
<PrivateRoute><Dashboard /></PrivateRoute>
<AdminRoute><Admin /></AdminRoute>
```

### 4. Context Pattern
Share global state without prop drilling:
```javascript
const { user, loading, signIn } = useAuth();
```

### 5. Component Composition
Build complex UIs from small, reusable components:
```javascript
<Card>
  <Button variant="primary">Click Me</Button>
</Card>
```

---

## Future Enhancements

Based on the codebase structure, potential future features include:

1. **Video Player Integration** - Embed course videos
2. **Quiz System** - Assessments and quizzes for courses
3. **Certificate Generation** - Automated PDF certificates
4. **Payment Integration** - Stripe/PayPal for course purchases
5. **Discussion Forums** - Student-instructor communication
6. **Progress Tracking** - Detailed learning analytics
7. **Notifications** - Real-time updates via Firebase
8. **Reviews & Ratings** - Student course reviews
9. **Wishlists** - Save courses for later
10. **Advanced Search** - Elasticsearch integration

---

## Repository Information

- **GitHub**: https://github.com/3mad18/Learnify
- **License**: ISC
- **Backend API**: https://course-management-system-server-woad.vercel.app/api

---

## Summary

Learnify is a well-architected, modern course management platform built with React 18 and Vite. It demonstrates best practices in:
- Feature-based architecture
- Custom hooks for state management
- Service layer for API abstraction
- Role-based access control
- Responsive, animated UI with Tailwind CSS
- Firebase authentication with JWT
- Comprehensive user flows for students, instructors, and admins

The codebase is maintainable, scalable, and follows React best practices, making it suitable for both learning and production use.
