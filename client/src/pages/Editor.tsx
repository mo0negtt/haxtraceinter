import EditorHeader from "@/components/EditorHeader";
import ToolPalette from "@/components/ToolPalette";
import MapSettings from "@/components/MapSettings";
import MapCanvas from "@/components/MapCanvas";
import LayersPanel from "@/components/LayersPanel";
import PropertiesPanel from "@/components/PropertiesPanel";
import TilePalette from "@/components/TilePalette";

export default function Editor() {
  return (
    <div className="h-screen flex flex-col bg-background text-foreground">
      <EditorHeader />
      
      <div className="flex-1 flex overflow-hidden">
        <ToolPalette />
        
        <MapSettings />
        
        <MapCanvas />
        
        <div className="flex flex-col">
          <LayersPanel />
          <PropertiesPanel />
          <TilePalette />
        </div>
      </div>
    </div>
  );
}
