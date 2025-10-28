import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import heroImage from "@/assets/mood-aurora.png";
import floralImage from "@/assets/mood-floral.png";
import { Heart, Hand, Brain, Home, LeafyGreen, Coffee, Moon, Sparkle, BookOpen, Brush, Star } from "lucide-react";
import { useState } from "react";

const About = () => {
  const [activeTab, setActiveTab] = useState<'journey' | 'values' | 'work'>('journey');

  const directions = [{
    icon: Brush,
    title: "Visual Storytelling",
    description: "Painting, sculpture & wearables"
  }, {
    icon: Brain,
    title: "Functional Design",
    description: "ADHD-friendly systems"
  }, {
    icon: LeafyGreen,
    title: "Ancestral Wisdom",
    description: "Catalan nature-related traditions"
  }];

  const values = [{
    icon: Hand,
    title: "No bullshit",
    description: "I don't make things just to make things. If it doesn't serve a purpose or bring beauty—it doesn't leave my studio."
  }, {
    icon: LeafyGreen,
    title: "Rooted in nature",
    description: "My passion about nature shows up in everything—from the herbs I write about to the colors I choose."
  }, {
    icon: Brain,
    title: "Built for neurodivergent minds",
    description: "Because I have one. My tools aren't just pretty—they actually work."
  }, {
    icon: Heart,
    title: "Handmade with intention",
    description: "Every piece, whether digital or physical, carries intention. No mass production. No templates."
  }];

  const beliefs = [
    "Beauty should be functional",
    "Systems should support neurodivergence, not fight it",
    "Ancestral wisdom isn't 'woo-woo'—it's survival knowledge",
    "Art is for everyone, not just galleries",
    "What we surround ourselves with matters"
  ];

  const funFacts = [{
    icon: Coffee,
    text: "Herbal tea addict (it's basically my personality now)"
  }, {
    icon: Moon,
    text: "Night owl pretending to have a normal schedule"
  }, {
    icon: Sparkle,
    text: "Can't pass a craft store without 'just looking'"
  }, {
    icon: LeafyGreen,
    text: "Probably knows more about herbs than anyone should"
  }, {
    icon: BookOpen,
    text: "Reading 5 books at once (finishing none)"
  }];

  const offerings = [{
    title: "Art & Sculpture",
    description: "Original pieces that speak to the unspoken",
    category: "Art"
  }, {
    title: "Wearable Art",
    description: "Clothing as creative expression",
    category: "Wearable"
  }, {
    title: "Business Systems",
    description: "Tools that support natural rhythms",
    category: "Digital"
  }, {
    title: "Home Decor",
    description: "Unique pieces that resonate",
    category: "Decor"
  }, {
    title: "Wellness & Wisdom",
    description: "Knowledge that grounds you",
    category: "Wellness"
  }];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navigation />

      {/* Hero Section - Editorial Magazine Style with Diagonal Layout */}
      <section className="relative pt-32 pb-24 px-6">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Text Content - Asymmetric */}
            <div className="lg:col-span-7 space-y-8">
              <div className="relative">
                <div className="absolute -left-4 -top-4 w-24 h-24 bg-gradient-mystic opacity-10 rounded-full blur-2xl" />
                <h1 className="text-7xl md:text-8xl lg:text-9xl font-script text-primary mb-2 relative">
                  Hi there!
                </h1>
                <div className="h-2 w-40 bg-gradient-mystic rounded-full" />
              </div>
              
              <p className="text-3xl md:text-4xl font-serif leading-tight text-foreground">
                I create for minds that won't fit the mold—
                <br />
                <span className="text-primary italic">and hearts that refuse to settle.</span>
              </p>
              
              <p className="text-xl leading-relaxed text-muted-foreground max-w-xl">
                Working from Barcelona, where I blend art, function, 
                and timeless wisdom into things that actually matter.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Button asChild size="lg" className="shadow-elevated hover:scale-105 transition-smooth">
                  <Link to="/contact">Start a Project</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="hover:scale-105 transition-smooth border-2">
                  <Link to="/gallery">View Work</Link>
                </Button>
              </div>
            </div>

            {/* Image - Overlapping with decorative elements */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-8 bg-gradient-mystic opacity-5 blur-3xl rounded-3xl" />
              <div className="relative">
                <img 
                  src={heroImage} 
                  alt="Feya Bloom Studio" 
                  className="w-full h-[500px] object-cover rounded-3xl shadow-elevated hover:scale-105 transition-smooth" 
                />
                {/* Decorative Shape Overlay */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary rounded-full opacity-20 blur-xl" />
                <div className="absolute -top-6 -left-6 w-24 h-24 border-4 border-accent rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Tabs Navigation - Magazine Style */}
      <section className="sticky top-20 z-40 bg-background/80 backdrop-blur-xl border-b border-border py-4 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex gap-8 justify-center">
            {[
              { id: 'journey', label: 'My Journey', icon: Sparkle },
              { id: 'values', label: 'What Makes It Different', icon: Star },
              { id: 'work', label: 'What I Create', icon: Brush }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as typeof activeTab)}
                className={`group flex items-center gap-2 px-6 py-3 rounded-full transition-smooth font-body font-semibold ${
                  activeTab === id
                    ? 'bg-gradient-mystic text-primary-foreground shadow-soft'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon className={`w-5 h-5 ${activeTab === id ? 'animate-pulse' : ''}`} />
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Section - Diagonal Layout with Collage */}
      {activeTab === 'journey' && (
        <section className="relative py-32 px-6 animate-fade-in">
          <div className="container mx-auto max-w-7xl">
            {/* Decorative Diagonal Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-mystic transform -skew-y-3" />
            
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Text Content */}
              <div className="space-y-8">
                <h2 className="text-6xl font-serif font-bold text-primary mb-8">
                  How I Got Here
                </h2>

                <div className="space-y-6 text-lg leading-relaxed text-foreground">
                  <p className="border-l-4 border-primary pl-6">
                    I didn't set out to become a multidisciplinary creator.
                    I just kept following what felt true.
                  </p>

                  <p>
                    One project led to another: paintings turned into wearable art,
                    personal struggles with focus became ADHD-friendly tools,
                    curiosity about local herbs grew into a book about Catalan 
                    nature-related traditions.
                  </p>

                  <div className="relative py-8 my-8">
                    <div className="absolute inset-0 gradient-ethereal rounded-2xl transform rotate-1" />
                    <p className="relative text-3xl md:text-4xl font-script text-secondary text-center py-8">
                      "What do you actually do?"
                    </p>
                  </div>

                  <p className="text-xl">
                    I make things that help people live more intentionally—
                    whether it's a planner that works for your brain,
                    a piece of art that makes you stop and feel,
                    or knowledge that connects you to something older than us.
                  </p>

                  <blockquote className="text-2xl font-serif italic text-center py-6 text-accent border-y-2 border-accent/30">
                    Barcelona taught me that beauty and function aren't opposites.
                    <br />They're dance partners.
                  </blockquote>
                </div>
              </div>

              {/* Visual Collage */}
              <div className="relative h-[700px]">
                {/* Main Image */}
                <div className="absolute top-0 right-0 w-80 h-96 rounded-3xl overflow-hidden shadow-elevated transform rotate-3 hover:rotate-0 transition-smooth">
                  <img src={floralImage} alt="Creative work" className="w-full h-full object-cover" />
                </div>
                
                {/* Overlapping Cards */}
                <div className="absolute bottom-20 left-0 w-64 transform -rotate-6 hover:rotate-0 transition-smooth">
                  <Card className="shadow-elevated bg-card border-2">
                    <CardContent className="p-8">
                      <p className="text-sm font-body text-muted-foreground mb-2">My work lives at</p>
                      <p className="text-xl font-serif font-bold text-primary">the intersection of:</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Direction Pills */}
                {directions.map((direction, index) => {
                  const Icon = direction.icon;
                  return (
                    <div
                      key={direction.title}
                      className="absolute shadow-elevated hover:scale-110 transition-smooth"
                      style={{
                        top: `${index * 150 + 250}px`,
                        left: `${index * 80 + 20}px`,
                        transform: `rotate(${index * -5}deg)`
                      }}
                    >
                      <Card className="bg-gradient-to-br from-card to-muted border-2">
                        <CardContent className="p-6 flex items-center gap-4">
                          <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                            index === 0 ? 'bg-primary/20' : index === 1 ? 'bg-secondary/20' : 'bg-accent/20'
                          }`}>
                            <Icon className={`w-7 h-7 ${
                              index === 0 ? 'text-primary' : index === 1 ? 'text-secondary' : 'text-accent'
                            }`} />
                          </div>
                          <div>
                            <h3 className="text-lg font-serif font-bold text-foreground">{direction.title}</h3>
                            <p className="text-sm text-muted-foreground">{direction.description}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Values Section - Bento Grid Style */}
      {activeTab === 'values' && (
        <section className="py-32 px-6 animate-fade-in">
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-6xl font-serif font-bold text-center mb-4 text-primary">
              What Makes My Work Different
            </h2>
            <p className="text-center text-xl text-muted-foreground mb-16">
              Four principles that guide everything I create
            </p>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card 
                    key={value.title} 
                    className={`group hover:scale-105 transition-smooth shadow-soft hover:shadow-elevated border-2 ${
                      index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
                    }`}
                  >
                    <CardContent className="p-8 h-full flex flex-col">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 bg-gradient-mystic group-hover:scale-110 transition-smooth">
                        <Icon className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <h3 className="text-3xl font-serif font-semibold mb-4 text-foreground group-hover:text-primary transition-colors">
                        {value.title}
                      </h3>
                      <p className="text-lg leading-relaxed text-muted-foreground flex-grow">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Beliefs Section */}
            <div className="mt-24 max-w-4xl mx-auto">
              <h3 className="text-5xl font-serif font-bold text-center mb-12 text-secondary">
                What I Stand For
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {beliefs.map((belief, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-br from-muted/50 to-transparent hover:from-accent/10 hover:to-transparent transition-smooth group"
                  >
                    <div className="mt-1 flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center group-hover:scale-110 transition-smooth">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M5 13l4 4L19 7" stroke="hsl(var(--accent))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-lg text-foreground pt-0.5">{belief}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Fun Facts - Masonry Style */}
            <div className="mt-24">
              <h3 className="text-5xl font-serif font-bold text-center mb-4 text-primary">
                Random Things About Me
              </h3>
              <p className="text-center text-6xl font-script text-secondary mb-12">
                because we're all human
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {funFacts.map((fact, index) => {
                  const Icon = fact.icon;
                  return (
                    <Card 
                      key={index} 
                      className="hover:scale-105 transition-smooth shadow-soft hover:shadow-elevated border-2"
                    >
                      <CardContent className="p-6 flex items-start gap-4">
                        <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 bg-primary/10">
                          <Icon className="w-7 h-7 text-primary" />
                        </div>
                        <p className="text-lg pt-3 text-foreground">{fact.text}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Work Section - Magazine Grid */}
      {activeTab === 'work' && (
        <section className="py-32 px-6 animate-fade-in">
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-6xl font-serif font-bold text-center mb-4 text-accent">
              What I Create
            </h2>
            <p className="text-center text-xl text-muted-foreground mb-16 max-w-3xl mx-auto">
              Each piece blends intuition with intentional design, beauty with usefulness.
              <br />
              Click to explore each category in the gallery.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {offerings.map((offering, index) => (
                <Link 
                  key={offering.title} 
                  to={`/gallery?category=${offering.category}`}
                  className="group"
                >
                  <Card className="h-full hover:scale-105 transition-smooth shadow-soft hover:shadow-elevated border-2 overflow-hidden">
                    {/* Decorative Top Bar */}
                    <div className={`h-2 ${
                      index % 3 === 0 ? 'bg-primary' : index % 3 === 1 ? 'bg-secondary' : 'bg-accent'
                    } group-hover:h-4 transition-all`} />
                    
                    <CardContent className="p-8">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${
                        index % 3 === 0 ? 'bg-primary/10' : index % 3 === 1 ? 'bg-secondary/10' : 'bg-accent/10'
                      }`}>
                        <div className={`w-3 h-3 rounded-full ${
                          index % 3 === 0 ? 'bg-primary' : index % 3 === 1 ? 'bg-secondary' : 'bg-accent'
                        }`} />
                      </div>
                      
                      <h3 className="text-3xl font-serif font-semibold mb-3 text-foreground group-hover:text-accent transition-colors">
                        {offering.title}
                      </h3>
                      <p className="text-lg text-muted-foreground">
                        {offering.description}
                      </p>
                      
                      <div className="mt-6 flex items-center text-accent group-hover:gap-2 transition-all">
                        <span className="font-semibold">Explore</span>
                        <span className="ml-2 group-hover:ml-0 transition-all">→</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action - Immersive Full-Width */}
      <section className="relative py-40 px-6 overflow-hidden gradient-mystic">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-foreground/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary-foreground/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <Card className="bg-background/95 backdrop-blur-xl rounded-3xl shadow-elevated overflow-hidden border-2">
            <CardContent className="p-12 md:p-20 text-center space-y-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-mystic mb-4">
                <Home className="w-10 h-10 text-primary-foreground" />
              </div>
              
              <h2 className="text-5xl md:text-6xl font-serif font-bold leading-tight text-foreground">
                Ready to bring something
                <br />
                <span className="text-7xl font-script bg-gradient-mystic bg-clip-text text-transparent">
                  meaningful
                </span>
                <br />
                into your world?
              </h2>
              
              <p className="text-2xl max-w-3xl mx-auto leading-relaxed text-muted-foreground">
                What we surround ourselves with shapes our daily experience. 
                My work invites you to feel genuinely seen and supported.
              </p>
              
              <div className="flex flex-wrap gap-6 justify-center pt-8">
                <Button asChild size="lg" className="text-xl px-10 py-7 shadow-elevated hover:scale-105 transition-smooth">
                  <Link to="/contact">Get in Touch</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-xl px-10 py-7 border-2 hover:scale-105 transition-smooth">
                  <Link to="/gallery">View Gallery</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;