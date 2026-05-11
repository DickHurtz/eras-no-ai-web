/**
 * AI SETTLER SYSTEM - QUICK START GUIDE
 * 
 * Get AI settlers working in 5 minutes with these minimal steps
 */

// ============================================================================
// STEP 1: Copy Files (2 minutes)
// ============================================================================

// Copy these 3 files to your project root:
// ✓ AISettlerController.js
// ✓ AIIntegration.js  
// ✓ (this file for reference)

// ============================================================================
// STEP 2: Update HTML (1 minute)
// ============================================================================

// In your index.html, add before code0.js loads:
/*
<script src="AISettlerController.js"></script>
<script src="AIIntegration.js"></script>
<script src="code0.js"></script>
*/

// ============================================================================
// STEP 3: Initialize at Game Start (1 minute)
// ============================================================================

// In code0.js, find your scene initialization event (eventsList7 or similar)
// Add this ONE line after everything else initializes:

initializeAISystem(runtimeScene);

// ============================================================================
// STEP 4: Call AI Turn Processor (1 minute)
// ============================================================================

// Find where player clicks EndTurnBtn in code0.js
// Add this ONE line before advancing to next player:

processAIPlayerTurn(runtimeScene, currentPlayerID);

// Example of what to look for and modify:
/*
if (EndTurnBtn clicked) {
  
  // ADD THIS LINE:
  processAIPlayerTurn(runtimeScene, runtimeScene.getScene().getVariables().getFromIndex(16).getAsNumber());
  
  // Then your existing turn advancement code...
}
*/

// ============================================================================
// STEP 5: Verify Setup (5 minutes testing)
// ============================================================================

// Open browser console (F12)
// Run this command:

testAIIntegration(runtimeScene);

// Look for output like:
// "AI Integration Test"
// "1. AI Controller exists: true"
// "2. Found 4 players"
// "3. Found 3 settlers"
// "4. Found 12 LandPriority tiles"

// If all true, you're ready to test!

// ============================================================================
// THAT'S IT - Now Test!
// ============================================================================

// Play the game:
// 1. Set Player 2 (Green) as AI (PlayerAI = true in data)
// 2. Set Player 3 (Yellow) as AI (PlayerAI = true in data)
// 3. Start game with Red and Blue as human
// 4. Watch as AI players automatically move settlers!

// ============================================================================
// TROUBLESHOOTING QUICK FIXES
// ============================================================================

// Problem: AI not moving settlers
// Solution: Run testAIIntegration(runtimeScene) and check output

// Problem: "AISettlerController is not defined"
// Solution: Verify script order in HTML - AI scripts must load before code0.js

// Problem: Settlers stuck at start position
// Solution: Verify Settler object has Pathfinding behavior in data.js

// Problem: No settlements appearing
// Solution: Lower tolerance in isSettlerAtTarget (change 16 to 20)

// ============================================================================
// CUSTOMIZATION (Optional)
// ============================================================================

// Make AI settlers move slower:
// In AISettlerController.js, modify moveSettlerToTarget():
/*
const behavior = settler.getBehavior("Pathfinding");
if (behavior) {
  const targetX = targetPriority.getX();
  const targetY = targetPriority.getY();
  
  // Add speed factor (0.5 = half speed)
  behavior.moveTo(targetX, targetY);
  // behavior.setSpeed(100); // If Pathfinding supports this
}
*/

// Make AI wait before settling:
// In AISettlerController.js, add to createSettlementAtTarget():
/*
// Wait before creating settlement (in milliseconds)
setTimeout(() => {
  // settlement creation code here
}, 2000); // 2 second delay
*/

// Change target distance tolerance:
// In AISettlerController.js, modify isSettlerAtTarget():
/*
isSettlerAtTarget: function(settler, target) {
  const tolerance = 24;  // Change this number (default is 16)
  // Smaller = needs to get closer
  // Larger = can settle from further away
  ...
}
*/

// ============================================================================
// ADDING MORE AI (Optional)
// ============================================================================

// To add more AI logic beyond settler movement:

processAIPlayerTurn: function(runtimeScene, playerID) {
  // This code already runs for AI players
  
  // Current: Settler movement
  AISettlerController.processAITurn(runtimeScene, playerID);
  
  // You can add here:
  // - aiDecideWhatToBuild(runtimeScene, playerID);
  // - aiDecideWhatToResearch(runtimeScene, playerID);
  // - aiDecideToAttack(runtimeScene, playerID);
}

// ============================================================================
// FILES CREATED FOR YOU
// ============================================================================

// 1. AISettlerController.js
//    - Core AI engine
//    - Handles all settler logic
//    - ~500 lines

// 2. AIIntegration.js
//    - Integration helpers
//    - Turn processing functions
//    - Debug utilities
//    - ~200 lines

// 3. README_AI_SYSTEM.md
//    - Full documentation
//    - Detailed API reference
//    - Advanced customization
//    - Troubleshooting guide

// 4. INTEGRATION_POINTS.js
//    - Exact code locations
//    - Before/after examples
//    - Complete integration examples

// 5. This file (QUICK_START.js)
//    - You are here!
//    - Minimal setup guide
//    - Common customizations

// ============================================================================
// VERIFICATION CHECKLIST
// ============================================================================

// Before playing:
// ☐ AISettlerController.js in project root
// ☐ AIIntegration.js in project root
// ☐ Scripts loaded in HTML before code0.js
// ☐ initializeAISystem() called in scene init
// ☐ processAIPlayerTurn() called in EndTurnBtn event
// ☐ TestAIIntegration(runtimeScene) returns all true

// After creating game:
// ☐ Players 2 and 3 have PlayerAI = true
// ☐ Settlers appear for AI players
// ☐ Settlers have Pathfinding behavior
// ☐ LandPriority tiles exist on map

// While playing:
// ☐ Click EndTurnBtn for human players
// ☐ Watch AI players auto-move settlers
// ☐ Settlements appear at LandPriority tiles
// ☐ Check console for no errors (F12)

// ============================================================================
// SUCCESS INDICATORS
// ============================================================================

// You know it's working when:

// 1. Console shows "AI System Initialized" at game start
// 2. testAIIntegration returns all true
// 3. AI settlers move toward LandPriority tiles
// 4. Settlements appear when settlers reach priorities
// 5. No console errors (F12)

// ============================================================================
// NEXT STEPS
// ============================================================================

// Once AI settlers work:

// 1. Test with multiple AI players (ensure no conflicts)
// 2. Customize movement speed/behavior
// 3. Add building AI logic
// 4. Add research AI logic
// 5. Package as .exe for Windows
// 6. Playtest and balance

// ============================================================================
// SUPPORT
// ============================================================================

// If something doesn't work:

// 1. Check browser console (F12) for error messages
// 2. Run: testAIIntegration(runtimeScene);
// 3. Look at README_AI_SYSTEM.md for detailed help
// 4. Check INTEGRATION_POINTS.js for exact code locations
// 5. Review AISettlerController.js for customization options

// ============================================================================
// GOOD LUCK!
// ============================================================================

// Your AI system is now ready to use.
// Follow these 4 simple steps and you'll have working AI settlers!

// Questions? See:
// - README_AI_SYSTEM.md (complete reference)
// - INTEGRATION_POINTS.js (code examples)
// - AISettlerController.js (source code)
// - AIIntegration.js (helper functions)
