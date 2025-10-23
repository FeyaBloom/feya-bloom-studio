import { Instagram, Facebook, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-2xl font-script text-primary">Feya Bloom Studio</h3>
            <p className="text-muted-foreground text-sm">
              Creating beauty through design—blending utility, ergonomics, and aesthetics.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Home
              </Link>
              <Link to="/gallery" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Gallery
              </Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Contact
              </Link>
            </nav>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Connect With Us</h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-background hover:bg-primary/10 transition-colors group"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-background hover:bg-primary/10 transition-colors group"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-background hover:bg-primary/10 transition-colors group"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
              <a
                href="mailto:hello@feyabloom.com"
                className="p-2 rounded-full bg-background hover:bg-primary/10 transition-colors group"
                aria-label="Email"
              >
                <Mail className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
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
