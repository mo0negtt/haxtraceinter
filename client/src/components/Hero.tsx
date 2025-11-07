import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Rocket } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
      
      <motion.div
        className="absolute top-20 left-10 text-primary/20"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkles className="w-16 h-16" />
      </motion.div>
      
      <motion.div
        className="absolute bottom-32 right-20 text-primary/20"
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -15, 0]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <Zap className="w-20 h-20" />
      </motion.div>
      
      <motion.div
        className="absolute top-1/3 right-10 text-primary/15"
        animate={{ 
          y: [0, -15, 0],
          x: [0, 10, 0]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <Rocket className="w-14 h-14" />
      </motion.div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          className="inline-block mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            Herramientas profesionales
          </span>
        </motion.div>
        
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          data-testid="text-hero-title"
        >
          Potencia tus proyectos
        </motion.h1>
        
        <motion.p
          className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          data-testid="text-hero-subtitle"
        >
          Y descubre herramientas útiles para desarrolladores!
        </motion.p>
        
        <motion.div
          className="flex justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Button
            size="lg"
            className="text-base px-10 min-h-12 shadow-lg shadow-primary/20"
            asChild
            data-testid="button-web-app"
          >
            <a href="#tools">
              Ver Herramientas
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
