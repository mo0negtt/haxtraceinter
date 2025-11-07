import { useState } from "react";
import FeedbackModal from "../FeedbackModal";
import { Button } from "@/components/ui/button";

export default function FeedbackModalExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-8">
      <Button onClick={() => setOpen(true)}>Abrir Feedback</Button>
      <FeedbackModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
