import { Instagram, Facebook, Linkedin, Mail, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
const Footer = () => {
  return <footer className="border-t bg-muted/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
          {/* About */}
          <div className="space-y-3 md:space-y-4 text-center sm:text-left">
            <h3 className="text-xl md:text-2xl font-script text-primary">Feya Bloom Studio</h3>
            <p className="text-muted-foreground text-xs md:text-sm">Beauty that serves • Art that resonates</p>
          </div>

          {/* Social Media */}
          <div className="space-y-3 md:space-y-4">
            <h3 className="text-accent text-center font-semibold text-lg md:text-xl sm:text-left">Connect With Me</h3>
            <div className="flex gap-3 md:gap-4 justify-center sm:justify-start">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-accent hover:bg-secondary transition-colors flex items-center justify-center" aria-label="Instagram">
                <Instagram className="h-4 w-4 md:h-5 md:w-5 text-white" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-accent hover:bg-secondary transition-colors flex items-center justify-center" aria-label="Facebook">
                <Facebook className="h-4 w-4 md:h-5 md:w-5 text-white" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-accent hover:bg-secondary transition-colors flex items-center justify-center" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4 md:h-5 md:w-5 text-white" />
              </a>
              <a href="mailto:hello@feyabloom.com" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-accent hover:bg-secondary transition-colors flex items-center justify-center" aria-label="Email">
                <Youtube className="h-4 w-4 md:h-5 md:w-5 text-white" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-3 md:pt-4 mt-4 border-t text-center text-xs md:text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Feya Bloom Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;