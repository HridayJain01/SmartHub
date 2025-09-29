import React from 'react';
import { StudentData } from '../../../types/student';

interface AdditionalInformationProps {
  data: StudentData;
  onChange: (field: keyof StudentData, value: any) => void;
  errors: string[];
}

const AdditionalInformation: React.FC<AdditionalInformationProps> = ({
  data,
  onChange,
  errors
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Additional Information</h2>
        <p className="text-gray-600">Please provide additional details for your profile</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Bank Account Details (For Scholarships/Refunds)</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account Number
            </label>
            <input
              type="text"
              value={data.bank_account_number || ''}
              onChange={(e) => onChange('bank_account_number', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter account number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              IFSC Code
            </label>
            <input
              type="text"
              value={data.bank_ifsc_code || ''}
              onChange={(e) => onChange('bank_ifsc_code', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter IFSC code"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bank Name
            </label>
            <input
              type="text"
              value={data.bank_name || ''}
              onChange={(e) => onChange('bank_name', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter bank name"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Enrollment Information</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enrollment Date *
            </label>
            <input
              type="date"
              value={data.enrollment_date || ''}
              onChange={(e) => onChange('enrollment_date', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expected Graduation Date
            </label>
            <input
              type="date"
              value={data.graduation_date || ''}
              onChange={(e) => onChange('graduation_date', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Career Status</h3>
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="open-to-work"
            checked={data.open_to_work || false}
            onChange={(e) => onChange('open_to_work', e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="open-to-work" className="text-sm font-medium text-gray-700">
            I am open to work opportunities
          </label>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Check this if you're interested in receiving job/internship opportunities
        </p>
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

export default AdditionalInformation;