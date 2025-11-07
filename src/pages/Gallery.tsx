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
  Feather,
  Palette,
  Waves,
  Shapes, 
  Wand
} from "lucide-react";

const Gallery = () => {
  const [activeMainCategory, setActiveMainCategory] = useState<string | null>(null);
  const [activeSubCategory, setActiveSubCategory] = useState<string>("All");

  // Хуки для карусели
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center", startIndex: 3 });
  const [selectedIndex, setSelectedIndex] = useState(3);

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

  // Filter projects by main category first
  const mainCategoryProjects = activeMainCategory
    ? projects.filter(p => p.main_category === activeMainCategory)
    : projects;

  // Get unique subcategories from filtered projects
  const subCategories = ["All", ...(mainCategoryProjects 
    ? [...new Set(mainCategoryProjects.map(p => p.category))]
    : []
  )];

  // Filter by subcategory
  const filteredProjects = activeSubCategory === "All" 
    ? mainCategoryProjects 
    : mainCategoryProjects.filter(project => project.category === activeSubCategory);

  // Handle card click - set main category and scroll to projects
  const handleCreationClick = (mainCategory: string) => {
    setActiveMainCategory(mainCategory);
    setActiveSubCategory("All");
    
    // Scroll to projects section
    const projectsSection = document.querySelector('#projects-section');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const creations = [
    { icon: Waves, title: "Fiber Arts", description: "Threads, textiles & wearables" },
    { icon: Shapes, title: "Tactile Dreams", description: "Sculpture & mixed media" },
    { icon: Palette, title: "Visual Works", description: "Paintings, illustrations & photography" },
    { icon: Wand, title: "Digital Experiences", description: "Apps, tools, websites & code" },
    { icon: Feather, title: "Written Worlds", description: "Books, essays & poetry" },
  ];

  const categoryDescriptions: Record<string, string> = {
    "Fiber Arts": "Where ancient craft meets contemporary vision. Each piece woven, stitched, or knotted with intention—wearable art that tells a story.",
    "Tactile Dreams": "Dreams you can hold. Sculptural objects and art that invite touch, contemplation, and connection—each piece a tangible meditation.",
    "Visual Works": "Two-dimensional worlds that hold depth. From canvas to screen, images that capture the delicate dance between human experience and wild nature.",
    "Digital Experiences": "Technology with empathy. Apps and digital tools designed for minds that work differently—where functionality feels like magic, not friction.",
    "Written Worlds": "Words that breathe. Stories and thoughts in long form—for those who still believe in the magic of reading."
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section with Forest Background */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${forestHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-6xl mx-auto text-center space-y-3 md:space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-foreground animate-in fade-in slide-in-from-bottom-4 duration-1000 px-4">
              Project Gallery
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200 px-4">
              Discover my creative universe 
            </p>
            
            
          </div>
        </div>
      </section>

      {/* What I Create: Carousel section */}
      <section ref={ref} className="pt-6 md:pt-12 px-4 md:px-6 bg-background overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-primary font-bold text-center mb-6 md:mb-8 px-4"
          >
            What I Create
          </motion.h2>
                     
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-primary text-center mb-6 md:mb-8 px-4">        
            Each piece blends intuition with intentional design, beauty with usefulness
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
            className="relative py-6 md:py-12"
          >
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {creations.map((item, index) => {
                  const Icon = item.icon;
                  const isSelected = index === selectedIndex;
                  const isActiveCategory = activeMainCategory === item.title;
                  return (
                    <div key={item.title} className="flex-shrink-0 flex-grow-0 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 px-2 md:px-4 my-4">
                      <motion.div
                        animate={{
                          scale: isSelected ? 1 : 0.8,
                          opacity: isSelected ? 1 : 0.7,
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        onClick={() => handleCreationClick(item.title)}
                        className={`card-surface rounded-3xl p-4 md:p-6 lg:p-8 h-full flex flex-col items-center text-center cursor-pointer transition-all hover:scale-105 ${
                          isActiveCategory ? 'ring-2 ring-primary shadow-lg' : ''
                        }`}
                      >
                        <div className="relative mb-4 md:mb-6">
                          <div className="w-12 h-12 md:w-16 md:h-16 gradient-feya rounded-2xl flex items-center justify-center">
                            <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                          </div>
                        </div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-semibold mb-2">{item.title}</h3>
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl flex-grow font-body">{item.description}</p>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full px-0 md:px-2">
              <button onClick={scrollPrev} className="carousel-nav w-10 h-10 md:w-12 md:h-12" aria-label="Previous">
                <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <button onClick={scrollNext} className="carousel-nav w-10 h-10 md:w-12 md:h-12" aria-label="Next">
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section id="projects-section" className="py-6 md:py-12 px-4 md:px-6 bg-white">
        <div className="container mx-auto max-w-6xl mb-6">
          {activeMainCategory && (
            <div className="text-center mb-4">
              <h2 className="text-2xl md:text-3xl font-serif text-primary font-bold mb-2">
                {activeMainCategory}
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-4 px-4">
                {categoryDescriptions[activeMainCategory]}
              </p>
              <button
                onClick={() => {
                  setActiveMainCategory(null);
                  setActiveSubCategory("All");
                }}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                ← Back to all categories
              </button>
            </div>
          )}

          {(activeMainCategory ? subCategories.length > 2 : subCategories.length > 1) && (
            <div className="flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300 px-4 pb-4">
              <Tabs value={activeSubCategory} onValueChange={setActiveSubCategory}>
                <TabsList className="bg-card/80 backdrop-blur-sm shadow-xl flex-wrap h-auto gap-2 p-2">
                  {subCategories.map((category) => (
                    <TabsTrigger 
                      key={category} 
                      value={category}
                      className="px-3 md:px-6 text-xs md:text-sm"
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          )}
        </div>

        <div className="container mx-auto max-w-6xl">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading projects...</p>
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>

              {filteredProjects.length === 0 && (
                <div className="text-center py-12 md:py-16">
                  <p className="text-muted-foreground text-base md:text-lg px-4">
                    🌸 COMING SOON 🌸 
                  </p>
                  <p className="text-muted-foreground text-base md:text-lg px-4">
                    Watch this space bloom
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
