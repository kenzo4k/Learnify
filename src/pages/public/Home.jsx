// src/pages/Home/Home.jsx

import React, { useEffect } from 'react';
import Banner from './Banner';
import LatestCourses from './LatestCourses';
import PopularCourses from './PopularCourses';
import TopInstructors from './TopInstructors';
import Testimonials from './Testimonials';
import Categories from './Categories';
import Newsletter from './Newsletter';
import MottoSection from './MottoSection';


const Home = () => {
  useEffect(() => {
    document.title = "Home | Stride";
  }, []);
  useEffect(() => {
    document.title = 'Stride | Home';
  }, []);

  return (
    <div>

      {/* 1. Banner Section */}
      <Banner />

      {/* 2. Motto Section */}
      <MottoSection />

      {/* 3. Latest Courses Section */}
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