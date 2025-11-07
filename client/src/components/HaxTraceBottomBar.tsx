import { useHaxTrace } from '@/contexts/HaxTraceContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ColorPicker } from '@/components/ui/color-picker';
import { 
  MousePointer, 
  Hand, 
  Trash2,
  Circle,
  Box
} from 'lucide-react';

export const HaxTraceBottomBar = () => {
  const {
    currentTool,
    setCurrentTool,
    segmentColor,
    setSegmentColor,
    curveType,
    setCurveType,
    curveValue,
    setCurveValue,
    deleteSelectedSegments,
    selectedSegments,
    selectedVertices,
    deleteSelectedVertices,
    mousePos,
  } = useHaxTrace();

  return (
    <div className="flex items-center gap-4 px-6 py-3.5 bg-sidebar border-t border-sidebar-border">
      <div className="flex items-center gap-2 bg-accent/50 px-3 py-1.5 rounded-lg">
        <span className="text-xs text-muted-foreground font-mono min-w-[90px]" data-testid="text-coordinates">
          {mousePos.x.toFixed(0)}, {mousePos.y.toFixed(0)}
        </span>
      </div>

      <Separator orientation="vertical" className="h-8" />

      <div className="flex items-center gap-2 bg-accent/30 p-1 rounded-lg">
        <Button
          data-testid="button-tool-select"
          size="sm"
          variant={currentTool === 'pan' ? 'secondary' : 'ghost'}
          onClick={() => setCurrentTool('pan')}
          title="Select / Pan"
          className="h-8 rounded-md"
        >
          <MousePointer className="w-4 h-4 mr-1.5" />
          Select
        </Button>
        <Button
          data-testid="button-tool-vertex"
          size="sm"
          variant={currentTool === 'vertex' ? 'secondary' : 'ghost'}
          onClick={() => setCurrentTool('vertex')}
          title="Add Vertex (V)"
          className="h-8 rounded-md"
        >
          <Circle className="w-4 h-4 mr-1.5" />
          Vertex
        </Button>
        <Button
          data-testid="button-tool-segment"
          size="sm"
          variant={currentTool === 'segment' ? 'secondary' : 'ghost'}
          onClick={() => setCurrentTool('segment')}
          title="Add Segment (S)"
          className="h-8 rounded-md"
        >
          <Box className="w-4 h-4 mr-1.5" />
          Segment
        </Button>
      </div>

      <Separator orientation="vertical" className="h-8" />

      <div className="flex items-center gap-3 bg-accent/30 px-3 py-1.5 rounded-lg">
        <Label className="text-xs text-muted-foreground font-medium">Color</Label>
        <ColorPicker color={segmentColor} onChange={setSegmentColor} />
      </div>

      <Separator orientation="vertical" className="h-8" />

      <div className="flex items-center gap-3 bg-accent/30 px-3 py-1.5 rounded-lg">
        <Label htmlFor="curve-type-bottom" className="text-xs text-muted-foreground font-medium">Curve</Label>
        <Select value={curveType} onValueChange={(value: 'angle' | 'radius' | 'sagitta') => setCurveType(value)}>
          <SelectTrigger id="curve-type-bottom" data-testid="select-curve-type-bottom" className="w-20 h-8 text-xs rounded-md">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="angle">Angle</SelectItem>
            <SelectItem value="radius">Radius</SelectItem>
            <SelectItem value="sagitta">Sagitta</SelectItem>
          </SelectContent>
        </Select>
        <Input
          id="curve-value-bottom"
          data-testid="input-curve-value-bottom"
          type="number"
          value={curveValue}
          onChange={(e) => setCurveValue(Number(e.target.value))}
          className="w-20 h-8 text-xs px-2 rounded-md"
          step={curveType === 'angle' ? 5 : 1}
        />
        <span className="text-xs text-muted-foreground font-mono">
          {curveType === 'angle' ? '°' : curveType === 'radius' ? 'px' : 'h'}
        </span>
      </div>

      {(selectedSegments.length > 0 || selectedVertices.length > 0) && (
        <>
          <Separator orientation="vertical" className="h-8" />
          <Button
            data-testid="button-delete-selected"
            size="sm"
            variant="ghost"
            onClick={() => {
              if (selectedVertices.length > 0) {
                deleteSelectedVertices();
              } else if (selectedSegments.length > 0) {
                deleteSelectedSegments();
              }
            }}
            title="Delete Selected"
            className="h-8 rounded-lg text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4 mr-1.5" />
            Delete
          </Button>
        </>
      )}
    </div>
  );
};
