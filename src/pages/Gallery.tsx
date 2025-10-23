import { useState } from "react";
import Navigation from "@/components/Navigation";
import ProjectCard, { Project } from "@/components/ProjectCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import floralImage from "@/assets/mood-floral.png";

// Sample project data
const projects: Project[] = [
  {
    id: "1",
    title: "Ethereal Bloom",
    category: "Physical",
    shortDescription: "A handcrafted art piece exploring organic forms and delicate textures",
    fullDescription: "Ethereal Bloom is a mixed-media artwork that combines traditional craftsmanship with modern aesthetic sensibilities. Each element is carefully chosen to create a harmonious balance between structure and fluidity.\n\nThe piece explores themes of growth, transformation, and the ephemeral nature of beauty. Through the use of natural materials and intricate detailing, it invites viewers to pause and appreciate the subtle complexities of organic design.",
    images: [floralImage, floralImage],
    tags: ["Art", "Handcrafted", "Mixed Media", "Organic"],
  },
  {
    id: "2",
    title: "Digital Sanctuary",
    category: "Digital",
    shortDescription: "An immersive web experience designed for mindfulness and reflection",
    fullDescription: "Digital Sanctuary is an interactive web application that creates a calming digital environment for users seeking moments of peace in their day.\n\nFeaturing smooth animations, ambient soundscapes, and intuitive interactions, this project demonstrates how digital spaces can support mental wellbeing. The design language draws from nature while maintaining a contemporary, minimalist aesthetic.",
    images: [floralImage],
    tags: ["Web Design", "UX/UI", "Interactive", "Wellness"],
  },
  {
    id: "3",
    title: "Flow State",
    category: "Mixed",
    shortDescription: "An interactive installation combining physical artifacts with digital projections",
    fullDescription: "Flow State bridges the gap between physical and digital realms through an immersive installation experience.\n\nVisitors interact with tangible objects that trigger corresponding digital responses, creating a seamless dialogue between the two mediums. The project explores how technology can enhance our connection to physical spaces and objects, rather than distancing us from them.",
    images: [floralImage, floralImage],
    tags: ["Installation", "Interactive", "Mixed Media", "Experiential"],
  },
  {
    id: "4",
    title: "Textured Narratives",
    category: "Physical",
    shortDescription: "A series of tactile designs exploring material storytelling",
    fullDescription: "Textured Narratives is a collection of pieces that use varied materials and surfaces to tell stories through touch and visual texture.\n\nEach piece in the series represents a different narrative, expressed through the careful selection and arrangement of fabrics, fibers, and found materials. The work invites both visual and tactile engagement, celebrating the multisensory nature of design.",
    images: [floralImage],
    tags: ["Textile", "Handcrafted", "Series", "Tactile"],
  },
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Digital", "Physical", "Mixed"];

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
