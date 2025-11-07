import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Keyboard } from "lucide-react";

interface HelpModalProps {
  open: boolean;
  onClose: () => void;
}

const shortcuts = [
  { key: "E", description: "Abrir Emphasize" },
  { key: "D", description: "Abrir Editor" },
  { key: "/?", description: "Mostrar esta ayuda" },
  { key: "Ctrl + K", description: "Buscar herramientas" },
];

export default function HelpModal({ open, onClose }: HelpModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent data-testid="modal-help">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Keyboard className="h-5 w-5" />
            Atajos de Teclado
          </DialogTitle>
          <DialogDescription>
            Usa estos atajos para navegar más rápido
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 mt-4">
          {shortcuts.map((shortcut, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 border-b last:border-0"
              data-testid={`shortcut-item-${index}`}
            >
              <span className="text-sm text-muted-foreground">
                {shortcut.description}
              </span>
              <kbd className="px-3 py-1.5 text-sm font-mono bg-muted rounded border">
                {shortcut.key}
              </kbd>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
