import React, { useCallback, useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import heroImage from "@/assets/mood-aurora.png";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import useEmblaCarousel from "embla-carousel-react";
import {
  Heart,
  Hand,
  Brain,
  Home,
  LeafyGreen,
  Coffee,
  Moon,
  Music,
  BookOpen,
  Brush,
  Code,
  Palette,
  FileText,
  Smartphone,
  Globe,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

type Fact = {
  icon: React.ComponentType<any>;
  text: string;
  backText: string;
  initialPos: { x: number; y: number };
};

/* FunFactsSection + FactCard components */
const FunFactsSection: React.FC<{ facts: Fact[] }> = ({ facts }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.18 });
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <section ref={ref} className="relative">
      <div className="text-center mb-8">
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-5xl font-serif text-accent font-bold mb-4">
          Random Things About Me
        </motion.h2>
        <p className="text-accent text-3xl md:text-2xl font-body">because we're all 27% weird</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.08 }} className="flex justify-center mb-8">                       
        <Button onClick={() => setIsRevealed(!isRevealed)} size="lg" className="gap-2 shadow-soft hover:shadow-elevated transition-smooth bg-accent">
          {isRevealed ? "Hide them!" : "Take a look"}
        </Button>
      </motion.div>

      <div className="relative h-[400px] w-full flex items-center justify-center">
        {facts.map((fact, i) => (
          <FactCard key={i} fact={fact} index={i} inView={inView} isRevealed={isRevealed} />
        ))}
      </div>
    </section>
  );
};

