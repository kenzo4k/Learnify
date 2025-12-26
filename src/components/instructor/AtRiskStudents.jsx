// src/components/instructor/AtRiskStudents.jsx
import React, { useState, useEffect } from 'react';
import { AlertTriangle, Clock, Mail, Send, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import { instructorService } from '../../services/instructorService';

const AtRiskStudents = () => {
    const [atRiskStudents, setAtRiskStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedStudents, setSelectedStudents] = useState([]);

    useEffect(() => {
        fetchAtRiskStudents();
    }, []);

    const fetchAtRiskStudents = async () => {
        try {
            setLoading(true);
            const data = await instructorService.getAtRiskStudents();
            setAtRiskStudents(data);
        } catch (error) {
            console.error('Error fetching at-risk students:', error);
            toast.error('Failed to load at-risk students data');
        } finally {
            setLoading(false);
        }
    };

    const handleSendReminder = async (studentId) => {
        try {
            await instructorService.sendReminder(studentId);
            toast.success('Reminder sent successfully');
            fetchAtRiskStudents(); // Refresh data
        } catch (error) {
            toast.error('Failed to send reminder');
        }
    };

    const handleBulkReminder = async () => {
        try {
            await instructorService.sendBulkReminder(selectedStudents);
            toast.success(`Reminder sent to ${selectedStudents.length} students`);
            setSelectedStudents([]);
            fetchAtRiskStudents();
        } catch (error) {
            toast.error('Failed to send reminders');
        }
    };

    const toggleStudentSelection = (studentId) => {
        setSelectedStudents(prev =>
            prev.includes(studentId)
                ? prev.filter(id => id !== studentId)
                : [...prev, studentId]
        );
    };

    const getRiskLevel = (daysSinceLastLogin) => {
        if (daysSinceLastLogin >= 14) return { level: 'High', color: 'bg-red-900 text-red-300', icon: AlertTriangle };
        if (daysSinceLastLogin >= 10) return { level: 'Medium', color: 'bg-yellow-900 text-yellow-300', icon: Clock };
        return { level: 'Low', color: 'bg-blue-900 text-blue-300', icon: Eye };
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="w-8 h-8 border-2 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="bg-gray-800 rounded-lg border border-gray-700">
            {/* Header */}
            <div className="p-6 border-b border-gray-700">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-orange-400" />
                            At-Risk Students (7 Days)
                        </h2>
                        <p className="text-gray-400 text-sm mt-1">
                            {atRiskStudents.length} students haven't logged in for 7+ days
                        </p>
                    </div>
                    {selectedStudents.length > 0 && (
                        <button
                            onClick={handleBulkReminder}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                        >
                            <Send className="w-4 h-4" />
                            Send Reminder ({selectedStudents.length})
                        </button>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                {atRiskStudents.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                        <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-green-400" />
                        <p>No at-risk students currently</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-700">
                                    <th className="text-right py-3 px-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedStudents.length === atRiskStudents.length}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedStudents(atRiskStudents.map(s => s._id));
                                                } else {
                                                    setSelectedStudents([]);
                                                }
                                            }}
                                            className="rounded border-gray-600"
                                        />
                                    </th>
                                    <th className="text-right py-3 px-4">Student</th>
                                    <th className="text-right py-3 px-4">Email</th>
                                    <th className="text-right py-3 px-4">Last Login</th>
                                    <th className="text-right py-3 px-4">Days Since Last Visit</th>
                                    <th className="text-right py-3 px-4">Risk Level</th>
                                    <th className="text-right py-3 px-4">Enrolled Courses</th>
                                    <th className="text-right py-3 px-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {atRiskStudents.map((student) => {
                                    const daysSinceLastLogin = Math.floor(
                                        (Date.now() - new Date(student.lastLogin)) / (1000 * 60 * 60 * 24)
                                    );
                                    const risk = getRiskLevel(daysSinceLastLogin);
                                    const RiskIcon = risk.icon;

                                    return (
                                        <tr key={student._id} className="border-b border-gray-700 hover:bg-gray-700/50">
                                            <td className="py-3 px-4">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedStudents.includes(student._id)}
                                                    onChange={() => toggleStudentSelection(student._id)}
                                                    className="rounded border-gray-600"
                                                />
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-sm">
                                                        {student.displayName?.charAt(0) || student.email?.charAt(0)}
                                                    </div>
                                                    <span className="font-medium">{student.displayName || 'Unknown'}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-gray-300">{student.email}</td>
                                            <td className="py-3 px-4 text-gray-300">
                                                {new Date(student.lastLogin).toLocaleDateString('en-US')}
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className={`px-2 py-1 rounded text-sm ${daysSinceLastLogin >= 14 ? 'bg-red-900 text-red-300' : 'bg-yellow-900 text-yellow-300'}`}>
                                                    {daysSinceLastLogin} days
                                                </span>
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className={`px-2 py-1 rounded text-xs flex items-center gap-1 w-fit ${risk.color}`}>
                                                    <RiskIcon className="w-3 h-3" />
                                                    {risk.level}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4">{student.enrolledCourses || 0}</td>
                                            <td className="py-3 px-4">
                                                <div className="flex space-x-2 gap-2">
                                                    <button
                                                        onClick={() => handleSendReminder(student._id)}
                                                        className="p-2 text-blue-400 hover:bg-blue-900 rounded transition-colors"
                                                        title="Send Reminder"
                                                    >
                                                        <Mail className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        className="p-2 text-green-400 hover:bg-green-900 rounded transition-colors"
                                                        title="View Profile"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AtRiskStudents;
