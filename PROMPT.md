# Ralph Session: Coco y Mango Games (Final Batch)

## PRD Reference
**Source:** PRD.json
**Stories:** Games 11, 12, 13

## Your Mission
Implement the next incomplete game from PRD.json. Read PRD.json to find the first story with `"passes": false`.

## Project Context

**Target file:** `juegos.html` - Single HTML file with all games
**Tech stack:** React 18 + Tailwind CSS via CDN, Babel for JSX
**Patterns:** See existing Game1-6 implementations for reference

### Shared Components Available
- `GameWrapper` - Header with back/pause buttons
- `GameIntroScreen` - Shows instructions and start button
- `GameEndScreen` - Shows score, stars, restart/exit options
- `StarRating` - Star display component
- `games` array - Game metadata at top of script

### Game Component Pattern
```javascript
const Game{N}{Name} = ({ isPaused, onGameEnd }) => {
  const [gameState, setGameState] = useState('intro');
  // ... game logic

  if (gameState === 'intro') {
    return <GameIntroScreen game={games[N-1]} instructions="..." onStart={startGame} />;
  }
  if (gameState === 'ended') {
    return <GameEndScreen score={score} stars={getStars()} message="..." onRestart={startGame} onExit={onGameEnd} />;
  }
  // ... game UI
};
```

### Where to Insert
- Component: Look for `// ==================== GAME {N}: ... ====================` markers
- Route: Add `if (currentGame === N)` in GamesApp render, before "Other games show coming soon"
- Available: Add N to `availableGames` array

## Detailed PRDs
For full game mechanics, read `docs/plans/game-{NN}-prd.json`:
- Game 11: docs/plans/game-11-prd.json (Hidden object - find Patricio)
- Game 12: docs/plans/game-12-prd.json (Airport rush - time pressure runner)
- Game 13: docs/plans/game-13-prd.json (Catch the ticket - chase game)

## Context Awareness
**CRITICAL: Before doing anything:**
1. Read juegos.html to understand existing patterns
2. Read the detailed PRD for the current game
3. Match existing code style (React hooks, Tailwind classes, SVG sprites)
4. Don't recreate what already exists
5. Check availableGames array before adding to it

## Signs (Learnings from Games 1-6)
- Use `useRef` for animation IDs and interval cleanup
- Use `useEffect` with cleanup for game loops
- Touch controls: onTouchStart, onTouchMove, onTouchEnd + mouse equivalents
- SVG sprites work well for characters
- Floating text animations: CSS @keyframes
- Respect `isPaused` prop in all useEffect game loops

## Completion Protocol
When ALL acceptance criteria for current story are met:
1. Verify game loads and plays correctly
2. Update PRD.json: set current story's `"passes": true`
3. Check if more stories remain with `"passes": false`
4. If all stories complete: Create DONE.md with summary
5. If more stories remain: Exit cleanly (next iteration picks up next story)

## Begin
1. Read PRD.json to find current story (first with passes: false)
2. Read the detailed PRD for that game
3. Read juegos.html for patterns
4. Implement the game component
5. Add route and update availableGames
6. Verify all acceptance criteria
7. Update PRD.json passes: true
8. Exit or create DONE.md
