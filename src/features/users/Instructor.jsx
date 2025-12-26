// src/pages/Instructor/Instructor.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../../context/AuthProvider";
import toast from 'react-hot-toast';
import {
  BookOpen,
  Users,
  DollarSign,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Eye,
  Star,
  Calendar,
  Award,
  Clock,
  AlertTriangle
} from 'lucide-react';
import AtRiskStudents from '../../components/instructor/AtRiskStudents';

const Instructor = () => {
  const { user } = React.useContext(AuthContext);
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalRevenue: 0,
    averageRating: 0,
    pendingReviews: 0,
    activeCourses: 0
  });
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchInstructorData();
  }, []);

  const fetchInstructorData = async () => {
    try {
      setLoading(true);

      // Fetch instructor statistics
      const statsResponse = await fetch(`https://course-management-system-server-woad.vercel.app/api/instructor/stats?email=${user.email}`);
      const statsData = await statsResponse.json();
      setStats(statsData);

      // Fetch instructor courses
      const coursesResponse = await fetch(`https://course-management-system-server-woad.vercel.app/api/instructor/courses?email=${user.email}`);
      const coursesData = await coursesResponse.json();
      setCourses(coursesData);

      // Fetch instructor students
      const studentsResponse = await fetch(`https://course-management-system-server-woad.vercel.app/api/instructor/students?email=${user.email}`);
      const studentsData = await studentsResponse.json();
      setStudents(studentsData);

    } catch (error) {
      console.error('Error fetching instructor data:', error);
      toast.error('Failed to load instructor data');
    } finally {
      setLoading(false);
    }
  };

  const handleCourseAction = async (courseId, action) => {
    try {
      const response = await fetch(`https://course-management-system-server-woad.vercel.app/api/instructor/courses/${courseId}/${action}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        toast.success(`Course ${action} successfully`);
        fetchInstructorData();
      } else {
        throw new Error('Failed to perform action');
      }
    } catch (error) {
      toast.error(`Failed to ${action} course`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Instructor Dashboard</h1>
          <p className="text-gray-400">Manage your courses and students</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 border-b border-gray-700">
          {['overview', 'courses', 'students', 'at-risk', 'analytics'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium capitalize transition-colors ${activeTab === tab
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-white'
                }`}
            >
              {tab === 'at-risk' ? 'At-Risk Students' : tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Courses</p>
                    <p className="text-3xl font-bold">{stats.totalCourses}</p>
                  </div>
                  <BookOpen className="w-8 h-8 text-blue-400" />
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Students</p>
                    <p className="text-3xl font-bold">{stats.totalStudents}</p>
                  </div>
                  <Users className="w-8 h-8 text-green-400" />
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Revenue</p>
                    <p className="text-3xl font-bold">${stats.totalRevenue}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-yellow-400" />
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Average Rating</p>
                    <p className="text-3xl font-bold">{stats.averageRating.toFixed(1)}</p>
                  </div>
                  <Star className="w-8 h-8 text-purple-400" />
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Pending Reviews</p>
                    <p className="text-3xl font-bold">{stats.pendingReviews}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-orange-400" />
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Active Courses</p>
                    <p className="text-3xl font-bold">{stats.activeCourses}</p>
                  </div>
                  <Award className="w-8 h-8 text-teal-400" />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Courses */}
              <div className="bg-gray-800 rounded-lg border border-gray-700">
                <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                  <h2 className="text-xl font-semibold">My Courses</h2>
                  <Link
                    to="/add-course"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Course</span>
                  </Link>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {courses.slice(0, 5).map((course) => (
                      <div key={course._id} className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium">{course.title}</p>
                          <p className="text-sm text-gray-400">{course.enrolledStudents || 0} students</p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleCourseAction(course._id, 'view')}
                            className="p-2 text-blue-400 hover:bg-blue-900 rounded"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleCourseAction(course._id, 'edit')}
                            className="p-2 text-yellow-400 hover:bg-yellow-900 rounded"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Students */}
              <div className="bg-gray-800 rounded-lg border border-gray-700">
                <div className="p-6 border-b border-gray-700">
                  <h2 className="text-xl font-semibold">Recent Students</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {students.slice(0, 5).map((student) => (
                      <div key={student._id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                            {student.displayName?.charAt(0) || student.email?.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{student.displayName || 'Unknown'}</p>
                            <p className="text-sm text-gray-400">{student.email}</p>
                          </div>
                        </div>
                        <div className="text-sm text-gray-400">
                          {student.enrolledCourses || 0} courses
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="p-6 border-b border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Course Management</h2>
              <Link
                to="/add-course"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Course</span>
              </Link>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4">Course</th>
                      <th className="text-left py-3 px-4">Students</th>
                      <th className="text-left py-3 px-4">Rating</th>
                      <th className="text-left py-3 px-4">Revenue</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course) => (
                      <tr key={course._id} className="border-b border-gray-700">
                        <td className="py-3 px-4">{course.title}</td>
                        <td className="py-3 px-4">{course.enrolledStudents || 0}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <span>{course.rating || 0}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">${course.revenue || 0}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-xs ${course.status === 'published' ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'
                            }`}>
                            {course.status || 'draft'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <button className="p-1 text-blue-400 hover:bg-blue-900 rounded">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-yellow-400 hover:bg-yellow-900 rounded">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-red-400 hover:bg-red-900 rounded">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Students Tab */}
        {activeTab === 'students' && (
          <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-xl font-semibold">Student Management</h2>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4">Student</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Courses</th>
                      <th className="text-left py-3 px-4">Progress</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student._id} className="border-b border-gray-700">
                        <td className="py-3 px-4">{student.displayName || 'Unknown'}</td>
                        <td className="py-3 px-4">{student.email}</td>
                        <td className="py-3 px-4">{student.enrolledCourses || 0}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-24 bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${student.progress || 0}%` }}
                              ></div>
                            </div>
                            <span className="text-sm">{student.progress || 0}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <button className="p-1 text-blue-400 hover:bg-blue-900 rounded">
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* At-Risk Students Tab */}
        {activeTab === 'at-risk' && (
          <AtRiskStudents />
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h2 className="text-xl font-semibold mb-6">Performance Analytics</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-700 p-4 rounded">
                <h3 className="text-lg font-medium mb-4">Enrollment Trends</h3>
                <div className="h-48 flex items-center justify-center text-gray-400">
                  Analytics chart would go here
                </div>
              </div>
              <div className="bg-gray-700 p-4 rounded">
                <h3 className="text-lg font-medium mb-4">Revenue Overview</h3>
                <div className="h-48 flex items-center justify-center text-gray-400">
                  Analytics chart would go here
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Instructor;
