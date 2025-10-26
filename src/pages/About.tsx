import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import heroImage from "@/assets/mood-aurora.png";
import { Palette, Sparkles, Lightbulb, Heart, Compass, Layers, Home } from "lucide-react";
const About = () => {
  const directions = [{
    icon: Palette,
    title: "Original Art",
    description: "Paintings & Sculptures"
  }, {
    icon: Sparkles,
    title: "Wearable Art",
    description: "Artisan pieces with emotional depth"
  }, {
    icon: Lightbulb,
    title: "Digital Tools",
    description: "ADHD-friendly systems for creative entrepreneurs"
  }, {
    icon: Heart,
    title: "Ancestral Wisdom",
    description: "Wellness practices & timeless knowledge"
  }];
  const values = [{
    icon: Compass,
    title: "Purpose",
    description: "Every piece serves a purpose, blending intuition with intentional design"
  }, {
    icon: Layers,
    title: "Harmony",
    description: "Visual beauty meets tangible usefulness"
  }, {
    icon: Heart,
    title: "Authenticity",
    description: "Custom creations that become extensions of your authentic self"
  }];
  const process = [{
    step: "01",
    title: "Feel",
    description: "Understanding the emotional core"
  }, {
    step: "02",
    title: "Design",
    description: "Blending intuition with intention"
  }, {
    step: "03",
    title: "Craft",
    description: "Handmade with care and precision"
  }, {
    step: "04",
    title: "Deliver",
    description: "Pieces that enhance your world"
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
  return <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-32 px-6 overflow-hidden">
        {/* Animated background gradients */}
        <div className="absolute inset-0 gradient-mystic opacity-20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
              <div className="inline-block">
                <h1 className="text-6xl md:text-7xl font-script gradient-mystic mb-4 text-amber-50 lg:text-8xl">
                  Feya Bloom
                </h1>
                <div className="h-1 w-32 gradient-mystic rounded-full" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-foreground leading-tight">
                Multidisciplinary Artist & Designer
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Creating handmade art, functional tools, and meaningful objects for those seeking beauty with purpose.
              </p>
              <div className="flex gap-4 pt-4">
                <Button asChild size="lg" className="shadow-elevated hover:shadow-soft transition-smooth">
                  <Link to="/contact">Start a Project</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="backdrop-blur-sm">
                  <Link to="/gallery">View Work</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
              <div className="absolute -inset-4 gradient-mystic opacity-20 blur-2xl rounded-3xl" />
              <div className="relative rounded-3xl overflow-hidden shadow-elevated hover:shadow-soft transition-smooth group">
                <img src={heroImage} alt="Feya Bloom Studio" className="w-full h-full object-cover group-hover:scale-105 transition-smooth" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 gradient-aurora" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-30" />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <blockquote className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground italic leading-tight">
              "Everything I create begins<br />with a question:
              <span className="block mt-4 bg-clip-text gradient-mystic text-5xl md:text-6xl lg:text-7xl font-bold not-italic text-amber-50">How does this feel?</span>"
            </blockquote>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {directions.map((direction, index) => <Card key={direction.title} className="group hover:shadow-elevated transition-smooth animate-in fade-in slide-in-from-bottom-8 duration-1000 border-0 bg-card/80 backdrop-blur-sm hover:-translate-y-2" style={{
            animationDelay: `${index * 150}ms`
          }}>
                <CardContent className="p-8 text-center relative overflow-hidden">
                  <div className="absolute inset-0 gradient-ethereal opacity-0 group-hover:opacity-100 transition-smooth" />
                  <div className="relative z-10">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-smooth">
                      <direction.icon className="w-8 h-8 text-primary group-hover:scale-125 transition-smooth" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold mb-3 group-hover:text-primary transition-smooth">
                      {direction.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {direction.description}
                    </p>
                  </div>
                </CardContent>
              </Card>)}
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
            {values.map((value, index) => <div key={value.title} className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{
            animationDelay: `${index * 100}ms`
          }}>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-serif font-semibold">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <h2 className="text-5xl font-serif font-bold text-center mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            From Vision to <span className="text-transparent bg-clip-text gradient-mystic">Reality</span>
          </h2>
          
          <div className="grid md:grid-cols-4 gap-12 relative">
            {/* Connection line with gradient */}
            <div className="hidden md:block absolute top-24 left-16 right-16 h-1 gradient-mystic rounded-full opacity-30" />
            
            {process.map((step, index) => <div key={step.title} className="relative animate-in fade-in slide-in-from-bottom-8 duration-1000 group" style={{
            animationDelay: `${index * 150}ms`
          }}>
                <div className="text-center space-y-6">
                  <div className="relative inline-flex">
                    <div className="absolute inset-0 gradient-mystic blur-xl opacity-0 group-hover:opacity-50 transition-smooth" />
                    <div className="relative w-20 h-20 rounded-full gradient-mystic flex items-center justify-center shadow-elevated group-hover:scale-110 transition-smooth">
                      <span className="text-3xl font-bold text-primary-foreground">
                        {step.step}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-3xl font-serif font-bold group-hover:text-primary transition-smooth">
                    {step.title}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>)}
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
            {offerings.map((offering, index) => <Link key={offering.title} to={`/gallery?category=${offering.category}`} className="group">
                <Card className="h-full hover:shadow-elevated transition-smooth animate-in fade-in slide-in-from-bottom-4 duration-700" style={{
              animationDelay: `${index * 100}ms`
            }}>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-serif font-semibold mb-2 group-hover:text-primary transition-smooth">
                      {offering.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {offering.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>)}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 gradient-mystic opacity-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl animate-pulse" />
        
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="bg-card/80 backdrop-blur-xl rounded-3xl p-12 md:p-16 shadow-elevated border border-primary/20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="text-center space-y-8">
              <div className="inline-block">
                <Home className="w-16 h-16 text-primary mx-auto mb-6 animate-pulse" />
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
                Ready to bring something<br />
                <span className="text-transparent bg-clip-text gradient-mystic">meaningful</span> into your world?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                What we surround ourselves with shapes our daily experience. My work invites you to feel genuinely seen and supported.
              </p>
              <div className="flex flex-wrap gap-6 justify-center pt-6">
                <Button asChild size="lg" className="text-lg px-8 py-6 shadow-elevated hover:shadow-soft transition-smooth">
                  <Link to="/contact">Get in Touch</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 backdrop-blur-sm border-2">
                  <Link to="/gallery">View Gallery</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default About;