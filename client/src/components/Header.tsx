import { Moon, Sun, Search } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logoLight from "@assets/logo-ilh-2_1759793240594.png";
import logoDark from "@assets/logo-ilh-3_1760039600099.png";

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch?.(e.target.value);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center">
            <img
              src={theme === "dark" ? logoDark : logoLight}
              alt="ILoveHax"
              className="h-8 w-auto"
              data-testid="img-logo-main"
            />
          </div>

          <div className="flex-1 max-w-sm hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar..."
                className="pl-9 bg-background/50"
                onChange={handleSearch}
                data-testid="input-search"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              data-testid="button-theme-toggle"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
