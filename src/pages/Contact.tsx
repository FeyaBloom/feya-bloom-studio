import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import forestHero from "@/assets/forest-hero.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, LeafyGreen, Brain, Facebook, Youtube,  Instagram, Github} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  subject: z.string().trim().min(1, "Subject is required").max(200, "Subject must be less than 200 characters"),
  message: z.string().trim().min(1, "Message is required").max(5000, "Message must be less than 5000 characters")
});
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
      // Validate form data
      const validatedData = contactSchema.parse(formData);
      
      const {
        error
      } = await supabase.functions.invoke('send-contact-email', {
        body: validatedData
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
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Oops :(",
          description: "Something went wrong.. Could you try later?",
          variant: "destructive"
        });
      }
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

       <section className="py-6 md:py-12 relative overflow-hidden">
  {/* Soft background */}
  <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
  
  <div className="container mx-auto px-4 md:px-6 relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-5xl mx-auto"
    >
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-center text-secondary mb-6">
        What Inspires My Work
      </h2>

        {/* Inspiration */}
        <div className="p-6 text-center space-y-8 text-lg md:text-xl"
        >
          <p className="text-muted-foreground">
I'm drawn to projects that carry weight—work that helps people grow, supports communities, or makes the world a little less harsh. 
</p>
          <div className="w-8 h-8 mx-auto gradient-feya-bg rounded-full flex items-center justify-center mb-4">
            <LeafyGreen className="w-4 h-4 text-white" />
          </div>
<p>
Nature informs everything: its patterns, cycles, and logic. The way things grow, rest, adapt. That rhythm shows up whether I'm coding, knitting, or researching plants. 
</p>
          <p className="text-muted-foreground">
I'm inspired by people who live intentionally—who create and build because they're genuinely engaged, not performing. Those are the people I make things for. 
</p>
          <div className="w-8 h-8 mx-auto gradient-feya-bg rounded-full flex items-center justify-center mb-4">
            <Brain className="w-4 h-4 text-white" />
          </div>
<p>
And I value coherence. If something doesn't feel sincere in its design, message, or purpose, I won't make it. 
</p>
          <p className="text-muted-foreground pb-16">
I make what I need—and hope it helps someone else too.
          </p>
        </div>

      

      {/* Call-out box */}
      <div className="bg-secondary rounded-2xl p-6 text-center text-white">
        <p className="text-2xl md:text-4xl font-script">
          Does this feel like home?
        </p>
        <p className="text-lg max-w-2xl mx-auto opacity-90">
          If you read this far,
we're probably a good match. 
        </p>
        
      </div>
          </motion.div>
  </div>
</section>



      <section className=" py-16 mb-12 md:mb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">

            <div className="grid md:grid-cols-2 gap-8 md:gap-12">

                <div className="relative p-6 md:p-8 overflow-hidden">

  {/* Soft glow background */}

          <div className="space-y-3 md:space-y-4">
            <h3 className="pb-6 text-accent text-center font-semibold text-2xl sm:text-3xl md:text-4xl sm:text-left">
              Connect With Me</h3>
            <div> {/*className="flex gap-3 md:gap-4 justify-center sm:justify-start">*/}
              <p className="pb-6">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 md:w-10 md:h-10 
              rounded-full bg-accent hover:bg-secondary transition-colors flex items-center justify-center" aria-label="Instagram">
                <Instagram className="h-4 w-4 md:h-5 md:w-5 text-white" />
              </a>Brain journaling on Threads
              </p>
              <p className="pb-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 md:w-10 md:h-10 
              rounded-full bg-accent hover:bg-secondary transition-colors flex items-center justify-center" aria-label="Facebook">
                <Facebook className="h-4 w-4 md:h-5 md:w-5 text-white" />
              </a>Full process backstage on Reddit
              </p>
              <p className="pb-6">
              <a href="https://github.com" target="_blank" className="w-9 h-9 md:w-10 md:h-10
               rounded-full bg-accent hover:bg-secondary transition-colors flex items-center justify-center" aria-label="Github">
                <Github className="h-4 w-4 md:h-5 md:w-5 text-white" />
              </a>Open-source projects on GitHub
              </p>
              <p className="pb-6">
              <a href="https://youtube.com" target="_blank" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-accent
               hover:bg-secondary transition-colors flex items-center justify-center" aria-label="YouTube">
                <Youtube className="h-4 w-4 md:h-5 md:w-5 text-white" />
              </a> Photo & videography experiments </p>
            </div>
          </div>
</div>

              <form onSubmit={handleSubmit} className="space-y-6 p-6">
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
      </section>

        <div className="container mx-auto px-4 md:px-6 py-6 md:py-8 border-t bg-muted/50 backdrop-blur-sm">
        <div className="text-center text-xs md:text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Feya Bloom Studio. All rights reserved.</p>
        </div>
      </div>

    </div>;
};
export default Contact;