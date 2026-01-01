import React from 'react';
import { Link } from 'react-router-dom';
import recommendationService from '../../services/recommendationService';

const RecommendedCourses = ({ scenario = 'web-dev', maxCourses = 4 }) => {
  const { recommendations } = recommendationService.getSampleRecommendations(scenario);

  if (!recommendations.length) return null;

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-4 mt-8">
      <h2 className="text-lg font-semibold mb-4 text-cyan-400">Recommended For You</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {recommendations.slice(0, maxCourses).map(({ course, reason }) => (
          <Link 
            key={course.id} 
            to={`/course/${course.id}`}
            className="bg-gray-700 rounded-lg p-4 flex flex-col hover:bg-gray-600 transition-colors border border-gray-600 hover:border-cyan-500"
          >
            <div className="flex-shrink-0 mb-3">
              <img 
                src={course.image} 
                alt={course.title}
                className="w-full h-32 object-cover rounded"
              />
            </div>
            <span className="text-xs font-medium text-purple-400 uppercase tracking-wide mb-1">
              {course.category}
            </span>
            <h3 className="font-semibold text-white mb-2 line-clamp-2">{course.title}</h3>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-blue-900/50 text-blue-300 text-xs rounded-full">
                {course.level}
              </span>
              <span className="text-xs text-gray-400">{course.rating} ★</span>
            </div>
            <p className="text-xs text-cyan-300 mt-auto">
              {reason}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecommendedCourses;
