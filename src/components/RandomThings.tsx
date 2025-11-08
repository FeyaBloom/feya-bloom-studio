import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Coffee, Music, BookOpen, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Fact = {
  icon: React.ComponentType<any>;
  text: string;
  backText: string;
  initialPos: { x: number; y: number };
};

const randomFacts: Fact[] = [
  { icon: Coffee, text: 'Herbal tea addict (it\'s basically my personality now)', backText: "It's a hot bean water ritual.", initialPos: { y: -20, x: -100 } },
  { icon: Music, text: 'Night owl pretending to be a morning person', backText: 'My best ideas arrive after midnight.', initialPos: { y: 20, x: 100 } },
  { icon: BookOpen, text: 'Can\'t pass a craft store without buying at least one thing', backText: 'My yarn collection is getting out of hand.', initialPos: { y: -30, x: 120 } },
  { icon: Plane, text: 'Obsessively curious about how things work', backText: '...and taking them apart to find out.', initialPos: { y: 30, x: -120 } },
];

const FactCard: React.FC<{ fact: Fact; index: number; inView: boolean; isRevealed: boolean }> = ({ fact, index, inView, isRevealed }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const Icon = fact.icon;

  return (
    <motion.div
      className="absolute cursor-pointer fact-card-wrapper"
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
      transition={{ type: 'spring', stiffness: 60, damping: 12, delay: index * 0.06 }}
      onClick={(e) => {
        e.stopPropagation();
        setIsFlipped((s) => !s);
      }}
      aria-hidden={false}
    >
      <motion.div
        className="relative w-64 h-36"
        style={{ transformStyle: 'preserve-3d' as const }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Front */}
        <div className="absolute w-full h-full" style={{ backfaceVisibility: 'hidden' as const }}>
          <div className="glass-card rounded-2xl p-4 h-full flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 icon-bg rounded-xl flex items-center justify-center flex-shrink-0">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <p className="text-foreground text-sm font-quicksand">{fact.text}</p>
          </div>
        </div>

        {/* Back */}
        <div className="absolute w-full h-full" style={{ backfaceVisibility: 'hidden' as const, transform: 'rotateY(180deg)' }}>
          <div className="glass-card rounded-2xl p-4 h-full flex items-center justify-center back-face-bg">
            <p className="text-white font-semibold text-center text-md font-quicksand">{fact.backText}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const RandomThings: React.FC = () => {
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
          {isRevealed ? 'Hide them!' : 'Take a look'}
        </Button>
      </motion.div>

      <div className="relative h-[420px]">
        {randomFacts.map((fact, i) => (
          <FactCard key={i} fact={fact} index={i} inView={inView} isRevealed={isRevealed} />
        ))}
      </div>
    </section>
  );
};

export default RandomThings;