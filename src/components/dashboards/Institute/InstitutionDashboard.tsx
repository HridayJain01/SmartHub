import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  Users,
  FileText,
  BarChart3,
  Upload,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Search,
  Filter
} from 'lucide-react';
import DashboardLayout from '../../layout/DashboardLayout';
import Reports from './Reports';
import Analytics from './Analytics';

const StudentsManagement = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBranch, setFilterBranch] = useState('all');
  const [filterSemester, setFilterSemester] = useState('all');

  // Fetch students.json
  useEffect(() => {
    fetch('/static/students.json')
      .then(res => res.json())
      .then(data => {
        if (data && data.students) {
          setStudents(data.students);
        }
      })
      .catch(err => console.error('Error loading students:', err));
  }, []);

  // Apply filters
  const filteredStudents = students.filter(student => {
    const matchesSearch =
      student.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.student_id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesBranch =
      filterBranch === 'all' || student.academic_details.branch.includes(filterBranch);

    const matchesSemester =
      filterSemester === 'all' ||
      student.academic_details.year_semester.semester === parseInt(filterSemester);

    return matchesSearch && matchesBranch && matchesSemester;
  });

  // Stats calculation
  const totalStudents = filteredStudents.length;
  const verifiedCount = filteredStudents.filter(s => s.verified_status).length;
  const pendingCount = filteredStudents.filter(s => !s.verified_status).length;
  const avgCGPA =
    totalStudents > 0
      ? (
          filteredStudents.reduce((sum, s) => sum + s.current_cgpa, 0) /
          totalStudents
        ).toFixed(1)
      : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Management</h1>
          <p className="text-gray-600 mt-1">Manage and verify student academic records</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors flex items-center">
            <Upload className="w-4 h-4 mr-2" />
            Upload Records
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
            Add Student
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100 text-sm font-medium">Total Students</p>
              <p className="text-3xl font-bold">{totalStudents}</p>
            </div>
            <Users className="w-8 h-8 text-emerald-200" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Verified</p>
              <p className="text-3xl font-bold">{verifiedCount}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-blue-200" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Pending</p>
              <p className="text-3xl font-bold">{pendingCount}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-orange-200" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Avg CGPA</p>
              <p className="text-3xl font-bold">{avgCGPA}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center space-x-4 mb-6">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search students by name or ID..."
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          {/* Branch Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <select
              value={filterBranch}
              onChange={e => setFilterBranch(e.target.value)}
              className="pl-11 pr-8 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="all">All Branches</option>
              <option value="Information Technology">IT</option>
              <option value="Computer">Computer</option>
              <option value="Artificial Intelligence & Data Science">AI & DS</option>
              <option value="Electronics & Telecommunication">Electronics & Telecommunication</option>
            </select>
          </div>

          {/* Semester Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <select
              value={filterSemester}
              onChange={e => setFilterSemester(e.target.value)}
              className="pl-11 pr-8 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="all">All Semesters</option>
              {Array.from({ length: 8 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  Semester {i + 1}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Students Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Student</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Branch</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">CGPA</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Semester</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => (
                <tr
                  key={student.student_id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-semibold text-gray-900">{student.full_name}</p>
                      <p className="text-gray-600 text-sm">{student.student_id}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-700">{student.academic_details.branch}</td>
                  <td className="py-4 px-4">
                    <span className="font-semibold text-blue-600">{student.current_cgpa}</span>
                  </td>
                  <td className="py-4 px-4 text-gray-700">
                    {student.academic_details.year_semester.semester}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        student.verified_status
                          ? 'bg-green-100 text-green-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}
                    >
                      {student.verified_status ? 'Verified' : 'Pending'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition-colors">
                        View
                      </button>
                      {!student.verified_status && (
                        <button className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition-colors">
                          Verify
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default function InstitutionDashboard() {
  const menuItems = [
    { path: '/institution', icon: Users, label: 'Students', color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
    { path: '/institution/reports', icon: FileText, label: 'Reports', color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { path: '/institution/analytics', icon: BarChart3, label: 'Analytics', color: 'text-purple-600', bgColor: 'bg-purple-50' }
  ];

  return (
    <DashboardLayout title="Institution Dashboard" userRole="institution" menuItems={menuItems}>
      <Routes>
        <Route path="/" element={<StudentsManagement />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </DashboardLayout>
  );
}
