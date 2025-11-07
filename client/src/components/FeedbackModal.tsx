import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FeedbackModalProps {
  open: boolean;
  onClose: () => void;
}

export default function FeedbackModal({ open, onClose }: FeedbackModalProps) {
  const [feedback, setFeedback] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!feedback.trim()) return;
    
    console.log("Feedback enviado:", feedback);
    toast({
      title: "¡Gracias por tu feedback!",
      description: "Hemos recibido tu comentario.",
    });
    setFeedback("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent data-testid="modal-feedback">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Enviar Feedback
          </DialogTitle>
          <DialogDescription>
            Cuéntanos qué piensas sobre HaxTrace
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Textarea
            placeholder="Escribe tu comentario aquí..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={5}
            data-testid="textarea-feedback"
          />
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            data-testid="button-cancel-feedback"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!feedback.trim()}
            data-testid="button-submit-feedback"
          >
            Enviar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
