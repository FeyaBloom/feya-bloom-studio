import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import heroImage from "@/assets/mood-aurora.png";
import { Palette, Sparkles, Lightbulb, Heart, Compass, Layers, Home } from "lucide-react";

const About = () => {
  const directions = [
    {
      icon: Palette,
      title: "Original Art",
      description: "Paintings & Sculptures",
    },
    {
      icon: Sparkles,
      title: "Wearable Art",
      description: "Artisan pieces with emotional depth",
    },
    {
      icon: Lightbulb,
      title: "Digital Tools",
      description: "ADHD-friendly systems for creative entrepreneurs",
    },
    {
      icon: Heart,
      title: "Ancestral Wisdom",
      description: "Wellness practices & timeless knowledge",
    },
  ];

  const values = [
    {
      icon: Compass,
      title: "Purpose",
      description: "Every piece serves a purpose, blending intuition with intentional design",
    },
    {
      icon: Layers,
      title: "Harmony",
      description: "Visual beauty meets tangible usefulness",
    },
    {
      icon: Heart,
      title: "Authenticity",
      description: "Custom creations that become extensions of your authentic self",
    },
  ];

  const process = [
    {
      step: "01",
      title: "Feel",
      description: "Understanding the emotional core",
    },
    {
      step: "02",
      title: "Design",
      description: "Blending intuition with intention",
    },
    {
      step: "03",
      title: "Craft",
      description: "Handmade with care and precision",
    },
    {
      step: "04",
      title: "Deliver",
      description: "Pieces that enhance your world",
    },
  ];

  const offerings = [
    {
      title: "Art & Sculpture",
      description: "Original pieces that speak to the unspoken",
      category: "Art",
    },
    {
      title: "Wearable Art",
      description: "Clothing as creative expression",
      category: "Wearable",
    },
    {
      title: "Business Systems",
      description: "Tools that support natural rhythms",
      category: "Digital",
    },
    {
      title: "Home Decor",
      description: "Unique pieces that resonate",
      category: "Decor",
    },
    {
      title: "Wellness & Wisdom",
      description: "Knowledge that grounds you",
      category: "Wellness",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 gradient-mystic opacity-30" />
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h1 className="text-5xl md:text-6xl font-script text-foreground">
                Feya Bloom
              </h1>
              <h2 className="text-2xl md:text-3xl font-serif text-primary">
                Multidisciplinary Artist & Designer
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Creating handmade art, functional tools, and meaningful objects for those seeking beauty with purpose.
              </p>
            </div>
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
              <img 
                src={heroImage} 
                alt="Feya Bloom Studio" 
                className="rounded-2xl shadow-elevated w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <blockquote className="text-3xl md:text-4xl font-serif text-foreground italic mb-6">
              "Everything I create begins with a question:<br />
              <span className="text-primary">how does this feel?</span>"
            </blockquote>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {directions.map((direction, index) => (
              <Card 
                key={direction.title}
                className="group hover:shadow-elevated transition-smooth animate-in fade-in slide-in-from-bottom-4 duration-700"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <direction.icon className="w-12 h-12 mx-auto mb-4 text-primary group-hover:scale-110 transition-smooth" />
                  <h3 className="text-xl font-serif font-semibold mb-2">
                    {direction.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {direction.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-serif font-bold text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            What Drives Me
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={value.title}
                className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-serif font-semibold">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-serif font-bold text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            From Vision to Reality
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/50 via-secondary/50 to-accent/50" style={{ top: '4rem' }} />
            
            {process.map((step, index) => (
              <div 
                key={step.title}
                className="relative animate-in fade-in slide-in-from-bottom-4 duration-700"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground text-xl font-bold relative z-10 shadow-soft">
                    {step.step}
                  </div>
                  <h3 className="text-2xl font-serif font-semibold">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offerings Grid */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-serif font-bold text-center mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            What I Create
          </h2>
          <p className="text-center text-muted-foreground mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            Each piece I make serves a purpose, blending intuition with intentional design and beauty with usefulness
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offerings.map((offering, index) => (
              <Link
                key={offering.title}
                to={`/gallery?category=${offering.category}`}
                className="group"
              >
                <Card className="h-full hover:shadow-elevated transition-smooth animate-in fade-in slide-in-from-bottom-4 duration-700"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <h3 className="text-xl font-serif font-semibold mb-2 group-hover:text-primary transition-smooth">
                      {offering.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {offering.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto max-w-4xl text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-4xl font-serif font-bold mb-6">
            Ready to bring something meaningful into your world?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            What we surround ourselves with shapes our daily experience. My work invites you to feel genuinely seen and supported.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/contact">Get in Touch</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/gallery">View Gallery</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
