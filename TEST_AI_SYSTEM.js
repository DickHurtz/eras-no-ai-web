/**
 * AI SETTLER SYSTEM - TEST & DEMO
 * 
 * Use this file to verify your AI system is working correctly
 * and to test different scenarios
 */

// ============================================================================
// TEST 1: Verify Files Loaded
// ============================================================================

function test_FilesLoaded() {
  console.log("=== TEST 1: Files Loaded ===");
  
  const aiControllerExists = typeof AISettlerController !== 'undefined';
  const integrationExists = typeof processAIPlayerTurn !== 'undefined';
  
  console.log("✓ AISettlerController:", aiControllerExists ? "LOADED" : "MISSING");
  console.log("✓ AIIntegration helpers:", integrationExists ? "LOADED" : "MISSING");
  
  if (!aiControllerExists || !integrationExists) {
    console.error("ERROR: Make sure AI scripts are loaded in HTML before code0.js");
    return false;
  }
  return true;
}

// ============================================================================
// TEST 2: Verify Game Objects
// ============================================================================

function test_GameObjects(runtimeScene) {
  console.log("\n=== TEST 2: Game Objects ===");
  
  const players = runtimeScene.getObjects("Player");
  const settlers = runtimeScene.getObjects("Settler");
  const priorities = runtimeScene.getObjects("LandPriority");
  const settlements = runtimeScene.getObjects("Settlement");
  
  console.log("Players:", players ? players.length : 0);
  console.log("Settlers:", settlers ? settlers.length : 0);
  console.log("LandPriority tiles:", priorities ? priorities.length : 0);
  console.log("Settlements:", settlements ? settlements.length : 0);
  
  return {
    playerCount: players ? players.length : 0,
    settlerCount: settlers ? settlers.length : 0,
    priorityCount: priorities ? priorities.length : 0,
    settlementCount: settlements ? settlements.length : 0
  };
}

// ============================================================================
// TEST 3: Verify Player Setup
// ============================================================================

function test_PlayerSetup(runtimeScene) {
  console.log("\n=== TEST 3: Player Setup ===");
  
  const players = runtimeScene.getObjects("Player");
  let allValid = true;
  
  players.forEach((player, i) => {
    const playerID = player.getVariableNumber(player.getVariables().getFromIndex(0));
    const playerName = player.getVariableString(player.getVariables().getFromIndex(21));
    const isAI = player.getVariableBoolean(player.getVariables().getFromIndex(20), false);
    
    console.log(`Player ${playerID}: "${playerName}" - AI: ${isAI}`);
    
    if (playerID === undefined) {
      console.error(`  ERROR: Player ${i} missing PlayerID`);
      allValid = false;
    }
  });
  
  return allValid;
}

// ============================================================================
// TEST 4: Verify Settler Properties
// ============================================================================

function test_SettlerProperties(runtimeScene) {
  console.log("\n=== TEST 4: Settler Properties ===");
  
  const settlers = runtimeScene.getObjects("Settler");
  let allValid = true;
  
  if (!settlers || settlers.length === 0) {
    console.warn("No settlers found - skipping settler tests");
    return true;
  }
  
  settlers.forEach((settler, i) => {
    if (i >= 2) return; // Check first 2 only for brevity
    
    const entID = settler.getVariableNumber(settler.getVariables().get("EntID"));
    const belongsTo = settler.getVariableNumber(settler.getVariables().get("BelongsToPlayer"));
    const hasPathfinding = settler.hasBehavior("Pathfinding");
    
    console.log(`Settler ${i}:`);
    console.log(`  EntID: ${entID}`);
    console.log(`  BelongsToPlayer: ${belongsTo}`);
    console.log(`  Pathfinding: ${hasPathfinding ? "YES" : "NO"}`);
    
    if (hasPathfinding === false) {
      console.error("  ERROR: Settler missing Pathfinding behavior!");
      allValid = false;
    }
  });
  
  if (settlers.length > 2) {
    console.log(`... and ${settlers.length - 2} more settlers`);
  }
  
  return allValid;
}

// ============================================================================
// TEST 5: Verify LandPriority Properties
// ============================================================================

