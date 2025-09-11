# Smart Student Hub - Supabase Setup Guide

## ⚠️ CRITICAL: Database Schema Must Be Applied First

**Before using the application, you MUST run the database schema in Supabase or you will get "Database error saving new user" errors.**

## ✅ Credentials Configured

Your Supabase credentials have been added to the project:
- **Project URL**: https://rzmifojibyhvvwwgmosv.supabase.co
- **Anon Key**: Configured in `.env` file

## 🗄️ Database Setup

### Step 1: Run the Database Schema (REQUIRED)

**This step is MANDATORY - the app will not work without it:**

1. **Go to your Supabase dashboard**: https://supabase.com/dashboard/project/rzmifojibyhvvwwgmosv
2. Navigate to **SQL Editor** in the left sidebar
3. **Copy the ENTIRE contents** of the `database-schema.sql` file from this project
4. **Paste it into the SQL Editor** and click **Run**
5. **Wait for all queries to complete successfully** (you should see green checkmarks)

This will create:
- All necessary tables (profiles, students, institutions, etc.)
- Row Level Security (RLS) policies for data protection
- Triggers for automatic user profile creation
- Sample data for testing

**If you skip this step, you will get "Database error saving new user" when trying to sign up.**

### Step 2: Configure Authentication

1. Go to **Authentication** > **Settings** in your Supabase dashboard
2. Under **Site URL**, add your development URL: `http://localhost:5173`
3. Under **Redirect URLs**, add: `http://localhost:5173/**`
4. **Email Confirmation**: Can be disabled for development (enable for production)

### Step 3: Test the Application

The application is now ready to use with:

#### Test Accounts (created by the schema):
- **Institution**: admin@techuniversity.edu
- **Student**: student@example.com  
- **Organizer**: organizer@events.com
- **Recruiter**: recruiter@company.com

*Note: You'll need to set passwords for these accounts through the Supabase Auth interface or create new accounts through the app.*

## 🔐 Security Features

### Row Level Security (RLS)
- Students can only see their own data
- Recruiters can only see public student profiles
- Institutions can only manage their own students
- Organizers can only manage their own events

### Role-Based Access
- Automatic role assignment during signup
- Role-specific dashboard routing
- Protected API endpoints based on user role

## 🚀 Production Deployment

For production:
1. Update redirect URLs in Supabase Auth settings
2. Enable email confirmation
3. Set up custom SMTP for emails
4. Configure proper backup policies
5. Set up monitoring and alerts

## 📊 Database Schema Overview

### Core Tables:
- `profiles` - User profiles with role information
- `students` - Student-specific data and privacy settings
- `institutions` - Educational institution information
- `event_organizers` - Event organizer profiles
- `recruiters` - Recruiter profiles

### Academic Data:
- `student_academic_records` - Individual course records
- `student_cgpa_summary` - Aggregated CGPA data
- `achievements` - Certificates, competitions, internships
- `events` - Organized events and competitions

### Key Features:
- UUID primary keys for security
- Automatic timestamp management
- Comprehensive RLS policies
- Foreign key relationships for data integrity