import React from 'react';
import { BookOpen } from 'lucide-react';

const sizeClasses = {
  sm: {
    ring: 'w-6 h-6 border-2',
    icon: 'w-3 h-3',
  },
  md: {
    ring: 'w-10 h-10 border-4',
    icon: 'w-4 h-4',
  },
  lg: {
    ring: 'w-16 h-16 border-4',
    icon: 'w-6 h-6',
  },
};

const LoadingSpinner = ({ fullScreen = true, size = 'lg', className = '' }) => {
  const resolvedSize = sizeClasses[size] ?? sizeClasses.lg;

  const wrapperClassName = fullScreen
    ? 'flex items-center justify-center min-h-screen bg-gray-900'
    : 'inline-flex items-center justify-center';

  return (
    <div className={`${wrapperClassName} ${className}`.trim()}>
      <div className="relative" role="status" aria-label="Loading">
        <div
          className={`${resolvedSize.ring} border-blue-200 border-t-blue-500 rounded-full animate-spin`}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <BookOpen className={`${resolvedSize.icon} text-blue-500 animate-pulse`} />
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
