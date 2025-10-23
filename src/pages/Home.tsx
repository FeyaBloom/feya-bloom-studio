import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import forestHero from "@/assets/forest-hero.png";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${forestHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-7xl md:text-8xl font-script text-primary mb-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Feya Bloom Studio
            </h1>
            <p className="text-2xl md:text-3xl font-serif text-foreground animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
              Creating beauty through design
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
              We craft projects that seamlessly blend utility, ergonomics, and aesthetics—
              spanning both digital and physical realms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
              <Button asChild size="lg" className="gap-2 shadow-soft hover:shadow-elevated transition-smooth">
                <Link to="/gallery">
                  Explore Gallery
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-gradient-ethereal">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-serif text-center mb-12 text-foreground">
              About the Studio
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-4 p-6 rounded-xl bg-card shadow-soft">
                <div className="text-4xl font-script text-primary">Utility</div>
                <p className="text-muted-foreground">
                  Every creation serves a purpose, thoughtfully designed to enhance functionality
                </p>
              </div>
              <div className="text-center space-y-4 p-6 rounded-xl bg-card shadow-soft">
                <div className="text-4xl font-script text-secondary">Ergonomics</div>
                <p className="text-muted-foreground">
                  Intuitive interactions that feel natural and effortless
                </p>
              </div>
              <div className="text-center space-y-4 p-6 rounded-xl bg-card shadow-soft">
                <div className="text-4xl font-script text-accent">Aesthetics</div>
                <p className="text-muted-foreground">
                  Beautiful designs that inspire and captivate the senses
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-serif text-foreground">
              Ready to create something beautiful?
            </h2>
            <p className="text-lg text-muted-foreground">
              Let's collaborate on your next project
            </p>
            <Button asChild size="lg" className="shadow-soft hover:shadow-elevated transition-smooth">
              <Link to="/contact">Start a Conversation</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