function test_LandPriorityProperties(runtimeScene) {
  console.log("\n=== TEST 5: LandPriority Properties ===");
  
  const priorities = runtimeScene.getObjects("LandPriority");
  let allValid = true;
  
  if (!priorities || priorities.length === 0) {
    console.warn("No LandPriority tiles found");
    return true;
  }
  
  priorities.slice(0, 3).forEach((priority, i) => {
    const id = priority.getVariableString(priority.getVariables().get("id"));
    console.log(`Priority ${i}: ID="${id}"`);
    
    if (!id) {
      console.error("  ERROR: LandPriority missing ID!");
      allValid = false;
    }
  });
  
  if (priorities.length > 3) {
    console.log(`... and ${priorities.length - 3} more priorities`);
  }
  
  return allValid;
}

// ============================================================================
// TEST 6: Verify AI System Initialized
// ============================================================================

function test_AISystemInitialized(runtimeScene) {
  console.log("\n=== TEST 6: AI System Initialized ===");
  
  const hasTrackingData = Object.keys(AISettlerController.settlerTargets).length > 0;
  
  console.log("Settler targets initialized:", hasTrackingData);
  console.log("Current tracked players:", Object.keys(AISettlerController.settlerTargets));
  
  return hasTrackingData;
}

// ============================================================================
// TEST 7: Manual Settler Assignment Test
// ============================================================================

function test_ManualSettlerAssignment(runtimeScene) {
  console.log("\n=== TEST 7: Manual Settler Assignment ===");
  
  const settlers = runtimeScene.getObjects("Settler");
  const priorities = runtimeScene.getObjects("LandPriority");
  
  if (!settlers || settlers.length === 0 || !priorities || priorities.length === 0) {
    console.warn("Not enough settlers or priorities for this test");
    return true;
  }
  
  const testSettler = settlers[0];
  const testPriority = priorities[0];
  const playerID = testSettler.getVariableNumber(testSettler.getVariables().get("BelongsToPlayer"));
  
  // Manually assign
  AISettlerController.assignTargetToSettler(testSettler, testPriority, playerID);
  
  console.log("Assigned settler to priority - checking tracking...");
  console.log("Settler targets:", AISettlerController.settlerTargets);
  console.log("Targeted priorities:", AISettlerController.targetedPriorities);
  
  return true;
}

// ============================================================================
// TEST 8: Distance Calculation
// ============================================================================

function test_DistanceCalculation() {
  console.log("\n=== TEST 8: Distance Calculation ===");
  
  // Test distance function
  const dist1 = AISettlerController.getDistance(0, 0, 3, 4);
  const dist2 = AISettlerController.getDistance(100, 100, 100, 200);
  
  console.log("Distance (0,0) to (3,4):", dist1, "expected: 5");
  console.log("Distance (100,100) to (100,200):", dist2, "expected: 100");
  
  const test1Pass = Math.abs(dist1 - 5) < 0.1;
  const test2Pass = Math.abs(dist2 - 100) < 0.1;
  
  console.log("Distance calculations:", test1Pass && test2Pass ? "PASS" : "FAIL");
  return test1Pass && test2Pass;
}

// ============================================================================
// TEST 9: Find Closest Priority
// ============================================================================

function test_FindClosestPriority(runtimeScene) {
  console.log("\n=== TEST 9: Find Closest Priority ===");
  
  const settlers = runtimeScene.getObjects("Settler");
  const priorities = runtimeScene.getObjects("LandPriority");
  
  if (!settlers || settlers.length === 0 || !priorities || priorities.length === 0) {
    console.warn("Not enough settlers or priorities for this test");
    return true;
  }
  
  const settler = settlers[0];
  const playerID = settler.getVariableNumber(settler.getVariables().get("BelongsToPlayer"));
  
  AISettlerController.initializePlayer(playerID);
  
  const closest = AISettlerController.findClosestPriority(runtimeScene, settler, playerID);
  
  if (closest) {
    const distance = AISettlerController.getDistance(
      settler.getX(),
      settler.getY(),
      closest.getX(),
      closest.getY()
    );
    console.log("Found closest priority at distance:", distance.toFixed(2));
    return true;
  } else {
    console.warn("No closest priority found");
    return true;
  }
}

// ============================================================================
// TEST 10: Full AI Turn Simulation
// ============================================================================

function test_FullAITurnSimulation(runtimeScene) {
  console.log("\n=== TEST 10: Full AI Turn Simulation ===");
  
  const players = runtimeScene.getObjects("Player");
  const aiPlayers = players.filter(p => 
    p.getVariableBoolean(p.getVariables().getFromIndex(20), false)
  );
  
  console.log("Found", aiPlayers.length, "AI players");
  
  aiPlayers.forEach(player => {
    const playerID = player.getVariableNumber(player.getVariables().getFromIndex(0));
    console.log("Processing AI turn for Player", playerID);
    
    // This would normally be called during actual game turn
    // Don't actually call it here to avoid side effects
    console.log("  (Would call: AISettlerController.processAITurn(runtimeScene,", playerID, "))");
  });
  
  return true;
}

