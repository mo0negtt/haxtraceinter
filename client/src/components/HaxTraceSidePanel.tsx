import { BackgroundImagePanel } from '@/components/BackgroundImagePanel';
import { ViewControls } from '@/components/ViewControls';
import { useHaxTrace } from '@/contexts/HaxTraceContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Eye, Image, Info, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ColorPicker } from '@/components/ui/color-picker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const HaxTraceSidePanel = () => {
  const { 
    map, 
    setBackgroundImage, 
    updateBackgroundImage, 
    removeBackgroundImage,
    segmentColor,
    setSegmentColor,
    curveType,
    setCurveType,
    curveValue,
    setCurveValue,
    deleteSelectedSegments,
    deleteSelectedVertices,
    selectedSegments,
    selectedVertices,
    mousePos,
  } = useHaxTrace();

  return (
    <div className="w-72 bg-sidebar border-l border-sidebar-border overflow-y-auto flex flex-col">
      <div className="p-4 border-b border-sidebar-border">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Settings</h2>
        <div className="space-y-3">
          <div className="text-xs">
            <div className="text-muted-foreground mb-1">Position</div>
            <div className="font-mono text-foreground">{mousePos.x.toFixed(0)}, {mousePos.y.toFixed(0)}</div>
          </div>
        </div>
      </div>

      <div className="p-4 border-b border-sidebar-border">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Segment Style</h2>
        <div className="space-y-3">
          <div>
            <Label className="text-xs text-muted-foreground mb-2">Color</Label>
            <ColorPicker color={segmentColor} onChange={setSegmentColor} />
          </div>
          
          <div>
            <Label className="text-xs text-muted-foreground mb-2">Curve Type</Label>
            <Select value={curveType} onValueChange={(value: any) => setCurveType(value)}>
              <SelectTrigger data-testid="select-curve-type" className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="angle">Angle</SelectItem>
                <SelectItem value="radius">Radius</SelectItem>
                <SelectItem value="sagitta">Sagitta</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground mb-2">Curve Value</Label>
            <Input
              data-testid="input-curve-value"
              type="number"
              value={curveValue}
              onChange={(e) => setCurveValue(parseFloat(e.target.value) || 0)}
              className="h-9"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 p-4">
        <Accordion type="multiple" defaultValue={["view", "background", "info"]} className="space-y-2">
          <AccordionItem value="view" className="border-0">
            <AccordionTrigger className="hover:no-underline py-2">
              <div className="flex items-center gap-2">
                <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs font-semibold uppercase tracking-wider">View</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-3 pt-1">
              <ViewControls />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="background" className="border-0">
            <AccordionTrigger className="hover:no-underline py-2">
              <div className="flex items-center gap-2">
                <Image className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs font-semibold uppercase tracking-wider">Background</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-3 pt-1">
              <BackgroundImagePanel
                backgroundImage={map.bg.image}
                onImageLoad={setBackgroundImage}
                onUpdate={updateBackgroundImage}
                onRemove={removeBackgroundImage}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="info" className="border-0">
            <AccordionTrigger className="hover:no-underline py-2">
              <div className="flex items-center gap-2">
                <Info className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs font-semibold uppercase tracking-wider">Map Info</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-3 pt-1">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center p-2 rounded bg-accent/30">
                  <span className="text-muted-foreground">Vertices</span>
                  <span className="font-mono font-semibold">{map.vertexes.length}</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded bg-accent/30">
                  <span className="text-muted-foreground">Segments</span>
                  <span className="font-mono font-semibold">{map.segments.length}</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded bg-accent/30">
                  <span className="text-muted-foreground">Dimensions</span>
                  <span className="font-mono font-semibold">{map.width} × {map.height}</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {(selectedVertices.length > 0 || selectedSegments.length > 0) && (
        <div className="p-4 border-t border-sidebar-border">
          <Button
            data-testid="button-delete-selected"
            onClick={() => {
              if (selectedVertices.length > 0) {
                deleteSelectedVertices();
              } else if (selectedSegments.length > 0) {
                deleteSelectedSegments();
              }
            }}
            variant="destructive"
            size="sm"
            className="w-full"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Selected
          </Button>
        </div>
      )}
    </div>
  );
};
