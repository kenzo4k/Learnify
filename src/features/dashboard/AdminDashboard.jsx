import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import { 
  BookOpen, 
  Users, 
  DollarSign, 
  Star,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  TrendingUp,
  UserCheck,
  UserPlus,
  Settings,
  Menu,
  X
} from 'lucide-react';

const USE_ADMIN_SAMPLE_DATA = true;

const adminSampleData = {
  stats: {
    totalCourses: 8,
    totalUsers: 45,
    totalRevenue: 2100,
    avgRating: 4.2,
  },
  courses: [
    { id: '1', title: 'Web Development Bootcamp', instructor: 'Ahmed Khan', students: 45, revenue: 1200, status: 'Active' },
    { id: '2', title: 'Python Basics', instructor: 'Fatima Ali', students: 32, revenue: 650, status: 'Active' },
    { id: '3', title: 'React Fundamentals', instructor: 'Omar Hassan', students: 38, revenue: 800, status: 'Active' },
  ],
  users: [
    { id: '1', name: 'Ahmed Khan', email: 'ahmed@email.com', role: 'Instructor', joinDate: '2024-01-05', status: 'Active' },
    { id: '2', name: 'Fatima Ali', email: 'fatima@email.com', role: 'Instructor', joinDate: '2024-01-03', status: 'Active' },
    { id: '3', name: 'Zainab Ahmed', email: 'zainab@email.com', role: 'Student', joinDate: '2024-01-10', status: 'Active' },
  ],
  recentEnrollments: [
    { id: '1', user: 'Zainab Ahmed', course: 'Web Development', date: '2 hours ago' },
    { id: '2', user: 'Omar Hassan', course: 'Python Basics', date: 'Yesterday' },
  ],
  popularCourses: [
    { id: '1', title: 'Web Development Bootcamp', students: 45 },
    { id: '3', title: 'React Fundamentals', students: 38 },
  ],
};

// Sample data - ONLY for display
const sampleStats = {
  totalCourses: 8,
  totalUsers: 45,
  totalRevenue: 2100,
  avgRating: 4.2
};

const sampleCourses = [
  { _id: 1, title: "Web Development Bootcamp", instructor: "Ahmed Khan", students: 45, revenue: 1200, status: "Active" },
  { _id: 2, title: "Python Basics", instructor: "Fatima Ali", students: 32, revenue: 650, status: "Active" },
  { _id: 3, title: "React Fundamentals", instructor: "Omar Hassan", students: 38, revenue: 800, status: "Active" }
];

const sampleUsers = [
  { _id: 1, name: "Ahmed Khan", email: "ahmed@email.com", role: "Instructor", createdAt: "2024-01-05", status: "Active" },
  { _id: 2, name: "Fatima Ali", email: "fatima@email.com", role: "Instructor", createdAt: "2024-01-03", status: "Active" },
  { _id: 3, name: "Zainab Ahmed", email: "zainab@email.com", role: "Student", createdAt: "2024-01-10", status: "Active" }
];

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);

