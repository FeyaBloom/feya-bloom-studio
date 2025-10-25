import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import ProjectCard from "@/components/ProjectCard";
import { Project } from "@/types/project";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Fetch published projects from database
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('published', true)
        .order('order_index', { ascending: true })
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Transform data to Project type
      return data.map(p => ({
        ...p,
        content: p.content as any,
        links: p.links as any
      })) as Project[];
    }
  });

  // Get unique categories from projects
  const categories = ["All", ...(projects 
    ? [...new Set(projects.map(p => p.category))]
    : []
  )];

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 space-y-4">
              <h1 className="text-6xl font-serif text-foreground">
                Project Gallery
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover my creative universe 
              </p>
            </div>

            <div className="mb-12 flex justify-center">
              <Tabs value={activeCategory} onValueChange={setActiveCategory}>
                <TabsList className="bg-card shadow-soft">
                  {categories.map((category) => (
                    <TabsTrigger 
                      key={category} 
                      value={category}
                      className="px-6"
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading projects...</p>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>

                {filteredProjects.length === 0 && (
                  <div className="text-center py-16">
                    <p className="text-muted-foreground text-lg">
                      No projects found in this category yet.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
