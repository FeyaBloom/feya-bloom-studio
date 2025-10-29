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
    "Beauty should be functional",
    "Systems should support neurodivergence, not fight it",
    "Ancestral wisdom isn't 'woo-woo'—it's survival knowledge",
    "Art is for everyone, not just galleries",
    "What we surround ourselves with matters",
  ];

  const funFactsArr: Fact[] = [
    {
      icon: Coffee,
      text: "Herbal tea addict (it's basically my personality now)",
      backText: "It's a hot bean water ritual.",
      initialPos: { y: -20, x: -100 },
    },
    {
      icon: Music as unknown as React.ComponentType<any>,
      // Music isn't in the lucide set we imported here, so fall back to Moon as a visual placeholder
      // (if you have Music imported elsewhere, replace this cast with the real icon)
      text: "Night owl pretending to be a morning person",
      backText: "My best ideas arrive after midnight.",
      initialPos: { y: 20, x: 100 },
    },
    {
      icon: BookOpen,
      text: "Can't pass a craft store without buying at least one thing",
      backText: "My yarn collection is getting out of hand.",
      initialPos: { y: -30, x: 120 },
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

  // --- Carousel data & hooks (для секции "What I Create") ---
  const creations = [
    { icon: Code, title: "Art & Sculpture", description: "Digital and physical art pieces that spark joy" },
    { icon: Palette, title: "Wearable Art", description: "Fashion that tells a story" },
    { icon: FileText, title: "Business Systems", description: "Streamlined workflows that actually work" },
    { icon: Home, title: "Home Decor", description: "Spaces that feel like home" },
    { icon: Smartphone, title: "Wellness & Wisdom", description: "Tools for mindful living" },
    { icon: Globe, title: "Websites", description: "Digital experiences that delight" },
  ];

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  useEffect(() => {
    const api = emblaApi;
    if (!api) return;
    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    api.on("select", onSelect);
    // set initial
    onSelect();
    return () => {
      // NO devolvemos el resultado de `off` — sólo lo llamamos
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
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-lavishly hero-title mb-4">
                  Hi there, I'm Feya
                </h1>
                <div className="h-1 w-32 gradient-feya rounded-full" />
              </div>

              <p className="text-2xl font-cormorant leading-relaxed text-lead">
                I create for minds that won't fit the mold—
                <br />and hearts that refuse to settle.
              </p>

              <p className="text-lg leading-relaxed text-subtle">
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

      {/* What I Believe */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-5xl font-cormorant font-bold text-center mb-16 text-azul">What I Stand For</h2>

          <div className="space-y-6">
            {beliefs.map((belief, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 p-6 rounded-xl transition-all duration-300"
              >
                <div className="mt-1">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="#8BA888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="text-lg font-quicksand">{belief}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Fun Facts: replaced with interactive RandomThings-like structure --- */}
      <section className="py-20 px-6 relative overflow-hidden bg-neutral-100">
        <div className="container mx-auto max-w-6xl">
          <FunFactsSection facts={funFactsArr} />
        </div>
      </section>

      {/* What I Create: Carousel section (structure only, styling via globals) */}
      <section ref={ref} className="py-20 px-6 bg-white overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-5xl font-cormorant font-bold text-center mb-8"
          >
            What I Create
          </motion.h2>
          <p className="text-center font-quicksand mb-12">Each piece blends intuition with intentional design, beauty with usefulness</p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
            className="relative"
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
                          scale: isSelected ? 1 : 0.92,
                          opacity: isSelected ? 1 : 0.7,
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="card-surface rounded-3xl p-8 h-full flex flex-col items-center text-center"
                      >
                        <div className="relative mb-6">
                          <div className="w-16 h-16 icon-bg rounded-2xl flex items-center justify-center">
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                        </div>
                        <h3 className="text-xl font-cormorant font-semibold mb-2">{item.title}</h3>
                        <p className="text-sm flex-grow font-quicksand">{item.description}</p>
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

      {/* Call to Action */}
      <section className="relative py-32 px-6 overflow-hidden gradient-feya">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-12 md:p-16 shadow-2xl">
            <div className="text-center space-y-8">
              <Home className="w-16 h-16 mx-auto" />

              <h2 className="text-4xl md:text-5xl font-cormorant font-bold leading-tight">
                Ready to bring something
                <br />
                <span className="text-gradient-feya font-lavishly text-6xl">meaningful</span>
                <br />
                into your world?
              </h2>

              <p className="text-xl font-quicksand max-w-2xl mx-auto leading-relaxed">
                What we surround ourselves with shapes our daily experience. 
                My work invites you to feel genuinely seen and supported.
              </p>

              <div className="flex flex-wrap gap-6 justify-center pt-6">
                <Button asChild size="lg" className="text-lg px-8 py-6 btn-primary font-quicksand">
                  <Link to="/contact">Get in Touch</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 btn-outline font-quicksand">
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

/* FunFactsSection + FactCard components (kept inside About.tsx to avoid adding new files) */
const FunFactsSection: React.FC<{ facts: Fact[] }> = ({ facts }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.18 });
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <section ref={ref} className="relative">
      <div className="text-center mb-8">
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-5xl font-cormorant font-bold mb-4">
          Random Things About Me
        </motion.h2>
        <p className="text-subtle">because we're all human</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.08 }} className="flex justify-center mb-8">
        <Button onClick={() => setIsRevealed((s) => !s)} className="btn-primary">
          {isRevealed ? "Hide them!" : "Take a look"}
        </Button>
      </motion.div>

      <div className="relative h-[420px]">
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
              opacity: 1,
              scale: 1,
              x: isRevealed ? fact.initialPos.x : 0,
              y: isRevealed ? fact.initialPos.y : 0,
            }
          : {}
      }
      transition={{ type: "spring", stiffness: 60, damping: 12, delay: index * 0.06 }}
      onClick={(e) => {
        e.stopPropagation();
        setIsFlipped((s) => !s);
      }}
      // spread out slightly so cards don't fully overlap
      // allow their stacking order to match index
      aria-hidden={false}
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
            <div className="w-12 h-12 icon-bg rounded-xl flex items-center justify-center flex-shrink-0">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <p className="text-gray-700 text-sm font-quicksand">{fact.text}</p>
          </div>
        </div>

        {/* Back */}
        <div className="absolute w-full h-full" style={{ backfaceVisibility: "hidden" as const, transform: "rotateY(180deg)" }}>
          <div className="glass-card rounded-2xl p-4 h-full flex items-center justify-center bg-gradient-to-br from-purple-400 to-pink-400">
            <p className="text-white font-semibold text-center text-md font-quicksand">{fact.backText}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default About;