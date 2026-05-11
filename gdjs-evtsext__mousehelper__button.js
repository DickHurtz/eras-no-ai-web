
gdjs.evtsExt__MouseHelper__button = gdjs.evtsExt__MouseHelper__button || {};

/**
 * Behavior generated from Clickable button 
 */
gdjs.evtsExt__MouseHelper__button.button = class button extends gdjs.RuntimeBehavior {
  constructor(instanceContainer, behaviorData, owner) {
    super(instanceContainer, behaviorData, owner);
    this._runtimeScene = instanceContainer;

    this._onceTriggers = new gdjs.OnceTriggers();
    this._behaviorData = {};
    this._sharedData = gdjs.evtsExt__MouseHelper__button.button.getSharedData(
      instanceContainer,
      behaviorData.name
    );
    
  }

  // Hot-reload:
  applyBehaviorOverriding(behaviorOverriding) {
    

    return true;
  }

  // Network sync:
  getNetworkSyncData(syncOptions) {
    return {
      ...super.getNetworkSyncData(syncOptions),
      props: {
        
      }
    };
  }
  updateFromNetworkSyncData(networkSyncData, options) {
    super.updateFromNetworkSyncData(networkSyncData, options);
    
  }

  // Properties:
  
}

/**
 * Shared data generated from Clickable button 
 */
gdjs.evtsExt__MouseHelper__button.button.SharedData = class buttonSharedData {
  constructor(sharedData) {
    
  }
  
  // Shared properties:
  
}

gdjs.evtsExt__MouseHelper__button.button.getSharedData = function(instanceContainer, behaviorName) {
  if (!instanceContainer._MouseHelper_buttonSharedData) {
    const initialData = instanceContainer.getInitialSharedDataForBehavior(
      behaviorName
    );
    instanceContainer._MouseHelper_buttonSharedData = new gdjs.evtsExt__MouseHelper__button.button.SharedData(
      initialData
    );
  }
  return instanceContainer._MouseHelper_buttonSharedData;
}

// Methods:
gdjs.evtsExt__MouseHelper__button.button.prototype.isClickedContext = {};
gdjs.evtsExt__MouseHelper__button.button.prototype.isClickedContext.idToCallbackMap = new Map();
gdjs.evtsExt__MouseHelper__button.button.prototype.isClickedContext.GDObjectObjects1= [];
gdjs.evtsExt__MouseHelper__button.button.prototype.isClickedContext.GDObjectObjects2= [];


gdjs.evtsExt__MouseHelper__button.button.prototype.isClickedContext.mapOfGDgdjs_9546evtsExt_9595_9595MouseHelper_9595_9595button_9546button_9546prototype_9546isClickedContext_9546GDObjectObjects1Objects = Hashtable.newFrom({"Object": gdjs.evtsExt__MouseHelper__button.button.prototype.isClickedContext.GDObjectObjects1});
gdjs.evtsExt__MouseHelper__button.button.prototype.isClickedContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__MouseHelper__button.button.prototype.isClickedContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.cursorOnObject(gdjs.evtsExt__MouseHelper__button.button.prototype.isClickedContext.mapOfGDgdjs_9546evtsExt_9595_9595MouseHelper_9595_9595button_9546button_9546prototype_9546isClickedContext_9546GDObjectObjects1Objects, runtimeScene, true, false);
if (isConditionTrue_0) {
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.isMouseButtonPressed(runtimeScene, "Left");
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = eventsFunctionContext.getOnceTriggers().triggerOnce(22373164);
}
}
}
if (isConditionTrue_0) {
{eventsFunctionContext.returnValue = true;}
}

}


};

gdjs.evtsExt__MouseHelper__button.button.prototype.isClicked = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._runtimeScene;
let scopeInstanceContainer = null;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": thisObjectList
},
  _behaviorNamesMap: {
"Behavior": Behavior
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("MouseHelper"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("MouseHelper"),
  localVariables: [],
  getObjects: function(objectName) {
    return eventsFunctionContext._objectArraysMap[objectName] || [];
  },
  getObjectsLists: function(objectName) {
    return eventsFunctionContext._objectsMap[objectName] || null;
  },
  getBehaviorName: function(behaviorName) {
    return eventsFunctionContext._behaviorNamesMap[behaviorName] || behaviorName;
  },
  createObject: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    if (objectsList) {
      const object = parentEventsFunctionContext && !(scopeInstanceContainer && scopeInstanceContainer.isObjectRegistered(objectName)) ?
        parentEventsFunctionContext.createObject(objectsList.firstKey()) :
        runtimeScene.createObject(objectsList.firstKey());
      if (object) {
        objectsList.get(objectsList.firstKey()).push(object);
        if (!(scopeInstanceContainer && scopeInstanceContainer.isObjectRegistered(objectName))) {
          eventsFunctionContext._objectArraysMap[objectName].push(object);
        }
      }
      return object;
    }
    return null;
  },
  getInstancesCountOnScene: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    let count = 0;
    if (objectsList) {
      for(const objectName in objectsList.items)
        count += parentEventsFunctionContext && !(scopeInstanceContainer && scopeInstanceContainer.isObjectRegistered(objectName)) ?
parentEventsFunctionContext.getInstancesCountOnScene(objectName) :
        runtimeScene.getInstancesCountOnScene(objectName);
    }
    return count;
  },
  getLayer: function(layerName) {
    return runtimeScene.getLayer(layerName);
  },
  getArgument: function(argName) {
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__MouseHelper__button.button.prototype.isClickedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__MouseHelper__button.button.prototype.isClickedContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__MouseHelper__button.button.prototype.isClickedContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__MouseHelper__button.button.prototype.isClickedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__MouseHelper__button.button.prototype.isClickedContext.GDObjectObjects2.length = 0;


return !!eventsFunctionContext.returnValue;
}

gdjs.evtsExt__MouseHelper__button.button.prototype.doStepPreEvents = function() {
  this._onceTriggers.startNewFrame();
};


gdjs.registerBehavior("MouseHelper::button", gdjs.evtsExt__MouseHelper__button.button);
