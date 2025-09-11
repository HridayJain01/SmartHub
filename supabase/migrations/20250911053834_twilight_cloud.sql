-- Smart Student Hub Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table for additional user data
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student', 'institution', 'organizer', 'recruiter')),
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create institutions table
CREATE TABLE IF NOT EXISTS institutions (
  institution_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  address TEXT,
  contact_email TEXT,
  contact_number TEXT,
  accreditation TEXT,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create students table
CREATE TABLE IF NOT EXISTS students (
  student_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  institution_id UUID REFERENCES institutions(institution_id),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  date_of_birth DATE,
  skills TEXT[],
  about TEXT,
  photo_url TEXT,
  privacy_public BOOLEAN DEFAULT TRUE,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create academic records table
CREATE TABLE IF NOT EXISTS student_academic_records (
  record_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(student_id) ON DELETE CASCADE,
  institution_id UUID REFERENCES institutions(institution_id),
  program TEXT NOT NULL,
  course_code TEXT,
  course_name TEXT,
  term TEXT,
  credits INTEGER,
  grade TEXT,
  grade_point DECIMAL(3,2),
  cgpa DECIMAL(3,2),
  transcript_url TEXT,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create CGPA summary table
CREATE TABLE IF NOT EXISTS student_cgpa_summary (
  summary_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(student_id) ON DELETE CASCADE,
  institution_id UUID REFERENCES institutions(institution_id),
  program TEXT NOT NULL,
  overall_cgpa DECIMAL(3,2),
  total_credits INTEGER,
  verified BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create event organizers table
CREATE TABLE IF NOT EXISTS event_organizers (
  organizer_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT,
  website_url TEXT,
  document_proof_url TEXT,
  contact_email TEXT,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create recruiters table
CREATE TABLE IF NOT EXISTS recruiters (
  recruiter_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  contact_email TEXT,
  company TEXT,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  event_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organizer_id UUID REFERENCES event_organizers(organizer_id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  start_date DATE,
  end_date DATE,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
  achievement_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(student_id) ON DELETE CASCADE,
  type TEXT CHECK (type IN ('certificate', 'competition', 'internship', 'project', 'publication')),
  title TEXT NOT NULL,
  description TEXT,
  date_achieved DATE,
  organizer_id UUID REFERENCES event_organizers(organizer_id),
  event_id UUID REFERENCES events(event_id),
  faculty_verified BOOLEAN DEFAULT FALSE,
  public BOOLEAN DEFAULT TRUE,
  document_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_academic_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_cgpa_summary ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_organizers ENABLE ROW LEVEL SECURITY;
ALTER TABLE recruiters ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create RLS policies for students
CREATE POLICY "Students can view own data" ON students
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Students can update own data" ON students
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Recruiters can view public student profiles" ON students
  FOR SELECT USING (
    privacy_public = TRUE AND 
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'recruiter')
  );

CREATE POLICY "Institutions can view their students" ON students
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM institutions 
      WHERE institutions.user_id = auth.uid() 
      AND institutions.institution_id = students.institution_id
    )
  );

-- Create RLS policies for academic records
CREATE POLICY "Students can view own academic records" ON student_academic_records
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM students WHERE students.student_id = student_academic_records.student_id AND students.user_id = auth.uid())
  );

CREATE POLICY "Institutions can manage their students' records" ON student_academic_records
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM institutions 
      WHERE institutions.user_id = auth.uid() 
      AND institutions.institution_id = student_academic_records.institution_id
    )
  );

-- Create RLS policies for achievements
CREATE POLICY "Students can manage own achievements" ON achievements
  FOR ALL USING (
    EXISTS (SELECT 1 FROM students WHERE students.student_id = achievements.student_id AND students.user_id = auth.uid())
  );

CREATE POLICY "Public achievements are viewable by recruiters" ON achievements
  FOR SELECT USING (
    public = TRUE AND 
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'recruiter')
  );

CREATE POLICY "Organizers can manage achievements they issued" ON achievements
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM event_organizers 
      WHERE event_organizers.user_id = auth.uid() 
      AND event_organizers.organizer_id = achievements.organizer_id
    )
  );

-- Create RLS policies for events
CREATE POLICY "Organizers can manage own events" ON events
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM event_organizers 
      WHERE event_organizers.user_id = auth.uid() 
      AND event_organizers.organizer_id = events.organizer_id
    )
  );

CREATE POLICY "Events are publicly viewable" ON events
  FOR SELECT TO authenticated USING (true);

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', 'User'),
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')
  );
  
  -- Create role-specific records
  IF NEW.raw_user_meta_data->>'role' = 'student' THEN
    INSERT INTO students (user_id, name, email)
    VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'name', 'User'), NEW.email);
  ELSIF NEW.raw_user_meta_data->>'role' = 'institution' THEN
    INSERT INTO institutions (user_id, name, contact_email)
    VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'name', 'Institution'), NEW.email);
  ELSIF NEW.raw_user_meta_data->>'role' = 'organizer' THEN
    INSERT INTO event_organizers (user_id, name, contact_email)
    VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'name', 'Organizer'), NEW.email);
  ELSIF NEW.raw_user_meta_data->>'role' = 'recruiter' THEN
    INSERT INTO recruiters (user_id, name, contact_email)
    VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'name', 'Recruiter'), NEW.email);
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cgpa_summary_updated_at BEFORE UPDATE ON student_cgpa_summary
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data (optional - for testing)
-- You can remove this section in production

-- Sample institution
INSERT INTO auth.users (id, email, raw_user_meta_data) VALUES 
  ('550e8400-e29b-41d4-a716-446655440001', 'admin@techuniversity.edu', '{"name": "Tech University", "role": "institution"}');

-- Sample student
INSERT INTO auth.users (id, email, raw_user_meta_data) VALUES 
  ('550e8400-e29b-41d4-a716-446655440002', 'student@example.com', '{"name": "John Doe", "role": "student"}');

-- Sample organizer
INSERT INTO auth.users (id, email, raw_user_meta_data) VALUES 
  ('550e8400-e29b-41d4-a716-446655440003', 'organizer@events.com', '{"name": "Event Masters", "role": "organizer"}');

-- Sample recruiter
INSERT INTO auth.users (id, email, raw_user_meta_data) VALUES 
  ('550e8400-e29b-41d4-a716-446655440004', 'recruiter@company.com', '{"name": "Jane Smith", "role": "recruiter"}');