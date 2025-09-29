export interface StudentData {
  id?: string;
  student_id?: string;
  
  // Personal Information
  full_name: string;
  date_of_birth: string;
  gender: string;
  category: string;
  aadhaar_number: string;
  photograph?: File | string;
  signature?: File | string;
  
  // Contact Information
  email: string;
  mobile_number: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  pincode: string;
  emergency_contact_name: string;
  emergency_contact_number: string;
  
  // Academic Details
  ssc_marks: string;
  ssc_board: string;
  ssc_seat_number: string;
  ssc_year: string;
  hsc_marks: string;
  hsc_board: string;
  hsc_seat_number: string;
  hsc_year: string;
  last_school_name: string;
  last_school_address: string;
  entrance_exam_name?: string;
  entrance_exam_marks?: string;
  
  // Additional Information
  bank_account_number?: string;
  bank_ifsc_code?: string;
  bank_name?: string;
  enrollment_date: string;
  graduation_date?: string;
  open_to_work: boolean;
  
  // Document flags
  documents_uploaded?: {
    ssc_certificate: boolean;
    hsc_certificate: boolean;
    entrance_exam_certificate: boolean;
    aadhaar_card: boolean;
    photograph: boolean;
    signature: boolean;
    school_leaving_certificate: boolean;
    caste_certificate: boolean;
    domicile_certificate: boolean;
    disability_certificate: boolean;
  };
  
  created_at?: string;
  updated_at?: string;
  is_complete: boolean;
  current_step: number;
}

export interface FormStep {
  id: number;
  title: string;
  description: string;
  fields: string[];
}