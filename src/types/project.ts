export interface ContentBlock {
  type: "text" | "image" | "video" | "quote" | "gallery" | "button";
  content: string | string[];
  caption?: string;
  href?: string;
}

export interface Project {
  id?: string;
  created_at?: string;
  updated_at?: string;
  title: string;
  main_category?: string;
  category: string;
  short_description?: string;
  cover_image?: string;
  year?: string;
  tags?: string[];
  content?: ContentBlock[];
  links?: {
    demo?: string;
    github?: string;
    buy?: string;
  };
  published: boolean;
  order_index?: number;
  
  // Legacy fields (for backward compatibility)
  full_description?: string;
  images?: string[];
}
