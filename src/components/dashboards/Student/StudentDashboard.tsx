import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { 
  User, 
  BookOpen, 
  Award, 
  FileText, 
  Settings, 
  Eye, 
  EyeOff,
  Download,
  Share2,
  TrendingUp,
  Star,
  Calendar,
  MapPin
} from 'lucide-react';
import DashboardLayout from '../../layout/DashboardLayout';

const StudentProfile = () => {
  const [profileData, setProfileData] = useState({
    studentId: "STU2025A01",
    photo: "",
    name: "Alex Johnson",
    gender: "Male",
    dateOfBirth: "1999-05-15",
    email: "alex.johnson@university.edu",
    phone: "+1 (555) 123-4567",
    address: "123 University Ave, City, Country",
    course: "B.Tech Computer Science",
    semester: "6th Semester",
    enrollmentNo: "ENR202300123",
    about:
      "Computer Science student passionate about AI and machine learning. Currently seeking internship opportunities in tech.",
    skills: ["Python", "JavaScript", "React", "Machine Learning", "Data Analysis"],
    isPublic: true,
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-1">
            Personal, academic and contact details
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() =>
              setProfileData((prev) => ({ ...prev, isPublic: !prev.isPublic }))
            }
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-colors ${
              profileData.isPublic
                ? "bg-green-100 text-green-700 hover:bg-green-200"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {profileData.isPublic ? (
              <Eye className="w-4 h-4" />
            ) : (
              <EyeOff className="w-4 h-4" />
            )}
            <span>{profileData.isPublic ? "Public" : "Private"}</span>
          </button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
        <div className="px-8 pb-8">
          {/* Profile Header */}
          <div className="flex items-start space-x-6 -mt-16">
            <div className="w-32 h-32 bg-white rounded-2xl shadow-lg flex items-center justify-center border-4 border-white overflow-hidden">
              {profileData.photo ? (
                <img
                  src={profileData.photo}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                <User className="w-16 h-16 text-gray-400" />
              )}
            </div>
            <div className="pt-20 flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {profileData.name}
                  </h2>
                  <p className="text-gray-600">{profileData.email}</p>
                  <p className="text-sm text-gray-500">
                    Student ID: {profileData.studentId}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="mt-8 grid md:grid-cols-2 gap-8 text-gray-800">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-gray-600">Gender</p>
                <p className="mt-1 text-base text-gray-900">
                  {profileData.gender}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">
                  Date of Birth
                </p>
                <p className="mt-1 text-base text-gray-900">
                  {profileData.dateOfBirth}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">
                  Mobile Number
                </p>
                <p className="mt-1 text-base text-gray-900">
                  {profileData.phone}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">Address</p>
                <p className="mt-1 text-base text-gray-900">
                  {profileData.address}
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-gray-600">
                  Course / Program
                </p>
                <p className="mt-1 text-base text-gray-900">
                  {profileData.course}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">
                  Year / Semester
                </p>
                <p className="mt-1 text-base text-gray-900">
                  {profileData.semester}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">
                  Enrollment Number
                </p>
                <p className="mt-1 text-base text-gray-900">
                  {profileData.enrollmentNo}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">About Me</p>
                <p className="mt-1 text-base text-gray-900">
                  {profileData.about}
                </p>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {profileData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AcademicRecords = () => {
  const academicData = {
    currentCGPA: 8.7,
    totalCredits: 120,
    program: 'Bachelor of Technology - Computer Science',
    records: [
      { term: 'Semester 7', cgpa: 9.1, credits: 22, courses: 6 },
      { term: 'Semester 6', cgpa: 8.8, credits: 24, courses: 7 },
      { term: 'Semester 5', cgpa: 8.5, credits: 22, courses: 6 },
      { term: 'Semester 4', cgpa: 8.3, credits: 24, courses: 7 }
    ]
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Academic Records</h1>
        <p className="text-gray-600 mt-1">View your verified academic performance</p>
      </div>

      {/* CGPA Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Current CGPA</p>
              <p className="text-3xl font-bold">{academicData.currentCGPA}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-200" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100 text-sm font-medium">Total Credits</p>
              <p className="text-3xl font-bold">{academicData.totalCredits}</p>
            </div>
            <BookOpen className="w-8 h-8 text-emerald-200" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Program</p>
              <p className="text-lg font-bold">B.Tech CSE</p>
            </div>
            <Award className="w-8 h-8 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Semester Records */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Semester Performance</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {academicData.records.map((record, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <h3 className="font-semibold text-gray-900">{record.term}</h3>
                  <p className="text-gray-600 text-sm">{record.courses} courses • {record.credits} credits</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">{record.cgpa}</p>
                  <p className="text-gray-500 text-sm">CGPA</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Achievements = () => {
  const [achievements] = useState([
    {
      id: 1,
      type: 'certificate',
      title: 'Google Cloud Certified - Associate Cloud Engineer',
      description: 'Certified in Google Cloud Platform fundamentals and services',
      date: '2024-01-15',
      organizer: 'Google Cloud',
      verified: true,
      public: true
    },
    {
      id: 2,
      type: 'competition',
      title: 'First Place - University Hackathon 2023',
      description: 'Developed an AI-powered study assistant application',
      date: '2023-11-20',
      organizer: 'University Tech Club',
      verified: true,
      public: true
    },
    {
      id: 3,
      type: 'internship',
      title: 'Software Development Intern',
      description: 'Full-stack development internship at TechCorp Inc.',
      date: '2023-08-01',
      organizer: 'TechCorp Inc.',
      verified: false,
      public: false
    }
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'certificate': return Award;
      case 'competition': return Star;
      case 'internship': return Calendar;
      default: return Award;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Achievements</h1>
          <p className="text-gray-600 mt-1">Your verified accomplishments and milestones</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
          Add Achievement
        </button>
      </div>

      <div className="space-y-6">
        {achievements.map((achievement) => {
          const Icon = getTypeIcon(achievement.type);
          return (
            <div key={achievement.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{achievement.title}</h3>
                      <div className="flex items-center space-x-2">
                        {achievement.verified && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full flex items-center">
                            <Award className="w-3 h-3 mr-1" />
                            Verified
                          </span>
                        )}
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          achievement.public 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {achievement.public ? 'Public' : 'Private'}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3">{achievement.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(achievement.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {achievement.organizer}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <Eye className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <Settings className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Portfolio = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Portfolio</h1>
          <p className="text-gray-600 mt-1">Generate and share your professional portfolio</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center">
            <Share2 className="w-4 h-4 mr-2" />
            Share Portfolio
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <div className="text-center mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-16 h-16 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Alex Johnson</h2>
          <p className="text-gray-600">Computer Science Student</p>
          <div className="flex items-center justify-center mt-4">
            <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              CGPA: 8.7/10.0
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {['Python', 'JavaScript', 'React', 'Machine Learning', 'Data Analysis'].map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Contact</h3>
            <div className="space-y-2 text-gray-600">
              <p>alex.johnson@university.edu</p>
              <p>+1 (555) 123-4567</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function StudentDashboard() {
  const menuItems = [
    { 
      path: '/student', 
      icon: User, 
      label: 'Profile', 
      color: 'text-blue-600', 
      bgColor: 'bg-blue-50' 
    },
    { 
      path: '/student/academics', 
      icon: BookOpen, 
      label: 'Academics', 
      color: 'text-emerald-600', 
      bgColor: 'bg-emerald-50' 
    },
    { 
      path: '/student/achievements', 
      icon: Award, 
      label: 'Achievements', 
      color: 'text-purple-600', 
      bgColor: 'bg-purple-50' 
    },
    { 
      path: '/student/portfolio', 
      icon: FileText, 
      label: 'Portfolio', 
      color: 'text-orange-600', 
      bgColor: 'bg-orange-50' 
    }
  ];

  return (
    <DashboardLayout
      title="Student Dashboard"
      userRole="student"
      menuItems={menuItems}
    >
      <Routes>
        <Route path="/" element={<StudentProfile />} />
        <Route path="/academics" element={<AcademicRecords />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
    </DashboardLayout>
  );
}