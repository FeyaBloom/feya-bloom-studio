import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import heroImage from "@/assets/mood-aurora.png";
import { Heart, Hand, Brain, Home, LeafyGreen, Coffee, Moon, Sparkle, BookOpen, Brush } from "lucide-react";
const About = () => {
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
  const beliefs = ["Beauty should be functional", "Systems should support neurodivergence, not fight it", "Ancestral wisdom isn't 'woo-woo'—it's survival knowledge", "Art is for everyone, not just galleries", "What we surround ourselves with matters"];
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
  return <div className="min-h-screen bg-background">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Quicksand:wght@400;500;600;700&family=Lavishly+Yours&display=swap');
        
        .font-cormorant {
          font-family: 'Cormorant Garamond', serif;
        }
        
        .font-quicksand {
          font-family: 'Quicksand', sans-serif;
        }
        
        .font-lavishly {
          font-family: 'Lavishly Yours', cursive;
        }

        .text-violeta {
          color: #6B4FA3;
        }

        .text-azul {
          color: #4A5F8C;
        }

        .text-sage {
          color: #8BA888;
        }

        .bg-violeta {
          background-color: #6B4FA3;
        }

        .bg-azul {
          background-color: #4A5F8C;
        }

        .bg-sage {
          background-color: #8BA888;
        }

        .gradient-feya {
          background: linear-gradient(135deg, #6B4FA3 0%, #4A5F8C 50%, #8BA888 100%);
        }

        .text-gradient-feya {
          background: linear-gradient(135deg, #6B4FA3 0%, #4A5F8C 50%, #8BA888 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(107, 79, 163, 0.2);
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .handwritten-underline {
          position: relative;
          display: inline-block;
        }

        .handwritten-underline::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -4px;
          width: 100%;
          height: 3px;
          background: linear-gradient(135deg, #6B4FA3 0%, #8BA888 100%);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.6s ease;
        }

        .handwritten-underline:hover::after {
          transform: scaleX(1);
        }
      `}</style>

      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-32 px-6 overflow-hidden" style={{
      backgroundColor: '#F5F0E8'
    }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-violeta rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-sage rounded-full blur-3xl animate-pulse" style={{
          animationDelay: '1s'
        }} />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 font-quicksand">
              <div className="inline-block">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-lavishly text-violeta mb-4">Hi there!
              </h1>
                <div className="h-1 w-32 gradient-feya rounded-full" />
              </div>
              
              <p className="text-2xl font-cormorant leading-relaxed" style={{
              color: '#3D3935'
            }}>
                I create for minds that won't fit the mold—
                <br />and hearts that refuse to settle.
              </p>
              
              <p className="text-lg leading-relaxed" style={{
              color: '#8B8680'
            }}>
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
            </div>

            <div className="relative animate-float">
              <div className="absolute -inset-4 gradient-feya opacity-20 blur-2xl rounded-3xl" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl hover-lift group">
                <img src={heroImage} alt="Feya Bloom Studio" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Journey Section */}
      <section className="relative py-32 px-6 overflow-hidden bg-white">
        <div className="container mx-auto max-w-4xl relative z-10">
          <h2 className="text-5xl font-cormorant font-bold text-center mb-16 text-violeta">
            How I Got Here
          </h2>

          <div className="space-y-8 font-quicksand text-lg leading-relaxed" style={{
          color: '#3D3935'
        }}>
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
              <p className="text-4xl md:text-5xl font-lavishly text-azul handwritten-underline inline-block">
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

            <p className="text-center font-semibold" style={{
            color: '#8B8680'
          }}>
              My work lives at the intersection of:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {directions.map((direction, index) => <Card key={direction.title} className="hover-lift border-2 transition-all duration-300" style={{
            borderColor: index === 0 ? '#6B4FA3' : index === 1 ? '#4A5F8C' : '#8BA888',
            animationDelay: `${index * 150}ms`
          }}>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{
                backgroundColor: `${index === 0 ? '#6B4FA3' : index === 1 ? '#4A5F8C' : '#8BA888'}20`
              }}>
                    <direction.icon className="w-8 h-8" style={{
                  color: index === 0 ? '#6B4FA3' : index === 1 ? '#4A5F8C' : '#8BA888'
                }} />
                  </div>
                  <h3 className="text-xl font-cormorant font-bold mb-2" style={{
                color: '#3D3935'
              }}>
                    {direction.title}
                  </h3>
                  <p className="text-sm font-quicksand" style={{
                color: '#8B8680'
              }}>
                    {direction.description}
                  </p>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* What Makes My Work Different */}
      <section className="py-20 px-6" style={{
      backgroundColor: '#F5F0E8'
    }}>
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-5xl font-cormorant font-bold text-center mb-16 text-violeta">
            What Makes My Work Different
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => <div key={value.title} className="text-center space-y-4 p-6 rounded-2xl bg-white hover-lift" style={{
            animationDelay: `${index * 100}ms`
          }}>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{
              backgroundColor: '#6B4FA320'
            }}>
                  <value.icon className="w-8 h-8 text-violeta" />
                </div>
                <h3 className="text-2xl font-cormorant font-semibold" style={{
              color: '#3D3935'
            }}>
                  {value.title}
                </h3>
                <p className="font-quicksand leading-relaxed" style={{
              color: '#8B8680'
            }}>
                  {value.description}
                </p>
              </div>)}
          </div>
        </div>
      </section>

      {/* What I Believe */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-5xl font-cormorant font-bold text-center mb-16 text-azul">
            What I Stand For
          </h2>

          <div className="space-y-6">
            {beliefs.map((belief, index) => <div key={index} className="flex items-start gap-4 p-6 rounded-xl bg-gradient-to-r from-transparent to-transparent hover:from-sage/10 hover:to-transparent transition-all duration-300">
                <div className="mt-1">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="#8BA888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-lg font-quicksand" style={{
              color: '#3D3935'
            }}>
                  {belief}
                </p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Fun Facts */}
      <section className="py-20 px-6" style={{
      backgroundColor: '#E8DFD3'
    }}>
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-5xl font-cormorant font-bold text-center mb-4 text-violeta">
            Random Things About Me
          </h2>
          <p className="text-center font-lavishly text-azul mb-12 text-5xl">
            because we're all human
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {funFacts.map((fact, index) => <div key={index} className="flex items-start gap-4 p-6 bg-white rounded-xl hover-lift">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{
              backgroundColor: '#6B4FA320'
            }}>
                  <fact.icon className="w-6 h-6 text-violeta" />
                </div>
                <p className="font-quicksand text-lg pt-2" style={{
              color: '#3D3935'
            }}>
                  {fact.text}
                </p>
              </div>)}
          </div>
        </div>
      </section>

      {/* What I Create */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-5xl font-cormorant font-bold text-center mb-4 text-sage">
            What I Create
          </h2>
          <p className="text-center font-quicksand mb-16" style={{
          color: '#8B8680'
        }}>
            Each piece blends intuition with intentional design, beauty with usefulness
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offerings.map((offering, index) => <Link key={offering.title} to={`/gallery?category=${offering.category}`} className="group">
                <Card className="h-full hover-lift border-2 border-transparent hover:border-sage transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-cormorant font-semibold mb-2 group-hover:text-sage transition-colors" style={{
                  color: '#3D3935'
                }}>
                      {offering.title}
                    </h3>
                    <p className="font-quicksand" style={{
                  color: '#8B8680'
                }}>
                      {offering.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>)}
          </div>
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
              <Home className="w-16 h-16 text-violeta mx-auto" />
              
              <h2 className="text-4xl md:text-5xl font-cormorant font-bold leading-tight" style={{
              color: '#3D3935'
            }}>
                Ready to bring something
                <br />
                <span className="text-gradient-feya font-lavishly text-6xl">meaningful</span>
                <br />
                into your world?
              </h2>
              
              <p className="text-xl font-quicksand max-w-2xl mx-auto leading-relaxed" style={{
              color: '#8B8680'
            }}>
                What we surround ourselves with shapes our daily experience. 
                My work invites you to feel genuinely seen and supported.
              </p>
              
              <div className="flex flex-wrap gap-6 justify-center pt-6">
                <Button asChild size="lg" className="text-lg px-8 py-6 bg-violeta hover:bg-opacity-90 shadow-lg font-quicksand">
                  <Link to="/contact">Get in Touch</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 border-2 border-violeta text-violeta hover:bg-violeta hover:text-white font-quicksand">
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