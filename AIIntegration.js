/**
 * AI Integration Event Handler
 * This file demonstrates how to integrate AISettlerController into the existing game events
 * 
 * INTEGRATION INSTRUCTIONS:
 * 
 * 1. Add this code to your game's turn processing event (after "EndTurnBtn" is clicked)
 * 2. This should execute after the human player's turn ends but before advancing to next player
 * 3. Place it in the turn management section of code0.js
 * 
 * The turn flow should be:
 * - Current player (human or AI) takes actions
 * - Player clicks EndTurnBtn
 * - Check if current player is AI (PlayerAI flag)
 * - If AI: Process AI turn using AISettlerController
 * - Advance to next player
 * - Reset for new player's turn
 */

/**
 * Process AI Player Turn
 * Call this in your turn advancement logic
 */
function processAIPlayerTurn(runtimeScene, playerID) {
  // Get the player object
  const players = runtimeScene.getObjects("Player");
  const currentPlayer = players.find(p => 
    p.getVariableNumber(p.getVariables().getFromIndex(0)) === playerID
  );
  
  if (!currentPlayer) return;
  
  // Check if this player is AI-controlled
  const isPlayerAI = currentPlayer.getVariableBoolean(
    currentPlayer.getVariables().getFromIndex(20), // Assuming index 20 is PlayerAI
    false
  );
  
  if (isPlayerAI) {
    // Process AI settler movements
    AISettlerController.processAITurn(runtimeScene, playerID);
    
    // Add any additional AI logic here:
    // - Building decisions
    // - Unit production
    // - Research decisions
  }
}

/**
 * This should be added to your turn management event block.
 * Example placement in your existing event structure:
 */

// In your eventsList where EndTurnBtn is handled:
/*
{
  // ... existing EndTurnBtn click event code ...
  
  // NEW: Process AI turn if current player is AI
  const currentPlayerID = runtimeScene.getScene().getVariables().getFromIndex(16).getAsNumber();
  processAIPlayerTurn(runtimeScene, currentPlayerID);
  
  // Then advance to next player
  const nextPlayerID = currentPlayerID + 1;
  const playerCount = runtimeScene.getGame().getVariables().getFromIndex(6).getAsNumber();
  
  if (nextPlayerID >= playerCount) {
    runtimeScene.getScene().getVariables().getFromIndex(16).setNumber(0);
    runtimeScene.getGame().getVariables().getFromIndex(3).add(1); // Increment turn
  } else {
    runtimeScene.getScene().getVariables().getFromIndex(16).setNumber(nextPlayerID);
  }
}
*/

/**
 * Alternative: Auto-AI Turn (Optional - for fully automated games)
 * This continuously processes AI turns without waiting for player input
 */
function autoProcessAITurns(runtimeScene) {
  const currentPlayerID = runtimeScene.getScene().getVariables().getFromIndex(16).getAsNumber();
  const players = runtimeScene.getObjects("Player");
  
  if (!players || players.length === 0) return;
  
  const currentPlayer = players.find(p => 
    p.getVariableNumber(p.getVariables().getFromIndex(0)) === currentPlayerID
  );
  
  if (!currentPlayer) return;
  
  const isPlayerAI = currentPlayer.getVariableBoolean(
    currentPlayer.getVariables().getFromIndex(20),
    false
  );
  
  // If current player is AI, process their turn
  if (isPlayerAI) {
    processAIPlayerTurn(runtimeScene, currentPlayerID);
    
    // Wait a short time before advancing to next player
    // (provides visual feedback and prevents instant turn-taking)
    setTimeout(() => {
      advanceToNextPlayer(runtimeScene);
    }, 1000);
  }
}

/**
 * Helper: Advance to next player
 */
function advanceToNextPlayer(runtimeScene) {
  const currentPlayerID = runtimeScene.getScene().getVariables().getFromIndex(16).getAsNumber();
  const playerCount = runtimeScene.getGame().getVariables().getFromIndex(6).getAsNumber();
  
  const nextPlayerID = currentPlayerID + 1;
  
  if (nextPlayerID >= playerCount) {
    // Start new turn cycle
    runtimeScene.getScene().getVariables().getFromIndex(16).setNumber(0);
    runtimeScene.getGame().getVariables().getFromIndex(3).add(1);
  } else {
    runtimeScene.getScene().getVariables().getFromIndex(16).setNumber(nextPlayerID);
  }
}

/**
 * DEBUG: Log settler information
 */
function debugLogSettlers(runtimeScene, playerID) {
  const settlers = AISettlerController.getPlayerSettlers(runtimeScene, playerID);
  console.log(`Player ${playerID} has ${settlers.length} settlers`);
  
  for (let settler of settlers) {
    const settlerID = settler.getVariableNumber(settler.getVariables().get("EntID"));
    const targetID = AISettlerController.getSettlerTarget(settler, playerID);
    console.log(`  Settler ${settlerID} -> Target ${targetID}`);
  }
  
  console.log(`Targeted priorities for Player ${playerID}:`, 
    AISettlerController.targetedPriorities[playerID]);
}

/**
 * SETUP: Call this once at game start to initialize the AI system
 */
function initializeAISystem(runtimeScene) {
  AISettlerController.resetTracking();
  
  // Get number of players
  const players = runtimeScene.getObjects("Player");
  
  for (let player of players) {
    const playerID = player.getVariableNumber(player.getVariables().getFromIndex(0));
    const isPlayerAI = player.getVariableBoolean(
      player.getVariables().getFromIndex(20),
      false
    );
    
    if (isPlayerAI) {
      AISettlerController.initializePlayer(playerID);
      console.log(`Initialized AI for Player ${playerID}`);
    }
  }
}
