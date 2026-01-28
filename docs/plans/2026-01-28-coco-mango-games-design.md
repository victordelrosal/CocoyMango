# Coco y Mango Games - Design Document

**Date:** 2026-01-28
**Status:** Approved

## Overview

Turn each of the 13 Coco y Mango episodes into simple mini-games. Each game's theme and mechanics are based on the story's plot.

- **Platform:** Responsive web app (mobile + desktop)
- **Target Audience:** Kids 6-10 years old
- **Language:** Spanish
- **Tech Stack:** React 18 + Tailwind CSS via CDN (matching existing site)

## Architecture

```
CocoyMango/
├── index.html          (existing stories)
├── juegos.html         (NEW - games hub)
├── juegos/             (NEW - game modules)
│   ├── components/     (shared game components)
│   ├── game01.js
│   ├── game02.js
│   └── ... (13 total)
├── imagenes/           (existing - reuse artwork)
└── historias/          (existing)
```

No build step required - all scripts load via CDN or inline.

## Game Mechanics

| # | Title | Game Type | Mechanic |
|---|-------|-----------|----------|
| 1 | El primer día de clases | Calm Down | Thunder strikes randomly - tap Coco to help him breathe and stay calm. Don't let the panic meter fill up. |
| 2 | El volcán | Endless Runner | Run downhill avoiding falling rocks and lava. Swipe/tap to jump and dodge. |
| 3 | Nieve | Collector | Catch snowflakes falling from the sky. Avoid hot sun rays that melt your snow count. |
| 4 | El cuervo y los primos | Hide & Seek | Tap to hide behind objects before the crow spots you. Guide all 4 lizards home safely. |
| 5 | Avión de papel | Glider | Tilt/swipe to steer the paper airplane through the stadium. Don't hit the walls. |
| 6 | Agua de coco y mango | Tapping Game | Customers arrive - tap to serve the right drink (coco or mango). Speed increases. |
| 7 | La alcantarilla | Maze | Navigate the dark sewer to find your coins. Tap to use flashlight sparingly. |
| 8 | El papalote | Balance | Keep the kite steady in changing winds. Tilt/drag to balance. Birds help when you're in trouble. |
| 9 | El tesoro perdido | Puzzle | Follow the map clues - tap the right landmarks in order to find the treasure. |
| 10 | La carrera de barquitos | Racing | Blow (tap repeatedly) to push your boat. Avoid debris. Rescue Mango if he falls in! |
| 11 | El día de San Patricio | Hidden Object | Find Patricio in the town scenes. Then find the clover to deliver. |
| 12 | La aventura al aeropuerto | Time Pressure | Run through obstacles to catch the bus before it leaves. Countdown timer. |
| 13 | El boleto número 13 | Chase/Catch | The ticket is blowing in the wind - tap to catch it before it flies away. |

## UI/UX Design

### Games Hub (`juegos.html`)
- Header: "Los Juegos de Coco y Mango" with logo
- Grid of 13 episode cards (2 columns mobile, 3-4 desktop)
- Each card: episode image, title, play button
- Progress indicator (stars/checkmarks for completed games)
- Link back to stories site

### Individual Game Screen
- Full-screen game canvas
- Brief intro text explaining controls ("¡Toca para saltar!")
- Pause button (top corner)
- Score/timer display where relevant
- End screen: 1-3 stars based on performance
- "Jugar de nuevo" and "Volver" buttons

### Controls
- Touch-first, mouse-compatible
- Tap = click
- Swipe = drag
- All games playable one-handed

### Visual Style
- Reuse episode images as backgrounds
- Coco/Mango as CSS-animated sprites
- Bright colors (greens, oranges, warm tones)
- Comic Neue font for text

## Technical Implementation

### Game Engine
- Pure React + CSS animations
- Canvas API only where needed (glider, runner)
- DOM elements with CSS transforms for most games
- `requestAnimationFrame` for 60fps game loops

### State Management
- React useState/useReducer per game
- localStorage for progress persistence
- No backend required

### Shared Components
```
GameWrapper     - pause, score, intro/outro screens
GameCard        - episode selector on hub
StarRating      - 1-3 stars performance display
TouchController - unified tap/swipe detection
SpriteAnimator  - CSS sprite animations
```

### Performance
- Lazy load game scripts
- Preload next episode assets
- Target: smooth on mid-range phones

### Audio (Optional)
- Short sound effects (tap, success, fail)
- Toggle off option
- No background music

## Implementation Phases

### Phase 1: Foundation
- Create `juegos.html` with hub UI
- Build shared components
- Implement Game 6 (Agua de coco) as proof of concept

### Phase 2: Core Games
- Game 1: Calm Down
- Game 3: Snow Collector
- Game 9: Treasure Puzzle
- Game 11: Hidden Object
- Game 13: Catch the Ticket

### Phase 3: Action Games
- Game 2: Volcano Runner
- Game 4: Crow Hide & Seek
- Game 10: Boat Race
- Game 12: Airport Rush

### Phase 4: Physics Games
- Game 5: Paper Airplane
- Game 7: Sewer Maze
- Game 8: Kite Balance

### Phase 5: Polish
- Progress saving to localStorage
- Sound effects
- Performance optimization
- Cross-link stories and games sites

## Assets

### Existing (reuse)
- `imagenes/imagen01.png` through `imagen13.png` - episode artwork
- Comic Neue font (already loaded)
- Tailwind CSS + React CDN

### New (create)
- Simple Coco/Mango sprite variations (can extract from existing images or use CSS shapes)
- Game-specific icons (pause, play, stars)
- Optional: sound effect files
