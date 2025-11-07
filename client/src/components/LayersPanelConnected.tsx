import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Lock, Unlock, Trash2, Plus, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useEditor } from "@/contexts/EditorContext";

export default function LayersPanelConnected() {
  const [isExpanded, setIsExpanded] = useState(true);
  const {
    currentMap,
    activeLayerId,
    setActiveLayer,
    addLayer,
    removeLayer,
    toggleLayerVisibility,
    toggleLayerLock,
  } = useEditor();

  const layers = currentMap?.layers || [];

  const handleAddLayer = () => {
    addLayer(`Layer ${layers.length + 1}`);
  };

  return (
    <div className="w-80 bg-sidebar border-l border-sidebar-border flex flex-col">
      <div className="p-4 border-b border-sidebar-border">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 w-full text-left hover-elevate active-elevate-2 rounded-md p-2 -m-2"
          data-testid="button-toggle-layers"
        >
          {isExpanded ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
          <span className="text-xs font-semibold uppercase tracking-wide">Layers</span>
        </button>
      </div>

      {isExpanded && (
        <>
          <div className="flex-1 p-2 space-y-1 overflow-y-auto">
            {layers.map((layer) => (
              <div
                key={layer.id}
                className={`group flex items-center gap-2 p-2 rounded-md hover-elevate active-elevate-2 cursor-pointer ${
                  activeLayerId === layer.id ? 'bg-sidebar-accent' : ''
                }`}
                onClick={() => setActiveLayer(layer.id)}
                data-testid={`layer-item-${layer.id}`}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLayerVisibility(layer.id);
                  }}
                  data-testid={`button-layer-visibility-${layer.id}`}
                >
                  {layer.visible ? (
                    <Eye className="w-3 h-3" />
                  ) : (
                    <EyeOff className="w-3 h-3 opacity-50" />
                  )}
                </Button>

                <span className="flex-1 text-sm truncate" data-testid={`text-layer-name-${layer.id}`}>
                  {layer.name}
                </span>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLayerLock(layer.id);
                  }}
                  data-testid={`button-layer-lock-${layer.id}`}
                >
                  {layer.locked ? (
                    <Lock className="w-3 h-3" />
                  ) : (
                    <Unlock className="w-3 h-3 opacity-50" />
                  )}
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 shrink-0 opacity-0 group-hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeLayer(layer.id);
                  }}
                  data-testid={`button-layer-delete-${layer.id}`}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-sidebar-border">
            <Button
              variant="outline"
              className="w-full"
              onClick={handleAddLayer}
              data-testid="button-add-layer"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Layer
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
