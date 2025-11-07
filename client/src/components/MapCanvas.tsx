import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

interface MapCanvasProps {
  gridSize?: number;
  tileSize?: number;
}

export default function MapCanvas({ gridSize = 32, tileSize = 32 }: MapCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zoom, setZoom] = useState(100);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);

    ctx.fillStyle = 'hsl(0, 0%, 9%)';
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

    ctx.strokeStyle = 'hsl(0, 0%, 15%)';
    ctx.lineWidth = 1;

    const cols = Math.ceil(canvas.offsetWidth / tileSize);
    const rows = Math.ceil(canvas.offsetHeight / tileSize);

    for (let i = 0; i <= cols; i++) {
      ctx.beginPath();
      ctx.moveTo(i * tileSize, 0);
      ctx.lineTo(i * tileSize, canvas.offsetHeight);
      ctx.stroke();
    }

    for (let i = 0; i <= rows; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * tileSize);
      ctx.lineTo(canvas.offsetWidth, i * tileSize);
      ctx.stroke();
    }
  }, [tileSize]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / tileSize);
    const y = Math.floor((e.clientY - rect.top) / tileSize);
    setMousePos({ x, y });
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 200));
    console.log('Zoom in');
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 25));
    console.log('Zoom out');
  };

  const handleResetZoom = () => {
    setZoom(100);
    console.log('Reset zoom');
  };

  return (
    <div className="relative flex-1 bg-[hsl(0,0%,9%)] overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-crosshair"
        onMouseMove={handleMouseMove}
        data-testid="canvas-map-editor"
      />
      
      <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm rounded-md p-2 flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={handleZoomOut}
          data-testid="button-zoom-out"
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
        <button
          onClick={handleResetZoom}
          className="px-3 py-1 text-xs font-mono hover-elevate active-elevate-2 rounded-md"
          data-testid="button-reset-zoom"
        >
          {zoom}%
        </button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={handleZoomIn}
          data-testid="button-zoom-in"
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
        <div className="h-4 w-px bg-border mx-1" />
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => console.log('Fit to screen')}
          data-testid="button-fit-screen"
        >
          <Maximize2 className="w-4 h-4" />
        </Button>
      </div>

      <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-sm rounded-md px-3 py-2">
        <p className="text-xs font-mono" data-testid="text-mouse-position">
          X: {mousePos.x} Y: {mousePos.y}
        </p>
      </div>
    </div>
  );
}
