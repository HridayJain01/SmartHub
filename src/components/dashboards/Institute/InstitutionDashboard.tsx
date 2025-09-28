import React, { useState, useEffect, useMemo } from 'react';
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
  Filter,
  Building2,
  Layers,
  Plus,
  Trash2,
  PieChart,
  BarChart2
} from 'lucide-react';
import DashboardLayout from '../../layout/DashboardLayout';
import Reports from './Reports';
import Analytics from './Analytics';

/* =========================================================
   Utilities (deterministic pseudo-random for demo stats)
   ========================================================= */
function hashString(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24); // FNV-like
  }
  return Math.abs(h >>> 0);
}

function seededRange(seedBase: string, min: number, max: number) {
  const h = hashString(seedBase);
  const r = (h % 10000) / 10000; // 0..1
  return Math.round(min + r * (max - min));
}

type StudentRow = {
  full_name: string;
  student_id: string;
  verified_status?: boolean;
  current_cgpa?: number;
  academic_details: {
    branch: string;
    year_semester: { year?: number; semester?: number };
  };
};

/* =========================================================
   Students Management (unchanged visual, minor safe guards)
   ========================================================= */
const StudentsManagement = () => {
  const [students, setStudents] = useState<StudentRow[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBranch, setFilterBranch] = useState('all');
  const [filterSemester, setFilterSemester] = useState('all');

  useEffect(() => {
    fetch('/static/students.json')
      .then(res => res.json())
      .then(data => {
        if (data && data.students) setStudents(data.students);
      })
      .catch(err => console.error('Error loading students:', err));
  }, []);

  const branches = useMemo(() => {
    const set = new Set<string>();
    students.forEach(s => s?.academic_details?.branch && set.add(s.academic_details.branch));
    return Array.from(set).sort();
  }, [students]);

  const filteredStudents = students.filter(student => {
    const nameHit =
      student.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false;
    const idHit =
      student.student_id?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false;
    const matchesSearch = nameHit || idHit;

    const matchesBranch =
      filterBranch === 'all' || student.academic_details?.branch?.includes(filterBranch);

    const sem = student.academic_details?.year_semester?.semester;
    const matchesSemester = filterSemester === 'all' || sem === parseInt(filterSemester);

    return matchesSearch && matchesBranch && matchesSemester;
  });

  const totalStudents = filteredStudents.length;
  const verifiedCount = filteredStudents.filter(s => !!s.verified_status).length;
  const pendingCount = filteredStudents.filter(s => !s.verified_status).length;
  const avgCGPA =
    totalStudents > 0
      ? (
          filteredStudents.reduce((sum, s) => sum + (s.current_cgpa || 0), 0) /
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

      {/* Stats */}
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

      {/* Filters + Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        {/* Filters */}
        <div className="flex items-center space-x-4 mb-6">
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

          <div className="relative">
            <Filter className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <select
              value={filterBranch}
              onChange={e => setFilterBranch(e.target.value)}
              className="pl-11 pr-8 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="all">All Branches</option>
              {branches.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

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

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4">Student</th>
                <th className="text-left py-3 px-4">Branch</th>
                <th className="text-left py-3 px-4">CGPA</th>
                <th className="text-left py-3 px-4">Semester</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => (
                <tr key={student.student_id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <p className="font-semibold">{student.full_name}</p>
                    <p className="text-sm text-gray-600">{student.student_id}</p>
                  </td>
                  <td className="py-4 px-4">{student.academic_details?.branch}</td>
                  <td className="py-4 px-4 text-blue-600 font-semibold">{student.current_cgpa ?? '-'}</td>
                  <td className="py-4 px-4">{student.academic_details?.year_semester?.semester ?? '-'}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        student.verified_status ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                      }`}
                    >
                      {student.verified_status ? 'Verified' : 'Pending'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200">
                        View
                      </button>
                      {!student.verified_status && (
                        <button className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200">
                          Verify
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">No students found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   Departments (with stats & add/delete)
   ========================================================= */
type DeptStats = {
  name: string;
  total: number;
  yearCounts: Record<number, number>;
  avgCgpa: number;
  verifiedPct: number;
  avgAttendance: number;   // synthetic
  placement: {             // synthetic for final-year students
    eligible: number;
    placed: number;
    placedPct: number;
    avgOffers: number;
  };
};

const Departments = () => {
  const [students, setStudents] = useState<StudentRow[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);
  const [newDept, setNewDept] = useState('');

  useEffect(() => {
    fetch('/static/students.json')
      .then(res => res.json())
      .then(data => {
        if (data && data.students) {
          setStudents(data.students);
          // initialize with unique branches from data
          const uniq = Array.from(
            new Set(
              data.students
                .map((s: StudentRow) => s?.academic_details?.branch)
                .filter(Boolean)
            )
          ) as string[];
          setDepartments(uniq.sort());
        }
      })
      .catch(err => console.error('Error loading students:', err));
  }, []);

  const addDept = () => {
    const name = newDept.trim();
    if (name && !departments.includes(name)) {
      setDepartments(prev => [...prev, name]);
      setNewDept('');
    }
  };

  const deleteDept = (dept: string) => {
    setDepartments(prev => prev.filter(d => d !== dept));
  };

  const computeStatsForDept = (dept: string): DeptStats => {
    const list = students.filter(s => s.academic_details?.branch === dept);

    const total = list.length;
    const yearCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0 };
    let cgpaSum = 0;
    let verified = 0;

    let attendanceSum = 0; // synthetic average

    // final-year = year 4
    const finalYear = list.filter(s => (s.academic_details?.year_semester?.year ?? 0) >= 4);
    let placed = 0;
    let offersSum = 0;

    list.forEach(s => {
      const yr = s.academic_details?.year_semester?.year ?? 0;
      if (yr >= 1 && yr <= 4) yearCounts[yr] = (yearCounts[yr] || 0) + 1;
      cgpaSum += s.current_cgpa || 0;
      if (s.verified_status) verified += 1;

      // synthetic attendance (deterministic)
      const att = seededRange(`att-${s.student_id}`, 70, 95);
      attendanceSum += att;

      // synthetic placement only for final-year
      if ((s.academic_details?.year_semester?.year ?? 0) >= 4) {
        const placedRoll = seededRange(`pl-${s.student_id}`, 0, 100);
        const isPlaced = placedRoll > 35; // ~65% placed
        if (isPlaced) {
          placed += 1;
          const offers = seededRange(`of-${s.student_id}`, 1, 4);
          offersSum += offers;
        }
      }
    });

    const avgCgpa = total > 0 ? +(cgpaSum / total).toFixed(2) : 0;
    const verifiedPct = total > 0 ? Math.round((verified / total) * 100) : 0;
    const avgAttendance = total > 0 ? Math.round(attendanceSum / total) : 0;
    const eligible = finalYear.length;
    const placedPct = eligible > 0 ? Math.round((placed / eligible) * 100) : 0;
    const avgOffers = placed > 0 ? +(offersSum / placed).toFixed(2) : 0;

    return {
      name: dept,
      total,
      yearCounts,
      avgCgpa,
      verifiedPct,
      avgAttendance,
      placement: { eligible, placed, placedPct, avgOffers }
    };
  };

  const statsList = useMemo(() => {
    return departments.map(d => computeStatsForDept(d));
  }, [departments, students]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Departments</h1>
          <p className="text-gray-600 mt-1">Overview of department-wise performance & enrollment</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            value={newDept}
            onChange={e => setNewDept(e.target.value)}
            placeholder="Add a department"
            className="px-4 py-2 bg-white border border-gray-300 rounded-xl"
          />
          <button onClick={addDept} className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 flex items-center">
            <Plus className="w-4 h-4 mr-1" /> Add
          </button>
        </div>
      </div>

      {/* Department Cards */}
      <div className="grid lg:grid-cols-2 gap-6">
        {statsList.map(stat => (
          <div key={stat.name} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  {stat.name}
                </h2>
                <p className="text-gray-600 text-sm">Total students: <span className="font-semibold">{stat.total}</span></p>
              </div>
              <button
                onClick={() => deleteDept(stat.name)}
                className="px-3 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 text-sm flex items-center"
                title="Delete department"
              >
                <Trash2 className="w-4 h-4 mr-1" /> Delete
              </button>
            </div>

            {/* KPI Row */}
            <div className="grid sm:grid-cols-4 gap-4 mt-5">
              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-xs text-blue-800 font-medium">Avg CGPA</p>
                <p className="text-2xl font-bold text-blue-900">{stat.avgCgpa}</p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-4">
                <p className="text-xs text-emerald-800 font-medium">Verified</p>
                <p className="text-2xl font-bold text-emerald-900">{stat.verifiedPct}%</p>
              </div>
              <div className="bg-violet-50 rounded-xl p-4">
                <p className="text-xs text-violet-800 font-medium">Avg Attendance</p>
                <p className="text-2xl font-bold text-violet-900">{stat.avgAttendance}%</p>
              </div>
              <div className="bg-orange-50 rounded-xl p-4">
                <p className="text-xs text-orange-800 font-medium">Placed (Y4)</p>
                <p className="text-2xl font-bold text-orange-900">{stat.placement.placedPct}%</p>
              </div>
            </div>

            {/* Year Distribution & Placement */}
            <div className="grid sm:grid-cols-2 gap-6 mt-6">
              <div className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <BarChart2 className="w-4 h-4 text-gray-700" /> Year-wise distribution
                  </h3>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map(y => (
                    <div key={y} className="bg-gray-50 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-600">Year {y}</p>
                      <p className="text-lg font-semibold text-gray-900">{stat.yearCounts[y] || 0}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <PieChart className="w-4 h-4 text-gray-700" /> Placement snapshot (Year 4)
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-600">Eligible</p>
                    <p className="text-lg font-semibold text-gray-900">{stat.placement.eligible}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <p className="text-xs text-green-700">Placed</p>
                    <p className="text-lg font-semibold text-green-900">{stat.placement.placed}</p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-3 text-center">
                    <p className="text-xs text-orange-700">Placed %</p>
                    <p className="text-lg font-semibold text-orange-900">{stat.placement.placedPct}%</p>
                  </div>
                  <div className="bg-indigo-50 rounded-lg p-3 text-center">
                    <p className="text-xs text-indigo-700">Avg Offers</p>
                    <p className="text-lg font-semibold text-indigo-900">{stat.placement.avgOffers}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Detail Table */}
            <div className="mt-6 border border-gray-100 rounded-xl overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-2 px-4 text-xs font-semibold text-gray-700">Metric</th>
                    <th className="text-left py-2 px-4 text-xs font-semibold text-gray-700">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-4 text-sm">Total Students</td>
                    <td className="py-2 px-4 text-sm font-medium">{stat.total}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-4 text-sm">Avg CGPA</td>
                    <td className="py-2 px-4 text-sm font-medium">{stat.avgCgpa}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-4 text-sm">Verification Rate</td>
                    <td className="py-2 px-4 text-sm font-medium">{stat.verifiedPct}%</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-4 text-sm">Avg Attendance (synthetic)</td>
                    <td className="py-2 px-4 text-sm font-medium">{stat.avgAttendance}%</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 text-sm">Placement (Y4): Placed / Eligible</td>
                    <td className="py-2 px-4 text-sm font-medium">
                      {stat.placement.placed} / {stat.placement.eligible} ({stat.placement.placedPct}%)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}
        {statsList.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-16 border border-dashed rounded-2xl">
            No departments yet. Add one to see stats.
          </div>
        )}
      </div>
    </div>
  );
};

/* =========================================================
   Committees (create/delete simple list)
   ========================================================= */
const Committees = () => {
  const [committees, setCommittees] = useState<{ name: string; desc: string }[]>([
    { name: 'TSEC Codestorm', desc: 'College-wide coding club. Hosts 24hr hackathon (Codessiance).' }
  ]);
  const [form, setForm] = useState({ name: '', desc: '' });

  const addCommittee = () => {
    if (form.name.trim()) {
      setCommittees(prev => [...prev, { ...form }]);
      setForm({ name: '', desc: '' });
    }
  };

  const deleteCommittee = (name: string) => {
    setCommittees(prev => prev.filter(c => c.name !== name));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Committees</h1>
        <div className="flex gap-2">
          <input
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder="Committee Name (e.g., TSEC-Codestorm)"
            className="px-4 py-2 bg-white border border-gray-300 rounded-xl"
          />
          <button onClick={addCommittee} className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
            Create
          </button>
        </div>
      </div>

      <textarea
        value={form.desc}
        onChange={e => setForm({ ...form, desc: e.target.value })}
        placeholder="Committee Description / Events (e.g., 24hr Hackathon - Codessiance)"
        rows={3}
        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl"
      />

      <ul className="grid md:grid-cols-2 gap-4">
        {committees.map(c => (
          <li key={c.name} className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">{c.name}</h3>
              <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">{c.desc || '—'}</p>
            </div>
            <button
              onClick={() => deleteCommittee(c.name)}
              className="px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-sm hover:bg-red-100"
            >
              Delete
            </button>
          </li>
        ))}
        {committees.length === 0 && (
          <li className="col-span-full text-center text-gray-500 py-10 border border-dashed rounded-2xl">
            No committees yet. Create one above.
          </li>
        )}
      </ul>
    </div>
  );
};

/* =========================================================
   Main Institution Dashboard (sidebar + routes)
   ========================================================= */
export default function InstitutionDashboard() {
  const menuItems = [
    { path: '/institution', icon: Users, label: 'Students', color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
    { path: '/institution/departments', icon: Building2, label: 'Departments', color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { path: '/institution/committees', icon: Layers, label: 'Committees', color: 'text-orange-600', bgColor: 'bg-orange-50' },
    { path: '/institution/reports', icon: FileText, label: 'Reports', color: 'text-indigo-600', bgColor: 'bg-indigo-50' },
    { path: '/institution/analytics', icon: BarChart3, label: 'Analytics', color: 'text-purple-600', bgColor: 'bg-purple-50' }
  ];

  return (
    <DashboardLayout title="Institution Dashboard" userRole="institution" menuItems={menuItems}>
      <Routes>
        <Route path="/" element={<StudentsManagement />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/committees" element={<Committees />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </DashboardLayout>
  );
}
