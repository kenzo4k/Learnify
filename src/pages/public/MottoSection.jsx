// src/pages/public/MottoSection.jsx

import React from 'react';

const MottoSection = () => {
    return (
        <div className="bg-gray-900 py-20">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
                        the journey of a thousand miles begins with a single, personalized Stride.
                    </h2>
                    <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
                        At Stride, we believe that every learning journey is unique. Our personalized approach ensures you get the right courses, at the right pace, tailored to your goals and aspirations.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MottoSection;
