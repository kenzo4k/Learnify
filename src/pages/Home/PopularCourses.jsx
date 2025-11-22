// src/pages/Home/PopularCourses.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CourseCard from '../../components/shared/CourseCard'; // আমরা এই কম্পোনেন্টটি নতুন করে ডিজাইন করব
import LoadingSpinner from '../../components/shared/LoadingSpinner';

const PopularCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // এরর হ্যান্ডেল করার জন্য নতুন স্টেট

    useEffect(() => {
        axios.get('https://course-management-system-server-woad.vercel.app/api/courses/popular')
            .then(res => {
                setCourses(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching popular courses:", err);
                setError("Could not load popular courses. Please try again later."); // এরর মেসেজ সেট করা
                setLoading(false);
            });
    }, []);

    // লোডিং অবস্থা
    if (loading) return (
        <div className="bg-gray-900 py-24">
            <LoadingSpinner />
        </div>
    );

    // এরর অবস্থা
    if (error) return (
        <div className="bg-gray-900 text-center py-24">
            <p className="text-red-400 text-xl">{error}</p>
        </div>
    );

    return (
        <div className="bg-gray-900 py-24">
            <div className="container mx-auto px-4">
                {/* সেকশনের শিরোনাম */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                        Our Top-Rated Courses
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Join thousands of learners in these top-rated courses, celebrated for their depth and expert instruction.
                    </p>
                </div>
                
                {/* কোর্সের গ্রিড */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map(course => (
                        <CourseCard key={course._id} course={course} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PopularCourses;