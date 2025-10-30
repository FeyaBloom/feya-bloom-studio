import { useState, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import ProjectCard from "@/components/ProjectCard";
import Footer from "@/components/Footer";
import { Project } from "@/types/project";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import forestHero from "@/assets/forest-hero.png";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import useEmblaCarousel from "embla-carousel-react";
import { 
  ArrowLeft, 
  ArrowRight,
  Code,
  Palette,
  FileText,
  Home,
  Smartphone,
  Globe,
} from "lucide-react";

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Хуки для карусели
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Функции навигации карусели
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  // Отслеживание текущего слайда
  useEffect(() => {
    const api = emblaApi;
    if (!api) return;
    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    api.on("select", onSelect);
    onSelect();
    return () => {
      api.off("select", onSelect);
    };
  }, [emblaApi]);

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

  const creations = [
    { icon: Code, title: "Art & Sculpture", description: "Digital and physical art pieces that spark joy" },
    { icon: Palette, title: "Wearable Art", description: "Fashion that tells a story" },
    { icon: FileText, title: "Business Systems", description: "Streamlined workflows that actually work" },
    { icon: Home, title: "Home Decor", description: "Spaces that feel like home" },
    { icon: Smartphone, title: "Wellness & Wisdom", description: "Tools for mindful living" },
    { icon: Globe, title: "Websites", description: "Digital experiences that delight" },
  ];

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

      {/* What I Create: Carousel section */}
      <section ref={ref} className="pt-20 px-6 bg-white overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-5xl font-serif text-primary font-bold text-center mb-8"
          >
            What I Create
          </motion.h2>
                     
          <p className="text-2xl md:text-2xl text-primary text-center mb-8">        
            Each piece blends intuition with intentional design, beauty with usefulness
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
            className="relative py-20"
          >
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {creations.map((item, index) => {
                  const Icon = item.icon;
                  const isSelected = index === selectedIndex;
                  return (
                    <div key={item.title} className="flex-shrink-0 flex-grow-0 basis-full md:basis-1/3 lg:basis-1/4 px-4">
                      <motion.div
                        animate={{
                          scale: isSelected ? 1 : 0.8,
                          opacity: isSelected ? 1 : 0.7,
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="card-surface rounded-3xl p-8 h-full flex flex-col items-center text-center"
                      >
                        <div className="relative mb-6">
                          <div className="w-16 h-16 gradient-feya rounded-2xl flex items-center justify-center">
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                        </div>
                        <h3 className="text-4xl font-serif font-semibold mb-2">{item.title}</h3>
                        <p className="text-xl flex-grow font-body">{item.description}</p>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full px-0">
              <button onClick={scrollPrev} className="carousel-nav">
                <ArrowLeft />
              </button>
              <button onClick={scrollNext} className="carousel-nav">
                <ArrowRight />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section className="py-24 px-6 bg-background">
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
