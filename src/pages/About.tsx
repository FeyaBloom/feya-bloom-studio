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
import forestHero from "@/assets/forest-hero.png";
import heroPortrait from "@/assets/hero-portrait-new.jpg";
import heroMacrame from "@/assets/hero-macrame.png";
import heroMandala from "@/assets/hero-mandala.png";
import logo from "@/assets/logo.svg";
import {
  Brain,
  Home,
  LeafyGreen,
  Coffee,
  Moon,
  Music,
  BookOpen,
  Brush,
  Globe,
} from "lucide-react";

type Fact = {
  icon: React.ComponentType<any>;
  text: string;
  backText: string;
  initialPos: { x: number; y: number };
};

const FunFactsSection: React.FC<{ facts: Fact[] }> = ({ facts }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.18 });
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <section ref={ref} className="relative py-12 md:py-16">
      <div className="text-center mb-8 md:mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} 
          animate={inView ? { opacity: 1, y: 0 } : {}} 
          className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-center text-primary mb-4"
        >
          Random Things About Me
        </motion.h2>
        <p className="text-lg md:text-2xl font-body">
          because we're all 27% weird
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={inView ? { opacity: 1, y: 0 } : {}} 
        transition={{ delay: 0.08 }} 
        className="flex justify-center mb-12 md:mb-16"
      >                       
        <Button 
          onClick={() => setIsRevealed(!isRevealed)} 
          size="lg" 
          className="gap-2 shadow-soft hover:shadow-elevated transition-smooth bg-accent"
        >
          {isRevealed ? "Hide them!" : "Take a look"}
        </Button>
      </motion.div>

      {/* Увеличена высота контейнера */}
      <div className="relative w-full min-h-[500px] sm:min-h-[700px] md:min-h-[600px] lg:min-h-[700px] px-4">
        {facts.map((fact, i) => (
          <FactCard 
            key={i} 
            fact={fact} 
            index={i} 
            inView={inView} 
            isRevealed={isRevealed} 
          />
        ))}
      </div>
    </section>
  );
};

