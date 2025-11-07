import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Minus, RotateCcw } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

interface HaxTraceZoomControlsProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export const HaxTraceZoomControls = ({ canvasRef }: HaxTraceZoomControlsProps) => {
  const [zoom, setZoom] = useState(100);

  const handleZoomIn = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const event = new CustomEvent('haxzoom', { detail: { action: 'in' } });
    canvas.dispatchEvent(event);
  };

  const handleZoomOut = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const event = new CustomEvent('haxzoom', { detail: { action: 'out' } });
    canvas.dispatchEvent(event);
  };

  const handleZoomReset = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const event = new CustomEvent('haxzoom', { detail: { action: 'reset' } });
    canvas.dispatchEvent(event);
    setZoom(100);
  };

  return (
    <Card className="absolute bottom-4 right-4 p-2" data-testid="card-zoom-controls">
      <div className="flex flex-col gap-2">
        <Button
          data-testid="button-zoom-in"
          size="sm"
          variant="ghost"
          onClick={handleZoomIn}
          title="Zoom In"
        >
          <Plus className="w-4 h-4" />
        </Button>
        <div className="text-xs text-center text-muted-foreground px-2" data-testid="text-zoom-level">
          {zoom}%
        </div>
        <Button
          data-testid="button-zoom-out"
          size="sm"
          variant="ghost"
          onClick={handleZoomOut}
          title="Zoom Out"
        >
          <Minus className="w-4 h-4" />
        </Button>
        <Button
          data-testid="button-zoom-reset"
          size="sm"
          variant="ghost"
          onClick={handleZoomReset}
          title="Reset Zoom"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
};
