import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { 
  Users, 
  FileText, 
  BarChart3, 
  Upload,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Download,
  Search,
  Filter
} from 'lucide-react';
import DashboardLayout from '../layout/DashboardLayout';

const StudentsManagement = () => {
  const [students] = useState([
    {
      id: 'STU001',
      name: 'Alex Johnson',
      program: 'B.Tech Computer Science',
      currentCGPA: 8.7,
      semester: 7,
      verified: true,
      email: 'alex.johnson@university.edu'
    },
    {
      id: 'STU002',
      name: 'Sarah Chen',
      program: 'B.Tech Electronics',
      currentCGPA: 9.1,
      semester: 6,
      verified: true,
      email: 'sarah.chen@university.edu'
    },
    {
      id: 'STU003',
      name: 'Michael Rodriguez',
      program: 'B.Tech Mechanical',
      currentCGPA: 8.3,
      semester: 5,
      verified: false,
      email: 'michael.r@university.edu'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterProgram, setFilterProgram] = useState('all');

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProgram = filterProgram === 'all' || student.program.includes(filterProgram);
    return matchesSearch && matchesProgram;
  });

  return (
    <div className="space-y-8">
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
              <p className="text-3xl font-bold">{students.length}</p>
            </div>
            <Users className="w-8 h-8 text-emerald-200" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Verified</p>
              <p className="text-3xl font-bold">{students.filter(s => s.verified).length}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-blue-200" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Pending</p>
              <p className="text-3xl font-bold">{students.filter(s => !s.verified).length}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-orange-200" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Avg CGPA</p>
              <p className="text-3xl font-bold">
                {(students.reduce((sum, s) => sum + s.currentCGPA, 0) / students.length).toFixed(1)}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search students by name or ID..."
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <select
              value={filterProgram}
              onChange={(e) => setFilterProgram(e.target.value)}
              className="pl-11 pr-8 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="all">All Programs</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Electronics">Electronics</option>
              <option value="Mechanical">Mechanical</option>
            </select>
          </div>
        </div>

        {/* Students Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Student</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Program</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">CGPA</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Semester</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-semibold text-gray-900">{student.name}</p>
                      <p className="text-gray-600 text-sm">{student.id}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-700">{student.program}</td>
                  <td className="py-4 px-4">
                    <span className="font-semibold text-blue-600">{student.currentCGPA}</span>
                  </td>
                  <td className="py-4 px-4 text-gray-700">{student.semester}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      student.verified 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {student.verified ? 'Verified' : 'Pending'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition-colors">
                        View
                      </button>
                      {!student.verified && (
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

const Reports = () => {
  const reportTypes = [
    {
      title: 'NAAC Report',
      description: 'National Assessment and Accreditation Council compliance report',
      lastGenerated: '2024-01-15',
      format: 'PDF'
    },
    {
      title: 'NIRF Report',
      description: 'National Institutional Ranking Framework submission report',
      lastGenerated: '2024-01-10',
      format: 'Excel'
    },
    {
      title: 'Student Performance Analytics',
      description: 'Comprehensive analysis of student academic performance',
      lastGenerated: '2024-01-20',
      format: 'PDF'
    },
    {
      title: 'Placement Statistics',
      description: 'Employment and placement data for current academic year',
      lastGenerated: '2024-01-18',
      format: 'PDF'
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-600 mt-1">Generate compliance reports and performance analytics</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {reportTypes.map((report, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{report.title}</h3>
                <p className="text-gray-600">{report.description}</p>
              </div>
              <FileText className="w-8 h-8 text-emerald-600" />
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <span>Last generated: {report.lastGenerated}</span>
              <span>Format: {report.format}</span>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex-1 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center">
                <Download className="w-4 h-4 mr-2" />
                Generate
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Analytics = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600 mt-1">Institutional performance metrics and insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Student Enrollment</p>
              <p className="text-3xl font-bold text-gray-900">2,547</p>
              <p className="text-green-600 text-sm">↑ 12% from last year</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Average CGPA</p>
              <p className="text-3xl font-bold text-gray-900">7.8</p>
              <p className="text-green-600 text-sm">↑ 0.3 from last sem</p>
            </div>
            <TrendingUp className="w-8 h-8 text-emerald-600" />
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Placement Rate</p>
              <p className="text-3xl font-bold text-gray-900">87%</p>
              <p className="text-green-600 text-sm">↑ 5% from last year</p>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Faculty Ratio</p>
              <p className="text-3xl font-bold text-gray-900">1:15</p>
              <p className="text-yellow-600 text-sm">Optimal range</p>
            </div>
            <Users className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">CGPA Distribution</h3>
          <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center">
            <p className="text-gray-500">Chart visualization would go here</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Department Performance</h3>
          <div className="h-64 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl flex items-center justify-center">
            <p className="text-gray-500">Chart visualization would go here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function InstitutionDashboard() {
  const menuItems = [
    { 
      path: '/institution', 
      icon: Users, 
      label: 'Students', 
      color: 'text-emerald-600', 
      bgColor: 'bg-emerald-50' 
    },
    { 
      path: '/institution/reports', 
      icon: FileText, 
      label: 'Reports', 
      color: 'text-blue-600', 
      bgColor: 'bg-blue-50' 
    },
    { 
      path: '/institution/analytics', 
      icon: BarChart3, 
      label: 'Analytics', 
      color: 'text-purple-600', 
      bgColor: 'bg-purple-50' 
    }
  ];

  return (
    <DashboardLayout
      title="Institution Dashboard"
      userRole="institution"
      menuItems={menuItems}
    >
      <Routes>
        <Route path="/" element={<StudentsManagement />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </DashboardLayout>
  );
}