const FactCard: React.FC<{ fact: Fact; index: number; inView: boolean; isRevealed: boolean }> = ({ fact, index, inView, isRevealed }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const Icon = fact.icon;

  // Позиционирование: распределение по всей высоте контейнера
  const getResponsivePosition = () => {
    if (typeof window === 'undefined') return { x: 0, y: 0, rotate: 0 };

    const isMobile = window.innerWidth < 640;
    const isSmall = window.innerWidth >= 640 && window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

    // НОВАЯ СТРАТЕГИЯ: 3 ряда по высоте, разброс по ширине
    // Ряд 1: y = 50-150
    // Ряд 2: y = 200-350
    // Ряд 3: y = 400-550
    
    const positions = [
      // РЯД 1 (верхний)
      { x: -350, y: 80, rotate: -7 },    
      { x: -120, y: 60, rotate: 5 },    
      { x: 150, y: 100, rotate: -4 },     
      
      // РЯД 2 (средний)
      { x: -280, y: 250, rotate: 6 },    
      { x: -50, y: 280, rotate: -5 },    
      { x: 200, y: 230, rotate: 7 },    
      { x: 380, y: 270, rotate: -3 },    
      
      // РЯД 3 (нижний)
      { x: -200, y: 450, rotate: 5 },   
      { x: 80, y: 480, rotate: -6 },     
      { x: 320, y: 440, rotate: 4 },     
    ];

    const basePosition = positions[index % positions.length];

    if (isMobile) {
      // На мобильных - вертикальная колонка с небольшими смещениями
      const mobilePositions = [
        { x: -60, y: 40, rotate: -5 },
        { x: 50, y: 120, rotate: 4 },
        { x: -45, y: 200, rotate: -6 },
        { x: 55, y: 280, rotate: 5 },
        { x: -50, y: 360, rotate: -4 },
        { x: 45, y: 440, rotate: 6 },
        { x: -55, y: 520, rotate: -5 },
        { x: 50, y: 600, rotate: 4 },
      ];
      
      const mobilePos = mobilePositions[index % mobilePositions.length];
      
      return {
        x: isRevealed ? mobilePos.x : 0,
        y: isRevealed ? mobilePos.y : 0,
        rotate: isRevealed ? mobilePos.rotate : 0,
      };
    } else if (isSmall) {
      // Small screens
      return {
        x: isRevealed ? basePosition.x * 0.5 : 0,
        y: isRevealed ? basePosition.y * 0.8 : 0,
        rotate: isRevealed ? basePosition.rotate : 0,
      };
    } else if (isTablet) {
      // Планшеты
      return {
        x: isRevealed ? basePosition.x * 0.7 : 0,
        y: isRevealed ? basePosition.y * 0.9 : 0,
        rotate: isRevealed ? basePosition.rotate : 0,
      };
    } else {
      // Десктоп
      return {
        x: isRevealed ? basePosition.x : 0,
        y: isRevealed ? basePosition.y : 0,
        rotate: isRevealed ? basePosition.rotate : 0,
      };
    }
  };

  const position = getResponsivePosition();

  return (
    <motion.div
      className="absolute left-1/2 top-0 cursor-pointer"
      style={{ 
        perspective: 1000,
        zIndex: isFlipped ? 50 : 10 + index,
        transformOrigin: 'center center',
      }}
      initial={{ opacity: 0, scale: 0.8, x: '-50%', y: 0, rotate: 0 }}
      animate={
        inView
          ? {
              opacity: isFlipped ? 1 : 0.96,
              scale: isFlipped ? 1.08 : 1, // Только флип увеличивает
              x: `calc(-50% + ${position.x}px)`,
              y: position.y,
              rotate: position.rotate,
            }
          : { 
              opacity: 0, 
              scale: 0.8, 
              x: '-50%', 
              y: 0, 
              rotate: 0 
            }
      }
      transition={{ 
        type: "spring", 
        stiffness: 70, 
        damping: 15, 
        delay: index * 0.08,
        scale: { duration: 0.3 },
        rotate: { duration: 0.5 },
      }}
      onClick={(e) => {
        e.stopPropagation();
        setIsFlipped((s) => !s);
      }}
      // Убран whileHover - не нужен для мобилок
    >
      <motion.div
        className="relative w-48 h-28 sm:w-52 sm:h-30 md:w-60 md:h-34 lg:w-64 lg:h-36"
        style={{ transformStyle: "preserve-3d" as const }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Front */}
        <div 
          className="absolute w-full h-full" 
          style={{ backfaceVisibility: "hidden" as const }}
        >
          <div className="glass-card rounded-xl md:rounded-2xl p-2.5 md:p-3.5 h-full flex items-center gap-2.5 md:gap-3 shadow-lg transition-shadow">
            <div className="w-9 h-9 md:w-11 md:h-11 gradient-mystic rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
              <Icon className="w-4.5 h-4.5 md:w-5.5 md:h-5.5 text-white" />
            </div>
            <p className="text-gray-700 text-xs md:text-sm font-body leading-snug pr-1">
              {fact.text}
            </p>
          </div>
        </div>

        {/* Back */}
        <div 
          className="absolute w-full h-full" 
          style={{ 
            backfaceVisibility: "hidden" as const, 
            transform: "rotateY(180deg)" 
          }}
        >
          <div className="rounded-xl md:rounded-2xl p-3 md:p-4 h-full flex items-center justify-center gradient-mystic shadow-2xl">
            <p className="text-white font-semibold text-center text-xs md:text-sm lg:text-base font-body leading-relaxed px-2">
              {fact.backText}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const About: React.FC = () => {

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
      initialPos: { y: -150, x: -220 },
    },
    {
      icon: Music,
      text: "Night owl pretending to be a morning person",
      backText: "My best ideas arrive after midnight.",
      initialPos: { y: 160, x: 200 },
    },
    {
      icon: BookOpen,
      text: "Can't pass a craft store without buying at least one thing",
      backText: "My yarn collection is getting out of hand.",
      initialPos: { y: -80, x: 240 },
    },
    {
      icon: Globe,
      text: "Obsessively curious about how things work",
      backText: "...and taking them apart to find out.",
      initialPos: { y: 80, x: -240 },
    },
    {
      icon: Brain,
      text: "I have ADHD and my work reflects it",
      backText: "Hyperfocus is my superpower.",
      initialPos: { y: -200, x: 60 },
    },
    {
      icon: Moon,
      text: "Moon phases guide my creative cycles",
      backText: "I plan projects around lunar energy.",
      initialPos: { y: 200, x: -100 },
    },
    {
      icon: Brush,
      text: "Started with traditional painting, now I code",
      backText: "Both are just different canvases.",
      initialPos: { y: 0, x: -280 },
    },
    {
      icon: LeafyGreen,
      text: "Foraging herbs is my meditation",
      backText: "Nature is the best teacher.",
      initialPos: { y: -20, x: 280 },
    },
  ];

  const [refBeliefs, inViewBeliefs] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
 
     



     {/* Hero Section */}
<section className="relative flex items-center justify-center overflow-hidden py-16 md:py-20 lg:py-24">
  <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: `url(${forestHero})` }}
  />
  <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background" />
  
  {/* Декоративные плавающие элементы в фоне */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Violeta круг */}
    <motion.div
      className="absolute top-10 left-5 w-24 h-24 md:top-20 md:left-10 md:w-48 md:h-48 bg-violeta/20 rounded-full blur-3xl"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.2, 0.3, 0.2],
      }}
      transition={{ duration: 8, repeat: Infinity }}
    />

    {/* Azul круг */}
    <motion.div
      className="absolute bottom-10 right-5 w-48 h-48 md:bottom-20 md:right-10 md:w-96 md:h-96 bg-azul/20 rounded-full blur-3xl"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.2, 0.3, 0.2],
      }}
      transition={{ duration: 10, repeat: Infinity }}
    />

    {/* Sage круг */}
    <motion.div
      className="absolute top-1/2 right-1/4 w-24 h-24 md:w-48 md:h-48 bg-sage/15 rounded-full blur-3xl"
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.15, 0.25, 0.15],
      }}
      transition={{ duration: 12, repeat: Infinity }}
    />
  </div>

  {/* Контент */}
  <div className="container mx-auto max-w-6xl relative z-10 px-4">
    <div className="flex flex-col items-center space-y-8 md:space-y-12 lg:space-y-16">
      
      {/* Заголовок и плавающие изображения */}
      <div className="w-full flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
        
        {/* Заголовок - на мобилке сверху */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full text-center md:text-right md:pl-8 order-1 pt-8"
        >
          <div className="inline-block">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-script text-mystic mb-3 md:mb-4 drop-shadow-lg ">
              Hi there! I'm Feya
            </h1>
            
          </div>
        </motion.div>

        {/* Плавающие изображения - на мобилке после заголовка */}
        <div className="relative w-full aspect-square max-w-[280px] sm:max-w-[320px] md:max-w-none md:aspect-square flex items-center justify-center order-2">
          
          {/* Центральное изображение (портрет) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative z-20 w-full max-w-[200px] sm:max-w-[240px] md:max-w-[280px] lg:max-w-[320px]"
          >
            <div className="relative w-full aspect-square rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-2 md:border-4 border-white/50">
              <img 
                src={heroPortrait} 
                alt="Feya Bloom Portrait" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Плавающая карточка - Макраме (сверху справа) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute -top-2 -right-2 sm:top-0 sm:right-2 md:top-4 md:right-0 lg:-top-2 lg:-right-4 z-30"
          >
            <motion.div
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 2, 0]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 rounded-lg md:rounded-xl lg:rounded-2xl overflow-hidden shadow-xl border-2 border-white/50 bg-white/80 backdrop-blur-sm"
            >
              <img 
                src={heroMacrame} 
                alt="Handmade craft" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Плавающая карточка - Мандала (снизу слева) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="absolute -bottom-2 -left-2 sm:bottom-0 sm:left-2 md:bottom-4 md:left-0 lg:-bottom-2 lg:-left-4 z-30"
          >
            <motion.div
              animate={{ 
                y: [0, 15, 0],
                rotate: [0, -2, 0]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 rounded-lg md:rounded-xl lg:rounded-2xl overflow-hidden shadow-xl border-2 border-white/50 bg-white/80 backdrop-blur-sm"
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

      {/* Тексты внизу по всей ширине с центрированием */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="w-full max-w-2xl lg:max-w-3xl text-center space-y-4 md:space-y-5 lg:space-y-6 px-2"
      >
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-cormorant leading-relaxed" style={{ color: '#3D3935' }}>
          I create for minds that won't fit the mold —
          and hearts that refuse to settle.
        </p>

        <p className="text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto" style={{ color: '#8B8680' }}>
          Working from Spain, where I blend art, function, 
          and timeless wisdom into things that actually matter.
        </p>   
      </motion.div>

    </div>
  </div>
</section>


      {/* My Journey Section */}
      <section className="relative py-16 md:py-24 lg:py-32 px-4 md:px-6 overflow-hidden bg-neutral-100">
        <div className="container mx-auto max-w-4xl relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-cormorant font-bold text-center mb-12 md:mb-16 text-secondary">
            How I Got Here
          </h2>

          <div className="space-y-6 md:space-y-8 font-body text-base md:text-lg leading-relaxed px-4">
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

 <div className="relative w-full flex items-center justify-center mt-4 md:mt-6 mb-12 md:mb-20 px-4">
  <svg
    viewBox="0 0 400 400"   // меньшее окно = крупнее контент
    preserveAspectRatio="xMidYMid meet"
    className="w-full h-auto max-w-[700px] sm:max-w-[800px] md:max-w-[900px]"
  >
    <defs>
      <radialGradient id="violetaGradient">
        <stop offset="0%" style={{ stopColor: '#6B4FA3', stopOpacity: 0.6 }} />
        <stop offset="100%" style={{ stopColor: '#6B4FA3', stopOpacity: 0.2 }} />
      </radialGradient>
      <radialGradient id="azulGradient">
        <stop offset="0%" style={{ stopColor: '#4A5F8C', stopOpacity: 0.6 }} />
        <stop offset="100%" style={{ stopColor: '#4A5F8C', stopOpacity: 0.2 }} />
      </radialGradient>
      <radialGradient id="sageGradient">
        <stop offset="0%" style={{ stopColor: '#8BA888', stopOpacity: 0.6 }} />
        <stop offset="100%" style={{ stopColor: '#8BA888', stopOpacity: 0.2 }} />
      </radialGradient>
    </defs>

    {/* Круги */}
    <motion.circle
      cx="130"
      cy="160"
      r="110"
      fill="url(#violetaGradient)"
      stroke="#6B4FA3"
      strokeWidth="2"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    />
    <motion.circle
      cx="270"
      cy="160"
      r="110"
      fill="url(#azulGradient)"
      stroke="#4A5F8C"
      strokeWidth="2"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    />
    <motion.circle
      cx="200"
      cy="270"
      r="110"
      fill="url(#sageGradient)"
      stroke="#8BA888"
      strokeWidth="2"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    />

    {/* Центр (лого) */}
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 1.4 }}
    >
      <foreignObject x="150" y="150" width="100" height="100">
        <div className="w-full h-full flex items-center justify-center gradient-feya-bg backdrop-blur-sm rounded-full drop-shadow-lg p-3">
          <img src={logo} alt="Feya Bloom Studio" className="w-full h-full object-contain text-sage" />
        </div>
      </foreignObject>
    </motion.g>

    {/* Тексты */}
    <motion.g initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }}>
      <foreignObject x="60" y="70" width="120" height="80">
        <div className="flex flex-col items-center text-center">
          <Brush className="w-6 h-6 md:w-8 md:h-8 text-violeta mb-2" />
          <p className="text-lg md:text-2xl font-serif text-gray-800">Visual <br /> Storytelling</p>
        </div>
      </foreignObject>
    </motion.g>

    <motion.g initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.0 }}>
      <foreignObject x="220" y="70" width="120" height="80">
        <div className="flex flex-col items-center text-center">
          <Brain className="w-6 h-6 md:w-8 md:h-8 text-azul mb-2" />
          <p className="text-lg md:text-2xl font-serif text-gray-800">Functional <br /> Design</p>
        </div>
      </foreignObject>
    </motion.g>

    <motion.g initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.2 }}>
      <foreignObject x="140" y="280" width="120" height="80">
        <div className="flex flex-col items-center text-center">
          <LeafyGreen className="w-6 h-6 md:w-8 md:h-8 text-sage mb-2" />
          <p className="text-lg md:text-2xl font-serif text-gray-800">Ancestral <br /> Wisdom</p>
        </div>
      </foreignObject>
    </motion.g>
  </svg>
