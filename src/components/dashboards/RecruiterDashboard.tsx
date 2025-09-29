import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  Search,
  Filter,
  Users,
  Download,
  Star,
  MapPin,
  GraduationCap,
  Award,
  Eye,
  Bookmark,
  TrendingUp,
  Building2
} from 'lucide-react';
import DashboardLayout from '../layout/DashboardLayout';
import recruiterData from '../../data/recruiterData.json';

// Define types for candidates and institution stats
interface Candidate {
  id: number;
  name: string;
  program: string;
  cgpa: number;
  skills: string[];
  institution: string;
  graduationYear: number;
  achievements: number;
  profilePublic: boolean;
  location: string;
}

interface InstitutionStat {
  name: string;
  students: number;
  avgCGPA: number;
  placementRate: number;
}

const TalentSearch = () => {
  const [searchFilters, setSearchFilters] = useState({
    cgpaMin: '',
    cgpaMax: '',
    program: 'all',
    skills: '',
    location: 'all',
    graduationYear: 'all'
  });

  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    setCandidates(recruiterData.candidates);
  }, []);

  const filteredCandidates = candidates.filter(candidate => {
    const matchesCGPA = (!searchFilters.cgpaMin || candidate.cgpa >= parseFloat(searchFilters.cgpaMin)) &&
                       (!searchFilters.cgpaMax || candidate.cgpa <= parseFloat(searchFilters.cgpaMax));
    const matchesProgram = searchFilters.program === 'all' || candidate.program.toLowerCase().includes(searchFilters.program.toLowerCase());
    const matchesSkills = !searchFilters.skills || candidate.skills.some(skill => 
      skill.toLowerCase().includes(searchFilters.skills.toLowerCase())
    );
    return matchesCGPA && matchesProgram && matchesSkills && candidate.profilePublic;
  });

  const exportResults = () => {
    const csvContent = [
      ['Name', 'Program', 'CGPA', 'Skills', 'Institution', 'Graduation Year', 'Location'].join(','),
      ...filteredCandidates.map(candidate => [
        candidate.name,
        candidate.program,
        candidate.cgpa,
        candidate.skills.join('; '),
        candidate.institution,
        candidate.graduationYear,
        candidate.location
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'filtered_candidates.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Talent Search</h1>
          <p className="text-gray-600 mt-1">Discover verified student profiles and talent</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center">
            <Bookmark className="w-4 h-4 mr-2" />
            Saved Searches
          </button>
          <button
            onClick={exportResults}
            className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Results
          </button>
        </div>
      </div>

      {/* Search Filters */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Search Filters</h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Min CGPA</label>
            <input
              type="number"
              min="0"
              max="10"
              step="0.1"
              value={searchFilters.cgpaMin}
              onChange={(e) => setSearchFilters({...searchFilters, cgpaMin: e.target.value})}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="7.0"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Max CGPA</label>
            <input
              type="number"
              min="0"
              max="10"
              step="0.1"
              value={searchFilters.cgpaMax}
              onChange={(e) => setSearchFilters({...searchFilters, cgpaMax: e.target.value})}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="10.0"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Program</label>
            <select
              value={searchFilters.program}
              onChange={(e) => setSearchFilters({...searchFilters, program: e.target.value})}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">All Programs</option>
              <option value="computer science">Computer Science</option>
              <option value="electronics">Electronics</option>
              <option value="mechanical">Mechanical</option>
              <option value="civil">Civil</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Skills</label>
            <input
              type="text"
              value={searchFilters.skills}
              onChange={(e) => setSearchFilters({...searchFilters, skills: e.target.value})}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Python, React..."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
            <select
              value={searchFilters.location}
              onChange={(e) => setSearchFilters({...searchFilters, location: e.target.value})}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">All Locations</option>
              <option value="california">California</option>
              <option value="new-york">New York</option>
              <option value="texas">Texas</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Graduation Year</label>
            <select
              value={searchFilters.graduationYear}
              onChange={(e) => setSearchFilters({...searchFilters, graduationYear: e.target.value})}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">All Years</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">
          Search Results ({filteredCandidates.length} candidates found)
        </h2>
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <select className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm">
            <option>Sort by Relevance</option>
            <option>Sort by CGPA (High to Low)</option>
            <option>Sort by CGPA (Low to High)</option>
            <option>Sort by Achievements</option>
          </select>
        </div>
      </div>

      {/* Candidate Cards */}
      <div className="space-y-6">
        {filteredCandidates.map((candidate) => (
          <div key={candidate.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                    {candidate.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{candidate.name}</h3>
                    <p className="text-gray-600">{candidate.program}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="font-semibold text-gray-900">{candidate.cgpa}</span>
                        <span className="text-gray-500 text-sm ml-1">CGPA</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Award className="w-4 h-4 mr-1" />
                        <span className="text-sm">{candidate.achievements} achievements</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.slice(0, 5).map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                      {candidate.skills.length > 5 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                          +{candidate.skills.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <Building2 className="w-4 h-4 mr-2" />
                      <span className="text-sm">{candidate.institution}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <GraduationCap className="w-4 h-4 mr-2" />
                      <span className="text-sm">Class of {candidate.graduationYear}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{candidate.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end space-y-2">
                <button className="px-4 py-2 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors flex items-center">
                  <Eye className="w-4 h-4 mr-2" />
                  View Profile
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors flex items-center">
                  <Bookmark className="w-4 h-4 mr-2" />
                  Save Candidate
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Analytics = () => {
  const [institutionStats, setInstitutionStats] = useState<InstitutionStat[]>([]);

  useEffect(() => {
    setInstitutionStats(recruiterData.institutionStats);
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Recruitment Analytics</h1>
        <p className="text-gray-600 mt-1">Insights and statistics for informed hiring decisions</p>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Total Profiles</p>
              <p className="text-3xl font-bold">6,573</p>
            </div>
            <Users className="w-8 h-8 text-orange-200" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Public Profiles</p>
              <p className="text-3xl font-bold">4,821</p>
            </div>
            <Eye className="w-8 h-8 text-blue-200" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100 text-sm font-medium">Avg CGPA</p>
              <p className="text-3xl font-bold">8.1</p>
            </div>
            <TrendingUp className="w-8 h-8 text-emerald-200" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">New Graduates</p>
              <p className="text-3xl font-bold">1,247</p>
            </div>
            <GraduationCap className="w-8 h-8 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Institution Statistics */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Institution Statistics</h2>
          <p className="text-gray-600 text-sm mt-1">Anonymized performance metrics by institution</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Institution</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Total Students</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Average CGPA</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Placement Rate</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Trend</th>
              </tr>
            </thead>
            <tbody>
              {institutionStats.map((institution, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center mr-3">
                        <Building2 className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-semibold text-gray-900">{institution.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-700">{institution.students.toLocaleString()}</td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-blue-600">{institution.avgCGPA}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-green-600">{institution.placementRate}%</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span className="text-sm">↑ 5.2%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Skills Analysis */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Top Skills in Demand</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-gray-700 mb-4">Technical Skills</h3>
            <div className="space-y-3">
              {[
                { skill: 'Python', percentage: 78 },
                { skill: 'JavaScript', percentage: 65 },
                { skill: 'React', percentage: 52 },
                { skill: 'Machine Learning', percentage: 41 },
                { skill: 'Data Analysis', percentage: 38 }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-700">{item.skill}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-500 h-2 rounded-full" 
                        style={{width: `${item.percentage}%`}}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-4">Programs</h3>
            <div className="space-y-3">
              {[
                { program: 'Computer Science', percentage: 42 },
                { program: 'Electronics', percentage: 28 },
                { program: 'Mechanical', percentage: 18 },
                { program: 'Civil', percentage: 12 }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-700">{item.program}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{width: `${item.percentage * 2.4}%`}}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function RecruiterDashboard() {
  const menuItems = [
    { 
      path: '/recruiter', 
      icon: Search, 
      label: 'Talent Search', 
      color: 'text-orange-600', 
      bgColor: 'bg-orange-50' 
    },
    { 
      path: '/recruiter/analytics', 
      icon: TrendingUp, 
      label: 'Analytics', 
      color: 'text-blue-600', 
      bgColor: 'bg-blue-50' 
    }
  ];

  return (
    <DashboardLayout
      title="Recruiter Dashboard"
      userRole="recruiter"
      menuItems={menuItems}
    >
      <Routes>
        <Route path="/" element={<TalentSearch />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </DashboardLayout>
  );
}