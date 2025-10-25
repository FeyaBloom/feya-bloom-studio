-- Add new columns for rich content
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS cover_image TEXT,
ADD COLUMN IF NOT EXISTS year TEXT,
ADD COLUMN IF NOT EXISTS content JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS links JSONB DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS order_index INTEGER DEFAULT 0;

-- Create index for ordering
CREATE INDEX IF NOT EXISTS idx_projects_order ON projects(order_index);

-- Comment explaining the schema
COMMENT ON COLUMN projects.content IS 'Array of content blocks with type, content, caption, href fields';
COMMENT ON COLUMN projects.links IS 'Object with demo, github, buy URLs';
COMMENT ON COLUMN projects.cover_image IS 'Main cover image URL for project cards';