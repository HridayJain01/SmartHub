import React, { useMemo, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import {
  Users,
  UserPlus,
  FileUp,
  ShieldCheck,
  Download,
  BookOpen,
  GraduationCap,
  FileSpreadsheet,
  X
} from 'lucide-react';
import DashboardLayout from '../layout/DashboardLayout';

// ---------- PDF.js (Vite-friendly worker import) ----------
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
(pdfjsLib as any).GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

// ---------- Static students JSON (optional seed display, no DB) ----------
import studentsData from '../../../static/students.json';

// ---------- Types ----------
type Student = {
  full_name: string;
  student_id: string;
  date_of_birth?: string;
  gender?: string;
  category?: string;
  contact: { email: string; mobile_number?: string };
  government_id?: { type?: string; number?: string };
  profile_media?: { photo_url?: string; signature_url?: string };
  address?: { line1?: string; line2?: string; city?: string; state?: string; pincode?: string };
  academic_details: {
    program_name?: string;
    branch?: string;
    specialization?: string;
    year_semester?: { year?: number; semester?: number };
    enrollment_number?: string;
    roll_number?: string;
    ssc?: { board?: string; marks?: number; seat_number?: string; year_of_passing?: number };
    hsc?: { board?: string; marks?: number; seat_number?: string; year_of_passing?: number };
    last_attended_school_college?: string;
    entrance_exam?: { name?: string; score?: number };
  };
  bank_details?: { account_holder?: string; bank_name?: string; account_number_masked?: string; ifsc?: string };
  emergency_contact?: { name?: string; relation?: string; mobile_number?: string };
  enrollment_date?: string;
  graduation_date?: string | null;
  open_to_work?: boolean;
  verified_status?: boolean;
  about_me?: string;
  documents?: Array<{ doc_type: string; file_url: string; verified_status?: boolean; uploaded_at?: string }>;
  current_cgpa?: number;
};

type MarksRow = {
  student_id: string;
  student_name: string;
  subject_code: string;
  subject_name: string;
  max_marks: number;
  marks_obtained: number;
  grade: string;
  credits: number;
  exam_type: string;
  semester: number;
};

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

/** ---------- Students (Front Page) ---------- */
const StudentList: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Student | null>(null);

  // Pull students from JSON (expect { students: [...] })
  const allStudents: Student[] = (studentsData as any)?.students ?? [];

  // Only IT department
  const itStudents = useMemo(() => {
    const term = query.trim().toLowerCase();
    return allStudents
      .filter(s => {
        const branch = s.academic_details?.branch?.toLowerCase() || '';
        const isIT =
          branch.includes('information technology') ||
          s.academic_details?.specialization?.toLowerCase() === 'it';

        if (!isIT) return false;

        if (!term) return true;
        const name = s.full_name?.toLowerCase() || '';
        const email = s.contact?.email?.toLowerCase() || '';
        const sem = String(s.academic_details?.year_semester?.semester ?? '');
        const cgpa = String(s.current_cgpa ?? '');
        return name.includes(term) || email.includes(term) || sem.includes(term) || cgpa.includes(term);
      })
      .sort((a, b) => (b.current_cgpa ?? 0) - (a.current_cgpa ?? 0));
  }, [allStudents, query]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">IT Students</h1>
          <p className="text-gray-600 mt-1">Browse IT department students and view full profiles</p>
        </div>
        <div className="px-4 py-2 bg-blue-600 text-white rounded-xl flex items-center">
          <Users className="w-4 h-4 mr-2" />
          {itStudents.length} Students
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search by name, email, semester, CGPA…"
          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
        />
        <Link
          to="/department/onboarding"
          className="px-4 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
        >
          + Onboarding
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left py-3 px-4">Student</th>
              <th className="text-left py-3 px-4">Email</th>
              <th className="text-left py-3 px-4">Semester</th>
              <th className="text-left py-3 px-4">CGPA</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {itStudents.map((s) => (
              <tr key={s.student_id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 font-medium text-gray-900">{s.full_name}</td>
                <td className="py-3 px-4 text-gray-700">{s.contact?.email}</td>
                <td className="py-3 px-4 text-gray-700">
                  {s.academic_details?.year_semester?.semester ?? '-'}
                </td>
                <td className="py-3 px-4 text-gray-700">{s.current_cgpa ?? '-'}</td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => setSelected(s)}
                    className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
            {itStudents.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500">
                  No IT students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSelected(null)} />
          <div className="relative z-10 w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                {selected.profile_media?.photo_url ? (
                  <img
                    src={selected.profile_media.photo_url}
                    alt={selected.full_name}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-gray-200" />
                )}
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selected.full_name}</h2>
                  <p className="text-sm text-gray-600">
                    {selected.academic_details?.branch} — Sem {selected.academic_details?.year_semester?.semester}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="p-2 rounded-lg hover:bg-gray-100"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 grid md:grid-cols-2 gap-6">
              <section>
                <h3 className="text-sm font-semibold text-gray-800 mb-3">Contact</h3>
                <div className="space-y-1 text-sm text-gray-700">
                  <div><span className="font-medium">Email:</span> {selected.contact?.email}</div>
                  <div><span className="font-medium">Phone:</span> {selected.contact?.mobile_number || '-'}</div>
                  <div><span className="font-medium">Open to work:</span> {selected.open_to_work ? 'Yes' : 'No'}</div>
                  <div><span className="font-medium">Verified:</span> {selected.verified_status ? 'Yes' : 'No'}</div>
                </div>

                <h3 className="text-sm font-semibold text-gray-800 mt-6 mb-3">Address</h3>
                <div className="text-sm text-gray-700">
                  {[selected.address?.line1, selected.address?.line2].filter(Boolean).join(', ') || '-'}
                  <div>{[selected.address?.city, selected.address?.state, selected.address?.pincode].filter(Boolean).join(', ')}</div>
                </div>

                <h3 className="text-sm font-semibold text-gray-800 mt-6 mb-3">Emergency Contact</h3>
                <div className="text-sm text-gray-700">
                  {selected.emergency_contact?.name} ({selected.emergency_contact?.relation}) — {selected.emergency_contact?.mobile_number}
                </div>
              </section>

              <section>
                <h3 className="text-sm font-semibold text-gray-800 mb-3">Academics</h3>
                <div className="space-y-1 text-sm text-gray-700">
                  <div><span className="font-medium">Program:</span> {selected.academic_details?.program_name}</div>
                  <div><span className="font-medium">Branch:</span> {selected.academic_details?.branch}</div>
                  <div><span className="font-medium">Specialization:</span> {selected.academic_details?.specialization || '-'}</div>
                  <div><span className="font-medium">Year/Sem:</span> {selected.academic_details?.year_semester?.year} / {selected.academic_details?.year_semester?.semester}</div>
                  <div><span className="font-medium">Enrollment #:</span> {selected.academic_details?.enrollment_number}</div>
                  <div><span className="font-medium">Roll #:</span> {selected.academic_details?.roll_number}</div>
                  <div><span className="font-medium">CGPA:</span> {selected.current_cgpa ?? '-'}</div>
                </div>

                <h3 className="text-sm font-semibold text-gray-800 mt-6 mb-3">IDs</h3>
                <div className="text-sm text-gray-700">
                  <div><span className="font-medium">Government ID:</span> {selected.government_id?.type} — {selected.government_id?.number}</div>
                  <div><span className="font-medium">Student ID:</span> {selected.student_id}</div>
                </div>

                {selected.documents && selected.documents.length > 0 && (
                  <>
                    <h3 className="text-sm font-semibold text-gray-800 mt-6 mb-3">Documents</h3>
                    <ul className="text-sm text-indigo-600 list-disc ml-5 space-y-1">
                      {selected.documents.map((d, i) => (
                        <li key={i}>
                          <a href={d.file_url} target="_blank" rel="noreferrer" className="hover:underline">
                            {d.doc_type}
                          </a>
                          {d.verified_status ? ' (verified)' : ''}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </section>
            </div>

            <div className="px-6 pb-6 flex justify-end">
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/** ---------- PDF Parsing Helpers (Name, Email, Semester) ---------- */
async function parsePdf(file: File): Promise<string> {
  const buf = await file.arrayBuffer();
  const pdf = await (pdfjsLib as any).getDocument({ data: buf }).promise;

  let fullText = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const strings = (content.items as any[]).map((it: any) => it.str);
    fullText += strings.join(' ') + '\n';
  }
  return fullText;
}

/**
 * Extract rows of { name, email, semester } from PDF text.
 */
function extractRowsFromText(text: string): Array<{ name: string; email: string; semester: number }> {
  const normalized = text.replace(/\u00A0/g, ' ').replace(/\s+/g, ' ').trim();
  const tokens = normalized.split(' ');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
  const rows: Array<{ name: string; email: string; semester: number }> = [];

  for (let i = 0; i < tokens.length; i++) {
    const tk = tokens[i];
    if (emailRegex.test(tk)) {
      const email = tk;
      let sem: number | null = null;
      for (let j = i + 1; j <= i + 6 && j < tokens.length; j++) {
        const maybe = parseInt(tokens[j], 10);
        if (!isNaN(maybe) && maybe >= 1 && maybe <= 12) {
          sem = maybe;
          break;
        }
      }
      if (!sem) continue;

      const nameTokens: string[] = [];
      for (let k = i - 1; k >= 0 && nameTokens.length < 5; k--) {
        const prev = tokens[k];
        if (emailRegex.test(prev)) break;
        if (/^(name|names|semester|sem|email)$/i.test(prev)) break;
        nameTokens.unshift(prev);
      }
      const name = nameTokens.join(' ').replace(/[|,]/g, '').trim();

      if (name && email && sem) {
        rows.push({ name, email, semester: sem });
      }
    }
  }

  const seen = new Set<string>();
  return rows.filter(r => {
    if (seen.has(r.email.toLowerCase())) return false;
    seen.add(r.email.toLowerCase());
    return true;
  });
}

/** ---------- Student Onboarding (PDF -> Credentials JSON) ---------- */
const StudentOnboarding: React.FC = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [generated, setGenerated] = useState<
    Array<{ name: string; email: string; semester: number; username: string; password: string }>
    | null
  >(null);
  const [status, setStatus] = useState<string>('');

  const onParseAndGenerate = async () => {
    if (!pdfFile) {
      setStatus('Please choose a PDF first.');
      return;
    }

    setStatus('Reading PDF...');
    const raw = await parsePdf(pdfFile);

    setStatus('Extracting rows...');
    const rows = extractRowsFromText(raw);

    if (!rows || rows.length === 0) {
      setStatus('Could not find any rows in the PDF. Expected columns like: Name Email Semester (CGPA optional/ignored).');
      setGenerated(null);
      return;
    }

    setStatus(`Found ${rows.length} rows. Generating credentials...`);
    const creds = rows.map(r => {
      const local = r.email.split('@')[0] || r.name.toLowerCase().replace(/[^a-z0-9]+/g, '').slice(0, 10) || 'user';
      return {
        name: r.name,
        email: r.email,
        semester: r.semester,
        username: `${local}${Math.floor(Math.random() * 900 + 100)}`,
        password: randomString(10),
      };
    });

    setGenerated(creds);
    setStatus(`Generated ${creds.length} credentials.`);
  };

  const onDownload = () => {
    if (!generated) return;
    downloadJSON('student_credentials', {
      issued_at: new Date().toISOString(),
      source_pdf: pdfFile?.name || null,
      credentials: generated,
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Onboarding</h1>
          <p className="text-gray-600 mt-1">
            Upload a PDF containing a table with columns: <strong>Name | Email | Semester</strong>. CGPA is optional and ignored.
          </p>
        </div>
        <div className="px-4 py-2 bg-blue-600 text-white rounded-xl flex items-center">
          <FileUp className="w-4 h-4 mr-2" />
          Upload & Generate
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 space-y-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Student PDF</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl"
            />
            {pdfFile && <p className="text-sm text-gray-500 mt-2">Selected: {pdfFile.name}</p>}
          </div>
          <div className="flex items-end">
            <button
              onClick={onParseAndGenerate}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <ShieldCheck className="w-4 h-4 mr-2" />
              Generate Credentials
            </button>
          </div>
        </div>

        {status && (
          <div className="text-sm text-gray-700 bg-gray-50 rounded-xl p-3 border border-gray-100">{status}</div>
        )}

        <div className="flex items-center space-x-3">
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
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Semester</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Username</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Password</th>
                </tr>
              </thead>
              <tbody>
                {generated.map((row, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="py-3 px-4">{row.name}</td>
                    <td className="py-3 px-4">{row.email}</td>
                    <td className="py-3 px-4">{row.semester}</td>
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

/** ---------- Marks Upload (UPDATED: requires student_name + table display) ---------- */
const MarksUpload: React.FC = () => {
  const [rows, setRows] = useState<MarksRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const parseCsv = (text: string): MarksRow[] => {
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    if (lines.length < 2) return [];

    // Basic CSV split; if you expect quoted commas, replace with a robust parser later
    const header = lines[0].split(',').map(h => h.trim().toLowerCase());
    const required = [
      'student_id',
      'student_name',
      'subject_code',
      'subject_name',
      'max_marks',
      'marks_obtained',
      'grade',
      'credits',
      'exam_type',
      'semester'
    ];
    const hasAll = required.every(r => header.includes(r));
    if (!hasAll) {
      throw new Error(`CSV must include columns: ${required.join(', ')}`);
    }

    const idx = (name: string) => header.indexOf(name);
    const out: MarksRow[] = [];
    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(',').map(s => s.trim());
      if (parts.length < header.length) continue;

      out.push({
        student_id: parts[idx('student_id')],
        student_name: parts[idx('student_name')],
        subject_code: parts[idx('subject_code')],
        subject_name: parts[idx('subject_name')],
        max_marks: Number(parts[idx('max_marks')]),
        marks_obtained: Number(parts[idx('marks_obtained')]),
        grade: parts[idx('grade')],
        credits: Number(parts[idx('credits')]),
        exam_type: parts[idx('exam_type')],
        semester: Number(parts[idx('semester')]),
      });
    }
    return out;
  };

  const onUpload = (file: File) => {
    setError(null);
    setRows(null);

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const text = String(reader.result || '');
        setRows(parseCsv(text));
      } catch (e: any) {
        setError(e?.message || 'Failed to parse CSV');
      }
    };
    reader.readAsText(file);
  };

  const template =
    'student_id,student_name,subject_code,subject_name,max_marks,marks_obtained,grade,credits,exam_type,semester\n' +
    'STU-0001,Student 01,CS601,Operating Systems,100,86,A,4,midterm,2';

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Marks Upload</h1>
          <p className="text-gray-600 mt-1">Upload marks CSV (must include <code>student_name</code>) and preview below.</p>
        </div>
        <div className="px-4 py-2 bg-purple-600 text-white rounded-xl flex items-center">
          <FileSpreadsheet className="w-4 h-4 mr-2" />
          CSV Upload
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">CSV File</label>
          <input
            type="file"
            accept=".csv"
            onChange={e => {
              const f = e.target.files?.[0];
              if (f) onUpload(f);
            }}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl"
          />
          {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
        </div>

        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Template Preview</p>
          <pre className="text-xs overflow-auto">{template}</pre>
          <a
            href={`data:text/csv;charset=utf-8,${encodeURIComponent(template + '\n')}`}
            download="marks_template.csv"
            className="text-indigo-600 hover:underline text-sm"
          >
            Download template CSV
          </a>
        </div>

        {rows && (
          <div className="overflow-x-auto">
            <table className="w-full mt-4">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  {Object.keys(rows[0]).map(key => (
                    <th key={key} className="text-left py-3 px-4 capitalize">{key.replace(/_/g, ' ')}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    {Object.values(r).map((val, j) => (
                      <td key={j} className="py-2 px-4 text-sm">{String(val)}</td>
                    ))}
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

export default function DepartmentDashboard() {
  const menuItems = [
    { path: '/department', icon: GraduationCap, label: 'Students', color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { path: '/department/faculty', icon: Users, label: 'Faculty', color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
    { path: '/department/marks', icon: BookOpen, label: 'Marks Upload', color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { path: '/department/onboarding', icon: UserPlus, label: 'Onboarding', color: 'text-indigo-600', bgColor: 'bg-indigo-50' }
  ];

  return (
    <DashboardLayout title="Department Dashboard" userRole="department" menuItems={menuItems}>
      {/* Front page is Students list; Onboarding is separate */}
      <Routes>
        <Route index element={<StudentList />} />
        <Route path="faculty" element={<FacultyManagement />} />
        <Route path="marks" element={<MarksUpload />} />
        <Route path="onboarding" element={<StudentOnboarding />} />
      </Routes>
    </DashboardLayout>
  );
}

/** ---------- Faculty Management (unchanged, static) ---------- */
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
