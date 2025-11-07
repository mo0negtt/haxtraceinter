import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Users, Activity, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatsPanelProps {
  open: boolean;
  onClose: () => void;
}

const stats = [
  {
    label: "Usuarios Activos",
    value: "1,234",
    icon: Users,
    color: "text-blue-500",
  },
  {
    label: "Cargas Realizadas",
    value: "5,678",
    icon: Activity,
    color: "text-green-500",
  },
  {
    label: "Rendimiento",
    value: "98.5%",
    icon: TrendingUp,
    color: "text-purple-500",
  },
];

export default function StatsPanel({ open, onClose }: StatsPanelProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent data-testid="panel-stats">
        <SheetHeader>
          <SheetTitle>Estadísticas</SheetTitle>
          <SheetDescription>
            Métricas de uso y rendimiento de la plataforma
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-4 mt-6">
          {stats.map((stat, index) => (
            <Card key={index} className="p-4" data-testid={`stat-card-${index}`}>
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold" data-testid={`stat-value-${index}`}>
                    {stat.value}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
