import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Building2, 
  Calendar, 
  Users, 
  GraduationCap, 
  Shield, 
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Star
} from 'lucide-react';

const roles = [
  {
    id: 'student',
    title: 'Student',
    icon: User,
    description: 'Build your verified academic profile and showcase achievements',
    features: [
      'Verified academic records and CGPA tracking',
      'Digital portfolio with achievement badges',
      'Privacy-controlled profile visibility',
      'Professional resume generation'
    ],
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700'
  },
  {
    id: 'institution',
    title: 'Institution',
    icon: Building2,
    description: 'Manage student data and generate compliance reports',
    features: [
      'Bulk academic data upload and verification',
      'NAAC/NIRF report generation',
      'Student performance analytics',
      'Placement statistics dashboard'
    ],
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-700'
  },
  {
    id: 'organizer',
    title: 'Event Organizer',
    icon: Calendar,
    description: 'Create events and verify student achievements',
    features: [
      'Event creation and management',
      'Participant verification via Student ID',
      'Achievement badge issuance',
      'Winner announcement system'
    ],
    color: 'from-purple-500 to-violet-600',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700'
  },
  {
    id: 'recruiter',
    title: 'Recruiter',
    icon: Users,
    description: 'Discover verified talent with advanced search',
    features: [
      'Advanced filtering by CGPA and skills',
      'Verified achievement validation',
      'Anonymized college statistics',
      'Downloadable standardized resumes'
    ],
    color: 'from-orange-500 to-red-600',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-700'
  }
];

const stats = [
  { value: '50K+', label: 'Verified Students', icon: GraduationCap },
  { value: '200+', label: 'Partner Institutions', icon: Building2 },
  { value: '1000+', label: 'Active Recruiters', icon: Users },
  { value: '99.9%', label: 'Data Accuracy', icon: Shield }
];

export default function LandingPage() {
  const [activeRole, setActiveRole] = useState('student');
  const activeRoleData = roles.find(role => role.id === activeRole);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Smart Student Hub
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/auth"
                className="px-4 py-2 text-gray-700 hover:text-indigo-600 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/auth"
                className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-8">
            <Star className="w-4 h-4 mr-2" />
            Trusted by 50,000+ Students & 200+ Institutions
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            The Future of
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 bg-clip-text text-transparent block">
              Academic Verification
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Connect students, institutions, organizers, and recruiters through verified academic records, 
            achievements, and professional profiles. Built for transparency and trust.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
                <stat.icon className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role Tabs Section */}
      <section className="py-20 px-6 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Role
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tailored experiences for every stakeholder in the academic ecosystem
            </p>
          </div>

          {/* Role Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <button
                  key={role.id}
                  onClick={() => setActiveRole(role.id)}
                  className={`flex items-center space-x-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    activeRole === role.id
                      ? `bg-gradient-to-r ${role.color} text-white shadow-lg transform -translate-y-1`
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{role.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Role Content */}
          {activeRoleData && (
            <div className={`${activeRoleData.bgColor} rounded-3xl p-8 md:p-12 border border-gray-200/50`}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`p-4 bg-gradient-to-r ${activeRoleData.color} rounded-2xl`}>
                      <activeRoleData.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900">{activeRoleData.title}</h3>
                  </div>
                  <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                    {activeRoleData.description}
                  </p>
                  <div className="space-y-4">
                    {activeRoleData.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    to="/auth"
                    className={`inline-flex items-center mt-8 px-8 py-4 bg-gradient-to-r ${activeRoleData.color} text-white rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200`}
                  >
                    Get Started as {activeRoleData.title}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </div>
                <div className="relative">
                  <div className="bg-white rounded-2xl shadow-xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                    <div className="space-y-6">
                      <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded"></div>
                      <div className="space-y-3">
                        <div className="h-3 bg-gray-100 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                        <div className="h-3 bg-gray-100 rounded w-5/6"></div>
                      </div>
                      <div className={`h-12 bg-gradient-to-r ${activeRoleData.color} rounded-lg`}></div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-2xl transform -rotate-3 -z-10"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Smart Student Hub?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built with security, transparency, and user experience at its core
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Verified Data',
                description: 'All academic records and achievements are institution-verified and tamper-proof.'
              },
              {
                icon: TrendingUp,
                title: 'Advanced Analytics',
                description: 'Comprehensive dashboards and reports for data-driven decision making.'
              },
              {
                icon: Users,
                title: 'Role-Based Access',
                description: 'Tailored interfaces and permissions for each type of user and organization.'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students, institutions, and recruiters who trust 
            Smart Student Hub for verified academic credentials.
          </p>
          <Link
            to="/auth"
            className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold text-lg hover:bg-gray-50 transform hover:-translate-y-1 transition-all duration-200 shadow-lg"
          >
            Create Your Account
            <ArrowRight className="w-6 h-6 ml-2" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">Smart Student Hub</h3>
          </div>
          <p className="text-gray-400 mb-4">
            Connecting the future of education through verified credentials and trusted networks.
          </p>
          <p className="text-sm text-gray-500">
            © 2024 Smart Student Hub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}