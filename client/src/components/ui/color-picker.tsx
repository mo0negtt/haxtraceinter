import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  showInput?: boolean;
}

export function ColorPicker({ color, onChange, showInput = true }: ColorPickerProps) {
  const [open, setOpen] = useState(false);
  
  const normalizedColor = color.startsWith('#') ? color : `#${color}`;
  const hexColor = normalizedColor.length === 7 ? normalizedColor : normalizedColor.substring(0, 7);

  const handleColorChange = (newColor: string) => {
    onChange(newColor.replace('#', ''));
  };

  const handleInputChange = (value: string) => {
    const cleaned = value.replace(/[^0-9A-Fa-f]/g, '').slice(0, 6);
    onChange(cleaned);
  };

  return (
    <div className="flex items-center gap-2" data-testid="color-picker">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-10 h-10 p-0 border-2"
            style={{ backgroundColor: hexColor }}
            data-testid="button-color-picker-trigger"
          >
            <span className="sr-only">Pick color</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3" data-testid="popover-color-picker">
          <HexColorPicker color={hexColor} onChange={handleColorChange} />
        </PopoverContent>
      </Popover>
      
      {showInput && (
        <div className="flex items-center gap-1">
          <span className="text-xs text-muted-foreground font-mono">#</span>
          <Input
            type="text"
            value={color.replace('#', '')}
            onChange={(e) => handleInputChange(e.target.value)}
            className="w-20 h-8 font-mono text-xs px-2"
            maxLength={6}
            data-testid="input-color-hex"
          />
        </div>
      )}
    </div>
  );
}
