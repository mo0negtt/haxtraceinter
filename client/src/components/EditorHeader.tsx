import { Button } from "@/components/ui/button";
import { FileDown, FileUp, Settings, HelpCircle } from "lucide-react";

interface EditorHeaderProps {
  onNavigate?: (page: string) => void;
}

export default function EditorHeader({ onNavigate }: EditorHeaderProps) {
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
            onClick={() => handleNavClick('import-export')}
            data-testid="button-nav-import-export"
          >
            <FileDown className="w-4 h-4 mr-2" />
            Import/Export
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
        <Button variant="outline" size="icon" data-testid="button-user-menu">
          <Settings className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
}
