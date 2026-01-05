import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FiBook, FiUser, FiTrash2, FiArrowLeft, FiClock, FiStar, FiZap } from 'react-icons/fi';
import { motion } from 'framer-motion';
import CourseCard from '../../components/common/CourseCard';

// --- Skeleton Loader Component 
const CourseCardSkeleton = () => (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 p-4 animate-pulse">
        <div className="h-48 bg-slate-700 rounded-lg mb-4"></div>
        <div className="h-6 bg-slate-700 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-slate-700 rounded w-1/2 mb-4"></div>
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-700">
            <div className="h-8 bg-slate-700 rounded w-1/4"></div>
            <div className="h-10 bg-slate-700 rounded-lg w-1/3"></div>
        </div>
    </div>
);

// Sample enrolled courses data
const sampleEnrolledCourses = [
    {
        _id: '1',
        title: 'Web Development Fundamentals',
        description: 'Learn the basics of web development with HTML, CSS, and JavaScript',
        image: 'https://via.placeholder.com/300x200?text=Web+Dev',
        instructor: { name: 'John Doe', photoURL: 'https://randomuser.me/api/portraits/men/1.jpg' },
        level: 'Beginner',
        category: 'Web Development',
        rating: 4.5,
        enrollmentCount: 1245,
        duration: '8 weeks',
        price: 49.99,
        discount_price: 29.99,
        progress: 42,
        lastAccessed: '2 hours ago'
    },
    {
        _id: '2',
        title: 'Python for Data Science',
        description: 'Master Python for data analysis and visualization',
        image: 'https://via.placeholder.com/300x200?text=Python+Data',
        instructor: { name: 'Jane Smith', photoURL: 'https://randomuser.me/api/portraits/women/1.jpg' },
        level: 'Intermediate',
        category: 'Data Science',
        rating: 4.8,
        enrollmentCount: 890,
        duration: '10 weeks',
        price: 59.99,
        progress: 75,
        lastAccessed: '1 day ago'
    },
    {
        _id: '3',
        title: 'React Native Mobile Development',
        description: 'Build cross-platform mobile apps with React Native',
        image: 'https://via.placeholder.com/300x200?text=React+Native',
        instructor: { name: 'Mike Johnson', photoURL: 'https://randomuser.me/api/portraits/men/2.jpg' },
        level: 'Advanced',
        category: 'Mobile Development',
        rating: 4.7,
        enrollmentCount: 567,
        duration: '12 weeks',
        price: 69.99,
        progress: 15,
        lastAccessed: '3 days ago'
    }
];

const MyEnrolledCourses = () => {
    const navigate = useNavigate();
    const [enrolledCourses, setEnrolledCourses] = useState(sampleEnrolledCourses);
    const [loading, setLoading] = useState(false);

    const handleRemoveEnrollment = (courseId, courseTitle) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to remove your enrollment from "${courseTitle}".`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, remove it!',
            background: '#1f2937',
            color: '#f3f4f6'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Removed!',
                    text: 'Your enrollment has been removed.',
                    icon: 'success',
                    background: '#1f2937',
                    color: '#f3f4f6',
                    timer: 2000,
                    showConfirmButton: false
                });
                setEnrolledCourses(prev => prev.filter(course => course._id !== courseId));
            }
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="h-8 w-24 bg-slate-700 rounded-lg mb-6 animate-pulse"></div>
                    <div className="flex items-center justify-between mb-8">
                        <div className="h-10 w-1/2 bg-slate-700 rounded-lg animate-pulse"></div>
                        <div className="h-8 w-28 bg-slate-700 rounded-lg animate-pulse"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <CourseCardSkeleton />
                        <CourseCardSkeleton />
                        <CourseCardSkeleton />
                    </div>
                </div>
            </div>
        );
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8">
            <motion.div
                className="max-w-7xl mx-auto"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-indigo-400 hover:text-indigo-300 mb-8 transition-colors text-sm font-medium"
                >
                    <FiArrowLeft className="mr-2" /> Back to Dashboard
                </button>

                <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
                    <h1 className="text-3xl md:text-4xl font-black tracking-tighter bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                        My Learning Path
                    </h1>
                    <div className="bg-slate-800 border border-slate-700 rounded-full px-4 py-2 flex items-center space-x-2 text-sm font-semibold">
                        <FiBook className="text-indigo-400" />
                        <span>
                            {enrolledCourses.length} Enrolled
                        </span>
                    </div>
                </div>

                {enrolledCourses.length > 0 ? (
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {enrolledCourses.map((course) => (
                            <motion.div
                                key={course._id}
                                variants={itemVariants}
                                className="relative group bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <CourseCard course={course} />
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="flex space-x-4">
                                        <button
                                            onClick={(e) => { e.preventDefault(); handleRemoveEnrollment(course._id, course.title); }}
                                            className="btn btn-error btn-circle text-white hover:bg-red-700 tooltip" data-tip="Remove Enrollment"
                                        >
                                            <FiTrash2 size={24} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        className="bg-slate-800 rounded-lg p-8 text-center border-2 border-dashed border-slate-700 mt-10"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="max-w-md mx-auto">
                            <FiBook className="text-7xl text-slate-600 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-white mb-2">Your Learning Journey is Empty</h3>
                            <p className="text-slate-400 mb-6">
                                The best time to start was yesterday. The second best time is now. Enroll in a course!
                            </p>
                            <button
                                onClick={() => navigate('/courses')}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105"
                            >
                                Explore All Courses
                            </button>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default MyEnrolledCourses;