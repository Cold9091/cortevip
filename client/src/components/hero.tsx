import { MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import logoPath from "@assets/WhatsApp Image 2025-09-26 at 16.55.50 1_1759270404918.png";

export default function Hero() {
  return (
    <header className="relative min-h-screen flex items-center justify-center px-4 py-12 overflow-hidden" data-testid="hero-section">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, hsl(var(--border)) 10px, hsl(var(--border)) 11px)" }}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 flex justify-center"
        >
          <img 
            src={logoPath} 
            alt="CORTE VIP Logo - Tesoura Infinita com Coroa Dourada" 
            className="w-48 h-48 md:w-64 md:h-64 object-contain"
            data-testid="img-logo"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-primary"
          data-testid="text-title"
        >
          CORTE VIP
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          data-testid="text-subtitle"
        >
          Excelência em Cuidados Masculinos
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm md:text-base"
        >
          <div className="flex items-center gap-2" data-testid="info-location">
            <MapPin className="w-5 h-5 text-primary" />
            <span>Outlets Shopping Mall, Luanda</span>
          </div>
          <div className="flex items-center gap-2" data-testid="info-phone">
            <Phone className="w-5 h-5 text-primary" />
            <span>+244 923 542 349</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12 animate-bounce-slow"
        >
          <svg className="w-6 h-6 mx-auto text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>
    </header>
  );
}
