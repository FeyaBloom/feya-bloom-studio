import { Instagram, Facebook, Linkedin, Mail, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
const Footer = () => {
  return <footer className="border-t bg-muted/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-2xl font-script text-primary">Feya Bloom Studio</h3>
            <p className="text-muted-foreground text-sm">Beauty that serves • Art that resonates</p>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-accent text-center font-semibold text-xl md:text-left">Connect With Me</h3>
            <div className="flex gap-4 justify-center md:justify-start">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-accent hover:bg-secondary transition-colors flex items-center justify-center" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-white" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-accent hover:bg-secondary transition-colors flex items-center justify-center" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-white" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-accent hover:bg-secondary transition-colors flex items-center justify-center" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 text-white" />
              </a>
              <a href="mailto:hello@feyabloom.com" className="w-10 h-10 rounded-full bg-accent hover:bg-secondary transition-colors flex items-center justify-center" aria-label="Email">
                <Youtube className="h-5 w-5 text-white" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Feya Bloom Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;