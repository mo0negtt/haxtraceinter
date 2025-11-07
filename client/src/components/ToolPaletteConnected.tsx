import { Button } from "@/components/ui/button";
import { 
  MousePointer2, 
  Pencil, 
  Eraser, 
  PaintBucket, 
  Square, 
  Circle,
  Move,
  Hand
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEditor } from "@/contexts/EditorContext";

const tools = [
  { id: 'select' as const, icon: MousePointer2, label: 'Select', shortcut: 'V' },
  { id: 'pencil' as const, icon: Pencil, label: 'Pencil', shortcut: 'B' },
  { id: 'eraser' as const, icon: Eraser, label: 'Eraser', shortcut: 'E' },
  { id: 'fill' as const, icon: PaintBucket, label: 'Fill', shortcut: 'F' },
  { id: 'rectangle' as const, icon: Square, label: 'Rectangle', shortcut: 'R' },
  { id: 'circle' as const, icon: Circle, label: 'Circle', shortcut: 'C' },
  { id: 'move' as const, icon: Move, label: 'Move', shortcut: 'M' },
  { id: 'pan' as const, icon: Hand, label: 'Pan', shortcut: 'H' },
];

export default function ToolPaletteConnected() {
  const { activeTool, setActiveTool } = useEditor();

  return (
    <div className="w-14 bg-card border-r border-card-border flex flex-col items-center py-4 gap-1">
      {tools.map((tool) => {
        const Icon = tool.icon;
        const isActive = activeTool === tool.id;
        
        return (
          <Tooltip key={tool.id}>
            <TooltipTrigger asChild>
              <Button
                variant={isActive ? "default" : "ghost"}
                size="icon"
                className="w-10 h-10"
                onClick={() => setActiveTool(tool.id)}
                data-testid={`button-tool-${tool.id}`}
              >
                <Icon className="w-5 h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{tool.label} ({tool.shortcut})</p>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}
