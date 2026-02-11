-- Update properties RLS policies to support role-based access control

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own properties" ON properties;
DROP POLICY IF EXISTS "Users can insert own properties" ON properties;
DROP POLICY IF EXISTS "Users can update own properties" ON properties;
DROP POLICY IF EXISTS "Users can delete own properties" ON properties;

-- New RBAC Policies for properties table

-- Admins can do everything
CREATE POLICY "Admins can view all properties" 
ON properties FOR SELECT 
USING (auth.jwt()->>'user_role' = 'admin');

CREATE POLICY "Admins can insert properties" 
ON properties FOR INSERT 
WITH CHECK (auth.jwt()->>'user_role' = 'admin');

CREATE POLICY "Admins can update all properties" 
ON properties FOR UPDATE 
USING (auth.jwt()->>'user_role' = 'admin');

CREATE POLICY "Admins can delete all properties" 
ON properties FOR DELETE 
USING (auth.jwt()->>'user_role' = 'admin');

-- Investors can view all properties but only manage their own
CREATE POLICY "Investors can view all properties" 
ON properties FOR SELECT 
USING (auth.jwt()->>'user_role' = 'investor');

CREATE POLICY "Investors can insert own properties" 
ON properties FOR INSERT 
WITH CHECK (
  auth.jwt()->>'user_role' = 'investor' AND 
  accountable_id = auth.uid()
);

CREATE POLICY "Investors can update own properties" 
ON properties FOR UPDATE 
USING (
  auth.jwt()->>'user_role' = 'investor' AND 
  accountable_id = auth.uid()
);

CREATE POLICY "Investors can delete own properties" 
ON properties FOR DELETE 
USING (
  auth.jwt()->>'user_role' = 'investor' AND 
  accountable_id = auth.uid()
);

-- Default users can only manage their own properties
CREATE POLICY "Default users can view own properties" 
ON properties FOR SELECT 
USING (
  auth.jwt()->>'user_role' = 'default' AND 
  accountable_id = auth.uid()
);

CREATE POLICY "Default users can insert own properties" 
ON properties FOR INSERT 
WITH CHECK (
  auth.jwt()->>'user_role' = 'default' AND 
  accountable_id = auth.uid()
);

CREATE POLICY "Default users can update own properties" 
ON properties FOR UPDATE 
USING (
  auth.jwt()->>'user_role' = 'default' AND 
  accountable_id = auth.uid()
);

CREATE POLICY "Default users can delete own properties" 
ON properties FOR DELETE 
USING (
  auth.jwt()->>'user_role' = 'default' AND 
  accountable_id = auth.uid()
);
