import { useHaxTrace } from '@/contexts/HaxTraceContext';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { chordLength, angleToRadius, angleToSagitta, radiusToAngle, radiusToSagitta, sagittaToAngle, sagittaToRadius, calculateCircularArc } from '@/lib/circularArc';
import { useState, useRef, useEffect } from 'react';
import { GripVertical } from 'lucide-react';

export const HaxTraceCurveEditor = () => {
  const { selectedSegments, map, updateSegmentCurve } = useHaxTrace();
  const [position, setPosition] = useState({ x: 0, y: 80 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setDragStart({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
    }
  };

  if (selectedSegments.length === 0) {
    return null;
  }

  if (selectedSegments.length > 1) {
    return (
      <div 
        ref={cardRef}
        className="fixed p-6 w-80 cursor-move shadow-2xl rounded-lg border border-border/40 backdrop-blur-xl bg-sidebar/95 transition-all duration-200" 
        style={{ left: `${position.x}px`, top: `${position.y}px`, right: 'auto' }}
        data-testid="card-curve-editor"
      >
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/30" onMouseDown={handleMouseDown}>
          <GripVertical className="w-5 h-5 text-muted-foreground/60 hover:text-primary transition-colors" />
          <h3 className="text-sm font-semibold tracking-wide uppercase text-foreground">Multiple Selection</h3>
        </div>
        <div className="flex gap-3 mb-4 text-xs">
          <div className="flex-1 flex items-center justify-between bg-background/50 px-3 py-2 rounded-md border border-border/20">
            <span className="text-muted-foreground">Vertices</span>
            <span className="font-mono font-bold text-primary">{map.vertexes.length}</span>
          </div>
          <div className="flex-1 flex items-center justify-between bg-background/50 px-3 py-2 rounded-md border border-border/20">
            <span className="text-muted-foreground">Segments</span>
            <span className="font-mono font-bold text-primary">{map.segments.length}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground/80 leading-relaxed">
          Multiple segments selected. Select a single segment to edit its curve properties.
        </p>
      </div>
    );
  }

  const segmentIndex = selectedSegments[0];
  const segment = map.segments[segmentIndex];
  
  if (!segment) {
    return null;
  }
  
  const curveData = segment.curveData || { type: 'angle' as const, value: 0 };
  
  const v0 = map.vertexes[segment.v0];
  const v1 = map.vertexes[segment.v1];
  const chord = v0 && v1 ? chordLength(v0, v1) : 0;

  const arcData = v0 && v1 ? calculateCircularArc(v0, v1, curveData.type, curveData.value) : null;
  const direction = arcData ? (arcData.anticlockwise ? 'Counter-clockwise' : 'Clockwise') : 'Straight';

  const handleTypeChange = (newType: 'angle' | 'radius' | 'sagitta') => {
    let newValue = 0;
    
    if (chord <= 0) {
      updateSegmentCurve(segmentIndex, newType, 0);
      return;
    }

    const isNearZero = Math.abs(curveData.value) < 0.001;
    const sign = curveData.value >= 0 ? 1 : -1;
    
    if (isNearZero) {
      if (newType === 'radius') {
        newValue = sign * chord;
      } else if (newType === 'sagitta') {
        newValue = sign * 0.1;
      } else {
        newValue = 0;
      }
    } else {
      if (curveData.type === 'angle' && newType === 'radius') {
        const converted = angleToRadius(curveData.value, chord);
        newValue = isFinite(converted) ? converted : sign * chord;
      } else if (curveData.type === 'angle' && newType === 'sagitta') {
        const converted = angleToSagitta(curveData.value, chord);
        newValue = isFinite(converted) ? converted : sign * 0.1;
      } else if (curveData.type === 'radius' && newType === 'angle') {
        const converted = radiusToAngle(curveData.value, chord);
        newValue = isFinite(converted) ? converted : 0;
      } else if (curveData.type === 'radius' && newType === 'sagitta') {
        const converted = radiusToSagitta(curveData.value, chord);
        newValue = isFinite(converted) ? converted : sign * 0.1;
      } else if (curveData.type === 'sagitta' && newType === 'angle') {
        const converted = sagittaToAngle(curveData.value, chord);
        newValue = isFinite(converted) ? converted : 0;
      } else if (curveData.type === 'sagitta' && newType === 'radius') {
        const converted = sagittaToRadius(curveData.value, chord);
        newValue = isFinite(converted) ? converted : sign * chord;
      }
    }
    
    updateSegmentCurve(segmentIndex, newType, newValue);
  };

  const handleValueChange = (newValue: number) => {
    let finalValue = isFinite(newValue) ? newValue : 0;
    if (curveData.type === 'angle') {
      finalValue = Math.max(-340, Math.min(340, finalValue));
    }
    updateSegmentCurve(segmentIndex, curveData.type, finalValue);
  };

  const getSliderConfig = () => {
    switch (curveData.type) {
      case 'angle':
        return { min: -340, max: 340, step: 1 };
      case 'radius':
        return { min: -1000, max: 1000, step: 1 };
      case 'sagitta':
        return { min: -500, max: 500, step: 1 };
    }
  };

  const config = getSliderConfig();
  const displayValue = isFinite(curveData.value) ? Math.round(curveData.value * 100) / 100 : 0;

  return (
    <div 
      ref={cardRef}
      className="fixed p-6 w-80 shadow-2xl rounded-lg border border-border/40 backdrop-blur-xl bg-sidebar/95 transition-all duration-200" 
      style={{ left: `${position.x}px`, top: `${position.y}px`, right: 'auto' }}
      data-testid="card-curve-editor"
    >
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/30 cursor-move" onMouseDown={handleMouseDown}>
        <GripVertical className="w-5 h-5 text-muted-foreground/60 hover:text-primary transition-colors" />
        <h3 className="text-sm font-semibold tracking-wide uppercase text-foreground">Curve Editor</h3>
      </div>
      
      <div className="flex gap-3 mb-5 text-xs">
        <div className="flex-1 flex items-center justify-between bg-background/50 px-3 py-2 rounded-md border border-border/20">
          <span className="text-muted-foreground">Vertices</span>
          <span className="font-mono font-bold text-primary">{map.vertexes.length}</span>
        </div>
        <div className="flex-1 flex items-center justify-between bg-background/50 px-3 py-2 rounded-md border border-border/20">
          <span className="text-muted-foreground">Segments</span>
          <span className="font-mono font-bold text-primary">{map.segments.length}</span>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="curve-type-editor" className="text-xs font-medium tracking-wide uppercase text-muted-foreground">Curve Type</Label>
          <Select value={curveData.type} onValueChange={handleTypeChange}>
            <SelectTrigger id="curve-type-editor" data-testid="select-curve-type-editor" className="h-9 bg-background/50 border-border/30 hover:bg-background/70 transition-colors">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="angle">Angle (degrees)</SelectItem>
              <SelectItem value="radius">Radius (pixels)</SelectItem>
              <SelectItem value="sagitta">Sagitta (height)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="curve-value-editor" className="text-xs font-medium tracking-wide uppercase text-muted-foreground">
            {curveData.type === 'angle' ? 'Angle' : curveData.type === 'radius' ? 'Radius' : 'Sagitta'}
          </Label>
          <Input
            id="curve-value-editor"
            data-testid="input-curve-value-editor"
            type="number"
            value={displayValue}
            onChange={(e) => handleValueChange(Number(e.target.value))}
            step={config.step}
            className="h-9 bg-background/50 border-border/30 font-mono text-foreground hover:bg-background/70 transition-colors"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="curve-slider-editor" className="text-xs font-medium tracking-wide uppercase text-muted-foreground">Adjust</Label>
            <span className="text-xs font-mono font-bold text-primary">{displayValue}</span>
          </div>
          <Slider
            id="curve-slider-editor"
            data-testid="slider-curve-editor"
            value={[isFinite(curveData.value) ? curveData.value : 0]}
            onValueChange={(values) => handleValueChange(values[0])}
            min={config.min}
            max={config.max}
            step={config.step}
            className="w-full"
          />
        </div>

        <div className="text-xs space-y-2.5 p-3 rounded-md bg-background/30 border border-border/20">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground/70">Chord length</span>
            <span className="font-mono font-bold text-foreground">{Math.round(chord)}px</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground/70">Direction</span>
            <span className="font-semibold text-foreground">{direction}</span>
          </div>
          {curveData.type === 'angle' && (
            <p className="text-xs text-muted-foreground/60 mt-2 pt-2 border-t border-border/20 leading-relaxed">
              Límite: ±340°. Si |curva| &gt; 180° se dibuja el arco mayor.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
