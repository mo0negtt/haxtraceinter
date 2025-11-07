import { useEffect, useRef, useState, useCallback } from 'react';
import { useHaxTrace } from '@/contexts/HaxTraceContext';
import { CanvasRenderer } from '@/lib/canvasRenderer';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
} from '@/components/ui/context-menu';
import { Copy, Trash2, Move } from 'lucide-react';

export const HaxTraceCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<CanvasRenderer | null>(null);
  const animationFrameRef = useRef<number>();
  
  const {
    map,
    currentTool,
    selectedVertices,
    selectedSegments,
    hoveredVertex,
    setHoveredVertex,
    addVertex,
    selectVertex,
    selectSegment,
    clearSegmentSelection,
    clearVertexSelection,
    updateVertex,
    gridVisible,
    gridSize,
    zoom,
    setZoom,
    setMousePos,
    deleteVertex,
    duplicateVertex,
    duplicateSegment,
    deleteSelectedSegments,
    deleteSelectedVertices,
  } = useHaxTrace();

  const [isDraggingVertex, setIsDraggingVertex] = useState<number | null>(null);
  const [contextMenuTarget, setContextMenuTarget] = useState<{ type: 'vertex' | 'segment'; index: number } | null>(null);
  const [marqueeStart, setMarqueeStart] = useState<{ x: number; y: number } | null>(null);
  const [marqueeCurrent, setMarqueeCurrent] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const renderer = new CanvasRenderer(canvasRef.current);
    rendererRef.current = renderer;

    if (map.bg.image) {
      renderer.loadBackgroundImage(map.bg.image.dataURL).then(() => {
        render();
      });
    }

    const handleResize = () => {
      renderer.updateCanvasSize();
      render();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const renderer = rendererRef.current;
    if (!renderer) return;

    if (map.bg.image) {
      renderer.loadBackgroundImage(map.bg.image.dataURL).then(() => {
        render();
      });
    } else {
      renderer.clearBackgroundImage();
      render();
    }
  }, [map.bg.image?.dataURL]);

  useEffect(() => {
    const renderer = rendererRef.current;
    if (!renderer) return;
    renderer.state.zoom = zoom;
    render();
  }, [zoom]);

  const render = useCallback(() => {
    const renderer = rendererRef.current;
    if (!renderer) return;

    renderer.clear(map.bg.color);
    
    if (map.bg.image) {
      renderer.drawBackgroundImage(map.bg.image);
    }
    
    if (gridVisible) {
      renderer.drawGrid(map.width, map.height, gridSize);
    }

    map.segments.forEach((segment, index) => {
      const isSelected = selectedSegments.includes(index);
      renderer.drawSegment(segment, map.vertexes, isSelected);
    });

    map.vertexes.forEach((vertex, index) => {
      const isSelected = selectedVertices.includes(index);
      const isHovered = hoveredVertex === index;
      renderer.drawVertex(vertex, isSelected, isHovered);
    });

    if (marqueeStart && marqueeCurrent && canvasRef.current) {
      const ctx = renderer['ctx'];
      ctx.strokeStyle = '#3b82f6';
      ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
      ctx.lineWidth = 2;
      const width = marqueeCurrent.x - marqueeStart.x;
      const height = marqueeCurrent.y - marqueeStart.y;
      ctx.fillRect(marqueeStart.x, marqueeStart.y, width, height);
      ctx.strokeRect(marqueeStart.x, marqueeStart.y, width, height);
    }
  }, [map, selectedVertices, selectedSegments, hoveredVertex, gridVisible, gridSize, marqueeStart, marqueeCurrent]);

  useEffect(() => {
    render();
  }, [render]);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const renderer = rendererRef.current;
    if (!renderer || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const vertexIndex = renderer.getVertexAt(x, y, map.vertexes);
    
    if (e.button === 2) {
      if (vertexIndex !== null) {
        setContextMenuTarget({ type: 'vertex', index: vertexIndex });
        setIsDraggingVertex(vertexIndex);
        return;
      }
      
      const segmentIndex = renderer.getSegmentAt(x, y, map.segments, map.vertexes);
      if (segmentIndex !== null) {
        setContextMenuTarget({ type: 'segment', index: segmentIndex });
        return;
      }
      
      setContextMenuTarget(null);
      return;
    }

    if (e.button === 0) {
      if (currentTool === 'pan') {
        renderer.startPan(x, y);
        return;
      }

      if (currentTool === 'vertex') {
        if (vertexIndex !== null) {
          const multiSelect = e.shiftKey || e.ctrlKey;
          selectVertex(vertexIndex, multiSelect);
          if (!multiSelect) {
            setIsDraggingVertex(vertexIndex);
          }
          return;
        }
        
        if (!e.shiftKey && !e.ctrlKey) {
          const world = renderer.screenToWorld(x, y);
          addVertex(Math.round(world.x), Math.round(world.y));
          clearVertexSelection();
        } else {
          setMarqueeStart({ x, y });
          setMarqueeCurrent({ x, y });
        }
        return;
      }

      if (currentTool === 'segment') {
        if (vertexIndex !== null) {
          selectVertex(vertexIndex);
          return;
        }

        const segmentIndex = renderer.getSegmentAt(x, y, map.segments, map.vertexes);
        if (segmentIndex !== null) {
          selectSegment(segmentIndex, e.shiftKey || e.ctrlKey);
        } else if (!e.shiftKey && !e.ctrlKey) {
          clearSegmentSelection();
        }
      }
    }
  }, [currentTool, map, addVertex, selectVertex, selectSegment, clearSegmentSelection, clearVertexSelection]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const renderer = rendererRef.current;
    if (!renderer || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const world = renderer.screenToWorld(x, y);
    setMousePos({ x: Math.round(world.x), y: Math.round(world.y) });

    if (marqueeStart) {
      setMarqueeCurrent({ x, y });
      return;
    }

    if (isDraggingVertex !== null) {
      updateVertex(isDraggingVertex, Math.round(world.x), Math.round(world.y));
      render();
      return;
    }

    if (renderer.state.isPanning) {
      renderer.updatePan(x, y);
      render();
      return;
    }

    const vertexIndex = renderer.getVertexAt(x, y, map.vertexes);
    if (vertexIndex !== hoveredVertex) {
      setHoveredVertex(vertexIndex);
    }
  }, [isDraggingVertex, map, hoveredVertex, setHoveredVertex, updateVertex, render, marqueeStart, setMousePos]);

  const handleMouseUp = useCallback(() => {
    const renderer = rendererRef.current;
    if (!renderer) return;

    if (marqueeStart && marqueeCurrent) {
      const minX = Math.min(marqueeStart.x, marqueeCurrent.x);
      const maxX = Math.max(marqueeStart.x, marqueeCurrent.x);
      const minY = Math.min(marqueeStart.y, marqueeCurrent.y);
      const maxY = Math.max(marqueeStart.y, marqueeCurrent.y);
      
      const worldMin = renderer.screenToWorld(minX, minY);
      const worldMax = renderer.screenToWorld(maxX, maxY);
      
      const verticesInBox: number[] = [];
      map.vertexes.forEach((vertex, index) => {
        if (vertex.x >= worldMin.x && vertex.x <= worldMax.x &&
            vertex.y >= worldMin.y && vertex.y <= worldMax.y) {
          if (!selectedVertices.includes(index)) {
            verticesInBox.push(index);
          }
        }
      });
      
      if (verticesInBox.length > 0) {
        verticesInBox.forEach(index => selectVertex(index, true));
      }
      
      setMarqueeStart(null);
      setMarqueeCurrent(null);
      return;
    }

    setIsDraggingVertex(null);
    renderer.endPan();
  }, [marqueeStart, marqueeCurrent, map.vertexes, selectedVertices, selectVertex]);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const renderer = rendererRef.current;
    if (!renderer) return;

    if (e.deltaY < 0) {
      renderer.zoomIn();
    } else {
      renderer.zoomOut();
    }
    setZoom(renderer.state.zoom);
    render();
  }, [render, setZoom]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <canvas
          ref={canvasRef}
          data-testid="canvas-haxtrace"
          className="w-full h-full cursor-crosshair"
          style={{ cursor: currentTool === 'pan' ? 'grab' : 'crosshair' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onContextMenu={handleContextMenu}
          onWheel={handleWheel}
        />
      </ContextMenuTrigger>
      <ContextMenuContent data-testid="context-menu-canvas">
        {contextMenuTarget?.type === 'vertex' && (
          <>
            <ContextMenuItem
              data-testid="context-menu-duplicate-vertex"
              onClick={() => {
                duplicateVertex(contextMenuTarget.index);
                setContextMenuTarget(null);
              }}
            >
              <Copy className="w-4 h-4 mr-2" />
              Duplicate Vertex
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem
              data-testid="context-menu-delete-vertex"
              onClick={() => {
                deleteVertex(contextMenuTarget.index);
                setContextMenuTarget(null);
              }}
              className="text-destructive"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Vertex
            </ContextMenuItem>
          </>
        )}
        {contextMenuTarget?.type === 'segment' && (
          <>
            <ContextMenuItem
              data-testid="context-menu-duplicate-segment"
              onClick={() => {
                duplicateSegment(contextMenuTarget.index);
                setContextMenuTarget(null);
              }}
            >
              <Copy className="w-4 h-4 mr-2" />
              Duplicate Segment
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem
              data-testid="context-menu-delete-segment"
              onClick={() => {
                if (!selectedSegments.includes(contextMenuTarget.index)) {
                  selectSegment(contextMenuTarget.index);
                }
                deleteSelectedSegments();
                setContextMenuTarget(null);
              }}
              className="text-destructive"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Segment
            </ContextMenuItem>
          </>
        )}
        {!contextMenuTarget && (
          <ContextMenuItem disabled>No selection</ContextMenuItem>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
};
