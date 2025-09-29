import React from 'react';
import { Users, TrendingUp, BarChart3 } from 'lucide-react';

const Analytics = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600 mt-1">Institutional performance metrics and insights</p>
      </div>

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

export default Analytics;
