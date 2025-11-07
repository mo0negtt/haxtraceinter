import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function PropertiesPanel() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [tileColor, setTileColor] = useState("#3b82f6");
  const [opacity, setOpacity] = useState("100");

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
                value={tileColor}
                onChange={(e) => setTileColor(e.target.value)}
                className="h-9 w-12 rounded-md border border-input cursor-pointer"
                data-testid="input-tile-color"
              />
              <Input
                value={tileColor}
                onChange={(e) => setTileColor(e.target.value)}
                className="h-9 flex-1 font-mono text-xs"
                data-testid="input-tile-color-hex"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="opacity" className="text-xs uppercase tracking-wide text-muted-foreground">
              Opacity (%)
            </Label>
            <Input
              id="opacity"
              type="number"
              min="0"
              max="100"
              value={opacity}
              onChange={(e) => setOpacity(e.target.value)}
              className="h-9"
              data-testid="input-opacity"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wide text-muted-foreground">
              Position
            </Label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="pos-x" className="text-xs text-muted-foreground">X</Label>
                <Input
                  id="pos-x"
                  value="0"
                  readOnly
                  className="h-8 font-mono text-xs mt-1"
                  data-testid="input-position-x"
                />
              </div>
              <div>
                <Label htmlFor="pos-y" className="text-xs text-muted-foreground">Y</Label>
                <Input
                  id="pos-y"
                  value="0"
                  readOnly
                  className="h-8 font-mono text-xs mt-1"
                  data-testid="input-position-y"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
