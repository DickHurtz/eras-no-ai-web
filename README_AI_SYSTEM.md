# AI Settler Control System - Implementation Guide

## Overview

This system provides autonomous settler management for AI-controlled players in your 4X civilization game. The AI system:

- ✅ Automatically moves settlers to closest available LandPriority tiles
- ✅ Maintains information isolation (each AI player only knows their own targets)
- ✅ Creates settlements automatically when settlers reach their targets
- ✅ Resets settler movement points each turn
- ✅ Prevents multiple settlers from targeting the same LandPriority

## System Architecture

### Core Components

1. **AISettlerController.js** - Core AI logic engine
   - Settler targeting system
   - Distance calculation and pathfinding
   - Target assignment and tracking
   - Settlement creation logic

2. **AIIntegration.js** - Integration hooks into game events
   - Turn processing functions
   - AI turn automation
   - Debug utilities
   - System initialization

## Installation Steps

### Step 1: Add AI System Files to Your Project

1. Copy `AISettlerController.js` to your project root
2. Copy `AIIntegration.js` to your project root
3. Ensure both files are in the same directory as `code0.js`

### Step 2: Include Scripts in HTML

In your game's `index.html` (or wherever your game loads scripts), add these lines **before** `code0.js` loads:

```html
<!-- AI System -->
<script src="AISettlerController.js"></script>
<script src="AIIntegration.js"></script>

<!-- Existing game code -->
<script src="code0.js"></script>
```

**Important**: Load AI scripts BEFORE code0.js so they're available when events execute.

### Step 3: Initialize AI System at Game Start

In your scene's initialization event (right after scene loads), add:

```javascript
{
  // Initialize AI system
  initializeAISystem(runtimeScene);
}
```

This should be in your `eventsList7` or the main scene setup event (after land generation, before player setup).

### Step 4: Add AI Turn Processing to Your Turn Management

Locate your turn advancement event. This is typically where "EndTurnBtn" is clicked.

**Find this code block in code0.js:**
```javascript
// EndTurnBtn click handler - should show something like:
if (/* EndTurnBtn clicked */) {
  // Current turn processing
  runtimeScene.getScene().getVariables().getFromIndex(16).setNumber(/* next player */);
  // ... other code ...
}
```

**Add this code inside the EndTurnBtn event, after current player's turn ends but before advancing:**

```javascript
// Process AI turn for current player
const currentPlayerID_turn = runtimeScene.getScene().getVariables().getFromIndex(16).getAsNumber();
processAIPlayerTurn(runtimeScene, currentPlayerID_turn);
```

### Step 5: Reset AI State Between Turns

Find where you reset player resources/movement each turn. Add this line:

```javascript
// Reset AI settlement targets (optional, for fresh analysis each turn)
// Uncomment if you want AI to reconsider targets every turn:
// AISettlerController.targetedPriorities[playerID] = [];
```

## Player Setup Requirements

### Ensure PlayerAI Flag is Set

Your Player object must have a `PlayerAI` boolean variable at index 20. Check your data.js:

```javascript
// Player object should have:
Player: {
  variables: {
    // ... index 0-19: existing variables ...
    20: { name: "PlayerAI", type: "boolean", value: false } // or true for AI
  }
}
```

**For AI Players**: Set `PlayerAI = true` during player initialization
**For Human Players**: Set `PlayerAI = false`

## Configuration & Customization

### Adjust Settler Target Range

In `AISettlerController.js`, modify the `isSettlerAtTarget` function:

```javascript
isSettlerAtTarget: function(settler, target) {
  const tolerance = 16; // Change this value (in pixels)
  // Smaller = more precise, Larger = more lenient
  // ...
}
```

### Adjust Turn Delay (Optional)

In `AIIntegration.js`, modify the `autoProcessAITurns` function:

```javascript
setTimeout(() => {
  advanceToNextPlayer(runtimeScene);
}, 1000); // Change 1000 to desired milliseconds
```

### Custom AI Behavior

Add this to your game's turn processing:

```javascript
// After processing settlers, add other AI logic:
processAIPlayerTurn(runtimeScene, playerID);

// Custom AI decisions:
if (isPlayerAI) {
  // AI building decisions
  // AI research choices
  // AI unit production
  // etc.
}
```

## Information Isolation (Security)

The system maintains separate tracking per player:

```javascript
// Each player has ISOLATED tracking:
settlerTargets = {
  0: { settler1: priorityA, settler2: priorityB },  // Red AI
  2: { settler1: priorityC, settler2: priorityD }   // Green AI
}

// Green AI CANNOT access Red AI's targets
// This prevents unfair knowledge sharing between AI players
```

**Verification**: If you want to verify isolation is working:

```javascript
// This should be undefined for other players:
console.log(AISettlerController.settlerTargets[3]); // Yellow's targets
console.log(AISettlerController.settlerTargets[2]); // Green's targets (isolated)
```

## API Reference

### Initialization

```javascript
initializeAISystem(runtimeScene)
```
Call once at game start to initialize all AI players.

### Processing

```javascript
processAIPlayerTurn(runtimeScene, playerID)
```
Execute AI turn for a specific player. Call this when it's their turn.

