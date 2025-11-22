
// src/pages/Home/Categories.jsx

import React from 'react';
import { FaCode, FaPaintBrush, FaMusic, FaCamera, FaFilm, FaChartLine } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const categories = [
    { name: 'Development', icon: <FaCode /> },
    { name: 'Design', icon: <FaPaintBrush /> },
    { name: 'Music', icon: <FaMusic /> },
    { name: 'Photography', icon: <FaCamera /> },
    { name: 'Marketing', icon: <FaChartLine /> },
    { name: 'Video', icon: <FaFilm /> },
];

const Categories = () => {
    return (
        <div className="bg-gray-900 py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
                        Browse Categories
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Explore our wide range of course categories and find the perfect one for you.
                    </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {categories.map((category, index) => (
                        <Link to={`/courses/category/${category.name}`} key={index}>
                            <div className="flex flex-col items-center p-6 bg-gray-700 rounded-lg text-white hover:bg-gray-600 transition-colors duration-300">
                                <div className="text-4xl mb-4 text-blue-400">{category.icon}</div>
                                <h3 className="text-lg font-semibold">{category.name}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Categories;
