-- Add main_category column to projects table for two-level category system
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS main_category text;

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_projects_main_category ON public.projects(main_category);

-- Update existing projects to set main_category based on category
-- This is a temporary mapping, you can adjust categories later in the admin panel
UPDATE public.projects 
SET main_category = CASE 
  WHEN category ILIKE '%fiber%' OR category ILIKE '%textile%' OR category ILIKE '%macrame%' THEN 'Fiber Arts'
  WHEN category ILIKE '%sculpt%' OR category ILIKE '%mixed%' THEN 'Tactile Dreams'
  WHEN category ILIKE '%paint%' OR category ILIKE '%photo%' OR category ILIKE '%visual%' OR category ILIKE '%illustration%' THEN 'Visual Works'
  WHEN category ILIKE '%digital%' OR category ILIKE '%web%' OR category ILIKE '%app%' OR category ILIKE '%code%' THEN 'Digital Experiences'
  WHEN category ILIKE '%writ%' OR category ILIKE '%book%' OR category ILIKE '%poetry%' THEN 'Written Worlds'
  ELSE 'Visual Works'
END
WHERE main_category IS NULL;