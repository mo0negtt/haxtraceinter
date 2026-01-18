# ‼️ HaxTrace

---

## 📐 Layout & Workspace Architecture
| **Component** | **Constraint** | **Visual Definition** |
| :--- | :--- | :--- |
| **Top Header** | `h-14` (56px) | `bg-base` | Minimalist navigation & global stats. |
| **Left Sidebar** | `w-70` (280px) | `bg-surface` | Tool palette, Layers & Node tree. |
| **Main Canvas** | `flex-1` | `bg-workspace` | Infinite grid rendering (HTML5). |
| **Right Panel** | `w-80` (320px) | `bg-surface` | Property Inspector & Color Wheel. |

---

## 🎨 Color Palette & Depth (Figma-Style)

### **1. Surfaces & Borders**
```text
  [ BASE ]     [ SURFACE ]    [ HOVER ]      [ BORDER ]     [ ACTIVE ]
  #121212      #1C1C1C        #262626        #333333        #474747
  0 0% 7%      0 0% 11%       0 0% 15%       0 0% 20%       0 0% 28%
