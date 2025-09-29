import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StudentData } from '../../types/student';
import { generateStudentId, validateStep } from '../../utils/studentIdGenerator';
import ProgressBar from './ProgressBar';
import PersonalInformation from './FormSteps/PersonalInformation';
import ContactInformation from './FormSteps/ContactInformation';
import AcademicDetails from './FormSteps/AcademicDetails';
import AdditionalInformation from './FormSteps/AdditionalInformation';
import DocumentUpload from './FormSteps/DocumentUpload';
import { supabase } from '../../../lib/supabase';

const StudentRegistrationForm: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState<StudentData>({
    student_id: generateStudentId(),
    full_name: '',
    date_of_birth: '',
    gender: '',
    category: '',
    aadhaar_number: '',
    email: '',
    mobile_number: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    pincode: '',
    emergency_contact_name: '',
    emergency_contact_number: '',
    ssc_marks: '',
    ssc_board: '',
    ssc_seat_number: '',
    ssc_year: '',
    hsc_marks: '',
    hsc_board: '',
    hsc_seat_number: '',
    hsc_year: '',
    last_school_name: '',
    last_school_address: '',
    entrance_exam_name: '',
    entrance_exam_marks: '',
    bank_account_number: '',
    bank_ifsc_code: '',
    bank_name: '',
    enrollment_date: '',
    graduation_date: '',
    open_to_work: false,
    documents_uploaded: {
      ssc_certificate: false,
      hsc_certificate: false,
      entrance_exam_certificate: false,
      aadhaar_card: false,
      photograph: false,
      signature: false,
      school_leaving_certificate: false,
      caste_certificate: false,
      domicile_certificate: false,
      disability_certificate: false,
    },
    is_complete: false,
    current_step: 1
  });

  const steps = [
    { id: 1, title: 'Personal Info', description: 'Basic personal details' },
    { id: 2, title: 'Contact Info', description: 'Contact and address details' },
    { id: 3, title: 'Academic', description: 'Educational background' },
    { id: 4, title: 'Additional', description: 'Bank and other details' },
    { id: 5, title: 'Documents', description: 'Upload required documents' },
  ];

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('student_registration_draft');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData);
      setCurrentStep(parsedData.current_step || 1);
    }
  }, []);

  const handleFieldChange = (field: keyof StudentData, value: any) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    setErrors([]); // Clear errors when user starts typing
  };

  const saveProgress = async () => {
    setIsSaving(true);
    try {
      const dataToSave = { ...formData, current_step: currentStep, updated_at: new Date().toISOString() };
      localStorage.setItem('student_registration_draft', JSON.stringify(dataToSave));
      
      // Here you would also save to your database
      // await saveStudentDraft(dataToSave);
      
      // Show success message briefly
      setTimeout(() => setIsSaving(false), 1000);
    } catch (error) {
      console.error('Error saving progress:', error);
      setIsSaving(false);
    }
  };

  const nextStep = () => {
    const validation = validateStep(currentStep, formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors([]);
    
    if (currentStep < steps.length) {
      const nextStepNumber = currentStep + 1;
      setCurrentStep(nextStepNumber);
      setFormData(prev => ({ ...prev, current_step: nextStepNumber }));
      saveProgress();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      const prevStepNumber = currentStep - 1;
      setCurrentStep(prevStepNumber);
      setFormData(prev => ({ ...prev, current_step: prevStepNumber }));
    }
  };

  const submitForm = async () => {
    const validation = validateStep(currentStep, formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsLoading(true);
    try {
      const finalData = {
        ...formData,
        is_complete: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // Save to local folder
      const blob = new Blob([JSON.stringify(finalData, null, 2)], { type: 'application/json' });
      const fileName = `student_${formData.student_id}.json`;
      const fileURL = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = fileURL;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clear saved draft
      localStorage.removeItem('student_registration_draft');

      // Redirect to dashboard
      alert('Registration completed successfully!');
      navigate('/student/dashboard');
    } catch (error) {
      console.error('Submission Error:', error);
      setErrors(['An error occurred while saving the form. Please try again.']);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    const stepProps = {
      data: formData,
      onChange: handleFieldChange,
      errors
    };

    switch (currentStep) {
      case 1:
        return <PersonalInformation {...stepProps} />;
      case 2:
        return <ContactInformation {...stepProps} />;
      case 3:
        return <AcademicDetails {...stepProps} />;
      case 4:
        return <AdditionalInformation {...stepProps} />;
      case 5:
        return <DocumentUpload {...stepProps} />;
      default:
        return <PersonalInformation {...stepProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-white">Student Registration Portal</h1>
                <p className="text-blue-100 text-sm mt-1">Student ID: {formData.student_id}</p>
              </div>
              <button
                onClick={saveProgress}
                disabled={isSaving}
                className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : 'Save Progress'}
              </button>
            </div>
          </div>

          <div className="p-6">
            <ProgressBar 
              currentStep={currentStep} 
              totalSteps={steps.length} 
              steps={steps}
            />

            <div className="mt-8">
              {renderStep()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>

              <div className="text-sm text-gray-500">
                Auto-saved • Last saved: {isSaving ? 'Saving...' : 'Just now'}
              </div>

              {currentStep === steps.length ? (
                <button
                  onClick={submitForm}
                  disabled={isLoading}
                  className="flex items-center px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Submitting...' : 'Submit Registration'}
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Next
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentRegistrationForm;