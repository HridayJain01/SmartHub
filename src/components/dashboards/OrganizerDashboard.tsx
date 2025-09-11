import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  Award, 
  Plus,
  MapPin,
  Clock,
  CheckCircle,
  Upload,
  Trophy,
  Star,
  User
} from 'lucide-react';
import DashboardLayout from '../layout/DashboardLayout';

const EventsManagement = () => {
  const [events] = useState([
    {
      id: 1,
      title: 'National Tech Hackathon 2024',
      description: 'A 48-hour coding challenge for students',
      startDate: '2024-03-15',
      endDate: '2024-03-17',
      location: 'Virtual',
      participants: 245,
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'AI/ML Workshop Series',
      description: 'Comprehensive workshop on machine learning fundamentals',
      startDate: '2024-02-20',
      endDate: '2024-02-22',
      location: 'Tech Conference Center',
      participants: 150,
      status: 'completed'
    },
    {
      id: 3,
      title: 'Data Science Competition',
      description: 'Analyze real-world datasets and present insights',
      startDate: '2024-04-10',
      endDate: '2024-04-12',
      location: 'University Campus',
      participants: 89,
      status: 'upcoming'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-700';
      case 'ongoing': return 'bg-green-100 text-green-700';
      case 'completed': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Events Management</h1>
          <p className="text-gray-600 mt-1">Create and manage your events and competitions</p>
        </div>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Create Event
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Total Events</p>
              <p className="text-3xl font-bold">{events.length}</p>
            </div>
            <Calendar className="w-8 h-8 text-purple-200" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Participants</p>
              <p className="text-3xl font-bold">{events.reduce((sum, e) => sum + e.participants, 0)}</p>
            </div>
            <Users className="w-8 h-8 text-blue-200" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100 text-sm font-medium">Completed</p>
              <p className="text-3xl font-bold">{events.filter(e => e.status === 'completed').length}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-emerald-200" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Upcoming</p>
              <p className="text-3xl font-bold">{events.filter(e => e.status === 'upcoming').length}</p>
            </div>
            <Calendar className="w-8 h-8 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(event.status)}`}>
                    {event.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.location}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    {event.participants} participants
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-xl hover:bg-purple-200 transition-colors">
                  Manage
                </button>
                <button className="px-4 py-2 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition-colors">
                  View Results
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Participants = () => {
  const [participants] = useState([
    {
      studentId: 'STU001',
      name: 'Alex Johnson',
      email: 'alex.johnson@university.edu',
      institution: 'Tech University',
      eventTitle: 'National Tech Hackathon 2024',
      registrationDate: '2024-02-01',
      status: 'confirmed'
    },
    {
      studentId: 'STU002',
      name: 'Sarah Chen',
      email: 'sarah.chen@university.edu',
      institution: 'State University',
      eventTitle: 'AI/ML Workshop Series',
      registrationDate: '2024-01-28',
      status: 'winner'
    },
    {
      studentId: 'STU003',
      name: 'Michael Rodriguez',
      email: 'michael.r@college.edu',
      institution: 'Engineering College',
      eventTitle: 'Data Science Competition',
      registrationDate: '2024-02-05',
      status: 'participant'
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'winner': return Trophy;
      case 'confirmed': return CheckCircle;
      default: return User;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'winner': return 'bg-yellow-100 text-yellow-700';
      case 'confirmed': return 'bg-green-100 text-green-700';
      default: return 'bg-blue-100 text-blue-700';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Participants Management</h1>
          <p className="text-gray-600 mt-1">Manage event participants and issue achievements</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors flex items-center">
            <Upload className="w-4 h-4 mr-2" />
            Upload Results
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors flex items-center">
            <Award className="w-4 h-4 mr-2" />
            Issue Certificates
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Event Participants</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Participant</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Student ID</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Institution</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Event</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((participant, index) => {
                const StatusIcon = getStatusIcon(participant.status);
                return (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-semibold text-gray-900">{participant.name}</p>
                        <p className="text-gray-600 text-sm">{participant.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-mono text-sm text-gray-700">{participant.studentId}</td>
                    <td className="py-4 px-6 text-gray-700">{participant.institution}</td>
                    <td className="py-4 px-6 text-gray-700">{participant.eventTitle}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(participant.status)}`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {participant.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition-colors">
                          View Profile
                        </button>
                        <button className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm hover:bg-purple-200 transition-colors">
                          Issue Badge
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const Achievements = () => {
  const [achievements] = useState([
    {
      id: 1,
      title: 'Hackathon Winner - First Place',
      eventTitle: 'National Tech Hackathon 2024',
      recipientCount: 3,
      issuedDate: '2024-03-17',
      status: 'issued',
      badgeType: 'gold'
    },
    {
      id: 2,
      title: 'Workshop Completion Certificate',
      eventTitle: 'AI/ML Workshop Series',
      recipientCount: 147,
      issuedDate: '2024-02-22',
      status: 'issued',
      badgeType: 'completion'
    },
    {
      id: 3,
      title: 'Innovation Award',
      eventTitle: 'Data Science Competition',
      recipientCount: 5,
      issuedDate: null,
      status: 'pending',
      badgeType: 'special'
    }
  ]);

  const getBadgeColor = (badgeType: string) => {
    switch (badgeType) {
      case 'gold': return 'bg-yellow-100 text-yellow-700';
      case 'completion': return 'bg-blue-100 text-blue-700';
      case 'special': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getBadgeIcon = (badgeType: string) => {
    switch (badgeType) {
      case 'gold': return Trophy;
      case 'completion': return CheckCircle;
      case 'special': return Star;
      default: return Award;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Achievement Badges</h1>
          <p className="text-gray-600 mt-1">Manage and issue verified achievement certificates</p>
        </div>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Create Badge
        </button>
      </div>

      <div className="space-y-6">
        {achievements.map((achievement) => {
          const BadgeIcon = getBadgeIcon(achievement.badgeType);
          return (
            <div key={achievement.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center">
                    <BadgeIcon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{achievement.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getBadgeColor(achievement.badgeType)}`}>
                        {achievement.badgeType}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">Event: {achievement.eventTitle}</p>
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        {achievement.recipientCount} recipients
                      </div>
                      {achievement.issuedDate && (
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          Issued: {new Date(achievement.issuedDate).toLocaleDateString()}
                        </div>
                      )}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        achievement.status === 'issued' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {achievement.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-xl hover:bg-purple-200 transition-colors">
                    View Recipients
                  </button>
                  {achievement.status === 'pending' && (
                    <button className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors">
                      Issue Badges
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function OrganizerDashboard() {
  const menuItems = [
    { 
      path: '/organizer', 
      icon: Calendar, 
      label: 'Events', 
      color: 'text-purple-600', 
      bgColor: 'bg-purple-50' 
    },
    { 
      path: '/organizer/participants', 
      icon: Users, 
      label: 'Participants', 
      color: 'text-blue-600', 
      bgColor: 'bg-blue-50' 
    },
    { 
      path: '/organizer/achievements', 
      icon: Award, 
      label: 'Achievements', 
      color: 'text-emerald-600', 
      bgColor: 'bg-emerald-50' 
    }
  ];

  return (
    <DashboardLayout
      title="Organizer Dashboard"
      userRole="organizer"
      menuItems={menuItems}
    >
      <Routes>
        <Route path="/" element={<EventsManagement />} />
        <Route path="/participants" element={<Participants />} />
        <Route path="/achievements" element={<Achievements />} />
      </Routes>
    </DashboardLayout>
  );
}