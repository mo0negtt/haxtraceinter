import { ChevronDown, ChevronRight } from "lucide-react";
import { useEditor } from "@/contexts/EditorContext";
import { useState } from "react";

interface Tile {
  id: string;
  color: string;
  name: string;
}

export default function TilePaletteConnected() {
  const [isExpanded, setIsExpanded] = useState(true);
  const { selectedTileColor, setSelectedTileColor } = useEditor();

  const tiles: Tile[] = [
    { id: '1', color: '#10b981', name: 'Grass' },
    { id: '2', color: '#3b82f6', name: 'Water' },
    { id: '3', color: '#f59e0b', name: 'Sand' },
    { id: '4', color: '#6b7280', name: 'Stone' },
    { id: '5', color: '#84cc16', name: 'Forest' },
    { id: '6', color: '#0ea5e9', name: 'Ice' },
    { id: '7', color: '#ec4899', name: 'Lava' },
    { id: '8', color: '#a855f7', name: 'Magic' },
  ];

  return (
    <div className="border-t border-sidebar-border">
      <div className="p-4 border-b border-sidebar-border">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 w-full text-left hover-elevate active-elevate-2 rounded-md p-2 -m-2"
          data-testid="button-toggle-palette"
        >
          {isExpanded ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
          <span className="text-xs font-semibold uppercase tracking-wide">Tile Palette</span>
        </button>
      </div>

      {isExpanded && (
        <div className="p-3">
          <div className="grid grid-cols-4 gap-2">
            {tiles.map((tile) => (
              <button
                key={tile.id}
                onClick={() => setSelectedTileColor(tile.color)}
                className={`aspect-square rounded-md hover-elevate active-elevate-2 transition-all ${
                  selectedTileColor === tile.color ? 'ring-2 ring-primary' : ''
                }`}
                style={{ backgroundColor: tile.color }}
                title={tile.name}
                data-testid={`tile-${tile.id}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
