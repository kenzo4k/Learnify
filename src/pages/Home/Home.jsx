// src/pages/Home/Home.jsx

import React, { useEffect } from 'react';
import Banner from './Banner';
import LatestCourses from './LatestCourses';
import PopularCourses from './PopularCourses';
import TopInstructors from './TopInstructors';
import Testimonials from './Testimonials';
import Categories from './Categories';
import Newsletter from './Newsletter';


const Home = () => {
    useEffect(() => {
        document.title = "Home | CourseFlow";
    }, []); // খালি dependency array মানে এটি শুধু প্রথমবার রেন্ডার হওয়ার সময় চলবে
    // Optional: for dynamic title
    useEffect(() => {
        document.title = 'CourseFlow | Home';
    }, []);

  return (
    <div>
     
      {/* 1. Banner Section */}
      <Banner />

      {/* 2. Latest Courses Section */}
      <LatestCourses />

      {/* 3. Popular Courses Section */}
      <PopularCourses />

      {/* 4. Categories Section */}
      <Categories />

      {/* 5. Extra Section 1: Top Instructors */}
      <TopInstructors />
      
      {/* 6. Extra Section 2: Testimonials */}
      <Testimonials />

    </div>
  );
};

export default Home;