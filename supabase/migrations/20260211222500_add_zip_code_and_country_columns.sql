-- Migration: Add zip_code and country columns
-- Date: 20260211

-- Add zip_code and country columns to properties table
ALTER TABLE public.properties
  ADD COLUMN IF NOT EXISTS zip_code TEXT,
  ADD COLUMN IF NOT EXISTS country TEXT;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_properties_zip_code ON public.properties(zip_code);
CREATE INDEX IF NOT EXISTS idx_properties_country ON public.properties(country);

-- Add comments for documentation
COMMENT ON COLUMN public.properties.zip_code IS 'ZIP/Postal code of the property';
COMMENT ON COLUMN public.properties.country IS 'Country where the property is located';