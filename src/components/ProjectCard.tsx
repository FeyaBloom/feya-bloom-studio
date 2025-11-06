import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Project, ContentBlock } from "@/types/project";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const renderContentBlock = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case "text":
        return (
          <p key={index} className="text-foreground leading-relaxed whitespace-pre-line">
            {block.content as string}
          </p>
        );
      
      case "image":
        return (
          <figure key={index} className="space-y-2">
            <img 
              src={block.content as string} 
              alt={block.caption || ""} 
              className="w-full rounded-lg object-cover"
            />
            {block.caption && (
              <figcaption className="text-sm text-muted-foreground text-center">
                {block.caption}
              </figcaption>
            )}
          </figure>
        );
      
      case "gallery":
        return (
          <div key={index} className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {(block.content as string[]).map((img, idx) => (
              <img 
                key={idx} 
                src={img} 
                alt="" 
                className="w-full aspect-square object-cover rounded-lg"
              />
            ))}
          </div>
        );
      
      case "video":
        return (
          <div key={index} className="aspect-video rounded-lg overflow-hidden">
            <iframe
              src={block.content as string}
              className="w-full h-full"
              allowFullScreen
              title={`Video ${index + 1}`}
            />
          </div>
        );
      
      case "quote":
        return (
          <blockquote 
            key={index} 
            className="border-l-4 border-primary pl-6 py-4 italic text-lg text-foreground"
          >
            {block.content as string}
          </blockquote>
        );
      
      case "button":
        return (
          <div key={index} className="flex justify-center">
            <Button asChild size="lg">
              <a href={block.href} target="_blank" rel="noopener noreferrer">
                {block.content as string}
              </a>
            </Button>
          </div>
        );
      
      default:
        return null;
    }
  };

  // Get cover image
  const getCoverImage = () => {
    if (project.cover_image) return project.cover_image;
    if (project.images && project.images.length > 0) return project.images[0];
    const imageBlock = project.content?.find(b => b.type === 'image');
    if (imageBlock) return imageBlock.content as string;
    return '/placeholder.svg';
  };

  // Get description
  const getDescription = () => {
    return project.short_description || '';
  };

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="group cursor-pointer rounded-xl overflow-hidden shadow-xl hover:shadow-elevated transition-smooth bg-card"
      >
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={getCoverImage()}
            alt={project.title}
            className="w-full h-full object-cover transition-smooth group-hover:scale-110"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="text-xs">
              {project.category}
            </Badge>
            {project.year && (
              <span className="text-xs text-muted-foreground">{project.year}</span>
            )}
          </div>
          <h3 className="text-2xl font-serif font-semibold mb-2 text-foreground">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {getDescription()}
          </p>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-serif">{project.title}</DialogTitle>
            <div className="flex items-center gap-3 text-sm text-muted-foreground pt-2">
              <Badge variant="secondary">{project.category}</Badge>
              {project.year && <span>{project.year}</span>}
            </div>
          </DialogHeader>

          <div className="space-y-8">
            {/* Cover Image */}
            {project.cover_image && (
              <img 
                src={project.cover_image} 
                alt={project.title}
                className="w-full aspect-video object-cover rounded-lg"
              />
            )}

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
            )}

            {/* Rich Content */}
            {project.content && project.content.length > 0 ? (
              <div className="space-y-6">
                {project.content.map((block, i) => renderContentBlock(block, i))}
              </div>
            ) : (
              // Fallback to legacy format
              project.full_description && (
                <p className="text-foreground leading-relaxed whitespace-pre-line">
                  {project.full_description}
                </p>
              )
            )}

            {/* Links */}
            {project.links && (project.links.demo || project.links.github || project.links.buy) && (
              <div className="flex flex-wrap gap-4 pt-6 border-t">
                {project.links.demo && (
                  <Button asChild>
                    <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                      View Demo
                    </a>
                  </Button>
                )}
                {project.links.github && (
                  <Button asChild variant="outline">
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                      GitHub
                    </a>
                  </Button>
                )}
                {project.links.buy && (
                  <Button asChild>
                    <a href={project.links.buy} target="_blank" rel="noopener noreferrer">
                      Purchase
                    </a>
                  </Button>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectCard;
