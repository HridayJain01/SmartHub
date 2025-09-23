import React from 'react';
import { StudentData } from '../../../types/student'

interface AcademicDetailsProps {
  data: StudentData;
  onChange: (field: keyof StudentData, value: any) => void;
  errors: string[];
}

const AcademicDetails: React.FC<AcademicDetailsProps> = ({
  data,
  onChange,
  errors
}) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => currentYear - i);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Academic Details</h2>
        <p className="text-gray-600">Please provide your educational background information</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">SSC (10th Standard)</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SSC Marks/Percentage *
            </label>
            <input
              type="text"
              value={data.ssc_marks || ''}
              onChange={(e) => onChange('ssc_marks', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter marks or percentage"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SSC Board *
            </label>
            <input
              type="text"
              value={data.ssc_board || ''}
              onChange={(e) => onChange('ssc_board', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter board name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SSC Seat/Enrollment Number *
            </label>
            <input
              type="text"
              value={data.ssc_seat_number || ''}
              onChange={(e) => onChange('ssc_seat_number', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter seat number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Year of Passing *
            </label>
            <select
              value={data.ssc_year || ''}
              onChange={(e) => onChange('ssc_year', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="">Select Year</option>
              {years.map(year => (
                <option key={year} value={year.toString()}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">HSC (12th Standard) / Diploma</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              HSC Marks/Percentage *
            </label>
            <input
              type="text"
              value={data.hsc_marks || ''}
              onChange={(e) => onChange('hsc_marks', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter marks or percentage"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              HSC Board *
            </label>
            <input
              type="text"
              value={data.hsc_board || ''}
              onChange={(e) => onChange('hsc_board', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter board name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              HSC Seat/Enrollment Number *
            </label>
            <input
              type="text"
              value={data.hsc_seat_number || ''}
              onChange={(e) => onChange('hsc_seat_number', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter seat number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Year of Passing *
            </label>
            <select
              value={data.hsc_year || ''}
              onChange={(e) => onChange('hsc_year', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="">Select Year</option>
              {years.map(year => (
                <option key={year} value={year.toString()}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Last Attended School/College</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              School/College Name *
            </label>
            <input
              type="text"
              value={data.last_school_name || ''}
              onChange={(e) => onChange('last_school_name', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter institution name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              School/College Address *
            </label>
            <textarea
              value={data.last_school_address || ''}
              onChange={(e) => onChange('last_school_address', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              rows={3}
              placeholder="Enter complete address"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Entrance Exam (If Applicable)</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Entrance Exam Name
            </label>
            <input
              type="text"
              value={data.entrance_exam_name || ''}
              onChange={(e) => onChange('entrance_exam_name', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="e.g., JEE Main, NEET, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Entrance Exam Marks/Score
            </label>
            <input
              type="text"
              value={data.entrance_exam_marks || ''}
              onChange={(e) => onChange('entrance_exam_marks', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter marks or score"
            />
          </div>
        </div>
      </div>

      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <ul className="text-red-700 text-sm space-y-1">
            {errors.map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AcademicDetails;