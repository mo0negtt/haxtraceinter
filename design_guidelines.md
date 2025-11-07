# HaxTrace Map Editor - Design Guidelines

## Design Approach

**Reference-Based Approach:** Inspired by Dripzels and modern design tools (Figma, Linear, Framer) with a focus on dark-themed creative applications. This is a utility-focused application requiring precision, clarity, and efficient workflows.

**Core Design Principles:**
- Dark-first interface optimized for extended editing sessions
- High contrast for canvas content visibility
- Minimal chrome to maximize workspace
- Professional tool aesthetic with subtle depth

---

## Color Palette

**Dark Mode Foundation:**
- Background Base: `0 0% 7%` (Deep charcoal)
- Surface Elevated: `0 0% 11%` (Panels, sidebars)
- Surface Interactive: `0 0% 15%` (Hover states, cards)
- Border Subtle: `0 0% 20%` (Dividers, panel edges)
- Border Strong: `0 0% 28%` (Active borders, selected states)

**Accent Colors:**
- Primary (Active/Selection): `217 91% 60%` (Bright blue - for selected tools, active states)
- Success: `142 76% 36%` (Grid helpers, confirmations)
- Warning: `38 92% 50%` (Unsaved changes indicators)
- Error: `0 84% 60%` (Destructive actions)

**Text Hierarchy:**
- Primary Text: `0 0% 98%` (Headings, labels)
- Secondary Text: `0 0% 72%` (Descriptions, metadata)
- Tertiary Text: `0 0% 52%` (Placeholder, disabled)

---

## Typography

**Font Families:**
- Primary: `'Inter', -apple-system, sans-serif` (UI, labels, buttons)
- Monospace: `'JetBrains Mono', 'Fira Code', monospace` (Coordinates, dimensions, code)

**Type Scale:**
- Logo/Hero: `text-2xl font-bold` (24px)
- Panel Headers: `text-sm font-semibold tracking-wide uppercase` (12px)
- Body/Labels: `text-sm` (14px)
- Small/Meta: `text-xs` (12px)
- Coordinates: `text-xs font-mono` (12px monospace)

**Text Treatment:**
- Panel headers: Uppercase with letter-spacing
- Values/inputs: Tabular numbers for alignment
- Tool labels: Sentence case, concise

---

## Layout System

**Spacing Primitives:** Use Tailwind units of `2, 3, 4, 6, 8` for consistent rhythm
- Micro spacing: `p-2, gap-2` (8px) - Within components
- Standard spacing: `p-4, gap-4` (16px) - Between elements
- Section spacing: `p-6, gap-6` (24px) - Panel padding
- Large spacing: `p-8` (32px) - Major separations

**Grid Structure:**
```
┌─────────────────────────────────────────────┐
│ Header (h-14)                               │
├──────┬──────────────────────────┬───────────┤
│ Left │   Main Canvas Area       │   Right   │
│ Side │   (Flex-grow)            │   Side    │
│ bar  │                          │   bar     │
│(280) │                          │   (320)   │
└──────┴──────────────────────────┴───────────┘
```

**Component Spacing:**
- Header height: `h-14` (56px)
- Sidebar widths: Left `w-70` (280px), Right `w-80` (320px)
- Panel internal padding: `p-4`
- Section gaps: `gap-6`

---

## Component Library

### Header Navigation
- Dark background `bg-[hsl(0,0%,7%)]` with subtle bottom border
- Logo: Bold, 24px, with icon glyph
- Nav items: Subtle hover `hover:bg-[hsl(0,0%,11%)]`, rounded `rounded-md`, padding `px-3 py-2`
- User controls: Right-aligned, icon buttons

### Sidebar Panels
- Background: `bg-[hsl(0,0%,11%)]` slightly elevated from main background
- Panel sections with headers: Uppercase, tracked, `text-xs font-semibold`, `pb-3`
- Collapsible sections with chevron icons
- Borders between major sections: `border-b border-[hsl(0,0%,20%)]`

### Tool Palette
- Icon-based tool buttons in a vertical strip
- Active tool: `bg-[hsl(217,91%,60%)] text-white`
- Inactive tools: `text-gray-400 hover:bg-[hsl(0,0%,15%)]`
- Button size: `w-10 h-10`, icons `w-5 h-5`
- Tooltips on hover with keyboard shortcuts

### Canvas Area
- Main workspace background: `bg-[hsl(0,0%,9%)]`
- Canvas grid: Subtle lines `stroke-[hsl(0,0%,15%)]`, 1px weight
- Floating control panel (top-right): Zoom controls, coordinates display
- Semi-transparent backdrop: `bg-black/40 backdrop-blur-sm`

### Input Fields
- Background: `bg-[hsl(0,0%,7%)]` (darker than panel)
- Border: `border border-[hsl(0,0%,28%)]`
- Focus state: `ring-2 ring-[hsl(217,91%,60%)] border-transparent`
- Padding: `px-3 py-2`
- Height: `h-9` for standard inputs

### Buttons
- Primary: `bg-[hsl(217,91%,60%)] hover:bg-[hsl(217,91%,55%)] text-white`
- Secondary: `bg-[hsl(0,0%,15%)] hover:bg-[hsl(0,0%,20%)] text-gray-200`
- Outline: `border border-[hsl(0,0%,28%)] hover:bg-[hsl(0,0%,15%)]`
- Height: `h-9`, padding: `px-4`

### Layer Panel (Right Sidebar)
- Layer rows: `bg-[hsl(0,0%,13%)]` with `hover:bg-[hsl(0,0%,15%)]`
- Active layer: `border-l-2 border-[hsl(217,91%,60%)]`
- Drag handles: Subtle icon, `text-gray-600`
- Layer controls: Visibility toggle, lock, delete icons at right

### Properties Panel
- Label-value pairs in vertical stack
- Labels: `text-xs text-gray-500 uppercase tracking-wide mb-1`
- Values: Input fields or read-only displays
- Color picker: Compact swatch with hex input

### Tile Palette (Bottom or Right)
- Grid of tile thumbnails: `grid grid-cols-8 gap-1`
- Tile size: `w-12 h-12`
- Active tile: `ring-2 ring-[hsl(217,91%,60%)]`
- Background: `bg-[hsl(0,0%,13%)]`

---

## Interactions & States

**Hover States:** Subtle brightness increase `hover:brightness-110` or background shift
**Active/Selected:** Primary blue border or background
**Disabled:** `opacity-40 cursor-not-allowed`
**Focus Rings:** `ring-2 ring-[hsl(217,91%,60%)] ring-offset-2 ring-offset-[hsl(0,0%,7%)]`

**Animations:** Minimal - use only for:
- Panel collapse/expand: `transition-all duration-200`
- Tool selection feedback: Quick background transition
- Canvas operations: Instant, no delays

---

## Accessibility

- Maintain 4.5:1 contrast for all text
- Keyboard navigation: Tab through all controls, Escape to cancel
- Tool shortcuts displayed in tooltips
- Screen reader labels for icon-only buttons
- Focus indicators always visible

---

## No Images Required

This is a utility application - no decorative images needed. All visuals are functional: icons for tools, canvas content, and UI controls.