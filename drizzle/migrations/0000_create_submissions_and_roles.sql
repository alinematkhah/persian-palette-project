CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role public.app_role NOT NULL,
    UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

CREATE TABLE public.submissions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    type text NOT NULL CHECK (type IN ('pre_register', 'ads', 'cooperation')),
    name text NOT NULL,
    phone text,
    business text,
    field text,
    contact text,
    message text,
    created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.submissions TO anon;
GRANT SELECT ON public.submissions TO authenticated;
GRANT ALL ON public.submissions TO service_role;

ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anonymous users can submit forms"
ON public.submissions
FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Admins can read all submissions"
ON public.submissions
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));