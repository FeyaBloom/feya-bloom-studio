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
import heroPortrait from "@/assets/hero-portrait.jpg";
import heroMacrame from "@/assets/hero-macrame.png";
import heroMandala from "@/assets/hero-mandala.png";
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
<section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden" style={{ backgroundColor: '#F5F0E8' }}>
  {/* Декоративные плавающие элементы в фоне */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Violeta круг */}
    <motion.div
      className="absolute top-20 left-10 w-72 h-72 bg-violeta/20 rounded-full blur-3xl"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.2, 0.3, 0.2],
      }}
      transition={{ duration: 8, repeat: Infinity }}
    />
    
    {/* Azul круг */}
    <motion.div
      className="absolute bottom-20 right-10 w-96 h-96 bg-azul/20 rounded-full blur-3xl"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.2, 0.3, 0.2],
      }}
      transition={{ duration: 10, repeat: Infinity }}
    />
    
    {/* Sage круг */}
    <motion.div
      className="absolute top-1/2 right-1/4 w-64 h-64 bg-sage/15 rounded-full blur-3xl"
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.15, 0.25, 0.15],
      }}
      transition={{ duration: 12, repeat: Infinity }}
    />
  </div>

  {/* Контент */}
  <div className="container mx-auto max-w-6xl relative z-10">
    <div className="grid md:grid-cols-2 gap-16 items-center">
      {/* Левая колонка - текст */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-6"
      >
        <div className="inline-block">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-lavishly text-violeta mb-4">
            Hi there! I'm Feya
          </h1>
          <div className="h-1 w-32 gradient-feya rounded-full" />
        </div>
        
        <p className="text-2xl font-cormorant leading-relaxed" style={{ color: '#3D3935' }}>
          I create for minds that won't fit the mold—
          <br />
          and hearts that refuse to settle.
        </p>
        
        <p className="text-lg leading-relaxed" style={{ color: '#8B8680' }}>
          Working from Barcelona, where I blend art, function, 
          and timeless wisdom into things that actually matter.
        </p>
        
        <div className="flex gap-4 pt-4">
          <Button asChild size="lg" className="bg-violeta hover:bg-opacity-90 shadow-lg font-quicksand">
            <Link to="/contact">Start a Project</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-2 border-violeta text-violeta hover:bg-violeta hover:text-white font-quicksand">
            <Link to="/gallery">View Work</Link>
          </Button>
        </div>
      </motion.div>

      {/* Правая колонка - плавающие изображения */}
      <div className="relative w-full h-[600px] flex items-center justify-center">
        {/* Центральное изображение (портрет) - БОЛЬШОЕ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-20"
        >
          <div className="relative w-80 h-96 rounded-3xl overflow-hidden shadow-2xl border border-white/50">
            <img 
              src={heroPortrait} 
              alt="Feya" 
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Плавающая карточка - Макраме (сверху справа, накладывается) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute top-8 right-0 z-30"
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-48 h-48 rounded-2xl overflow-hidden shadow-xl border border-white/50 bg-white/80 backdrop-blur-sm"
          >
            <img 
              src={heroMacrame} 
              alt="Handmade craft" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Плавающая карточка - Мандала (снизу слева, накладывается) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="absolute bottom-8 left-0 z-30"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="w-48 h-48 rounded-2xl overflow-hidden shadow-xl border border-white/50 bg-white/80 backdrop-blur-sm"
          >
            <img 
              src={heroMandala} 
              alt="Digital art" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>
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
