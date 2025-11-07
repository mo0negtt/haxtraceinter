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
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Tool = 'select' | 'pencil' | 'eraser' | 'fill' | 'rectangle' | 'circle' | 'move' | 'pan';

interface ToolPaletteProps {
  activeTool?: Tool;
  onToolChange?: (tool: Tool) => void;
}

const tools = [
  { id: 'select' as Tool, icon: MousePointer2, label: 'Select', shortcut: 'V' },
  { id: 'pencil' as Tool, icon: Pencil, label: 'Pencil', shortcut: 'B' },
  { id: 'eraser' as Tool, icon: Eraser, label: 'Eraser', shortcut: 'E' },
  { id: 'fill' as Tool, icon: PaintBucket, label: 'Fill', shortcut: 'F' },
  { id: 'rectangle' as Tool, icon: Square, label: 'Rectangle', shortcut: 'R' },
  { id: 'circle' as Tool, icon: Circle, label: 'Circle', shortcut: 'C' },
  { id: 'move' as Tool, icon: Move, label: 'Move', shortcut: 'M' },
  { id: 'pan' as Tool, icon: Hand, label: 'Pan', shortcut: 'H' },
];

export default function ToolPalette({ activeTool: controlledTool, onToolChange }: ToolPaletteProps) {
  const [internalTool, setInternalTool] = useState<Tool>('pencil');
  const activeTool = controlledTool ?? internalTool;

  const handleToolClick = (tool: Tool) => {
    console.log(`Tool selected: ${tool}`);
    setInternalTool(tool);
    onToolChange?.(tool);
  };

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
                onClick={() => handleToolClick(tool.id)}
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
