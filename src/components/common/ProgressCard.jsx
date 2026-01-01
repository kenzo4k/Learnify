import React from 'react';

const ProgressCard = ({ 
  title, 
  progress, 
  lessons, 
  lastAccessed, 
  image,
  actionText = 'Continue',
  onAction 
}) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-cyan-500 transition-colors group">
      <div className="flex flex-col h-full">
        {image && (
          <div className="flex-shrink-0 mb-4">
            <img 
              src={image} 
              alt={title}
              className="w-full h-32 object-cover rounded group-hover:scale-105 transition-transform"
            />
          </div>
        )}
        <h3 className="font-semibold text-white mb-2 line-clamp-2">{title}</h3>
        
        <div className="space-y-3 flex-1">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>Progress</span>
            <span className="text-cyan-400 font-medium">{progress}%</span>
          </div>
          
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {lessons && (
            <p className="text-sm text-gray-400">{lessons}</p>
          )}
          
          {lastAccessed && (
            <p className="text-xs text-gray-500">Last accessed: {lastAccessed}</p>
          )}
        </div>
        
        {onAction && (
          <button 
            onClick={onAction}
            className="mt-4 w-full px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors font-medium"
          >
            {actionText}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProgressCard;