</div>
  </div>
</section>

    

      {/* What I Stand For */}
      <section ref={refBeliefs} className="py-12 md:py-24 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inViewBeliefs ? { opacity: 1, y: 0 } : {}}
            className="text-3xl sm:text-4xl md:text-5xl font-cormorant font-bold text-center text-accent mb-12 md:mb-20"
          >
            What I Stand For
          </motion.h2>

          <motion.div 
            className="relative flex flex-wrap justify-center items-center gap-3 md:gap-6 lg:gap-8"
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
                className="glass-card rounded-2xl p-4 md:p-6 shadow-xl cursor-default"
              >
                <p className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-800 text-center">
                  {value.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Fun Facts Section */}
      <section className="pt-12 md:pt-20 px-4 md:px-6 relative overflow-hidden bg-neutral-100">
        <div className="container mx-auto max-w-6xl">
          <FunFactsSection facts={funFactsArr} />
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-16 md:py-24 lg:py-32 px-4 md:px-6 overflow-hidden gradient-feya">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-white rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl md:rounded-3xl p-8 md:p-12 lg:p-16 shadow-2xl">
            <div className="text-center space-y-6 md:space-y-8">
              <Home className="w-12 h-12 md:w-16 md:h-16 mx-auto text-secondary" />

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-cormorant text-secondary font-bold leading-tight text-center">
                Ready to bring something
                <br />
                <span className="text-gradient-feya font-script"> meaningful </span>
                <br />
                into your world?
              </h2>

              <p className="text-base md:text-lg lg:text-xl font-body max-w-2xl mx-auto leading-relaxed text-secondary px-4">
                What we surround ourselves with shapes our daily experience. 
                My work invites you to feel genuinely seen and supported.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-6 justify-center pt-4 md:pt-6 px-4">
                <Button asChild size="lg" className="gap-2 shadow-soft hover:shadow-elevated transition-smooth w-full sm:w-auto">
                  <Link to="/contact">Get in Touch</Link>
                </Button>              
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
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
