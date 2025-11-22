// src/routes/PrivateRoute.jsx

import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider'; // আপনার AuthProvider এর পাথ
import LoadingSpinner from '../components/shared/LoadingSpinner'; // আপনার লোডিং স্পিনার

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    // যদি লোডিং অবস্থা থাকে (Firebase অথেনটিকেশন স্টেট চেক করছে), তাহলে স্পিনার দেখান
    if (loading) {
        return <LoadingSpinner />;
    }

    // যদি ব্যবহারকারী লগইন করা থাকে, তাহলে তাকে সেই পেইজে যেতে দিন
    if (user) {
        return children;
    }

    // যদি ব্যবহারকারী লগইন করা না থাকে, তাহলে তাকে লগইন পেইজে পাঠান
    // 'state' ব্যবহার করে আমরা মনে রাখছি ব্যবহারকারী কোন পেইজে যেতে চেয়েছিল
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;