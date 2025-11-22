import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaClock, FaStar, FaLevelUpAlt } from 'react-icons/fa';

const CourseCard = ({ course }) => {
    // Price rendering helper function
    const renderPrice = (price, discountPrice) => {
        if (discountPrice && discountPrice < price) {
            return (
                <div className="flex items-center gap-2">
                    <span className="text-xl md:text-2xl font-bold text-purple-400">${discountPrice}</span>
                    <span className="text-sm md:text-md line-through text-gray-500">${price}</span>
                </div>
            );
        }
        return <span className="text-xl md:text-2xl font-bold text-purple-400">${price || 0}</span>;
    };

    return (
        <Link to={`/course/${course._id}`} className="block group w-full">
            <div className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300 transform hover:-translate-y-1 md:hover:-translate-y-2 hover:shadow-lg md:hover:shadow-xl hover:shadow-purple-500/20">

                {/* Image Section */}
                <figure className="relative h-48 overflow-hidden">
                    <img
                        src={course.image || 'https://via.placeholder.com/400x225?text=No+Image'}
                        alt={course.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 md:top-4 md:left-4">
                        <span className="bg-purple-600 text-white px-2 py-1 text-xs md:text-sm font-semibold rounded-full capitalize">
                            {course.level || 'All Levels'}
                        </span>
                    </div>
                </figure>

                {/* Content Section */}
                <div className="p-4 md:p-6 flex flex-col flex-grow">
                    {/* Category and Rating */}
                    <div className="flex justify-between items-center mb-2 md:mb-3">
                        <span className="text-xs md:text-sm font-medium text-purple-400 truncate max-w-[50%]">
                            {course.category || 'General'}
                        </span>
                        <div className="flex items-center gap-1 text-yellow-400">
                            <FaStar className="text-xs md:text-sm" />
                            <span className="text-gray-300 font-semibold text-xs md:text-sm">
                                {course.rating?.toFixed(1) || '0.0'}
                            </span>
                        </div>
                    </div>
                    
                    {/* Title */}
                    <h2 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 flex-grow line-clamp-2">
                        {course.title}
                    </h2>
                    
                    {/* Instructor */}
                    <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                        <img 
                            src={course.instructor?.photoURL || `https://ui-avatars.com/api/?name=${course.instructor?.name || 'A'}&background=random`} 
                            alt={course.instructor?.name}
                            className="w-6 h-6 md:w-8 md:h-8 rounded-full object-cover"
                        />
                        <span className="text-xs md:text-sm text-gray-400 truncate">
                            {course.instructor?.name || 'Anonymous Instructor'}
                        </span>
                    </div>
                    
                    {/* Stats */}
                    <div className="flex justify-between items-center text-gray-400 text-xs md:text-sm border-t border-b border-gray-700 py-2 md:py-3 my-2 md:my-3">
                        <div className="flex items-center gap-1 md:gap-2">
                            <FaUsers className="text-xs md:text-sm" />
                            <span>{course.enrollmentCount || 0} Students</span>
                        </div>
                        <div className="flex items-center gap-1 md:gap-2">
                            <FaClock className="text-xs md:text-sm" />
                            <span>{course.duration || 'Self-paced'}</span>
                        </div>
                    </div>
                    
                    {/* Price and Action */}
                    <div className="flex justify-between items-center mt-auto">
                        {renderPrice(course.price, course.discount_price)}
                        <button className="btn btn-primary btn-sm">
                            See More
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CourseCard;