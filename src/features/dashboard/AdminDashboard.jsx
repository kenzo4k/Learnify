import React from 'react';
import {
  BookOpen,
  DollarSign,
  Star,
  TrendingUp,
  Users,
  UserPlus,
} from 'lucide-react';

const adminSampleData = {
  stats: {
    totalCourses: 8,
    totalUsers: 45,
    totalRevenue: 2100,
    avgRating: 4.2,
  },
  courses: [
    {
      id: '1',
      title: 'Web Development Bootcamp',
      instructor: 'Ahmed Khan',
      students: 45,
      revenue: 1200,
      status: 'Active',
    },
    {
      id: '2',
      title: 'Python Basics',
      instructor: 'Fatima Ali',
      students: 32,
      revenue: 650,
      status: 'Active',
    },
    {
      id: '3',
      title: 'React Fundamentals',
      instructor: 'Omar Hassan',
      students: 38,
      revenue: 800,
      status: 'Active',
    },
  ],
  users: [
    {
      id: '1',
      name: 'Ahmed Khan',
      email: 'ahmed@email.com',
      role: 'Instructor',
      joinDate: '2024-01-05',
      status: 'Active',
    },
    {
      id: '2',
      name: 'Fatima Ali',
      email: 'fatima@email.com',
      role: 'Instructor',
      joinDate: '2024-01-03',
      status: 'Active',
    },
    {
      id: '3',
      name: 'Zainab Ahmed',
      email: 'zainab@email.com',
      role: 'Student',
      joinDate: '2024-01-10',
      status: 'Active',
    },
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

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);

const StatCard = ({ title, value, icon: Icon, accentClass }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <p className="mt-1 text-2xl font-bold text-white">{value}</p>
        </div>
        <div className={`p-3 rounded-xl ${accentClass}`}>
          {React.createElement(Icon, { className: 'w-6 h-6 text-white' })}
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const { stats, courses, users, recentEnrollments, popularCourses } =
    adminSampleData;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        <header>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-gray-400 mt-2">
                Sample overview data (easy to replace with real API data later)
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 rounded-full border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-gray-300">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              Platform Overview
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Courses"
            value={stats.totalCourses}
            icon={BookOpen}
            accentClass="bg-cyan-600"
          />
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            icon={Users}
            accentClass="bg-blue-600"
          />
          <StatCard
            title="Total Revenue"
            value={formatCurrency(stats.totalRevenue)}
            icon={DollarSign}
            accentClass="bg-indigo-600"
          />
          <StatCard
            title="Average Rating"
            value={stats.avgRating}
            icon={Star}
            accentClass="bg-sky-600"
          />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-lg font-semibold text-white">Sample Courses</h2>
              <p className="text-sm text-gray-400 mt-1">3 courses only</p>
            </div>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr className="text-gray-400">
                    <th className="bg-gray-800">Course</th>
                    <th className="bg-gray-800">Instructor</th>
                    <th className="bg-gray-800">Students</th>
                    <th className="bg-gray-800">Revenue</th>
                    <th className="bg-gray-800">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course.id} className="hover:bg-gray-700/40">
                      <td className="font-medium text-white">{course.title}</td>
                      <td className="text-gray-300">{course.instructor}</td>
                      <td className="text-gray-300">{course.students}</td>
                      <td className="text-gray-300">{formatCurrency(course.revenue)}</td>
                      <td>
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

          <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-lg font-semibold text-white">Sample Users</h2>
              <p className="text-sm text-gray-400 mt-1">3 users only</p>
            </div>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr className="text-gray-400">
                    <th className="bg-gray-800">Name</th>
                    <th className="bg-gray-800">Email</th>
                    <th className="bg-gray-800">Role</th>
                    <th className="bg-gray-800">Join Date</th>
                    <th className="bg-gray-800">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-700/40">
                      <td className="font-medium text-white">{u.name}</td>
                      <td className="text-gray-300">{u.email}</td>
                      <td>
                        <span className="inline-flex items-center rounded-full bg-cyan-900/40 px-2.5 py-1 text-xs font-semibold text-cyan-300 border border-cyan-800">
                          {u.role}
                        </span>
                      </td>
                      <td className="text-gray-300">{u.joinDate}</td>
                      <td>
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
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800 border border-gray-700 rounded-xl">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-lg font-semibold text-white">Recent Enrollments</h2>
              <p className="text-sm text-gray-400 mt-1">2 entries only</p>
            </div>
            <div className="p-6 space-y-4">
              {recentEnrollments.map((enrollment) => (
                <div
                  key={enrollment.id}
                  className="flex items-center justify-between rounded-lg border border-gray-700 bg-gray-900/30 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-cyan-900/30 border border-cyan-800">
                      <UserPlus className="w-4 h-4 text-cyan-300" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{enrollment.user}</p>
                      <p className="text-sm text-gray-400">enrolled in {enrollment.course}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{enrollment.date}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-xl">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-lg font-semibold text-white">Popular Courses</h2>
              <p className="text-sm text-gray-400 mt-1">Top 2</p>
            </div>
            <div className="p-6 space-y-4">
              {popularCourses.map((course) => (
                <div
                  key={course.id}
                  className="flex items-center justify-between rounded-lg border border-gray-700 bg-gray-900/30 px-4 py-3"
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
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
