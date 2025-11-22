// src/routes/Router.jsx
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddCourse from "../pages/Courses/AddCourse";
import CourseDetails from "../pages/Courses/CourseDetails";
import ManageCourses from "../pages/Courses/ManageCourses";
import MyEnrolledCourses from "../pages/Courses/MyEnrolledCourses";
import EditCourse from "../pages/Courses/EditCourse";
import ErrorPage from "../pages/ErrorPage";
import AllCourses from "../pages/Courses/AllCourses";
import Dashboard from "../pages/Home/DashBoard";
import PrivateRoute from "./PrivateRoute"; // <<< PrivateRoute ইম্পোর্ট করুন

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      // --- Public Routes ---
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "courses",
        element: <AllCourses />, // সকল কোর্স পেজটি আমরা পাবলিক রাখছি
      },
      {
        path: "courses/category/:category",
        element: <AllCourses />,
      },
      {
        path: "/course/:id",
        element: <CourseDetails />, // কোর্স ডিটেইলস দেখতে লগইন লাগবে
      },

      // --- Private Routes (সুরক্ষিত রুট) ---
      {
        path: "/add-course",
        element: <PrivateRoute><AddCourse /></PrivateRoute>,
      },
      {
        path: "/manage-courses",
        element: <PrivateRoute><ManageCourses /></PrivateRoute>,
      },
      {
        path: "/edit-course/:id",
        element: <PrivateRoute><EditCourse /></PrivateRoute>,
      },
      {
        path: "/my-enrolled-courses",
        element: <PrivateRoute><MyEnrolledCourses /></PrivateRoute>,
      },
      {
        path: "dashboard",
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
      },
    ],
  },
]);

export default router;