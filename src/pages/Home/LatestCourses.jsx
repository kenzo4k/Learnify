// src/pages/Home/LatestCourses.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CourseCard from '../../components/shared/CourseCard'; // আমাদের ডিজাইন করা সুন্দর কার্ড
import LoadingSpinner from '../../components/shared/LoadingSpinner';

const LatestCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // এরর হ্যান্ডেল করার জন্য নতুন স্টেট

    useEffect(() => {
        axios.get('https://course-management-system-server-woad.vercel.app/api/courses/latest')
            .then(res => {
                setCourses(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching latest courses:", err);
                setError("Could not load the latest courses. Please try again later."); // এরর মেসেজ সেট করা
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
        // ডার্ক থিম এবং সুন্দর স্পেসিং এর জন্য মূল কন্টেইনার
        <div className="bg-gray-900 py-24"> 
            <div className="container mx-auto px-4">
                {/* নতুন ডিজাইন করা সেকশনের শিরোনাম */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
                        Our Latest Courses
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Explore the newest additions to our catalog and stay ahead with the latest skills and technologies.
                    </p>
                </div>
                
                {/* কোর্সের গ্রিড (এখানে কোনো পরিবর্তন নেই কারণ CourseCard নিজেই সুন্দর) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {courses.map(course => (
                        <CourseCard key={course._id} course={course} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LatestCourses;