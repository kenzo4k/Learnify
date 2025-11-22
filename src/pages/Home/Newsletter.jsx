
// src/pages/Home/Newsletter.jsx

import React from 'react';

const Newsletter = () => {
    return (
        <div className="bg-gray-900 py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
                        Subscribe to Our Newsletter
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Stay updated with our latest courses, offers, and news.
                    </p>
                </div>
                <div className="max-w-md mx-auto">
                    <form className="flex flex-col md:flex-row gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="input input-bordered w-full md:w-2/3"
                        />
                        <button type="submit" className="btn btn-primary w-full md:w-1/3">
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;
