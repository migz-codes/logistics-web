-- Migration: Update investor policies to only see owned properties
-- Date: 20240211

-- Drop existing investor policies
DROP POLICY IF EXISTS "Investors read all" ON public.properties;
DROP POLICY IF EXISTS "Investors manage own" ON public.properties;

-- Create new policy: Investors can only read and manage their own properties
CREATE POLICY "Investors manage own properties"
ON public.properties
FOR ALL
USING (
  auth.jwt()->>'user_role' = 'investor'
  AND accountable_id = auth.uid()
)
WITH CHECK (
  auth.jwt()->>'user_role' = 'investor'
  AND accountable_id = auth.uid()
);