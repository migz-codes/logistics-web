-- =====================================
-- 1. Create update_updated_at function
-- =====================================

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- =====================================
-- 2. Create user_roles table
-- =====================================


CREATE TABLE IF NOT EXISTS public.properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  accountable_id UUID REFERENCES auth.users(id),
  title TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_properties_accountable_id
ON public.properties(accountable_id);

CREATE TRIGGER update_properties_updated_at
BEFORE UPDATE ON public.properties
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE IF NOT EXISTS public.user_roles (
  user_id UUID REFERENCES auth.users(id) PRIMARY KEY,
  role TEXT NOT NULL CHECK (role IN ('admin', 'investor', 'default')),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);


-- =====================================
-- 3. Create trigger (NOW it works)
-- =====================================

DROP TRIGGER IF EXISTS update_user_roles_updated_at ON public.user_roles;

CREATE TRIGGER update_user_roles_updated_at
BEFORE UPDATE ON public.user_roles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();



-- ==============================
-- 4. Enable RLS
-- ==============================

ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;


-- ==============================
-- 5. RBAC Policies (Properties)
-- ==============================

-- Admins: full access
CREATE POLICY "Admins full access"
ON public.properties
FOR ALL
USING (auth.jwt()->>'user_role' = 'admin')
WITH CHECK (auth.jwt()->>'user_role' = 'admin');

-- Investors: read all, manage own
CREATE POLICY "Investors read all"
ON public.properties
FOR SELECT
USING (auth.jwt()->>'user_role' = 'investor');

CREATE POLICY "Investors manage own"
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

-- Default users: only own
CREATE POLICY "Default users manage own"
ON public.properties
FOR ALL
USING (
  auth.jwt()->>'user_role' = 'default'
  AND accountable_id = auth.uid()
)
WITH CHECK (
  auth.jwt()->>'user_role' = 'default'
  AND accountable_id = auth.uid()
);


-- ==============================
-- 6. Policies (User Roles)
-- ==============================

-- Users can view their own role
CREATE POLICY "Users can view own role"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

-- Service role can manage everything
CREATE POLICY "Service role manages roles"
ON public.user_roles
FOR ALL
USING (auth.jwt()->>'role' = 'service_role');


-- ==============================
-- 7. JWT Access Token Hook
-- ==============================

CREATE OR REPLACE FUNCTION public.custom_access_token_hook(event jsonb)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  claims jsonb;
  user_role TEXT;
BEGIN
  SELECT role INTO user_role
  FROM public.user_roles
  WHERE user_id = (event->>'user_id')::uuid;

  claims := event->'claims';

  IF user_role IS NOT NULL THEN
    claims := jsonb_set(claims, '{user_role}', to_jsonb(user_role));
  ELSE
    claims := jsonb_set(claims, '{user_role}', '"default"');
  END IF;

  event := jsonb_set(event, '{claims}', claims);

  RETURN event;
END;
$$;

GRANT USAGE ON SCHEMA public TO supabase_auth_admin;
GRANT EXECUTE ON FUNCTION public.custom_access_token_hook TO supabase_auth_admin;
REVOKE EXECUTE ON FUNCTION public.custom_access_token_hook FROM authenticated, anon, public;

GRANT ALL ON TABLE public.user_roles TO supabase_auth_admin;
REVOKE ALL ON TABLE public.user_roles FROM authenticated, anon, public;
