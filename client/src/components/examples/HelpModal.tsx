import { useState } from "react";
import HelpModal from "../HelpModal";
import { Button } from "@/components/ui/button";

export default function HelpModalExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-8">
      <Button onClick={() => setOpen(true)}>Abrir Ayuda</Button>
      <HelpModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
