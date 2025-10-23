import { Instagram, Facebook, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-2xl font-script text-primary">Feya Bloom Studio</h3>
            <p className="text-muted-foreground text-sm">
              Creating beauty through design—blending utility, ergonomics, and aesthetics.
            </p>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Connect With Us</h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-accent hover:bg-accent/80 transition-colors flex items-center justify-center"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 text-accent-foreground" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-accent hover:bg-accent/80 transition-colors flex items-center justify-center"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 text-accent-foreground" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-accent hover:bg-accent/80 transition-colors flex items-center justify-center"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 text-accent-foreground" />
              </a>
              <a
                href="mailto:hello@feyabloom.com"
                className="w-10 h-10 rounded-full bg-accent hover:bg-accent/80 transition-colors flex items-center justify-center"
                aria-label="Email"
              >
                <Mail className="h-5 w-5 text-accent-foreground" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Feya Bloom Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
