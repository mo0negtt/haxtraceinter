import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { useEditor } from "@/contexts/EditorContext";

export default function MapCanvasWithTools() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDrawing, setIsDrawing] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState<{ x: number; y: number } | null>(null);
  const [rectStart, setRectStart] = useState<{ x: number; y: number } | null>(null);
  
  const {
    currentMap,
    activeTool,
    activeLayerId,
    selectedTileColor,
    selectedTiles,
    zoom,
    viewportOffset,
    setZoom,
    panViewport,
    addTile,
    removeTile,
    fillArea,
    selectTile,
    clearSelection,
    moveSelectedTiles,
  } = useEditor();

  const renderCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !currentMap) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);

    ctx.fillStyle = 'hsl(0, 0%, 9%)';
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

    ctx.save();
    ctx.translate(viewportOffset.x, viewportOffset.y);

    ctx.strokeStyle = 'hsl(0, 0%, 15%)';
    ctx.lineWidth = 1;

    const tileSize = currentMap.tileSize * (zoom / 100);
    const cols = Math.ceil(canvas.offsetWidth / tileSize);
    const rows = Math.ceil(canvas.offsetHeight / tileSize);

    for (let i = 0; i <= Math.min(cols, currentMap.width); i++) {
      ctx.beginPath();
      ctx.moveTo(i * tileSize, 0);
      ctx.lineTo(i * tileSize, canvas.offsetHeight);
      ctx.stroke();
    }

    for (let i = 0; i <= Math.min(rows, currentMap.height); i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * tileSize);
      ctx.lineTo(canvas.offsetWidth, i * tileSize);
      ctx.stroke();
    }

    currentMap.layers.forEach(layer => {
      if (!layer.visible) return;
      
      layer.tiles.forEach(tile => {
        const isSelected = selectedTiles.some(
          t => t.layerId === layer.id && t.x === tile.x && t.y === tile.y
        );

        ctx.fillStyle = tile.color;
        ctx.globalAlpha = layer.opacity / 100;
        ctx.fillRect(
          tile.x * tileSize,
          tile.y * tileSize,
          tileSize,
          tileSize
        );
        ctx.globalAlpha = 1;

        if (isSelected) {
          ctx.strokeStyle = '#fbbf24';
          ctx.lineWidth = 3;
          ctx.strokeRect(
            tile.x * tileSize,
            tile.y * tileSize,
            tileSize,
            tileSize
          );
        }
      });
    });

    if (rectStart && activeTool === 'rectangle') {
      ctx.strokeStyle = selectedTileColor;
      ctx.lineWidth = 2;
      const width = (mousePos.x - rectStart.x) * tileSize;
      const height = (mousePos.y - rectStart.y) * tileSize;
      ctx.strokeRect(rectStart.x * tileSize, rectStart.y * tileSize, width, height);
    }

    ctx.restore();
  };

  useEffect(() => {
    renderCanvas();
  }, [currentMap, zoom, mousePos, rectStart, activeTool, viewportOffset, selectedTiles]);

  const getTileCoords = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !currentMap) return null;

    const rect = canvas.getBoundingClientRect();
    const tileSize = currentMap.tileSize * (zoom / 100);
    const x = Math.floor((e.clientX - rect.left - viewportOffset.x) / tileSize);
    const y = Math.floor((e.clientY - rect.top - viewportOffset.y) / tileSize);

    if (x < 0 || x >= currentMap.width || y < 0 || y >= currentMap.height) return null;
    return { x, y };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (activeTool === 'pan') {
      setIsPanning(true);
      setPanStart({ x: e.clientX, y: e.clientY });
      return;
    }

    if (activeTool === 'select') {
      const coords = getTileCoords(e);
      if (coords && activeLayerId) {
        selectTile(activeLayerId, coords.x, coords.y);
      }
      return;
    }

    if (activeTool === 'move') {
      const coords = getTileCoords(e);
      if (coords) {
        setRectStart(coords);
        setIsDrawing(true);
      }
      return;
    }

    if (!activeLayerId) return;

    const coords = getTileCoords(e);
    if (!coords) return;

    const layer = currentMap?.layers.find(l => l.id === activeLayerId);
    if (layer?.locked) return;

    setIsDrawing(true);

    if (activeTool === 'pencil') {
      addTile(activeLayerId, { ...coords, color: selectedTileColor });
    } else if (activeTool === 'eraser') {
      removeTile(activeLayerId, coords.x, coords.y);
    } else if (activeTool === 'fill') {
      fillArea(activeLayerId, coords.x, coords.y, selectedTileColor);
    } else if (activeTool === 'rectangle' || activeTool === 'circle') {
      setRectStart(coords);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isPanning && panStart) {
      const deltaX = e.clientX - panStart.x;
      const deltaY = e.clientY - panStart.y;
      panViewport(deltaX, deltaY);
      setPanStart({ x: e.clientX, y: e.clientY });
      return;
    }

    const coords = getTileCoords(e);
    if (coords) {
      setMousePos(coords);
    }

    if (activeTool === 'move' && isDrawing && rectStart && coords) {
      const deltaX = coords.x - rectStart.x;
      const deltaY = coords.y - rectStart.y;
      if (deltaX !== 0 || deltaY !== 0) {
        moveSelectedTiles(deltaX, deltaY);
        setRectStart(coords);
      }
      return;
    }

    if (!isDrawing || !activeLayerId || !coords) return;

    const layer = currentMap?.layers.find(l => l.id === activeLayerId);
    if (layer?.locked) return;

    if (activeTool === 'pencil') {
      addTile(activeLayerId, { ...coords, color: selectedTileColor });
    } else if (activeTool === 'eraser') {
      removeTile(activeLayerId, coords.x, coords.y);
    }
  };

  const handleMouseUp = () => {
    if (isPanning) {
      setIsPanning(false);
      setPanStart(null);
    }

    if (rectStart && activeLayerId && (activeTool === 'rectangle' || activeTool === 'circle')) {
      const layer = currentMap?.layers.find(l => l.id === activeLayerId);
      if (!layer?.locked) {
        const minX = Math.min(rectStart.x, mousePos.x);
        const maxX = Math.max(rectStart.x, mousePos.x);
        const minY = Math.min(rectStart.y, mousePos.y);
        const maxY = Math.max(rectStart.y, mousePos.y);

        if (activeTool === 'rectangle') {
          for (let x = minX; x <= maxX; x++) {
            for (let y = minY; y <= maxY; y++) {
              if (x === minX || x === maxX || y === minY || y === maxY) {
                addTile(activeLayerId, { x, y, color: selectedTileColor });
              }
            }
          }
        } else if (activeTool === 'circle') {
          const centerX = (minX + maxX) / 2;
          const centerY = (minY + maxY) / 2;
          const radiusX = (maxX - minX) / 2;
          const radiusY = (maxY - minY) / 2;

          for (let x = minX; x <= maxX; x++) {
            for (let y = minY; y <= maxY; y++) {
              const dx = (x - centerX) / radiusX;
              const dy = (y - centerY) / radiusY;
              if (dx * dx + dy * dy <= 1.1 && dx * dx + dy * dy >= 0.9) {
                addTile(activeLayerId, { x, y, color: selectedTileColor });
              }
            }
          }
        }
      }
      setRectStart(null);
    }
    setIsDrawing(false);
    setRectStart(null);
  };

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 25, 25));
  };

  const handleResetZoom = () => {
    setZoom(100);
  };

  const getCursorStyle = () => {
    if (isPanning) return 'grabbing';
    switch (activeTool) {
      case 'pencil': return 'crosshair';
      case 'eraser': return 'cell';
      case 'fill': return 'crosshair';
      case 'pan': return 'grab';
      case 'move': return 'move';
      case 'select': return 'pointer';
      default: return 'crosshair';
    }
  };

  return (
    <div className="relative flex-1 bg-[hsl(0,0%,9%)] overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ cursor: getCursorStyle() }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
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
          onClick={() => setZoom(100)}
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
