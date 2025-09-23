export function generateStudentId(): string {
  const year = new Date().getFullYear().toString().slice(-2);
  const randomNum = Math.floor(Math.random() * 900000) + 100000; // 6 digit number
  return `STU${year}${randomNum}`;
}

export function validateStep(step: number, data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  switch (step) {
    case 1: // Personal Information
      if (!data.full_name?.trim()) errors.push('Full name is required');
      if (!data.date_of_birth) errors.push('Date of birth is required');
      if (!data.gender) errors.push('Gender is required');
      if (!data.category) errors.push('Category is required');
      if (!data.aadhaar_number?.trim()) errors.push('Aadhaar number is required');
      else if (!/^\d{12}$/.test(data.aadhaar_number.replace(/\s/g, ''))) {
        errors.push('Aadhaar number must be 12 digits');
      }
      break;
      
    case 2: // Contact Information
      if (!data.email?.trim()) errors.push('Email is required');
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.push('Valid email is required');
      }
      if (!data.mobile_number?.trim()) errors.push('Mobile number is required');
      else if (!/^\d{10}$/.test(data.mobile_number.replace(/\s/g, ''))) {
        errors.push('Mobile number must be 10 digits');
      }
      if (!data.address_line1?.trim()) errors.push('Address is required');
      if (!data.city?.trim()) errors.push('City is required');
      if (!data.state?.trim()) errors.push('State is required');
      if (!data.pincode?.trim()) errors.push('Pincode is required');
      if (!data.emergency_contact_name?.trim()) errors.push('Emergency contact name is required');
      if (!data.emergency_contact_number?.trim()) errors.push('Emergency contact number is required');
      break;
      
    case 3: // Academic Details
      if (!data.ssc_marks?.trim()) errors.push('SSC marks are required');
      if (!data.ssc_board?.trim()) errors.push('SSC board is required');
      if (!data.ssc_seat_number?.trim()) errors.push('SSC seat number is required');
      if (!data.ssc_year?.trim()) errors.push('SSC year is required');
      if (!data.hsc_marks?.trim()) errors.push('HSC marks are required');
      if (!data.hsc_board?.trim()) errors.push('HSC board is required');
      if (!data.hsc_seat_number?.trim()) errors.push('HSC seat number is required');
      if (!data.hsc_year?.trim()) errors.push('HSC year is required');
      if (!data.last_school_name?.trim()) errors.push('Last school name is required');
      if (!data.last_school_address?.trim()) errors.push('Last school address is required');
      break;
      
    case 4: // Additional Information
      if (!data.enrollment_date) errors.push('Enrollment date is required');
      break;
      
    case 5: // Documents - optional validation
      break;
  }
  
  return { isValid: errors.length === 0, errors };
}