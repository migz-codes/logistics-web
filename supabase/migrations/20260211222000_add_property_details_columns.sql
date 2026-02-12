-- Migration: Add property details columns
-- Date: 20240211

-- Add new columns to properties table
ALTER TABLE public.properties
  ADD COLUMN IF NOT EXISTS city TEXT,
  ADD COLUMN IF NOT EXISTS state TEXT,
  ADD COLUMN IF NOT EXISTS category TEXT,
  ADD COLUMN IF NOT EXISTS area NUMERIC(10, 2),
  ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'available',
  ADD COLUMN IF NOT EXISTS price NUMERIC(15, 2),
  ADD COLUMN IF NOT EXISTS address TEXT;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_properties_city ON public.properties(city);
CREATE INDEX IF NOT EXISTS idx_properties_state ON public.properties(state);
CREATE INDEX IF NOT EXISTS idx_properties_category ON public.properties(category);
CREATE INDEX IF NOT EXISTS idx_properties_status ON public.properties(status);

-- Add comments for documentation
COMMENT ON COLUMN public.properties.city IS 'City where the property is located';
COMMENT ON COLUMN public.properties.state IS 'State where the property is located';
COMMENT ON COLUMN public.properties.category IS 'Type/category of the property (e.g., apartment, house, land)';
COMMENT ON COLUMN public.properties.area IS 'Area of the property in square meters';
COMMENT ON COLUMN public.properties.status IS 'Current status of the property (e.g., available, sold, reserved)';
COMMENT ON COLUMN public.properties.price IS 'Price of the property per square meter';
COMMENT ON COLUMN public.properties.address IS 'Full address of the property (street, number)';