import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Grid3x3, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { useHaxTrace } from '@/contexts/HaxTraceContext';

export const ViewControls = () => {
  const { gridVisible, toggleGrid, gridSize, setGridSize, zoom, setZoom } = useHaxTrace();

  return (
    <div className="space-y-5" data-testid="card-view-controls">
      <div className="flex items-center justify-between p-3 rounded-lg bg-sidebar-accent/50 border border-sidebar-border">
        <Label htmlFor="grid-toggle" className="text-sm font-medium text-sidebar-foreground">Show Grid</Label>
        <Button
          id="grid-toggle"
          data-testid="button-toggle-grid"
          size="sm"
          variant={gridVisible ? 'default' : 'outline'}
          onClick={toggleGrid}
          className="h-9 w-9 p-0 transition-all duration-200"
        >
          <Grid3x3 className="w-4 h-4" />
        </Button>
      </div>

      {gridVisible && (
        <div className="space-y-2 p-3 rounded-lg bg-sidebar-accent/50 border border-sidebar-border">
          <Label htmlFor="grid-size" className="text-sm font-medium text-sidebar-foreground">Grid Size</Label>
          <Input
            id="grid-size"
            data-testid="input-grid-size"
            type="number"
            value={gridSize}
            onChange={(e) => setGridSize(Number(e.target.value))}
            min={10}
            max={200}
            step={10}
            className="h-9 bg-sidebar-accent border-sidebar-border font-mono"
          />
        </div>
      )}

      <div className="space-y-3 p-3 rounded-lg bg-sidebar-accent/50 border border-sidebar-border">
        <Label htmlFor="zoom-level" className="text-sm font-medium text-sidebar-foreground">Zoom Level</Label>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setZoom(zoom / 1.2)}
            disabled={zoom <= 0.1}
            data-testid="button-zoom-out"
            className="h-9 w-9 p-0 transition-all duration-200 hover:scale-105"
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <div className="flex-1 text-center">
            <div className="text-sm font-mono font-bold text-primary bg-background px-3 py-1.5 rounded">
              {Math.round(zoom * 100)}%
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setZoom(zoom * 1.2)}
            disabled={zoom >= 5}
            data-testid="button-zoom-in"
            className="h-9 w-9 p-0 transition-all duration-200 hover:scale-105"
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
        </div>
        <Slider
          id="zoom-level"
          data-testid="slider-zoom-level"
          value={[zoom * 100]}
          onValueChange={(values) => setZoom(values[0] / 100)}
          min={10}
          max={500}
          step={10}
          className="py-2"
        />
      </div>

      <Button
        size="sm"
        variant="outline"
        onClick={() => setZoom(1)}
        data-testid="button-reset-zoom"
        className="w-full h-9 transition-all duration-200 hover:scale-[1.02]"
      >
        <Maximize2 className="w-4 h-4 mr-2" />
        Reset View
      </Button>
    </div>
  );
};
