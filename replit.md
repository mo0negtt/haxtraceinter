# HaxTrace Map Editor

## Overview

HaxTrace is a vertex and segment-based map editor for creating Haxball maps. Unlike pixel-based editors, HaxTrace works with geometric primitives (vertices and segments with curves) to build maps for Haxball-style games. The application provides a comprehensive set of tools for vertex placement, segment creation with curves, and map export/import functionality with .hbs format compatibility.

The interface follows a modern, minimalist dark design with left sidebar navigation, central canvas, and right settings panel - optimized for efficient map editing.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (November 2025)

**Complete UI Redesign - Modern Dark Interface (Nov 6, 2025 - Latest)**
- **Ultra-dark theme overhaul**:
  - Background darkened to 4% lightness for a modern, professional look
  - Sidebar background at 5% with refined borders at 12% lightness
  - Primary color changed to blue (#3b82f6 / 210 100% 60%)
  - Improved shadows with realistic depth (rgba-based instead of HSL)
  - Reduced border radius to 0.5rem for sharper, cleaner edges
- **Left sidebar navigation**:
  - Created new HaxTraceLeftSidebar component replacing top/bottom bars
  - Narrow 64px sidebar with icon-based navigation
  - Tool selection (Select/Pan, Vertex, Segment) with visual feedback
  - Undo/Redo controls with disabled states
  - Import/Export functionality
  - About dialog with feature overview and Discord link
- **Restructured layout**:
  - Left sidebar + central canvas + right panel design
  - Removed HaxTraceTopBar and HaxTraceBottomBar components
  - Cleaner, more focused editing experience
  - Canvas centered with subtle borders and reduced background opacity
- **Right panel enhancements**:
  - Consolidated segment style controls (color, curve type, curve value)
  - Reorganized with uppercase section headers for better hierarchy
  - Minimalist accordion design without heavy borders
  - Real-time position display at the top
  - Delete selected button at bottom when items are selected
- **Design consistency**:
  - All controls use consistent spacing and typography
  - Uppercase labels with tracking for professional appearance
  - Subtle hover effects and transitions
  - Clean, minimal design matching modern UI/UX standards
- **Curve editor visual improvements**:
  - Removed "HT" branding from left sidebar for cleaner look
  - Enhanced curve editor panel with improved visual hierarchy
  - Uppercase section headers with better spacing
  - Stats display with bordered containers and improved contrast
  - Real-time value display next to slider control
  - Refined borders and backgrounds for better readability
  - Consistent use of opacity and blur for modern aesthetic
- **About dialog reorganization**:
  - Improved organization with clear sections: About, Features, Links
  - Added "Visit HaxPuck" button linking to HaxPuck website
  - Improved "Join Discord" button with consistent styling
  - Better visual hierarchy with uppercase section headers
  - Feature list with primary-colored bullets for better readability
  - Full-width buttons in vertical layout for better organization

**Collapsible Sidebar & Glass Morphism (Nov 6, 2025)**
- **Enhanced sidebar with collapsible accordion sections**:
  - Implemented shadcn Accordion component with three sections: View Settings, Background, and Map Info
  - Each section has icon indicators (Eye, Image, Info) for quick visual recognition
  - Sections default to expanded for easy discovery
  - Map Info section displays real-time counts (vertices, segments, dimensions) with primary color badges
- **Glass morphism effect on curve editor panel**:
  - Floating panel with backdrop-blur-xl and semi-transparent bg-card/80 background
  - Gradient title (blue to purple) for modern aesthetic
  - Improved drag handle with hover effects
  - Grouped controls with rounded containers and better visual hierarchy
  - Numeric values displayed in font-mono with primary color highlights
- **Smooth animations and transitions throughout**:
  - 200ms transitions for all color and property changes
  - Hover scale effects on buttons (scale-105 for zoom buttons, scale-[1.02] for action buttons)
  - All interactive elements have smooth state changes
- **Enhanced background image panel**:
  - Modern drop zone with larger icon and improved hover states
  - Sliders with inline percentage displays in rounded badges
  - Position offset controls grouped in container with X/Y labels
  - Improved visual feedback for all controls
- **Visual hierarchy improvements**:
  - Rounded containers (bg-sidebar-accent/50) with subtle borders for grouped controls
  - Font-medium labels for better readability
  - Consistent spacing (space-y-5) between major sections
  - Better contrast between interactive and display elements

**Enhanced Dark Theme & Curve Import Fix (Nov 6, 2025)**
- **Fixed critical curve import bug**: Legacy Haxball maps with `curve` field now automatically convert to `curveData` format on import
  - Ensures circular arc rendering instead of quadratic bezier curves
  - Maintains perfect circular curvature for all imported curved segments
  - Preserves all segment attributes during conversion
- **Ultra-dark theme redesign** inspired by modern design tools:
  - Deepened backgrounds from 11% to 7% lightness for richer contrast
  - Sidebar backgrounds darkened from 9% to 5% 
  - Improved text contrast (95% → 98% lightness)
  - Softer borders for reduced visual noise
- **Discord integration**: Added prominent Discord button in top bar
  - Official Discord blue (#5865F2) with hover state
  - Direct link to community server
  - Located in top right for easy access
- **UI refinements**:
  - Added "HaxTrace" gradient title in top bar
  - Grouped controls in rounded containers with subtle backgrounds
  - Canvas now has rounded corners, shadow, and backdrop blur effect
  - Improved button spacing and organization
  - Enhanced visual hierarchy throughout the interface

**Color Wheel Picker & Figma-Style Dark Theme (Nov 6, 2025)**
- Installed react-colorful package for professional color wheel interface
- Created ColorPicker component using Popover with HexColorPicker from react-colorful
- Updated HaxTraceBottomBar to use interactive color wheel instead of text-only input
- Redesigned entire UI with modern Figma-style dark theme:
  - Near-black backgrounds for reduced eye strain
  - Removed Card wrappers for cleaner, more compact design
  - Modernized all panels: TopBar, BottomBar, SidePanel, ViewControls, BackgroundImagePanel
  - Added uppercase section headers with improved spacing and typography
  - Enhanced visual hierarchy with subtle borders and darker color scheme
- Fixed export function to remove # symbol from background color in .hbs files
- Fixed import function to handle color formats with or without # symbol
- Color normalization ensures internal storage without # for consistency

**Interface Redesign - HaxPuck Style**
- Implemented sage green color palette matching HaxPuck's aesthetic
- Reorganized UI into modular layout: top bar, bottom bar, side panel, and central canvas
- Created three new components: HaxTraceTopBar, HaxTraceBottomBar, HaxTraceSidePanel
- Added real-time mouse coordinate display in bottom bar
- Removed monolithic HaxTraceToolbar in favor of modular components

## System Architecture

### Frontend Architecture

**Framework & Tooling**
- React with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management

**UI Component System**
- shadcn/ui component library with Radix UI primitives
- Tailwind CSS for styling with custom design tokens
- Dark-first theme optimized for creative work
- Custom color palette based on HSL values for consistent theming

**State Management**
- React Context API (HaxTraceContext) for global editor state
- Local state management with useState for component-specific data
- Undo/redo history system implemented in editor context
- Curve sign inversion for Haxball compatibility on import/export

**Canvas Rendering**
- HTML5 Canvas API for map rendering
- Device pixel ratio handling for sharp rendering on high-DPI displays
- Vertex and segment-based drawing system
- Pan and zoom controls for viewport manipulation
- Quadratic curve rendering for curved segments

**Tool System**
- Three core tools: Add Vertex, Add Segment, and Pan
- Tool state managed centrally through HaxTraceContext
- Mouse interactions: left-click (add/select), right-click (drag/edit)
- Keyboard shortcuts for undo/redo (Ctrl+Z, Ctrl+Y)

### Data Model

**Core Data Structures**
- **Vertex**: Point with world coordinates (x, y)
- **Segment**: Connection between two vertices with optional color and curve
  - v0, v1: vertex indices
  - color: optional hex color (without #)
  - curve: optional curve value (-500 to 500)
- **HaxMap**: Complete map definition
  - id, name, width, height
  - bg: background color object
  - vertexes: array of vertices
  - segments: array of segments

**Important: Curve Compatibility**
- **Legacy format conversion**: Maps with old `curve` field automatically convert to `curveData: { type: 'angle', value: curve }` on import
- Internal storage uses `curveData` object with type ('angle', 'radius', or 'sagitta') and value
- Export converts `curveData` back to simple `curve` field with angle value for Haxball compatibility
- Ensures perfect circular arc rendering for all curved segments

### Tools & Interactions

**Add Vertex Tool**
- Left-click on canvas to create a new vertex at cursor position
- Coordinates are rounded to integers in world space

**Add Segment Tool**
- Click on two vertices to create a segment between them
- Uses color and curve values from toolbar inputs
- Selected vertices are highlighted in blue

**Pan Tool**
- Left-click and drag to pan the viewport
- Cursor changes to grab/grabbing

**Vertex Dragging**
- Right-click and drag on any vertex to reposition it
- Updates all connected segments in real-time

**Segment Curve Editing**
- Select segment by clicking on it (shows curve editor panel)
- Use slider or input field to adjust curve value
- Right-click and drag horizontally on segment to adjust curve dynamically
- Multi-select segments with Shift key

**Zoom Controls**
- Mouse wheel to zoom in/out
- Zoom range: 0.1x to 5x
- Visual feedback with zoom percentage

### Import/Export

**Export HBS**
- Serializes map to JSON format
- Inverts curve signs for Haxball compatibility
- Downloads as .hbs file named after map

**Import HBS**
- Accepts .hbs or .json files
- Inverts imported curve signs to match internal format
- Replaces current map and resets history

### Design System

**Color Palette**
- Ultra-dark backgrounds (HSL 0 0% 7%) for modern aesthetic and reduced eye strain
- Darker sidebar tones (HSL 0 0% 5%) for clear visual separation
- High-contrast foreground text (HSL 0 0% 98%)
- Primary accent blue (#5865F2 for Discord, #3b82f6 for selections)
- Softer borders (HSL 0 0% 15%) for reduced visual noise
- Red vertices, white/colored segments on canvas
- CSS custom properties for dynamic theming
- Interactive color wheel picker for intuitive color selection

**Component Patterns**
- Clean, minimal design with icon-based navigation
- Left sidebar (64px) with vertical tool and action buttons
- Right panel (288px) with organized settings sections
- Central canvas with subtle borders and semi-transparent background
- Floating curve editor panel (appears when segment selected)
- Uppercase section headers with tracking for visual hierarchy
- Consistent border radius (0.5rem) and spacing (0.25rem)
- Ultra-dark color palette optimized for reduced eye strain

## External Dependencies

### UI & Component Libraries
- **@radix-ui/react-***: Headless UI primitives for accessible components
- **shadcn/ui**: Pre-built component patterns using Radix UI
- **lucide-react**: Icon library for UI elements
- **react-icons**: Icon library for brand logos (Discord, etc.)
- **react-colorful**: Lightweight color picker component with wheel interface

### Forms & Validation
- **zod**: Runtime type validation and schema definition

### Styling & Utilities
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **clsx & tailwind-merge**: Conditional class name utilities

### Development Tools
- **@replit/vite-plugin-***: Replit-specific development tooling
- **tsx**: TypeScript execution for development server

### Key Configuration Files
- **vite.config.ts**: Build tool configuration with path aliases
- **tailwind.config.ts**: Custom theme and design tokens
- **tsconfig.json**: TypeScript compiler options with path mapping
