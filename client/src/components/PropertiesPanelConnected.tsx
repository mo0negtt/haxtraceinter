import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useEditor } from "@/contexts/EditorContext";
import { useState } from "react";

export default function PropertiesPanelConnected() {
  const [isExpanded, setIsExpanded] = useState(true);
  const { selectedTileColor, setSelectedTileColor } = useEditor();

  return (
    <div className="border-t border-sidebar-border">
      <div className="p-4 border-b border-sidebar-border">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 w-full text-left hover-elevate active-elevate-2 rounded-md p-2 -m-2"
          data-testid="button-toggle-properties"
        >
          {isExpanded ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
          <span className="text-xs font-semibold uppercase tracking-wide">Properties</span>
        </button>
      </div>

      {isExpanded && (
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tile-color" className="text-xs uppercase tracking-wide text-muted-foreground">
              Tile Color
            </Label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                id="tile-color"
                value={selectedTileColor}
                onChange={(e) => setSelectedTileColor(e.target.value)}
                className="h-9 w-12 rounded-md border border-input cursor-pointer"
                data-testid="input-tile-color"
              />
              <Input
                value={selectedTileColor}
                onChange={(e) => setSelectedTileColor(e.target.value)}
                className="h-9 flex-1 font-mono text-xs"
                data-testid="input-tile-color-hex"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
