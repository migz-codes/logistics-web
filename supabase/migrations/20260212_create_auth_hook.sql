-- Create custom access token hook to add user role to JWT claims
CREATE OR REPLACE FUNCTION public.custom_access_token_hook(event jsonb)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  claims jsonb;
  user_role TEXT;
BEGIN
  -- Fetch the user role from the user_roles table
  SELECT role INTO user_role 
  FROM public.user_roles 
  WHERE user_id = (event->>'user_id')::uuid;

  -- Get existing claims
  claims := event->'claims';

  -- Add user role claim
  IF user_role IS NOT NULL THEN
    claims := jsonb_set(claims, '{user_role}', to_jsonb(user_role));
  ELSE
    -- Set default role if no role found
    claims := jsonb_set(claims, '{user_role}', '"default"');
  END IF;

  -- Update the 'claims' object in the original event
  event := jsonb_set(event, '{claims}', claims);

  -- Return the modified event
  RETURN event;
END;
$$;

-- Grant necessary permissions to supabase_auth_admin
GRANT USAGE ON SCHEMA public TO supabase_auth_admin;
GRANT EXECUTE ON FUNCTION public.custom_access_token_hook TO supabase_auth_admin;

-- Revoke from other roles for security
REVOKE EXECUTE ON FUNCTION public.custom_access_token_hook FROM authenticated, anon, public;

-- Grant permissions on user_roles table to supabase_auth_admin
GRANT ALL ON TABLE public.user_roles TO supabase_auth_admin;
REVOKE ALL ON TABLE public.user_roles FROM authenticated, anon, public;

-- Create policy for auth admin to read user roles
CREATE POLICY "Allow auth admin to read user roles" 
ON public.user_roles 
AS PERMISSIVE FOR SELECT 
TO supabase_auth_admin 
USING (true);

-- Create policy for auth admin to manage user roles
CREATE POLICY "Allow auth admin to manage user roles" 
ON public.user_roles 
AS PERMISSIVE FOR ALL 
TO supabase_auth_admin 
USING (true);
