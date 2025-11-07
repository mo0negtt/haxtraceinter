import { ThemeProvider } from "@/providers/ThemeProvider";

export default function HomeExample() {
  return (
    <ThemeProvider>
      <div className="p-6">
        <h2 className="text-lg font-semibold">Ejemplo: Home removido</h2>
        <p className="text-sm text-muted-foreground">Este ejemplo ya no renderiza el componente Home.</p>
      </div>
    </ThemeProvider>
  );
}
