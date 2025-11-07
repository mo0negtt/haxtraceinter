import { useState } from "react";
import StatsPanel from "../StatsPanel";
import { Button } from "@/components/ui/button";

export default function StatsPanelExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-8">
      <Button onClick={() => setOpen(true)}>Abrir Estadísticas</Button>
      <StatsPanel open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
