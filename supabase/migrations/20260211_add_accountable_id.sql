-- Add accountable_id column to properties table
ALTER TABLE properties ADD COLUMN IF NOT EXISTS accountable_id UUID REFERENCES auth.users(id) NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000';

-- Create index on accountable_id for faster user-specific queries
CREATE INDEX IF NOT EXISTS idx_properties_accountable_id ON properties(accountable_id);

-- Update existing rows to have a default accountable_id (you may want to update these manually)
UPDATE properties SET accountable_id = '00000000-0000-0000-0000-000000000000' WHERE accountable_id = '00000000-0000-0000-0000-000000000000';

-- Enable Row Level Security (RLS) if not already enabled
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own properties" ON properties;
DROP POLICY IF EXISTS "Users can insert own properties" ON properties;
DROP POLICY IF EXISTS "Users can update own properties" ON properties;
DROP POLICY IF EXISTS "Users can delete own properties" ON properties;

-- RLS Policies
-- Allow users to read their own properties
CREATE POLICY "Users can view own properties" 
ON properties FOR SELECT 
USING (auth.uid() = accountable_id);

-- Allow users to insert their own properties
CREATE POLICY "Users can insert own properties"
ON properties FOR INSERT
WITH CHECK (auth.uid() = accountable_id);

-- Allow users to update their own properties
CREATE POLICY "Users can update own properties"
ON properties FOR UPDATE
USING (auth.uid() = accountable_id);

-- Allow users to delete their own properties
CREATE POLICY "Users can delete own properties"
ON properties FOR DELETE
USING (auth.uid() = accountable_id);
