import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import forestHero from "@/assets/forest-hero.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageSquare, Send, LeafyGreen, Brain, BookOpen, Moon, Brush } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
const Contact = () => {
  const {
    toast
  } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const {
        error
      } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });
      if (error) throw error;
      toast({
        title: "Done!",
        description: "Thank you! I'll get back to you soon 💜"
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Oops :(",
        description: "Something went wrong.. Could you try later?",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  return <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section (same as Gallery) */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${forestHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-3 md:space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-foreground px-4">
              Get in Touch
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Let's create something good together. Reach out to discuss your project ideas.
            </p>
          </div>
        </div>
      </section>

      <div className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">

            <div className="grid md:grid-cols-2 gap-8 md:gap-12">

                <div className="relative p-6 md:p-8 rounded-2xl overflow-hidden bg-card/50 drop-shadow-lg">

  {/* Soft glow background */}
    <div className="relative z-10">
    <p className="text-3xl sm:text-4xl md:text-5xl font-script text-accent text-right mb-12 leading-relaxed">
      The magic happens when we trust the process
    </p>
    <p className="text-lg text-muted-foreground leading-relaxed text-center" >
      Not rushing. Not forcing.<br/>Just feeling.
    </p>
    <p className="text-lg text-muted-foreground leading-relaxed text-center py-4">
      Between what you envision and what wants to emerge. <br/>
      Between tradition and innovation.<br/>
      Your world & mine.
    </p>
  </div>
</div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Your name" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="your@email.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required placeholder="What's this?" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" value={formData.message} onChange={handleChange} required placeholder="Tell me something about..." rows={6} />
                </div>

                <Button type="submit" className="w-full shadow-soft hover:shadow-elevated transition-smooth gap-2" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
<section className="py-16 md:py-24 relative overflow-hidden">
  {/* Soft background */}
  <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
  
  <div className="container mx-auto px-4 md:px-6 relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-5xl mx-auto"
    >
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-center text-primary mb-6">
        What Inspires My Work
      </h2>
      

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {/* Inspiration 1: Nature */}
        <motion.div
          whileHover={{ y: -8 }}
          className="glass-card rounded-2xl p-6 text-center space-y-4"
        >
          <div className="w-16 h-16 mx-auto gradient-feya-bg rounded-full flex items-center justify-center mb-4">
            <LeafyGreen className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-serif font-semibold">Nature's Wisdom</h3>
          <p className="text-muted-foreground">
            The patterns, cycles, and quiet intelligence of the natural world. 
            Everything I create carries a breath of the forest.
          </p>
        </motion.div>

        {/* Inspiration 2: Neurodivergent Minds */}
        <motion.div
          whileHover={{ y: -8 }}
          className="glass-card rounded-2xl p-6 text-center space-y-4"
        >
          <div className="w-16 h-16 mx-auto gradient-feya-bg rounded-full flex items-center justify-center mb-4">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-serif font-semibold">Different Minds</h3>
          <p className="text-muted-foreground">
            ADHD, autism, HSP—minds that think sideways and see what others miss. 
            My tools are for us, by one of us.
          </p>
        </motion.div>

        {/* Inspiration 3: Ancestral Knowledge */}
        <motion.div
          whileHover={{ y: -8 }}
          className="glass-card rounded-2xl p-6 text-center space-y-4"
        >
          <div className="w-16 h-16 mx-auto gradient-feya-bg rounded-full flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-serif font-semibold">Old Ways, New Forms</h3>
          <p className="text-muted-foreground">
            Traditional crafts, herbal wisdom, folklore. Ancient knowledge 
            translated into contemporary language.
          </p>
        </motion.div>

        {/* Inspiration 4: Slow Living */}
        <motion.div
          whileHover={{ y: -8 }}
          className="glass-card rounded-2xl p-6 text-center space-y-4"
        >
          <div className="w-16 h-16 mx-auto gradient-feya-bg rounded-full flex items-center justify-center mb-4">
            <Moon className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-serif font-semibold">Intentional Living</h3>
          <p className="text-muted-foreground">
            Rejecting hustle culture. Embracing rest, cycles, and work that 
            honors human rhythms over productivity myths.
          </p>
        </motion.div>

        {/* Inspiration 5: Craftsmanship */}
        <motion.div
          whileHover={{ y: -8 }}
          className="glass-card rounded-2xl p-6 text-center space-y-4"
        >
          <div className="w-16 h-16 mx-auto gradient-feya-bg rounded-full flex items-center justify-center mb-4">
            <Brush className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-serif font-semibold">Handmade with Care</h3>
          <p className="text-muted-foreground">
            No mass production. Every piece carries the mark 
            of human hands and thoughtful intention.
          </p>
        </motion.div>

        {/* Inspiration 6: Honest Communication */}
        <motion.div
          whileHover={{ y: -8 }}
          className="glass-card rounded-2xl p-6 text-center space-y-4"
        >
          <div className="w-16 h-16 mx-auto gradient-feya-bg rounded-full flex items-center justify-center mb-4">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-serif font-semibold">No Bullshit</h3>
          <p className="text-muted-foreground">
            Clear communication. Real talk. If something won't work, I'll tell you. 
            If it will—I'll make it happen.
          </p>
        </motion.div>
      </div>

      {/* Call-out box */}
      <div className="bg-secondary rounded-2xl p-8 md:p-12 text-center text-white">
        <p className="text-2xl md:text-3xl font-script mb-4">
          Does this feel like home?
        </p>
        <p className="text-lg max-w-2xl mx-auto opacity-90">
          If you nodded along reading this, we're probably a good match. 
        </p>
        
      </div>
    </motion.div>
  </div>
</section>
      <Footer />
    </div>;
};
export default Contact;