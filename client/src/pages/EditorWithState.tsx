import EditorHeaderConnected from "@/components/EditorHeaderConnected";
import ToolPaletteConnected from "@/components/ToolPaletteConnected";
import MapSettingsConnected from "@/components/MapSettingsConnected";
import MapCanvasWithTools from "@/components/MapCanvasWithTools";
import LayersPanelConnected from "@/components/LayersPanelConnected";
import PropertiesPanelConnected from "@/components/PropertiesPanelConnected";
import TilePaletteConnected from "@/components/TilePaletteConnected";
import { EditorProvider } from "@/contexts/EditorContext";

export default function EditorWithState() {
  return (
    <EditorProvider>
      <div className="h-screen flex flex-col bg-background text-foreground">
        <EditorHeaderConnected />
        
        <div className="flex-1 flex overflow-hidden">
          <ToolPaletteConnected />
          
          <MapSettingsConnected />
          
          <MapCanvasWithTools />
          
          <div className="flex flex-col">
            <LayersPanelConnected />
            <PropertiesPanelConnected />
            <TilePaletteConnected />
          </div>
        </div>
      </div>
    </EditorProvider>
  );
}