### Utility Functions

```javascript
// Get all settlers for a player
AISettlerController.getPlayerSettlers(runtimeScene, playerID)

// Get current target for settler
AISettlerController.getSettlerTarget(settler, playerID)

// Manual settler tracking
AISettlerController.removeSettlerFromTracking(settlerID, playerID)

// Debug logging
debugLogSettlers(runtimeScene, playerID)
```

## Debugging

### Enable Debug Logging

Add this after each turn processes:

```javascript
debugLogSettlers(runtimeScene, currentPlayerID);
```

This will log:
- Number of settlers
- Each settler's target priority
- Current targeted priorities list

### Console Output Example

```
Player 2 has 3 settlers
  Settler 100 -> Target 50
  Settler 101 -> Target 51
  Settler 102 -> Target 52
Targeted priorities for Player 2: [50, 51, 52]
```

### Check Settlement Creation

Verify settlements are being created:

```javascript
// In browser console:
runtimeScene.getObjects("Settlement").length  // Check count

// Check latest settlement:
const settlements = runtimeScene.getObjects("Settlement");
const latest = settlements[settlements.length - 1];
console.log(latest.getVariableNumber(latest.getVariables().getFromIndex(3))); // Owner
```

## Troubleshooting

### AI Not Moving Settlers

**Symptom**: Settlers created but not moving

**Checks**:
1. Verify `PlayerAI = true` for AI players
2. Check `initializeAISystem()` was called at game start
3. Check `processAIPlayerTurn()` is called during turn
4. Verify Pathfinding behavior exists on Settler object

**Fix**:
```javascript
// In code0.js initialization
{
  initializeAISystem(runtimeScene);
  console.log("AI System Initialized");
}
```

### Information Leakage Between AIs

**Symptom**: AI players seem to know each other's targets

**Checks**:
1. Verify each player has isolated `settlerTargets` object
2. Check no global variables share AI data
3. Confirm turn processing happens per-player, not globally

**Fix**: Do NOT do this:
```javascript
// WRONG - Global tracking
const globalTargets = {};

// RIGHT - Per-player tracking (already implemented)
this.settlerTargets = { playerID: { ... } };
```

### Settlements Not Creating

**Symptom**: Settlers reach priority tiles but no settlements appear

**Checks**:
1. Verify Settlement object exists in scene
2. Check `isSettlerAtTarget()` tolerance isn't too strict
3. Verify pathfinding behavior is working

**Fix**:
```javascript
// Lower tolerance for more reliable detection
isSettlerAtTarget: function(settler, target) {
  const tolerance = 20; // Increased from 16
  // ...
}
```

### Frame Rate Issues

**Symptom**: Game stutters when AI processes

**Solution**: Use lazy processing:
```javascript
// Process only X settlers per frame
const MAX_PER_FRAME = 2;
for (let i = 0; i < Math.min(settlers.length, MAX_PER_FRAME); i++) {
  // process settler
}
```

## Performance Notes

- System processes settlers once per turn (not every frame)
- Distance calculations use simplified Euclidean distance (fast)
- Memory usage: ~100 bytes per settler tracked
- Pathfinding handled by GDevelop's native behavior (optimized)

## Next Steps

1. **Test with Single AI Player**: Set one player to AI, others human
2. **Test with Multiple AIs**: Set 2+ to AI, verify no target conflicts
3. **Add Building AI**: Extend with settlement building decisions
4. **Add Combat AI**: Implement unit movement and combat logic
5. **Package as .exe**: After testing, use GDevelop export tools

## Known Limitations

- Current system only handles settler movement
- Does not include building/research AI
- Does not handle combat situations
- Settlement creation uses basic model (can be enhanced)

## Future Enhancements

Possible additions:

1. **Territory Expansion**: Expand settlement control area
2. **Resource Management**: Allocate buildings based on resources
3. **Research Acceleration**: Implement tech tree decisions
4. **Combat Strategy**: Add unit production and combat logic
5. **Diplomacy**: Implement AI trade and alliance systems
6. **Difficulty Levels**: Scale AI aggression and effectiveness

## Support

For issues or questions:

1. Check the Debugging section above
2. Review example code in AIIntegration.js
3. Verify all steps completed in Installation Steps section
4. Check browser console (F12) for error messages

## File Manifest

```
AISettlerController.js     - Core AI engine (do not modify unless needed)
AIIntegration.js          - Integration helpers (reference for your code0.js)
README.md                 - This file (implementation guide)
code0.js                  - Your existing game (add hooks here)
```

## License & Attribution

This AI system was created for your 4X civilization-style game.
Modify and adapt as needed for your project.

---

## Quick Checklist

Before considering implementation complete, verify:

- [ ] AISettlerController.js in project root
- [ ] AIIntegration.js in project root
- [ ] Scripts loaded in index.html before code0.js
- [ ] initializeAISystem() called at game start
- [ ] processAIPlayerTurn() called during turn advancement
- [ ] PlayerAI flag properly set for AI players
- [ ] Test with single AI player
- [ ] Test with multiple AI players
- [ ] Verify information isolation (no cheating)
- [ ] Check settlements creating properly
- [ ] Debug logging confirms system working
