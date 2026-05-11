/**
 * AI Settler Controller System
 * Manages automated settler movement and settlement creation for AI players
 * 
 * Features:
 * - Each AI player has isolated settler target tracking (no inter-player knowledge sharing)
 * - Settlers automatically move to closest available LandPriority
 * - Auto-settlement when settler reaches LandPriority
 * - Proper pathfinding integration with GDevelop's Pathfinding behavior
 */

// Initialize AI settler tracking system
const AISettlerController = {
  // Track targets per player to maintain information isolation
  // Format: { playerID: { settlerID: targetPriorityID, ... } }
  settlerTargets: {},
  
  // Track which LandPriority tiles are being targeted by each player
  // Format: { playerID: [priorityID1, priorityID2, ...] }
  targetedPriorities: {},
  
  // Store settler last known position for pathfinding recalculation
  settlerPositions: {},
  
  /**
   * Initialize tracking for a specific AI player
   */
  initializePlayer: function(playerID) {
    if (!this.settlerTargets[playerID]) {
      this.settlerTargets[playerID] = {};
      this.targetedPriorities[playerID] = [];
    }
  },
  
  /**
   * Get distance between two points (simplified Euclidean)
   */
  getDistance: function(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  },
  
  /**
   * Get all LandPriority tiles that belong to any team
   */
  getAllLandPriorities: function(runtimeScene) {
    const priorities = runtimeScene.getObjects("LandPriority");
    return priorities || [];
  },
  
  /**
   * Get settlers belonging to specific player
   */
  getPlayerSettlers: function(runtimeScene, playerID) {
    const allSettlers = runtimeScene.getObjects("Settler");
    if (!allSettlers) return [];
    
    return allSettlers.filter(settler => 
      settler.getVariableNumber(settler.getVariables().get("BelongsToPlayer")) === playerID
    );
  },
  
  /**
   * Get available LandPriority tiles NOT being targeted by this player's settlers
   */
  getAvailablePriorities: function(runtimeScene, playerID) {
    const allPriorities = this.getAllLandPriorities(runtimeScene);
    const targeted = this.targetedPriorities[playerID] || [];
    
    return allPriorities.filter(priority => {
      const priorityID = priority.returnVariable(
        priority.getVariables().get("id")
      ).getAsNumber();
      return !targeted.includes(priorityID);
    });
  },
  
  /**
   * Find closest available LandPriority for a settler
   * Each AI player only sees their own targeted priorities (information isolation)
   */
  findClosestPriority: function(runtimeScene, settler, playerID) {
    const availablePriorities = this.getAvailablePriorities(runtimeScene, playerID);
    
    if (availablePriorities.length === 0) {
      return null; // No available priorities for this player
    }
    
    const settlerX = settler.getX();
    const settlerY = settler.getY();
    
    let closestPriority = null;
    let closestDistance = Infinity;
    
    for (let priority of availablePriorities) {
      const distance = this.getDistance(
        settlerX, 
        settlerY, 
        priority.getX(), 
        priority.getY()
      );
      
      if (distance < closestDistance) {
        closestDistance = distance;
        closestPriority = priority;
      }
    }
    
    return closestPriority;
  },
  
  /**
   * Assign target to settler
   */
  assignTargetToSettler: function(settler, priority, playerID) {
    const settlerID = settler.getVariableNumber(settler.getVariables().get("EntID"));
    const priorityID = priority.getVariableNumber(priority.getVariables().get("id"));
    
    // Initialize player tracking if needed
    this.initializePlayer(playerID);
    
    // Assign target
    this.settlerTargets[playerID][settlerID] = priorityID;
    
    // Add to targeted list if not already there
    if (!this.targetedPriorities[playerID].includes(priorityID)) {
      this.targetedPriorities[playerID].push(priorityID);
    }
    
    return priorityID;
  },
  
  /**
   * Remove settler from tracking (when settled or destroyed)
   */
  removeSettlerFromTracking: function(settlerID, playerID) {
    if (this.settlerTargets[playerID] && this.settlerTargets[playerID][settlerID]) {
      const priorityID = this.settlerTargets[playerID][settlerID];
      delete this.settlerTargets[playerID][settlerID];
      
      // Check if any other settler is targeting this priority
      let isStillTargeted = false;
      for (let otherSettlerID in this.settlerTargets[playerID]) {
        if (this.settlerTargets[playerID][otherSettlerID] === priorityID) {
          isStillTargeted = true;
          break;
        }
      }
      
      // Remove from targeted list if no longer targeted
      if (!isStillTargeted) {
        const index = this.targetedPriorities[playerID].indexOf(priorityID);
        if (index > -1) {
          this.targetedPriorities[playerID].splice(index, 1);
        }
      }
    }
  },
  
  /**
   * Get target for settler
   */
  getSettlerTarget: function(settler, playerID) {
    const settlerID = settler.getVariableNumber(settler.getVariables().get("EntID"));
    return this.settlerTargets[playerID] && this.settlerTargets[playerID][settlerID];
  },
  
  /**
   * Process AI turn - move all AI settlers toward their targets
   */
  processAITurn: function(runtimeScene, playerID) {
    // Initialize player if needed
    this.initializePlayer(playerID);
    
    const settlers = this.getPlayerSettlers(runtimeScene, playerID);
    
    for (let settler of settlers) {
      const settlerID = settler.getVariableNumber(settler.getVariables().get("EntID"));
      let targetPriorityID = this.getSettlerTarget(settler, playerID);
      
      // If no target assigned, find closest priority
      if (!targetPriorityID) {
        const priority = this.findClosestPriority(runtimeScene, settler, playerID);
        if (priority) {
          targetPriorityID = this.assignTargetToSettler(settler, priority, playerID);
        } else {
          continue; // No available priority
        }
      }
      
      // Find the priority object by ID
      const allPriorities = this.getAllLandPriorities(runtimeScene);
      const targetPriority = allPriorities.find(p => 
        p.getVariableNumber(p.getVariables().get("id")) === targetPriorityID
      );
      
      if (targetPriority) {
        // Move settler toward target using pathfinding
        this.moveSettlerToTarget(settler, targetPriority, runtimeScene);
        
        // Check if settler reached target
        if (this.isSettlerAtTarget(settler, targetPriority)) {
          this.createSettlementAtTarget(settler, targetPriority, runtimeScene);
          this.removeSettlerFromTracking(settlerID, playerID);
        }
      }
    }
  },
  
  /**
   * Move settler toward target using GDevelop pathfinding
   */
  moveSettlerToTarget: function(settler, targetPriority, runtimeScene) {
    const behavior = settler.getBehavior("Pathfinding");
    
    if (behavior) {
      // Clear existing path and set new destination
      const targetX = targetPriority.getX();
      const targetY = targetPriority.getY();
      
      // Move toward target
      behavior.moveTo(targetX, targetY);
      settler.simulationTimeDelta = runtimeScene.getGame().getRenderer().getFrameTime() / 1000;
    }
  },
  
  /**
   * Check if settler is at/near target location
   */
  isSettlerAtTarget: function(settler, target) {
    const tolerance = 16; // Half a tile (32x32 tiles)
    const distance = this.getDistance(
      settler.getX(),
      settler.getY(),
      target.getX(),
      target.getY()
    );
    
    return distance <= tolerance;
  },
  
  /**
   * Create settlement at target location
   * Replicates the settlement creation logic from human players
   */
  createSettlementAtTarget: function(settler, priorityTile, runtimeScene) {
    const playerID = settler.getVariableNumber(settler.getVariables().get("BelongsToPlayer"));
    
    // Get current player for settlement properties
    const players = runtimeScene.getObjects("Player");
    const currentPlayer = players.find(p => 
      p.getVariableNumber(p.getVariables().getFromIndex(0)) === playerID
    );
    
    if (!currentPlayer) return;
    
    try {
      // Create settlement object at priority tile location
      const settlementMap = {"Settlement": runtimeScene.getObjects("Settlement")};
      gdjs.evtTools.object.createObjectOnScene(
        runtimeScene,
        settlementMap,
        priorityTile.getX(),
        priorityTile.getY(),
        ""
      );
      
      // Get the newly created settlement
      const allSettlements = runtimeScene.getObjects("Settlement");
      const newSettlement = allSettlements[allSettlements.length - 1];
      
      if (newSettlement) {
        // Set settlement owner
        newSettlement.setVariableNumber(
          newSettlement.getVariables().getFromIndex(3),
          playerID
        );
        
        // Initialize settlement properties
        const settleProps = newSettlement.getVariables().getFromIndex(8);
        settleProps.getChild("SettleFood").setNumber(5);
        settleProps.getChild("SettlePop").setNumber(1);
        settleProps.getChild("SettleRaw").setNumber(0);
        settleProps.getChild("SettleRic").setNumber(0);
        settleProps.getChild("SettleSci").setNumber(0);
        settleProps.getChild("SettleGarnison").setString("");
        
        // Generate settlement name
        const settleName = "Settlement_" + newSettlement.getVariableNumber(
          newSettlement.getVariables().get("EntID")
        );
        settleProps.getChild("SettleName").setString(settleName);
        
        // Hide the priority tile
        priorityTile.hide();
        
        // Remove settler (hide it)
        settler.hide();
      }
    } catch (e) {
      console.error("Error creating settlement for AI:", e);
    }
  },
  
  /**
   * Clear all tracking data (e.g., for game reset)
   */
  resetTracking: function() {
    this.settlerTargets = {};
    this.targetedPriorities = {};
    this.settlerPositions = {};
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AISettlerController;
}
