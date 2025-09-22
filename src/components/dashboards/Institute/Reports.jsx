import React from 'react';
import { FileText, Download } from 'lucide-react';

const Reports = () => {
  const reportTypes = [
    { title: 'NAAC Report', description: 'National Assessment and Accreditation Council compliance report', lastGenerated: '2024-01-15', format: 'PDF' },
    { title: 'NIRF Report', description: 'National Institutional Ranking Framework submission report', lastGenerated: '2024-01-10', format: 'Excel' },
    { title: 'Student Performance Analytics', description: 'Comprehensive analysis of student academic performance', lastGenerated: '2024-01-20', format: 'PDF' },
    { title: 'Placement Statistics', description: 'Employment and placement data for current academic year', lastGenerated: '2024-01-18', format: 'PDF' }
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

export default Reports;