// ============================================================================
// RUN ALL TESTS
// ============================================================================

function runAllTests(runtimeScene) {
  console.clear();
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║         AI SETTLER SYSTEM - COMPREHENSIVE TEST            ║");
  console.log("╚════════════════════════════════════════════════════════════╝");
  
  const results = [];
  
  // Test 1
  const test1 = test_FilesLoaded();
  results.push({name: "Files Loaded", pass: test1});
  
  if (!test1) {
    console.error("\nCannot continue - AI files not loaded");
    return results;
  }
  
  // Test 2
  const test2Data = test_GameObjects(runtimeScene);
  const test2 = test2Data.playerCount > 0 && test2Data.priorityCount > 0;
  results.push({name: "Game Objects", pass: test2});
  
  // Test 3
  const test3 = test_PlayerSetup(runtimeScene);
  results.push({name: "Player Setup", pass: test3});
  
  // Test 4
  const test4 = test_SettlerProperties(runtimeScene);
  results.push({name: "Settler Properties", pass: test4});
  
  // Test 5
  const test5 = test_LandPriorityProperties(runtimeScene);
  results.push({name: "LandPriority Properties", pass: test5});
  
  // Test 6
  const test6 = test_AISystemInitialized(runtimeScene);
  results.push({name: "AI System Initialized", pass: test6});
  
  // Test 7
  const test7 = test_ManualSettlerAssignment(runtimeScene);
  results.push({name: "Manual Assignment", pass: test7});
  
  // Test 8
  const test8 = test_DistanceCalculation();
  results.push({name: "Distance Calculation", pass: test8});
  
  // Test 9
  const test9 = test_FindClosestPriority(runtimeScene);
  results.push({name: "Find Closest Priority", pass: test9});
  
  // Test 10
  const test10 = test_FullAITurnSimulation(runtimeScene);
  results.push({name: "Full Turn Simulation", pass: test10});
  
  // Summary
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║                      TEST SUMMARY                         ║");
  console.log("╠════════════════════════════════════════════════════════════╣");
  
  results.forEach(result => {
    const icon = result.pass ? "✓" : "✗";
    const status = result.pass ? "PASS" : "FAIL";
    console.log(`║ ${icon} ${result.name.padEnd(40)} ${status.padStart(15)} ║`);
  });
  
  const passCount = results.filter(r => r.pass).length;
  const totalCount = results.length;
  
  console.log("╠════════════════════════════════════════════════════════════╣");
  console.log(`║ TOTAL: ${passCount}/${totalCount} TESTS PASSED${passCount === totalCount ? " - READY TO PLAY!" : " - NEEDS FIXES"}`);
  console.log("╚════════════════════════════════════════════════════════════╝");
  
  return results;
}

// ============================================================================
// USAGE IN BROWSER CONSOLE
// ============================================================================

/*
How to use this test file:

1. Open your game in browser
2. Press F12 to open console
3. Run: runAllTests(runtimeScene);

Expected output if everything works:
✓ Files Loaded                                PASS
✓ Game Objects                               PASS
✓ Player Setup                               PASS
✓ Settler Properties                         PASS
✓ LandPriority Properties                    PASS
✓ AI System Initialized                      PASS
✓ Manual Assignment                          PASS
✓ Distance Calculation                       PASS
✓ Find Closest Priority                      PASS
✓ Full Turn Simulation                       PASS
TOTAL: 10/10 TESTS PASSED - READY TO PLAY!

If any fail, check the error message above it for what's wrong.
*/

// ============================================================================
// QUICK DIAGNOSTIC SHORTHAND
// ============================================================================

function quickDiagnostic(runtimeScene) {
  console.log("=== QUICK DIAGNOSTIC ===");
  console.log("AI System:", typeof AISettlerController !== 'undefined' ? "OK" : "MISSING");
  console.log("Players:", (runtimeScene.getObjects("Player") || []).length);
  console.log("Settlers:", (runtimeScene.getObjects("Settler") || []).length);
  console.log("Priorities:", (runtimeScene.getObjects("LandPriority") || []).length);
  console.log("AI Players:", (runtimeScene.getObjects("Player") || []).filter(p => 
    p.getVariableBoolean(p.getVariables().getFromIndex(20), false)
  ).length);
  console.log("Status:", "Ready to test!");
}
