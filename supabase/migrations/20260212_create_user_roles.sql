-- Create user roles table
CREATE TABLE IF NOT EXISTS user_roles (
  user_id UUID REFERENCES auth.users(id) PRIMARY KEY,
  role TEXT NOT NULL CHECK (role IN ('admin', 'investor', 'default')),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create index on role for faster role-based queries
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON user_roles(role);

-- Create trigger to automatically update updated_at timestamp
CREATE TRIGGER update_user_roles_updated_at 
    BEFORE UPDATE ON user_roles 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_roles table
-- Users can view their own role
CREATE POLICY "Users can view own role" 
ON user_roles FOR SELECT 
USING (auth.uid() = user_id);

-- Users can insert their own role (typically handled by admin or system)
CREATE POLICY "Users can insert own role"
ON user_roles FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own role (typically handled by admin)
CREATE POLICY "Users can update own role"
ON user_roles FOR UPDATE
USING (auth.uid() = user_id);

-- Service role can manage all user roles
CREATE POLICY "Service role can manage all roles"
ON user_roles FOR ALL
USING (auth.jwt()->>'role' = 'service_role');

-- Function to get user role
CREATE OR REPLACE FUNCTION get_user_role(user_uuid UUID)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN (
    SELECT role 
    FROM user_roles 
    WHERE user_id = user_uuid
  );
END;
$$;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION get_user_role TO authenticated, anon, service_role;
