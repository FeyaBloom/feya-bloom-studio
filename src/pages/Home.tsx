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
      <section className="py-24 gradient-mystic relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-serif text-center mb-12 text-white">
              About the Studio
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-4 p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-elevated hover:shadow-[0_20px_50px_rgba(168,85,247,0.4)] transition-smooth hover:scale-105 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                <div className="text-5xl font-script text-primary drop-shadow-lg">Utility</div>
                <p className="text-white/90">
                  Every creation serves a purpose, thoughtfully designed to enhance functionality
                </p>
              </div>
              <div className="text-center space-y-4 p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-elevated hover:shadow-[0_20px_50px_rgba(236,72,153,0.4)] transition-smooth hover:scale-105 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                <div className="text-5xl font-script text-secondary drop-shadow-lg">Ergonomics</div>
                <p className="text-white/90">
                  Intuitive interactions that feel natural and effortless
                </p>
              </div>
              <div className="text-center space-y-4 p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-elevated hover:shadow-[0_20px_50px_rgba(34,197,94,0.4)] transition-smooth hover:scale-105 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                <div className="text-5xl font-script text-accent drop-shadow-lg">Aesthetics</div>
                <p className="text-white/90">
                  Beautiful designs that inspire and captivate the senses
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 gradient-aurora relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-primary/20" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-5xl md:text-6xl font-serif text-white drop-shadow-lg">
              Ready to create something beautiful?
            </h2>
            <p className="text-xl text-white/90">
              Let's collaborate on your next project
            </p>
            <Button asChild size="lg" className="shadow-elevated hover:shadow-[0_20px_50px_rgba(168,85,247,0.5)] transition-smooth bg-white text-primary hover:bg-white/90 text-lg px-8 py-6">
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
