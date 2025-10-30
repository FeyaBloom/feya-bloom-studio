import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Brain, LeafyGreen, Hand } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import forestHero from "@/assets/forest-hero.png";

const Home = () => {
  const { ref: diffRef, inView: diffInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const differences = [
    {
      icon: Heart,
      title: 'No bullshit',
      description: "I don't make things just to make things. If it doesn't serve a purpose or bring beauty—it doesn't leave my studio.",
    },
    {
      icon: LeafyGreen,
      title: 'Rooted in nature',
      description: 'My passion about nature shows up in everything—from the herbs I write about to the colors I choose.',
    },
    {
      icon: Brain,
      title: 'Built for neurodivergent minds',
      description: "Because I have one. My tools aren't just pretty—they actually work.",
    },
    {
      icon: Hand,
      title: 'Handmade with intention',
      description: 'Every piece, whether digital or physical, carries intention. No mass production. No templates.',
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${forestHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-muted" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-7xl md:text-8xl font-script text-primary mb-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Feya Bloom Studio
            </h1>
            <p className="text-2xl md:text-3xl font-serif text-foreground animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
              Beauty that serves • Art that resonates
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
              Step into a world where nature, art and technology interwine to create designs that are as functional as they are beautiful. 
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

      {/* What Do You Actually Do Section */}
      <section className="py-24 bg-gradient-to-b from-muted to-background">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-4xl md:text-5xl font-serif text-gradient-feya mb-8">
              What do you actually do?
            </h2>
            <p className="text-xl text-foreground leading-relaxed">
              I make things that help people live more intentionally— whether it's a planner 
              that works for your brain, a piece of art that makes you stop and feel, or 
              knowledge that connects you to something older than us.
            </p>
            <div className="mt-8 space-y-2">
              <p className="text-2xl font-script text-violeta">
                Barcelona taught me that beauty and function aren't opposites.
              </p>
              <p className="text-2xl font-script text-violeta">
                They're dance partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes My Work Different Section */}
      <section ref={diffRef} className="py-24 px-6 relative overflow-hidden gradient-ethereal">
        <div className="container mx-auto px-6 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={diffInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-serif text-center text-gradient-feya mb-20"
          >
            What Makes My Work Different
          </motion.h2>

          <div className="max-w-4xl mx-auto relative">
            {/* Animated Timeline Line */}
            <svg className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none hidden md:block" viewBox="0 0 200 800" fill="none" preserveAspectRatio="xMidYMid meet">
              <motion.path
                d="M 100 50 C 20 180, 180 320, 100 450 C 20 580, 180 720, 100 800"
                stroke="url(#timeline-gradient)"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={diffInView ? { pathLength: 1 } : {}}
                transition={{ duration: 4, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="timeline-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#6B4FA3', stopOpacity: 1 }} />
                  <stop offset="50%" style={{ stopColor: '#4A5F8C', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#8BA888', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
            </svg>

            {/* Cards */}
            <div className="space-y-16 relative">
              {differences.map((item, index) => {
                const Icon = item.icon;
                const isEven = index % 2 === 0;
                
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: isEven ? -60 : 60, scale: 0.9 }}
                    animate={diffInView ? { opacity: 1, x: 0, scale: 1 } : {}}
                    transition={{ delay: 0.8 + index * 0.3, duration: 0.8, ease: "easeOut" }}
                    className={`relative flex items-center ${isEven ? 'md:justify-start' : 'md:justify-end'}`}
                  >
                    <div className="w-full md:w-1/2">
                      <div className="glass-card rounded-2xl p-6 shadow-soft hover:shadow-elevated hover:scale-105 transition-smooth">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="w-12 h-12 gradient-feya-bg rounded-full flex items-center justify-center">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-foreground font-serif">
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* How Does It Feel Section */}
      <section className="py-24 gradient-mystic relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-serif text-center mb-12 text-white">
              Everything I create begins with a question: 
              <span className="block mt-4 text-5xl md:text-6xl lg:text-7xl font-bold text-amber-50">
                How does this feel?
              </span>
              So what guides my work:
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-4 p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-elevated hover:shadow-[0_20px_50px_rgba(168,85,247,0.4)] transition-smooth hover:scale-105 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                <div className="text-5xl font-script bg-gradient-to-br from-primary via-background to-primary bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(168,85,247,0.8)]">
                  Utility
                </div>
                <p className="text-white/90">
                  Every creation serves a purpose, thoughtfully designed to enhance functionality
                </p>
              </div>
              
              <div className="text-center space-y-4 p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-elevated hover:shadow-[0_20px_50px_rgba(59,130,246,0.8)] transition-smooth hover:scale-105 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                <div className="text-5xl font-script bg-gradient-to-br from-secondary via-background to-secondary bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]">
                  Ergonomics
                </div>
                <p className="text-white/90">
                  Intuitive interactions that feel natural and effortless
                </p>
              </div>
              
              <div className="text-center space-y-4 p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-elevated hover:shadow-[0_20px_50px_rgba(34,197,94,0.4)] transition-smooth hover:scale-105 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                <div className="text-5xl font-script bg-gradient-to-br from-accent via-background to-accent bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(34,197,94,0.8)]">
                  Aesthetics
                </div>
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
        <div className="absolute inset-0 bg-gradient-to-br from-accent/40 via-transparent to-primary/20" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-5xl md:text-6xl font-serif text-secondary drop-shadow-lg">
              Have an idea in mind?
            </h2>
            <p className="text-xl text-secondary">
              Let's create something extraordinary together. Reach out today to start our journey! 
            </p>
            <Button asChild size="lg" className="shadow-elevated hover:shadow-[0_20px_50px_rgba(59,130,246,0.5)] transition-smooth bg-accent text-white hover:bg-secondary text-lg px-8 py-6">
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
