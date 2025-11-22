import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditCourse = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [courseData, setCourseData] = useState({
        title: '',
        short_description: '',
        detailed_description: '',
        image: '',
        duration: '',
        seats: '',
        price: '',
        discount_price: '',
        category: '',
        level: 'Beginner',
        language: '',
        prerequisites: [''],
        learning_outcomes: [''],
        curriculum: [''],
        instructor: {
            name: '',
            email: '',
            bio: ''
        },
        tags: [''],
        featured: false,
        status: 'active',
        completion_certificate: true
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const token = localStorage.getItem('access-token');
                const response = await fetch(`https://course-management-system-server-woad.vercel.app/api/courses/${id}`, {
                    headers: { 'authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                
                // Ensure arrays have at least one empty string for display
                setCourseData({
                    title: data.title || '',
                    short_description: data.short_description || '',
                    detailed_description: data.detailed_description || '',
                    image: data.image || '',
                    duration: data.duration || '',
                    seats: data.seats || '',
                    price: data.price || '',
                    discount_price: data.discount_price || '',
                    category: data.category || '',
                    level: data.level || 'Beginner',
                    language: data.language || '',
                    prerequisites: data.prerequisites?.length > 0 ? data.prerequisites : [''],
                    learning_outcomes: data.learning_outcomes?.length > 0 ? data.learning_outcomes : [''],
                    curriculum: data.curriculum?.length > 0 ? data.curriculum : [''],
                    instructor: {
                        name: data.instructor?.name || '',
                        email: data.instructor?.email || '',
                        bio: data.instructor?.bio || ''
                    },
                    tags: data.tags?.length > 0 ? data.tags : [''],
                    featured: data.featured || false,
                    status: data.status || 'active',
                    completion_certificate: data.completion_certificate !== undefined ? data.completion_certificate : true
                });
            } catch (error) {
                toast.error("Failed to load course data.");
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCourseData(prev => ({ 
            ...prev, 
            [name]: type === 'checkbox' ? checked : value 
        }));
    };

    const handleInstructorChange = (e) => {
        const { name, value } = e.target;
        setCourseData(prev => ({ 
            ...prev, 
            instructor: { ...prev.instructor, [name]: value }
        }));
    };

    const handleArrayChange = (index, value, arrayName) => {
        setCourseData(prev => ({
            ...prev,
            [arrayName]: prev[arrayName].map((item, i) => i === index ? value : item)
        }));
    };

    const addArrayItem = (arrayName) => {
        setCourseData(prev => ({
            ...prev,
            [arrayName]: [...prev[arrayName], '']
        }));
    };

    const removeArrayItem = (index, arrayName) => {
        if (courseData[arrayName].length > 1) {
            setCourseData(prev => ({
                ...prev,
                [arrayName]: prev[arrayName].filter((_, i) => i !== index)
            }));
        }
    };

    const handleUpdateCourse = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('access-token');
            
            // Clean up empty array items before sending
            const cleanedData = {
                ...courseData,
                prerequisites: courseData.prerequisites.filter(item => item.trim() !== ''),
                learning_outcomes: courseData.learning_outcomes.filter(item => item.trim() !== ''),
                curriculum: courseData.curriculum.filter(item => item.trim() !== ''),
                tags: courseData.tags.filter(item => item.trim() !== '')
            };

            const response = await fetch(`https://course-management-system-server-woad.vercel.app/api/courses/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`
                },
                body: JSON.stringify(cleanedData)
            });

            if (response.ok) {
                toast.success('Course updated successfully!');
                navigate('/manage-courses');
            } else {
                throw new Error('Failed to update course.');
            }
        } catch (error) {
            toast.error(error.message);
        }
    };
    
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-500 mx-auto"></div>
                    <p className="mt-4 text-gray-300">Loading course data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 py-8">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6 border-b border-gray-600">
                        <h1 className="text-3xl font-bold text-white flex items-center">
                            <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit Course
                        </h1>
                        <p className="text-gray-300 mt-2">Update your course information and settings</p>
                    </div>

                    <form onSubmit={handleUpdateCourse} className="p-8 space-y-8">
                        {/* Basic Information */}
                        <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
                            <h2 className="text-xl font-semibold text-white mb-4">Basic Information</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Course Title</label>
                                    <input 
                                        type="text" 
                                        name="title" 
                                        value={courseData.title} 
                                        onChange={handleInputChange} 
                                        className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200" 
                                        required 
                                        placeholder="e.g., Ultimate Web Development Bootcamp"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Short Description</label>
                                    <textarea 
                                        name="short_description" 
                                        value={courseData.short_description} 
                                        onChange={handleInputChange} 
                                        className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 h-24" 
                                        required
                                        placeholder="A brief subtitle overview of the course"
                                    ></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Detailed Description</label>
                                    <textarea 
                                        name="detailed_description" 
                                        value={courseData.detailed_description} 
                                        onChange={handleInputChange} 
                                        className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 h-32" 
                                        placeholder="Provide a comprehensive description of the course content, goals, and target audience."
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Course Specifics */}
                        <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
                            <h2 className="text-xl font-semibold text-white mb-4">Course Specifics</h2>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                                    <input 
                                        type="text" 
                                        name="category" 
                                        value={courseData.category} 
                                        onChange={handleInputChange} 
                                        className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200" 
                                        required 
                                        placeholder="e.g., Development, Design"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Level</label>
                                    <select 
                                        name="level" 
                                        value={courseData.level} 
                                        onChange={handleInputChange} 
                                        className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                                    >
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
                                    <input 
                                        type="text" 
                                        name="language" 
                                        value={courseData.language} 
                                        onChange={handleInputChange} 
                                        className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200" 
                                        placeholder="e.g., English"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Duration</label>
                                    <input 
                                        type="text" 
                                        name="duration" 
                                        value={courseData.duration} 
                                        onChange={handleInputChange} 
                                        className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200" 
                                        required 
                                        placeholder="e.g., 10 Weeks"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Price ($)</label>
                                    <input 
                                        type="number" 
                                        name="price" 
                                        value={courseData.price} 
                                        onChange={handleInputChange} 
                                        className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200" 
                                        min="0"
                                        step="0.01"
                                        placeholder="e.g., 99.99"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Discount Price ($) <span className="text-sm text-gray-400">(Optional)</span></label>
                                    <input 
                                        type="number" 
                                        name="discount_price" 
                                        value={courseData.discount_price} 
                                        onChange={handleInputChange} 
                                        className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200" 
                                        min="0"
                                        step="0.01"
                                        placeholder="e.g., 49.99"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Total Seats</label>
                                    <input 
                                        type="number" 
                                        name="seats" 
                                        value={courseData.seats} 
                                        onChange={handleInputChange} 
                                        className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200" 
                                        min="1"
                                        placeholder="e.g., 50"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Content Details */}
                        <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
                            <h2 className="text-xl font-semibold text-white mb-4">Content Details</h2>
                            
                            {/* Prerequisites */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-300 mb-2">Prerequisites <span className="text-sm text-gray-400">(Comma-separated)</span></label>
                                <textarea
                                    value={courseData.prerequisites.join(', ')}
                                    onChange={(e) => setCourseData(prev => ({
                                        ...prev,
                                        prerequisites: e.target.value.split(',').map(item => item.trim())
                                    }))}
                                    className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 h-20"
                                    placeholder="e.g., HTML, CSS, Basic JavaScript"
                                ></textarea>
                            </div>

                            {/* Learning Outcomes */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-300 mb-2">Learning Outcomes <span className="text-sm text-gray-400">(Comma-separated)</span></label>
                                <textarea
                                    value={courseData.learning_outcomes.join(', ')}
                                    onChange={(e) => setCourseData(prev => ({
                                        ...prev,
                                        learning_outcomes: e.target.value.split(',').map(item => item.trim())
                                    }))}
                                    className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 h-20"
                                    placeholder="e.g., Build full-stack apps, Deploy to cloud"
                                ></textarea>
                            </div>

                            {/* Curriculum */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Curriculum <span className="text-sm text-gray-400">(One item per line)</span></label>
                                <textarea
                                    value={courseData.curriculum.join('\n')}
                                    onChange={(e) => setCourseData(prev => ({
                                        ...prev,
                                        curriculum: e.target.value.split('\n').map(item => item.trim()).filter(item => item)
                                    }))}
                                    className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 h-32"
                                    placeholder="Module 1: Introduction to React&#10;Module 2: State and Props&#10;Module 3: Advanced Hooks"
                                ></textarea>
                            </div>
                        </div>

                        {/* Instructor Information */}
                        <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
                            <h2 className="text-xl font-semibold text-white mb-4">Instructor Information</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Instructor Name</label>
                                    <input 
                                        type="text" 
                                        name="name" 
                                        value={courseData.instructor.name} 
                                        onChange={handleInstructorChange} 
                                        className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200" 
                                        placeholder="Tamir Rahman"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Qualification</label>
                                    <input 
                                        type="text" 
                                        name="email" 
                                        value={courseData.instructor.email} 
                                        onChange={handleInstructorChange} 
                                        className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200" 
                                        placeholder="e.g., Lead Engineer at Google"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Instructor Bio</label>
                                    <textarea 
                                        name="bio" 
                                        value={courseData.instructor.bio} 
                                        onChange={handleInstructorChange} 
                                        className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 h-24" 
                                        placeholder="A brief bio about the instructor..."
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Metadata & Media */}
                        <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
                            <h2 className="text-xl font-semibold text-white mb-4">Metadata & Media</h2>
                            <div className="grid md:grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Course Image URL</label>
                                    <input 
                                        type="url" 
                                        name="image" 
                                        value={courseData.image} 
                                        onChange={handleInputChange} 
                                        className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200" 
                                        required 
                                        placeholder="https://example.com/course-image.jpg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Tags <span className="text-sm text-gray-400">(Comma-separated)</span></label>
                                    <input 
                                        type="text"
                                        value={courseData.tags.join(', ')}
                                        onChange={(e) => setCourseData(prev => ({
                                            ...prev,
                                            tags: e.target.value.split(',').map(item => item.trim())
                                        }))}
                                        className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200" 
                                        placeholder="e.g., react, nodejs, mongodb"
                                    />
                                </div>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="featured"
                                        checked={courseData.featured}
                                        onChange={handleInputChange}
                                        className="h-5 w-5 text-pink-500 bg-gray-600 border-gray-500 rounded focus:ring-pink-500 focus:ring-2"
                                    />
                                    <label className="ml-3 text-white">Mark as Featured Course</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="completion_certificate"
                                        checked={courseData.completion_certificate}
                                        onChange={handleInputChange}
                                        className="h-5 w-5 text-pink-500 bg-gray-600 border-gray-500 rounded focus:ring-pink-500 focus:ring-2"
                                    />
                                    <label className="ml-3 text-white">Offers Completion Certificate</label>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            className="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium text-lg shadow-lg"
                        >
                            Update Course
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditCourse;