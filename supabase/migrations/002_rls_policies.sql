-- BitCense Connect RLS Policies
-- Run this AFTER 001_initial_schema.sql

-- USERS POLICIES
CREATE POLICY "Users can read own record" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own record" ON public.users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can read all users" ON public.users FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Service role can insert users" ON public.users FOR INSERT WITH CHECK (true);

-- LEADS POLICIES
CREATE POLICY "Anyone can insert leads" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can read all leads" ON public.leads FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can update leads" ON public.leads FOR UPDATE
  USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

-- ASSETS POLICIES
CREATE POLICY "Users can read own assets" ON public.assets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own assets" ON public.assets FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own assets" ON public.assets FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can read all assets" ON public.assets FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can update all assets" ON public.assets FOR UPDATE
  USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

-- DOCUMENTS POLICIES
CREATE POLICY "Users can read own documents" ON public.documents FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.assets WHERE assets.id = documents.asset_id AND assets.user_id = auth.uid()));
CREATE POLICY "Users can insert own documents" ON public.documents FOR INSERT
  WITH CHECK (auth.uid() = user_id AND EXISTS (SELECT 1 FROM public.assets WHERE assets.id = asset_id AND assets.user_id = auth.uid()));
CREATE POLICY "Users can delete own documents" ON public.documents FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "Admins can read all documents" ON public.documents FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can update all documents" ON public.documents FOR UPDATE
  USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

-- ACTIVITY LOG POLICIES
CREATE POLICY "Users can read own visible activity" ON public.activity_log FOR SELECT
  USING (is_client_visible = true AND EXISTS (SELECT 1 FROM public.assets WHERE assets.id = activity_log.asset_id AND assets.user_id = auth.uid()));
CREATE POLICY "Users can insert own activity" ON public.activity_log FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM public.assets WHERE assets.id = asset_id AND assets.user_id = auth.uid()));
CREATE POLICY "Admins can read all activity" ON public.activity_log FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can insert activity" ON public.activity_log FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

-- STORAGE POLICIES
CREATE POLICY "Users can upload to own folder" ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can read own docs" ON storage.objects FOR SELECT
  USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can delete own docs" ON storage.objects FOR DELETE
  USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Admins can read all storage" ON storage.objects FOR SELECT
  USING (bucket_id = 'documents' AND EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));
