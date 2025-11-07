import ToolCard from "../ToolCard";
import { Sparkles } from "lucide-react";

export default function ToolCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <ToolCard
        title="Emphasize"
        description="Herramienta de énfasis para resaltar y trabajar con contenido visual"
        icon={<Sparkles className="w-7 h-7 text-primary" />}
        url="https://mo0negtt.github.io/ilovehax/"
        index={0}
        isNew={true}
      />
    </div>
  );
}
