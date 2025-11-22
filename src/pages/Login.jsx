import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth'; // আপনার কাস্টম হুক

const Login = () => {
    const { register, handleSubmit } = useForm();
    const { signIn, googleSignIn } = useAuth(); // আপনার AuthContext থেকে আসা ফাংশন
    
    // React Router থেকে প্রয়োজনীয় হুক
    const navigate = useNavigate();
    const location = useLocation();
    // ব্যবহারকারী কোন পেজ থেকে এই লগইন পেজে এসেছে, তা বের করা হচ্ছে
    // PrivateRoute থেকে state এর মাধ্যমে এই তথ্য পাঠানো হয়েছিল
    const from = location.state?.from?.pathname || "/";
    
    // ইমেইল-পাসওয়ার্ড দিয়ে লগইন হ্যান্ডলার
    const onSubmit = data => {
        signIn(data.email, data.password)
            .then(() => {
                toast.success("Login Successful!");
                // লগইন সফল হলে, ব্যবহারকারীকে তার আগের পেজে বা হোমপেজে পাঠিয়ে দেওয়া হচ্ছে
                navigate(from, { replace: true });
            })
            .catch(err => toast.error(err.message));
    };
    
    // গুগল সাইন-ইন হ্যান্ডলার
    const handleGoogleLogin = () => {
        googleSignIn()
            .then(() => {
                toast.success("Login Successful!");
                // এখানেও লগইন সফল হলে ব্যবহারকারীকে আগের পেজে ফেরত পাঠানো হচ্ছে
                navigate(from, { replace: true });
            })
            .catch(err => toast.error(err.message));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Background blur effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/10 to-cyan-400/10 blur-3xl"></div>
                
                {/* Main card */}
                <div className="relative bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden">
                    {/* Gradient border effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 rounded-2xl"></div>
                    <div className="absolute inset-[1px] bg-gray-800/90 rounded-2xl"></div>
                    
                    <form onSubmit={handleSubmit(onSubmit)} className="relative p-8 space-y-6">
                        {/* Header */}
                        <div className="text-center space-y-2">
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                                Welcome Back
                            </h1>
                            <p className="text-gray-400">Sign in to your account</p>
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">
                                Email Address
                            </label>
                            <div className="relative">
                                <input 
                                    type="email" 
                                    {...register("email", { required: true })} 
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                                />
                                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500/0 to-cyan-500/0 hover:from-indigo-500/10 hover:to-cyan-500/10 pointer-events-none transition-all duration-200"></div>
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">
                                Password
                            </label>
                            <div className="relative">
                                <input 
                                    type="password" 
                                    {...register("password", { required: true })} 
                                    placeholder="Enter your password"
                                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                                />
                                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500/0 to-cyan-500/0 hover:from-indigo-500/10 hover:to-cyan-500/10 pointer-events-none transition-all duration-200"></div>
                            </div>
                        </div>

                        {/* Login Button */}
                        <button 
                            type="submit" 
                            className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-indigo-500/25 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 transform hover:scale-105 transition-all duration-200"
                        >
                            Sign In
                        </button>

                        {/* Divider */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-600"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-gray-800 text-gray-400">OR</span>
                            </div>
                        </div>

                        {/* Google Login Button */}
                        <button 
                            type="button" 
                            onClick={handleGoogleLogin}
                            className="w-full py-3 px-4 bg-transparent border-2 border-gray-600 hover:border-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-500/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center justify-center space-x-3"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            <span>Continue with Google</span>
                        </button>

                        {/* Register Link */}
                        <p className="text-center text-gray-400">
                            New here?{' '}
                            <Link 
                                to="/register" 
                                className="text-indigo-400 hover:text-indigo-300 font-semibold hover:underline transition-colors duration-200"
                            >
                                Create an account
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;