const FactCard: React.FC<{ fact: Fact; index: number; inView: boolean; isRevealed: boolean }> = ({ fact, index, inView, isRevealed }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const Icon = fact.icon;

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{ perspective: 1000 }}
      initial={{ opacity: 0, scale: 0.9, x: 0, y: 0 }}
      animate={
        inView
          ? {
              opacity: 0.9,
              scale: 1,
              x: isRevealed ? fact.initialPos.x : 0,
              y: isRevealed ? fact.initialPos.y : 0,
            }
          : {}
      }
      transition={{ type: "spring", stiffness: 90, damping: 12, delay: index * 0.06 }}
      onClick={(e) => {
        e.stopPropagation();
        setIsFlipped((s) => !s);
      }}
    >
      <motion.div
        className="relative w-64 h-36"
        style={{ transformStyle: "preserve-3d" as const }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Front */}
        <div className="absolute w-full h-full" style={{ backfaceVisibility: "hidden" as const }}>
          <div className="glass-card rounded-2xl p-4 h-full flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 gradient-mystic rounded-xl flex items-center justify-center flex-shrink-0">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <p className="text-gray-700 text-sm font-body">{fact.text}</p>
          </div>
        </div>

        {/* Back */}
        <div className="absolute w-full h-full" style={{ backfaceVisibility: "hidden" as const, transform: "rotateY(180deg)" }}>
          <div className="rounded-2xl p-4 h-full flex items-center justify-center gradient-mystic">
            <p className="text-white font-semibold text-center text-md font-body">{fact.backText}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const About: React.FC = () => {
  const directions = [
    {
      icon: Brush,
      title: "Visual Storytelling",
      description: "Painting, sculpture & wearables",
    },
    {
      icon: Brain,
      title: "Functional Design",
      description: "ADHD-friendly systems",
    },
    {
      icon: LeafyGreen,
      title: "Ancestral Wisdom",
      description: "Catalan nature-related traditions",
    },
  ];

  const values = [
    {
      icon: Hand,
      title: "No bullshit",
      description:
        "I don't make things just to make things. If it doesn't serve a purpose or bring beauty—it doesn't leave my studio.",
    },
    {
      icon: LeafyGreen,
      title: "Rooted in nature",
      description:
        "My passion about nature shows up in everything—from the herbs I write about to the colors I choose.",
    },
    {
      icon: Brain,
      title: "Built for neurodivergent minds",
      description: "Because I have one. My tools aren't just pretty—they actually work.",
    },
    {
      icon: Heart,
      title: "Handmade with intention",
      description: "Every piece, whether digital or physical, carries intention. No mass production. No templates.",
    },
  ];

  const beliefs = [
    { text: 'Keeping things functional', rotation: -3, scale: 1.1 },
    { text: 'Systems should support users', rotation: 2, scale: 1 },
    { text: 'Accessible design is not "extra work"', rotation: -5, scale: 1.2 },
    { text: 'AI is the spotlight, not the guidance', rotation: 4, scale: 0.9 },
    { text: 'What we surround ourselves with matters', rotation: -1, scale: 1.1 },
  ];

  const funFactsArr: Fact[] = [
    {
      icon: Coffee,
      text: "Herbal tea addict (it's basically my personality now)",
      backText: "It's a hot bean water ritual.",
      initialPos: { y: -60, x: -150 },
    },
    {
      icon: Music,
      text: "Night owl pretending to be a morning person",
      backText: "My best ideas arrive after midnight.",
      initialPos: { y: 70, x: 100 },
    },
    {
      icon: BookOpen,
      text: "Can't pass a craft store without buying at least one thing",
      backText: "My yarn collection is getting out of hand.",
      initialPos: { y: -30, x: 150 },
    },
    {
      icon: Globe,
      text: "Obsessively curious about how things work",
      backText: "...and taking them apart to find out.",
      initialPos: { y: 30, x: -120 },
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

  const creations = [
    { icon: Code, title: "Art & Sculpture", description: "Digital and physical art pieces that spark joy" },
    { icon: Palette, title: "Wearable Art", description: "Fashion that tells a story" },
    { icon: FileText, title: "Business Systems", description: "Streamlined workflows that actually work" },
    { icon: Home, title: "Home Decor", description: "Spaces that feel like home" },
    { icon: Smartphone, title: "Wellness & Wisdom", description: "Tools for mindful living" },
    { icon: Globe, title: "Websites", description: "Digital experiences that delight" },
  ];

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [refBeliefs, inViewBeliefs] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-32 px-6 overflow-hidden bg-hero-soft">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-1 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-2 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 font-quicksand">
              <div className="inline-block">
                <h1 className="text-7xl md:text-8xl font-script text-primary mb-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                  Hi there, I'm Feya
                </h1>
                <div className="h-1 w-32 gradient-feya rounded-full" />
              </div>

              <p className="text-2xl font-serif leading-relaxed text-lead">
                I create for minds that won't fit the mold—
                <br />and hearts that refuse to settle.
              </p>

              <p className="text-lg leading-relaxed font-body text-muted-foreground">
                Working from Barcelona, where I blend art, function,
                and timeless wisdom into things that actually matter.
              </p>

              <div className="flex gap-4 pt-4">
                <Button asChild size="lg" className="btn-primary shadow-lg font-quicksand">
                  <Link to="/contact">Start a Project</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="btn-outline font-quicksand">
                  <Link to="/gallery">View Work</Link>
                </Button>
              </div>
            </div>

            <div className="relative animate-float">
              <div className="absolute -inset-4 gradient-feya-bg opacity-20 blur-2xl rounded-3xl" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl hover-lift group">
                <img 
                  src={heroImage} 
                  alt="Feya Bloom Studio" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Journey Section */}
      <section className="relative py-32 px-6 overflow-hidden bg-white">
        <div className="container mx-auto max-w-4xl relative z-10">
          <h2 className="text-5xl font-cormorant font-bold text-center mb-16 heading-accent">
            How I Got Here
          </h2>

          <div className="space-y-8 font-quicksand text-lg leading-relaxed">
            <p>
              I didn't set out to become a multidisciplinary creator.
              I just kept following what felt true.
            </p>

            <p>
              One project led to another: paintings turned into wearable art,
              personal struggles with focus became ADHD-friendly tools,
              curiosity about local herbs grew into a book about Catalan 
              nature-related traditions.
            </p>

            <div className="text-center py-8">
              <p className="text-4xl md:text-5xl font-lavishly handwritten-underline inline-block">
                "What do you actually do?"
              </p>
            </div>

            <p>
              I make things that help people live more intentionally—
              whether it's a planner that works for your brain,
              a piece of art that makes you stop and feel,
              or knowledge that connects you to something older than us.
            </p>

            <p className="text-xl font-cormorant italic text-center py-4 text-sage">
              Barcelona taught me that beauty and function aren't opposites.
              <br />They're dance partners.
            </p>

            <p className="text-center font-semibold" style={{ color: '#8B8680' }}>
              My work lives at the intersection of:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {directions.map((direction, index) => (
              <Card 
                key={direction.title} 
                className="hover-lift border-2 transition-all duration-300"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
                    <direction.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-cormorant font-bold mb-2">{direction.title}</h3>
                  <p className="text-sm font-quicksand">{direction.description}</p>
                </CardContent>
              </Card>
            ))}
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

      {/* What Makes My Work Different */}
      <section className="py-20 px-6 bg-neutral-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-5xl font-cormorant font-bold text-center mb-16 heading-accent">
            What Makes My Work Different
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={value.title} 
                className="text-center space-y-4 p-6 rounded-2xl bg-white hover-lift"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4">
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-cormorant font-semibold">{value.title}</h3>
                <p className="font-quicksand leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What I Stand For */}
      <section ref={refBeliefs} className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inViewBeliefs ? { opacity: 1, y: 0 } : {}}
            className="text-4xl md:text-5xl font-bold text-center gradient-text mb-20"
          >
            What I Stand For
          </motion.h2>

          <motion.div 
            className="relative flex flex-wrap justify-center items-center gap-4 md:gap-8"
            initial="hidden"
            animate={inViewBeliefs ? "visible" : "hidden"}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2,
                }
              }
            }}
          >
            {beliefs.map((value, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, scale: 0.5, y: 50 },
                  visible: { opacity: 1, scale: value.scale, y: 0, rotate: value.rotation }
                }}
                transition={{ type: 'spring', damping: 12, stiffness: 100 }}
                whileHover={{ scale: value.scale * 1.1, rotate: value.rotation + 2, zIndex: 10 }}
                className="glass-card rounded-2xl p-6 shadow-xl cursor-default"
              >
                <p className="text-lg md:text-xl font-semibold text-gray-800 text-center">
                  {value.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Fun Facts Section */}
      <section className="pt-20 px-6 relative overflow-hidden bg-neutral-100">
        <div className="container mx-auto max-w-6xl">
          <FunFactsSection facts={funFactsArr} />
        </div>
      </section>

  

      {/* Call to Action */}
      <section className="relative py-32 px-6 overflow-hidden gradient-feya">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-12 md:p-16 shadow-2xl">
            <div className="text-center space-y-8">
              <Home className="w-16 h-16 mx-auto text-secondary" />

              <h2 className="text-4xl md:text-5xl font-serif text-secondary font-bold leading-tight">
                Ready to bring something
                <br />
                <span className="text-gradient-feya font-script text-6xl px-5"> meaningful </span>
                <br />
                into your world?
              </h2>

              <p className="text-xl font-body max-w-2xl mx-auto leading-relaxed text-secondary">
                What we surround ourselves with shapes our daily experience. 
                My work invites you to feel genuinely seen and supported.
              </p>

              <div className="flex flex-wrap gap-6 justify-center pt-6">
                <Button asChild size="lg" className="gap-2 shadow-soft hover:shadow-elevated transition-smooth">
                  <Link to="/contact">Get in Touch</Link>
                </Button>              
                <Button asChild variant="outline" size="lg">
                  <Link to="/gallery">View Gallery</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
