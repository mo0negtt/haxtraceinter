import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useEditor } from "@/contexts/EditorContext";
import { useState } from "react";
import { Download, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ImportExportDialog() {
  const { exportMap, importMap } = useEditor();
  const [importData, setImportData] = useState("");
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const { toast } = useToast();

  const handleExport = () => {
    const data = exportMap();
    navigator.clipboard.writeText(data);
    toast({
      title: "Map exported",
      description: "Map data copied to clipboard",
    });
  };

  const handleDownload = () => {
    const data = exportMap();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'map.json';
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Map downloaded",
      description: "Map saved to downloads folder",
    });
  };

  const handleImport = () => {
    try {
      importMap(importData);
      setIsImportOpen(false);
      setImportData("");
      toast({
        title: "Map imported",
        description: "Map loaded successfully",
      });
    } catch (error) {
      toast({
        title: "Import failed",
        description: "Invalid map data",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex gap-2">
      <Dialog open={isExportOpen} onOpenChange={setIsExportOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" data-testid="button-export-map">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Map</DialogTitle>
            <DialogDescription>
              Download or copy your map data to clipboard
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              value={exportMap()}
              readOnly
              className="font-mono text-xs h-64"
              data-testid="textarea-export-data"
            />
            <div className="flex gap-2">
              <Button onClick={handleExport} className="flex-1" data-testid="button-copy-export">
                Copy to Clipboard
              </Button>
              <Button onClick={handleDownload} variant="outline" className="flex-1" data-testid="button-download-export">
                Download JSON
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isImportOpen} onOpenChange={setIsImportOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" data-testid="button-import-map">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import Map</DialogTitle>
            <DialogDescription>
              Paste your map JSON data below
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              value={importData}
              onChange={(e) => setImportData(e.target.value)}
              placeholder="Paste map JSON here..."
              className="font-mono text-xs h-64"
              data-testid="textarea-import-data"
            />
            <Button onClick={handleImport} className="w-full" data-testid="button-submit-import">
              Import Map
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
