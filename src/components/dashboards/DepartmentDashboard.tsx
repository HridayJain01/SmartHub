import React, { useMemo, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  Users,
  UserPlus,
  FileUp,
  Upload,
  ShieldCheck,
  Download,
  BookOpen,
  Calendar,
  GraduationCap,
  FileSpreadsheet
} from 'lucide-react';
import DashboardLayout from '../layout/DashboardLayout';

/** ---------- Utils ---------- */
function randomString(len = 10) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';
  let out = '';
  for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

function downloadJSON(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.json') ? filename : `${filename}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

/** ---------- Faculty Management ---------- */
const FacultyManagement: React.FC = () => {
  const [facultyForm, setFacultyForm] = useState({
    full_name: '',
    email: '',
    mobile_number: '',
    designation: 'Assistant Professor',
    is_verifier: true
  });

  const [facultyList, setFacultyList] = useState<any[]>([
    {
      faculty_id: 'FAC-DPT-0001',
      full_name: 'Prof. Demo HOD',
      email: 'hod.department@college.edu',
      mobile_number: '+91-90000-00000',
      designation: 'HOD',
      is_verifier: true
    }
  ]);

  const addFaculty = (e: React.FormEvent) => {
    e.preventDefault();
    const rec = {
      faculty_id: `FAC-DPT-${String(facultyList.length + 1).padStart(4, '0')}`,
      ...facultyForm
    };
    setFacultyList(prev => [rec, ...prev]);
    setFacultyForm({
      full_name: '',
      email: '',
      mobile_number: '',
      designation: 'Assistant Professor',
      is_verifier: true
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Faculty Management</h1>
          <p className="text-gray-600 mt-1">Create and manage faculty for this department</p>
        </div>
        <div className="px-4 py-2 bg-emerald-600 text-white rounded-xl flex items-center">
          <Users className="w-4 h-4 mr-2" />
          {facultyList.length} Faculty
        </div>
      </div>

      {/* Create Faculty */}
      <form onSubmit={addFaculty} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 space-y-4">
        <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
          <UserPlus className="w-5 h-5 mr-2 text-emerald-600" />
          Add Faculty
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
            placeholder="Full Name"
            value={facultyForm.full_name}
            onChange={e => setFacultyForm({ ...facultyForm, full_name: e.target.value })}
            required
          />
          <input
            type="email"
            className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
            placeholder="Email"
            value={facultyForm.email}
            onChange={e => setFacultyForm({ ...facultyForm, email: e.target.value })}
            required
          />
          <input
            className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
            placeholder="Mobile Number"
            value={facultyForm.mobile_number}
            onChange={e => setFacultyForm({ ...facultyForm, mobile_number: e.target.value })}
          />
          <select
            className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
            value={facultyForm.designation}
            onChange={e => setFacultyForm({ ...facultyForm, designation: e.target.value })}
          >
            <option>Assistant Professor</option>
            <option>Associate Professor</option>
            <option>Professor</option>
            <option>HOD</option>
          </select>
          <label className="flex items-center space-x-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={facultyForm.is_verifier}
              onChange={e => setFacultyForm({ ...facultyForm, is_verifier: e.target.checked })}
            />
            <span>Can verify student records</span>
          </label>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors"
        >
          Add Faculty
        </button>
      </form>

      {/* List */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">Faculty List</h3>
        </div>
        <div className="p-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">Email</th>
                <th className="text-left py-3 px-4">Designation</th>
                <th className="text-left py-3 px-4">Verifier</th>
              </tr>
            </thead>
            <tbody>
              {facultyList.map((f) => (
                <tr key={f.faculty_id} className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium text-gray-900">{f.full_name}</td>
                  <td className="py-3 px-4 text-gray-700">{f.email}</td>
                  <td className="py-3 px-4 text-gray-700">{f.designation}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${f.is_verifier ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {f.is_verifier ? 'Yes' : 'No'}
                    </span>
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

/** ---------- Student Onboarding & Credentials ---------- */
const StudentOnboarding: React.FC = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [count, setCount] = useState<number>(1);
  const [baseUsernamePrefix, setBaseUsernamePrefix] = useState('stu');
  const [generated, setGenerated] = useState<any[] | null>(null);

  const onGenerate = () => {
    const items = Array.from({ length: Math.max(1, count) }).map((_, idx) => {
      const studentId = `STU-${String(Date.now()).slice(-6)}-${String(idx + 1).padStart(2, '0')}`;
      const username = `${baseUsernamePrefix}${Math.floor(Math.random() * 900) + 100}`;
      const password = randomString(10);
      return { student_id: studentId, username, password };
    });
    setGenerated(items);
  };

  const onDownload = () => {
    if (!generated) return;
    downloadJSON('student_credentials', {
      issued_at: new Date().toISOString(),
      source_pdf: pdfFile?.name || null,
      credentials: generated
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Onboarding</h1>
          <p className="text-gray-600 mt-1">Upload student PDF and auto-generate login credentials</p>
        </div>
        <div className="px-4 py-2 bg-blue-600 text-white rounded-xl flex items-center">
          <FileUp className="w-4 h-4 mr-2" />
          Upload & Generate
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 space-y-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Student PDF</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl"
            />
            {pdfFile && (
              <p className="text-sm text-gray-500 mt-2">Selected: {pdfFile.name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">How many credentials?</label>
            <input
              type="number"
              min={1}
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value || '1', 10))}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Username Prefix</label>
            <input
              type="text"
              value={baseUsernamePrefix}
              onChange={(e) => setBaseUsernamePrefix(e.target.value)}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl"
              placeholder="stu"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button onClick={onGenerate} className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center">
            <ShieldCheck className="w-4 h-4 mr-2" />
            Generate Credentials
          </button>
          <button
            onClick={onDownload}
            disabled={!generated}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            <Download className="w-4 h-4 mr-2 inline" />
            Download JSON
          </button>
        </div>

        {generated && (
          <div className="overflow-x-auto">
            <table className="w-full mt-4">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Student ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Username</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Password</th>
                </tr>
              </thead>
              <tbody>
                {generated.map((row, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="py-3 px-4 font-mono">{row.student_id}</td>
                    <td className="py-3 px-4 font-mono">{row.username}</td>
                    <td className="py-3 px-4 font-mono">{row.password}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

/** ---------- Marks Upload ---------- */
const MarksUpload: React.FC = () => {
  const [semester, setSemester] = useState<number>(1);
  const [examType, setExamType] = useState<'midterm' | 'endsem' | 'practical' | 'internal'>('midterm');
  const [csvFile, setCsvFile] = useState<File | null>(null);

  const template = useMemo(
    () => ([
      ['student_id', 'subject_code', 'subject_name', 'max_marks', 'marks_obtained', 'grade', 'credits', 'exam_type', 'semester'],
      ['STU-0001', 'CS601', 'Operating Systems', '100', '86', 'A', '4', examType, String(semester)]
    ].map(r => r.join(',')).join('\n')),
    [semester, examType]
  );

  const downloadTemplate = () => {
    const blob = new Blob([template], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `marks_template_sem${semester}_${examType}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  const uploadCSV = () => {
    if (!csvFile) return alert('Please select a CSV file first.');
    // In real app: parse & POST to backend. Here, just show confirmation.
    alert(`Uploaded ${csvFile.name} for Semester ${semester} (${examType}).`);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Marks Upload</h1>
          <p className="text-gray-600 mt-1">Upload marks by semester and exam type</p>
        </div>
        <div className="px-4 py-2 bg-purple-600 text-white rounded-xl flex items-center">
          <FileSpreadsheet className="w-4 h-4 mr-2" />
          CSV Upload
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 space-y-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Semester</label>
            <select
              value={semester}
              onChange={e => setSemester(parseInt(e.target.value, 10))}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
            >
              {Array.from({ length: 8 }, (_, i) => i + 1).map(s => (
                <option key={s} value={s}>Semester {s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Exam Type</label>
            <select
              value={examType}
              onChange={e => setExamType(e.target.value as any)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
            >
              <option value="midterm">Midterm</option>
              <option value="endsem">End Semester</option>
              <option value="practical">Practical</option>
              <option value="internal">Internal Assessment</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">CSV File</label>
            <input
              type="file"
              accept=".csv"
              onChange={e => setCsvFile(e.target.files?.[0] || null)}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl"
            />
            {csvFile && <p className="text-sm text-gray-500 mt-2">Selected: {csvFile.name}</p>}
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={downloadTemplate}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
          >
            Download CSV Template
          </button>
          <button
            onClick={uploadCSV}
            className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
          >
            Upload CSV
          </button>
        </div>

        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Template Preview</p>
          <pre className="text-xs overflow-auto">{template}</pre>
        </div>
      </div>
    </div>
  );
};

export default function DepartmentDashboard() {
  const menuItems = [
    { path: '/department', icon: GraduationCap, label: 'Onboarding', color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { path: '/department/faculty', icon: Users, label: 'Faculty', color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
    { path: '/department/marks', icon: BookOpen, label: 'Marks Upload', color: 'text-purple-600', bgColor: 'bg-purple-50' }
  ];

  return (
    <DashboardLayout title="Department Dashboard" userRole="department" menuItems={menuItems}>
      <Routes>
        <Route path="/" element={<StudentOnboarding />} />
        <Route path="/faculty" element={<FacultyManagement />} />
        <Route path="/marks" element={<MarksUpload />} />
      </Routes>
    </DashboardLayout>
  );
}
