import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User as UserIcon,
  Building2,
  Calendar,
  Users,
  GraduationCap,
  Mail,
  Lock,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { useAuth, Role } from '../contexts/AuthContext';

/** UI state for toast message */
interface MessageState {
  type: 'success' | 'error';
  text: string;
}

/** Card model for role tiles */
interface RoleCard {
  id: Role;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  color: string;
  redirectPath: string;
}

const ROLE_CARDS: RoleCard[] = [
  {
    id: Role.Student,
    title: 'Student',
    icon: UserIcon,
    description: 'Build your verified academic profile',
    color: 'from-blue-500 to-indigo-600',
    redirectPath: '/student',
  },
  {
    id: Role.Institution,
    title: 'Institution',
    icon: Building2,
    description: 'Manage student data and reports',
    color: 'from-emerald-500 to-teal-600',
    redirectPath: '/institution',
  },
  {
    id: Role.Organizer,
    title: 'Event Organizer',
    icon: Calendar,
    description: 'Create events and verify achievements',
    color: 'from-purple-500 to-violet-600',
    redirectPath: '/organizer',
  },
  {
    id: Role.Recruiter,
    title: 'Recruiter',
    icon: Users,
    description: 'Discover verified talent',
    color: 'from-orange-500 to-red-600',
    redirectPath: '/recruiter',
  },
];

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    // Recruiter-specific fields
    companyName: '',
    phone: '',
    address: '',
    website: '',
    industry: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<MessageState | null>(null);

  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (isLogin) {
        // 🔓 Department demo bypass (no Supabase):
        const email = formData.email.trim().toLowerCase();
        const pass = formData.password;
        if (email === 'ittsec@gmail.com' && pass === 'it2026') {
          sessionStorage.setItem('deptLogin', 'true');
          navigate('/department');
          return;
        }

        // ✅ Everyone else: your existing Supabase-based auth via useAuth()
        const result = await signIn(formData.email, formData.password);
        if (result.success) {
          const roleCard = ROLE_CARDS.find((r) => r.id === result.user.role);
          navigate(roleCard ? roleCard.redirectPath : '/');
        } else {
          setMessage({ type: 'error', text: result.error });
        }
      } else {
        // ✅ Keep your signup logic as-is
        if (formData.password.length < 6) {
          setMessage({ type: 'error', text: 'Password must be at least 6 characters long' });
          return;
        }
        if (formData.password !== formData.confirmPassword) {
          setMessage({ type: 'error', text: 'Passwords do not match' });
          return;
        }
        if (!selectedRole) {
          setMessage({ type: 'error', text: 'Please select a role' });
          return;
        }
        if (selectedRole === Role.Recruiter) {
          if (!formData.companyName.trim()) {
            setMessage({ type: 'error', text: 'Company name is required for recruiters' });
            return;
          }
          if (!formData.industry.trim()) {
            setMessage({ type: 'error', text: 'Industry is required for recruiters' });
            return;
          }
        }

        const result = await signUp(
          formData.email,
          formData.password,
          selectedRole,
          formData.name,
          {
            companyName: formData.companyName,
            phone: formData.phone,
            address: formData.address,
            website: formData.website,
            industry: formData.industry,
          }
        );

        if (result.success) {
          setMessage({
            type: 'success',
            text: 'Account created successfully! Please check your email for verification.',
          });
        } else {
          setMessage({ type: 'error', text: result.error });
        }
      }
    } catch {
      setMessage({ type: 'error', text: 'An unexpected error occurred' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Smart Student Hub
                </span>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Auth Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-md w-full">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h1>
              <p className="text-gray-600">
                {isLogin ? 'Sign in to your account' : 'Join the Smart Student Hub community'}
              </p>
            </div>

            {/* Message */}
            {message && (
              <div
                className={`mb-6 p-4 rounded-xl flex items-center space-x-2 ${
                  message.type === 'success'
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}
              >
                {message.type === 'success' ? (
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                )}
                <span className="text-sm">{message.text}</span>
              </div>
            )}

            {/* Role Selection (for signup) */}
            {!isLogin && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Select Your Role</label>
                <div className="grid grid-cols-2 gap-3">
                  {ROLE_CARDS.map((role) => {
                    const Icon = role.icon;
                    return (
                      <button
                        key={role.id}
                        type="button"
                        onClick={() => setSelectedRole(role.id)}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                          selectedRole === role.id
                            ? `bg-gradient-to-r ${role.color} text-white border-transparent shadow-lg`
                            : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Icon className="w-6 h-6 mx-auto mb-2" />
                        <div className="text-sm font-semibold">{role.title}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name (for signup) */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              {/* Confirm Password (for signup) */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Recruiter-specific fields */}
              {!isLogin && selectedRole === Role.Recruiter && (
                <div className="space-y-6 border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900">Company Information</h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name *</label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                        placeholder="Enter company name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Industry *</label>
                      <select
                        value={formData.industry}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                        required
                      >
                        <option value="">Select industry</option>
                        <option value="Technology">Technology</option>
                        <option value="Finance">Finance</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Consulting">Consulting</option>
                        <option value="Education">Education</option>
                        <option value="Retail">Retail</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Company Address</label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                      placeholder="Enter company address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Company Website</label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                      placeholder="https://company.com"
                    />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  </div>
                ) : isLogin ? (
                  'Sign In'
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            {/* Toggle Login/Signup */}
            <div className="mt-8 text-center">
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setMessage(null);
                  setSelectedRole(null);
                  setFormData({
                    email: '',
                    password: '',
                    name: '',
                    confirmPassword: '',
                    companyName: '',
                    phone: '',
                    address: '',
                    website: '',
                    industry: '',
                  });
                }}
                className="text-indigo-600 hover:text-indigo-500 font-semibold"
              >
                {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
              </button>
            </div>

            {/* Demo hint */}
            <div className="mt-4 text-xs text-gray-500 text-center">
              Demo Dept Login: <strong>ITtsec@gmail.com</strong> / <strong>it2026</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
