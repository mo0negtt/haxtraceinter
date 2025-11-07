import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  url: string;
  index: number;
  isNew?: boolean;
}

export default function ToolCard({
  title,
  description,
  icon,
  url,
  index,
  isNew = false,
}: ToolCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group"
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
        data-testid={`link-tool-${title.toLowerCase()}`}
      >
        <Card className="p-8 hover-elevate active-elevate-2 transition-all duration-300 hover:-translate-y-2 h-full flex flex-col relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {isNew && (
            <Badge className="absolute top-4 right-4 bg-primary z-10" data-testid="badge-new">
              ¡Nuevo!
            </Badge>
          )}
          
          <div className="relative z-10 flex flex-col h-full">
            <div className="w-16 h-16 flex items-center justify-center bg-primary/10 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
              {icon}
            </div>
            
            <div className="flex-1">
              <div className="flex items-start justify-between mb-3">
                <h3
                  className="text-xl font-bold group-hover:text-primary transition-colors"
                  data-testid={`text-tool-title-${title.toLowerCase()}`}
                >
                  {title}
                </h3>
                <ExternalLink className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity ml-2 flex-shrink-0" />
              </div>
              
              <p
                className="text-sm text-muted-foreground leading-relaxed"
                data-testid={`text-tool-description-${title.toLowerCase()}`}
              >
                {description}
              </p>
            </div>
          </div>
        </Card>
      </a>
    </motion.div>
  );
}
