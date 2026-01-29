-- BitCense Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_role AS ENUM ('admin', 'client');
CREATE TYPE lead_status AS ENUM ('new', 'invited', 'active');
CREATE TYPE asset_status AS ENUM ('submitted', 'under_review', 'additional_info_needed', 'qualified', 'not_qualified');
CREATE TYPE asset_type AS ENUM ('real_estate', 'equipment', 'inventory', 'accounts_receivable', 'intellectual_property', 'other');

-- Leads table (form submissions from landing page)
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  asset_type asset_type NOT NULL,
  asset_value TEXT,
  location TEXT,
  message TEXT,
  status lead_status DEFAULT 'new' NOT NULL
);

-- Users table (extends Supabase auth.users)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  role user_role DEFAULT 'client' NOT NULL,
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL
);

-- Assets table (submitted assets for qualification)
CREATE TABLE assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type asset_type NOT NULL,
  description TEXT,
  estimated_value NUMERIC,
  location TEXT,
  status asset_status DEFAULT 'submitted' NOT NULL,
  feedback TEXT,
  internal_notes TEXT,
  score INTEGER CHECK (score >= 0 AND score <= 100),
  grade TEXT
);

-- Documents table (uploaded files for assets)
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  asset_id UUID NOT NULL REFERENCES assets(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER NOT NULL
);

-- Activity log table (asset status change history)
CREATE TABLE activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  asset_id UUID NOT NULL REFERENCES assets(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  details TEXT,
  old_value TEXT,
  new_value TEXT
);

-- Create indexes for better query performance
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_assets_user_id ON assets(user_id);
CREATE INDEX idx_assets_status ON assets(status);
CREATE INDEX idx_documents_asset_id ON documents(asset_id);
CREATE INDEX idx_activity_log_asset_id ON activity_log(asset_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_assets_updated_at
  BEFORE UPDATE ON assets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security Policies

-- Enable RLS on all tables
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

-- Leads policies
-- Anyone can insert (public form submission)
CREATE POLICY "Public can insert leads" ON leads
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Admins can view all leads
CREATE POLICY "Admins can view all leads" ON leads
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Admins can update leads
CREATE POLICY "Admins can update leads" ON leads
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Users policies
-- Users can view their own record
CREATE POLICY "Users can view own record" ON users
  FOR SELECT TO authenticated
  USING (id = auth.uid());

-- Admins can view all users
CREATE POLICY "Admins can view all users" ON users
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users u
      WHERE u.id = auth.uid()
      AND u.role = 'admin'
    )
  );

-- Admins can insert users
CREATE POLICY "Admins can insert users" ON users
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Service role can insert users (for invitations)
CREATE POLICY "Service role can insert users" ON users
  FOR INSERT TO service_role
  WITH CHECK (true);

-- Users can update their own record
CREATE POLICY "Users can update own record" ON users
  FOR UPDATE TO authenticated
  USING (id = auth.uid());

-- Assets policies
-- Users can view their own assets
CREATE POLICY "Users can view own assets" ON assets
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Admins can view all assets
CREATE POLICY "Admins can view all assets" ON assets
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Users can insert their own assets
CREATE POLICY "Users can insert own assets" ON assets
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Users can update their own assets (limited fields handled in app)
CREATE POLICY "Users can update own assets" ON assets
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

-- Admins can update all assets
CREATE POLICY "Admins can update all assets" ON assets
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Documents policies
-- Users can view their own documents
CREATE POLICY "Users can view own documents" ON documents
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Admins can view all documents
CREATE POLICY "Admins can view all documents" ON documents
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Users can insert their own documents
CREATE POLICY "Users can insert own documents" ON documents
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Users can delete their own documents
CREATE POLICY "Users can delete own documents" ON documents
  FOR DELETE TO authenticated
  USING (user_id = auth.uid());

-- Admins can delete any documents
CREATE POLICY "Admins can delete any documents" ON documents
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Activity log policies
-- Users can view activity for their own assets
CREATE POLICY "Users can view own asset activity" ON activity_log
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM assets
      WHERE assets.id = activity_log.asset_id
      AND assets.user_id = auth.uid()
    )
  );

-- Admins can view all activity
CREATE POLICY "Admins can view all activity" ON activity_log
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Authenticated users can insert activity (for their own assets)
CREATE POLICY "Users can insert activity for own assets" ON activity_log
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM assets
      WHERE assets.id = activity_log.asset_id
      AND assets.user_id = auth.uid()
    )
    OR
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Storage bucket for documents
-- Run this separately in Supabase Storage settings or via SQL:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', false);

-- Storage policies
-- CREATE POLICY "Users can upload own documents" ON storage.objects
--   FOR INSERT TO authenticated
--   WITH CHECK (bucket_id = 'documents' AND (storage.foldername(name))[1] = auth.uid()::text);

-- CREATE POLICY "Users can view own documents" ON storage.objects
--   FOR SELECT TO authenticated
--   USING (bucket_id = 'documents' AND (storage.foldername(name))[1] = auth.uid()::text);

-- CREATE POLICY "Admins can view all documents" ON storage.objects
--   FOR SELECT TO authenticated
--   USING (
--     bucket_id = 'documents' AND
--     EXISTS (
--       SELECT 1 FROM users
--       WHERE users.id = auth.uid()
--       AND users.role = 'admin'
--     )
--   );

-- CREATE POLICY "Users can delete own documents" ON storage.objects
--   FOR DELETE TO authenticated
--   USING (bucket_id = 'documents' AND (storage.foldername(name))[1] = auth.uid()::text);
