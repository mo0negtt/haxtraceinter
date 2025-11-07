import { Button } from "@/components/ui/button";
import { Settings, HelpCircle, Undo, Redo, Save } from "lucide-react";
import { useEditor } from "@/contexts/EditorContext";
import { ImportExportDialog } from "./ImportExportDialog";
import { useToast } from "@/hooks/use-toast";

interface EditorHeaderConnectedProps {
  onNavigate?: (page: string) => void;
}

export default function EditorHeaderConnected({ onNavigate }: EditorHeaderConnectedProps) {
  const { undo, redo, canUndo, canRedo, saveMap } = useEditor();
  const { toast } = useToast();

  const handleSave = async () => {
    await saveMap();
    toast({
      title: "Map saved",
      description: "Your map has been saved successfully",
    });
  };

  const handleNavClick = (page: string) => {
    console.log(`Navigate to: ${page}`);
    onNavigate?.(page);
  };

  return (
    <header className="h-14 bg-background border-b border-border flex items-center justify-between px-4">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">H</span>
          </div>
          <span className="text-xl font-bold">HaxTrace</span>
        </div>
        
        <nav className="flex items-center gap-1">
          {/* Home button removed */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleNavClick('editor')}
            data-testid="button-nav-editor"
          >
            Editor
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleNavClick('settings')}
            data-testid="button-nav-settings"
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleNavClick('help')}
            data-testid="button-nav-help"
          >
            <HelpCircle className="w-4 h-4 mr-2" />
            Help
          </Button>
        </nav>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={undo}
          disabled={!canUndo}
          data-testid="button-undo"
        >
          <Undo className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={redo}
          disabled={!canRedo}
          data-testid="button-redo"
        >
          <Redo className="w-4 h-4" />
        </Button>
        <div className="h-4 w-px bg-border mx-1" />
        <Button
          variant="default"
          size="sm"
          onClick={handleSave}
          data-testid="button-save-map"
        >
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
        <ImportExportDialog />
      </div>
    </header>
  );
}
