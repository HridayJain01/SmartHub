import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  steps: { id: number; title: string; description: string }[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps, steps }) => {
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Student Registration</h1>
        <span className="text-sm text-gray-600">
          Step {currentStep} of {totalSteps}
        </span>
      </div>
      
      <div className="relative">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center relative z-10">
              <div
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-semibold transition-colors ${
                  step.id < currentStep
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : step.id === currentStep
                    ? 'bg-blue-100 border-blue-600 text-blue-600'
                    : 'bg-white border-gray-300 text-gray-400'
                }`}
              >
                {step.id < currentStep ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                ) : (
                  step.id
                )}
              </div>
              <div className="mt-2 text-center">
                <div className={`text-xs font-medium ${
                  step.id <= currentStep ? 'text-blue-600' : 'text-gray-400'
                }`}>
                  {step.title}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="absolute top-5 left-5 right-5 h-0.5 bg-gray-200 -z-10">
          <div
            className="h-full bg-blue-600 transition-all duration-500 ease-in-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;