import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="group relative inline-flex h-12 w-24 items-center rounded-full bg-muted/50 backdrop-blur-sm border border-border/50 transition-all duration-300 hover:shadow-elevated hover:scale-105"
      aria-label="Toggle theme"
    >
      {/* Sliding background */}
      <span
        className={`absolute h-10 w-10 rounded-full bg-gradient-to-br from-primary via-secondary to-accent shadow-soft transition-all duration-500 ease-in-out ${
          theme === "dark" ? "translate-x-[52px]" : "translate-x-1"
        }`}
      />
      
      {/* Sun icon */}
      <span
        className={`relative z-10 ml-2 flex h-8 w-8 items-center justify-center transition-all duration-300 ${
          theme === "light" 
            ? "text-white scale-110" 
            : "text-muted-foreground scale-90"
        }`}
      >
        <Sun className="h-5 w-5" />
      </span>
      
      {/* Moon icon */}
      <span
        className={`relative z-10 ml-2 flex h-8 w-8 items-center justify-center transition-all duration-300 ${
          theme === "dark" 
            ? "text-white scale-110" 
            : "text-muted-foreground scale-90"
        }`}
      >
        <Moon className="h-5 w-5" />
      </span>
    </button>
  );
};

export default ThemeToggle;
