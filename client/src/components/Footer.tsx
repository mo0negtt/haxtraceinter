import { Github, Twitter, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FooterProps {
  onFeedbackClick?: () => void;
}

export default function Footer({ onFeedbackClick }: FooterProps) {
  return (
    <footer className="border-t mt-auto bg-muted/30">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center gap-8 text-center">
          <div className="flex items-center gap-2 text-base">
            <span data-testid="text-attribution">Hecho con</span>
            <Heart className="h-5 w-5 text-destructive fill-destructive animate-pulse" />
            <span>por HaxTrace</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onFeedbackClick}
              data-testid="button-feedback"
            >
              Feedback
            </Button>
            <Button
              variant="ghost"
              size="sm"
              asChild
              data-testid="link-privacy"
            >
              <a href="#privacy">Privacidad</a>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              asChild
              data-testid="link-terms"
            >
              <a href="#terms">Términos</a>
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              asChild
              data-testid="link-github"
            >
              <a href="#github" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              data-testid="link-twitter"
            >
              <a href="#twitter" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground" data-testid="text-copyright">
            © 2025 mo0negtt. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
