import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import ProjectCard from "@/components/ProjectCard";
import Footer from "@/components/Footer";
import { Project } from "@/types/project";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import forestHero from "@/assets/forest-hero.png";

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
      
  {/* Hero Section with Forest Background */}
  <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${forestHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto text-center space-y-4">
            <h1 className="text-6xl md:text-7xl font-serif text-foreground animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Project Gallery
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
              Discover my creative universe 
            </p>
            
            <div className="flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
              <Tabs value={activeCategory} onValueChange={setActiveCategory}>
                <TabsList className="bg-card/80 backdrop-blur-sm shadow-soft">
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
          </div>
        </div>
      </section>

      {/* Projects Grid Section - NO BACKGROUND */}
      <section className="py-4 px-6 bg-background">
        <div className="container mx-auto max-w-6xl">
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
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;