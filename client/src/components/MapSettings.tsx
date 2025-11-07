import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function MapSettings() {
  const [mapName, setMapName] = useState("Untitled Map");
  const [width, setWidth] = useState("32");
  const [height, setHeight] = useState("24");
  const [tileSize, setTileSize] = useState("32");
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="w-70 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-4 border-b border-sidebar-border">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 w-full text-left hover-elevate active-elevate-2 rounded-md p-2 -m-2"
          data-testid="button-toggle-map-settings"
        >
          {isExpanded ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
          <span className="text-xs font-semibold uppercase tracking-wide">Map Settings</span>
        </button>
      </div>
      
      {isExpanded && (
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="map-name" className="text-xs uppercase tracking-wide">
              Map Name
            </Label>
            <Input
              id="map-name"
              value={mapName}
              onChange={(e) => setMapName(e.target.value)}
              className="h-9"
              data-testid="input-map-name"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="map-width" className="text-xs uppercase tracking-wide">
                Width
              </Label>
              <Input
                id="map-width"
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="h-9"
                data-testid="input-map-width"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="map-height" className="text-xs uppercase tracking-wide">
                Height
              </Label>
              <Input
                id="map-height"
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="h-9"
                data-testid="input-map-height"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tile-size" className="text-xs uppercase tracking-wide">
              Tile Size (px)
            </Label>
            <Input
              id="tile-size"
              type="number"
              value={tileSize}
              onChange={(e) => setTileSize(e.target.value)}
              className="h-9"
              data-testid="input-tile-size"
            />
          </div>

          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => console.log('Apply settings:', { mapName, width, height, tileSize })}
            data-testid="button-apply-settings"
          >
            Apply Changes
          </Button>
        </div>
      )}
    </div>
  );
}