const Dashboard = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Check if user is admin or instructor
  const isAdmin = user?.email === 'admin@learnify.com' || user?.email === 'emad@gmail.com';
  const isInstructor = Boolean(!isAdmin && user);

  useEffect(() => {
    if (USE_ADMIN_SAMPLE_DATA && isAdmin) {
      setLoading(false);
    }

    fetchData();
  }, [isAdmin]);

  const fetchData = async () => {
    try {
      const [coursesRes, usersRes] = await Promise.all([
        axios.get('https://course-management-system-server-woad.vercel.app/api/courses'),
        axios.get('https://course-management-system-server-woad.vercel.app/api/users')
      ]);
      
      setCourses(coursesRes.data || []);
      setUsers(usersRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await axios.delete(`https://course-management-system-server-woad.vercel.app/api/courses/${courseId}`);
        setCourses(courses.filter(course => course._id !== courseId));
      } catch (error) {
        console.error('Error deleting course:', error);
      }
    }
  };

  const coursesToDisplay = courses && courses.length > 0 ? courses : sampleCourses;
  const usersToDisplay = users && users.length > 0 ? users : sampleUsers;

  const filteredCourses = coursesToDisplay.filter(course =>
    course.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const StatCard = ({ title, value, icon: Icon, color, dark = false }) => (
    <div
      className={`rounded-lg shadow-sm border p-6 ${
        dark ? 'bg-gray-900 border-gray-800' : 'bg-white'
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm mb-1 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
            {title}
          </p>
          <p className={`text-2xl font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>
            {value}
          </p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          {React.createElement(Icon, { className: 'w-6 h-6 text-white' })}
        </div>
      </div>
    </div>
  );

  const sidebarItems = [
    ...(isAdmin ? [
      { id: 'overview', label: 'Overview', icon: TrendingUp },
      { id: 'courses', label: 'All Courses', icon: BookOpen },
      { id: 'users', label: 'Users', icon: Users },
      { id: 'instructors', label: 'Instructors', icon: UserCheck },
    ] : [
      { id: 'overview', label: 'My Dashboard', icon: TrendingUp },
      { id: 'courses', label: 'My Courses', icon: BookOpen },
    ]),
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <h1 className="text-xl font-bold text-gray-800">Learnify</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="mt-6">
          <div className="px-6 mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                {user?.displayName?.[0] || user?.email?.[0]?.toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">{user?.displayName || 'User'}</p>
                <p className="text-xs text-gray-500 capitalize">
                  {isAdmin ? 'Admin' : isInstructor ? 'Instructor' : 'User'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-0">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b lg:hidden">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-500 hover:text-gray-700"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
            <div className="w-6"></div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {isAdmin ? 'Platform Overview' : 'My Dashboard'}
                </h1>
                <p className="text-gray-600 mt-1">
                  {isAdmin ? 'Manage the entire platform' : 'Manage your courses and students'}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="Total Courses"
                  value={
                    USE_ADMIN_SAMPLE_DATA && isAdmin
                      ? adminSampleData.stats.totalCourses
                      : courses.length > 0 ? courses.length : sampleStats.totalCourses
                  }
                  icon={BookOpen}
                  color={USE_ADMIN_SAMPLE_DATA && isAdmin ? 'bg-cyan-600' : 'bg-blue-500'}
                  dark={USE_ADMIN_SAMPLE_DATA && isAdmin}
                />
                <StatCard
                  title="Total Users"
                  value={
                    USE_ADMIN_SAMPLE_DATA && isAdmin
                      ? adminSampleData.stats.totalUsers
                      : users.length > 0 ? users.length : sampleStats.totalUsers
                  }
                  icon={Users}
                  color={USE_ADMIN_SAMPLE_DATA && isAdmin ? 'bg-blue-600' : 'bg-green-500'}
                  dark={USE_ADMIN_SAMPLE_DATA && isAdmin}
                />
                <StatCard
                  title="Total Revenue"
                  value={
                    USE_ADMIN_SAMPLE_DATA && isAdmin
                      ? formatCurrency(adminSampleData.stats.totalRevenue)
                      : formatCurrency(sampleStats.totalRevenue)
                  }
                  icon={DollarSign}
                  color={USE_ADMIN_SAMPLE_DATA && isAdmin ? 'bg-indigo-600' : 'bg-purple-500'}
                  dark={USE_ADMIN_SAMPLE_DATA && isAdmin}
                />
                <StatCard
                  title="Avg Rating"
                  value={
                    USE_ADMIN_SAMPLE_DATA && isAdmin
                      ? adminSampleData.stats.avgRating
                      : sampleStats.avgRating
                  }
                  icon={Star}
                  color={USE_ADMIN_SAMPLE_DATA && isAdmin ? 'bg-sky-600' : 'bg-orange-500'}
                  dark={USE_ADMIN_SAMPLE_DATA && isAdmin}
                />
              </div>

              {USE_ADMIN_SAMPLE_DATA && isAdmin ? (
                <div className="space-y-6">
                  {/* Sample tables */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Sample Courses Table */}
                    <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-800 overflow-hidden">
                      <div className="p-6 border-b border-gray-800">
                        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-cyan-400" />
                          Sample Courses
                        </h2>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-800/60">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Title
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Instructor
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Students
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Revenue
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-800">
                            {adminSampleData.courses.map((course) => (
                              <tr key={course.id} className="hover:bg-gray-800/40">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                  {course.title}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                  {course.instructor}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                  {course.students}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                  {formatCurrency(course.revenue)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="inline-flex items-center rounded-full bg-green-900/40 px-2.5 py-1 text-xs font-semibold text-green-300 border border-green-800">
                                    {course.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Sample Users Table */}
                    <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-800 overflow-hidden">
                      <div className="p-6 border-b border-gray-800">
                        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                          <Users className="w-5 h-5 text-blue-400" />
                          Sample Users
                        </h2>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-800/60">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Name
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Email
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Role
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Join Date
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-800">
                            {adminSampleData.users.map((u) => (
                              <tr key={u.id} className="hover:bg-gray-800/40">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                  {u.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                  {u.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="inline-flex items-center rounded-full bg-cyan-900/40 px-2.5 py-1 text-xs font-semibold text-cyan-300 border border-cyan-800">
                                    {u.role}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                  {u.joinDate}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="inline-flex items-center rounded-full bg-green-900/40 px-2.5 py-1 text-xs font-semibold text-green-300 border border-green-800">
                                    {u.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Recent Enrollments + Popular Courses */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-800">
                      <div className="p-6 border-b border-gray-800">
                        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                          <UserPlus className="w-5 h-5 text-cyan-400" />
                          Recent Enrollments
                        </h2>
                      </div>
                      <div className="p-6 space-y-3">
                        {adminSampleData.recentEnrollments.map((enrollment) => (
                          <div
                            key={enrollment.id}
                            className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-800/20 px-4 py-3"
                          >
                            <div>
                              <p className="text-white font-medium">{enrollment.user}</p>
                              <p className="text-sm text-gray-400">{enrollment.course}</p>
                            </div>
                            <span className="text-xs text-gray-400">{enrollment.date}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-800">
                      <div className="p-6 border-b border-gray-800">
                        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-blue-400" />
                          Popular Courses
                        </h2>
                      </div>
                      <div className="p-6 space-y-3">
                        {adminSampleData.popularCourses.map((course) => (
                          <div
                            key={course.id}
                            className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-800/20 px-4 py-3"
                          >
                            <div>
                              <p className="text-white font-medium">{course.title}</p>
                              <p className="text-sm text-gray-400">{course.students} students</p>
                            </div>
                            <span className="text-cyan-300 text-sm font-semibold">#{course.id}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm border">
                  <div className="p-6 border-b">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Courses</h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {coursesToDisplay.slice(0, 5).map((course) => (
                        <div key={course._id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                              <BookOpen className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">{course.title}</h3>
                              <p className="text-sm text-gray-500">{course.instructor}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">${course.price || 0}</p>
                            <p className="text-xs text-gray-500">{course.students || 0} students</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'courses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {isAdmin ? 'All Courses' : 'My Courses'}
                  </h1>
                  <p className="text-gray-600 mt-1">Manage courses</p>
                </div>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Course
                </button>
              </div>

              {/* Search and Filter */}
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <div className="flex space-x-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search courses..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </button>
                </div>
              </div>

              {/* Courses Table */}
              <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Course
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Instructor
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Students
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Revenue
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredCourses.map((course) => (
                        <tr key={course._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <BookOpen className="w-5 h-5 text-blue-500 mr-3" />
                              <div>
                                <div className="text-sm font-medium text-gray-900">{course.title}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {course.instructor}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {course.students || 0}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {course.revenue ? formatCurrency(course.revenue) : formatCurrency(course.price || 0)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              (course.status || 'Active') === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {course.status || 'Active'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDeleteCourse(course._id)}
                                className="text-red-600 hover:text-red-900"
                              >
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

          {activeTab === 'users' && isAdmin && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">All Users</h1>
                <p className="text-gray-600 mt-1">Manage platform users</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Joined
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {usersToDisplay.map((user) => (
                        <tr key={user._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                                {user.name?.[0] || user.email?.[0]?.toUpperCase()}
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              {user.role || 'Student'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              (user.status || 'Active') === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {user.status || 'Active'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-600 mt-1">Manage your account settings</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Name
                          </label>
                          <input
                            type="text"
                            value={user?.displayName || ''}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            value={user?.email || ''}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            readOnly
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Preferences</h3>
                      <div className="space-y-4">
                        <label className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Email Notifications</p>
                            <p className="text-sm text-gray-500">Receive notifications via email</p>
                          </div>
                          <input
                            type="checkbox"
                            defaultChecked
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add Course Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Course</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Title
                </label>
                <input
                  type="text"
                  placeholder="Enter course title"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Enter course description"
                  rows={3}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price
                </label>
                <input
                  type="number"
                  placeholder="0"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Course
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
