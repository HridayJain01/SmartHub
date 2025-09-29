import React, { useState } from 'react';
import { StudentData } from '../../../types/student';

interface DocumentUploadProps {
  data: StudentData;
  onChange: (field: keyof StudentData, value: any) => void;
  errors: string[];
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({
  data,
  onChange,
  errors
}) => {
  const [folderPath, setFolderPath] = useState<string | null>(null);

  const handleFileUpload = (field: string, file: File | null) => {
    if (!file) return;

    const folderName = `uploads/${data.id || 'student'}`; // Create a folder based on student ID
    const filePath = `${folderName}/${field}_${file.name}`;

    // Simulate saving the file locally
    saveFileLocally(file, filePath).then(() => {
      const documents = data.documents_uploaded || {};
      onChange('documents_uploaded', {
        ...documents,
        [field]: filePath
      });

      // Update folder path in state and database
      setFolderPath(folderName);
      // onChange('folder_link', folderName);
    });
  };

  const saveFileLocally = async (file: File, path: string) => {
    // Simulate saving the file locally (replace with actual implementation)
    console.log(`Saving file to ${path}`);
    return new Promise((resolve) => setTimeout(resolve, 500));
  };

  const documentCategories = [
    {
      title: 'Academic Certificates',
      documents: [
        { key: 'ssc_certificate', label: 'SSC (10th) Marksheet/Certificate', required: true },
        { key: 'hsc_certificate', label: 'HSC (12th) Marksheet/Certificate', required: true },
        { key: 'entrance_exam_certificate', label: 'Entrance Exam Certificate', required: false },
        { key: 'school_leaving_certificate', label: 'School Leaving Certificate', required: true },
      ]
    },
    {
      title: 'Identity Documents',
      documents: [
        { key: 'aadhaar_card', label: 'Aadhaar Card', required: true },
        { key: 'photograph', label: 'Passport-size Photograph', required: true },
        { key: 'signature', label: 'Scanned Signature', required: true },
      ]
    },
    {
      title: 'Category & Other Certificates',
      documents: [
        { key: 'caste_certificate', label: 'Caste Certificate (if applicable)', required: false },
        { key: 'domicile_certificate', label: 'Domicile Certificate', required: false },
        { key: 'disability_certificate', label: 'Disability Certificate (if applicable)', required: false },
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Document Upload</h2>
        <p className="text-gray-600">Please upload all required documents. Files should be in PDF/JPEG format and under 5MB each.</p>
      </div>

      {documentCategories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
            {category.title}
          </h3>
          
          <div className="grid gap-4">
            {category.documents.map((doc) => (
              <div key={doc.key} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {doc.label}
                      {doc.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload(doc.key, e.target.files?.[0] || null)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    
                    <p className="text-xs text-gray-500 mt-1">
                      Accepted formats: PDF, JPEG, PNG (Max size: 5MB)
                    </p>
                  </div>
                  
                  <div className="ml-4">
                    {data.documents_uploaded?.[doc.key as keyof typeof data.documents_uploaded] ? (
                      <div className="flex items-center text-green-600 text-sm">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        Uploaded
                      </div>
                    ) : doc.required ? (
                      <div className="text-red-500 text-sm">Required</div>
                    ) : (
                      <div className="text-gray-400 text-sm">Optional</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">Document Guidelines:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• All documents should be clear and legible</li>
          <li>• Ensure all text is readable in the scanned copies</li>
          <li>• Original or attested copies are preferred</li>
          <li>• File names should be descriptive (e.g., "SSC_Certificate_JohnDoe.pdf")</li>
          <li>• Keep backup copies of all uploaded documents</li>
        </ul>
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

export default DocumentUpload;