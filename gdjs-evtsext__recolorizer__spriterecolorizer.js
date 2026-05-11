
gdjs.evtsExt__Recolorizer__SpriteRecolorizer = gdjs.evtsExt__Recolorizer__SpriteRecolorizer || {};

/**
 * Behavior generated from Sprite recolorizer
 */
gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer = class SpriteRecolorizer extends gdjs.RuntimeBehavior {
  constructor(instanceContainer, behaviorData, owner) {
    super(instanceContainer, behaviorData, owner);
    this._runtimeScene = instanceContainer;

    this._onceTriggers = new gdjs.OnceTriggers();
    this._behaviorData = {};
    this._sharedData = gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.getSharedData(
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
 * Shared data generated from Sprite recolorizer
 */
gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.SharedData = class SpriteRecolorizerSharedData {
  constructor(sharedData) {
    
  }
  
  // Shared properties:
  
}

gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.getSharedData = function(instanceContainer, behaviorName) {
  if (!instanceContainer._Recolorizer_SpriteRecolorizerSharedData) {
    const initialData = instanceContainer.getInitialSharedDataForBehavior(
      behaviorName
    );
    instanceContainer._Recolorizer_SpriteRecolorizerSharedData = new gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.SharedData(
      initialData
    );
  }
  return instanceContainer._Recolorizer_SpriteRecolorizerSharedData;
}

// Methods:
gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.onCreatedContext = {};
gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.onCreatedContext.idToCallbackMap = new Map();
gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.onCreatedContext.GDObjectObjects1= [];
gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.onCreatedContext.GDObjectObjects2= [];


gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.onCreatedContext.userFunc0x102ea08 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
const {RecolorizationManager, Recolorizer} = gdjs.__recolorizerExtension;

/** @type {gdjs.SpriteRuntimeObject} */
const sprite = objects[0];
const behaviorName = eventsFunctionContext.getBehaviorName("Behavior");
const behavior = sprite.getBehavior(behaviorName);

if (!runtimeScene.__recolorizerExtension) {
    runtimeScene.__recolorizerExtension = { managers: new Map()};
}
/** @type {Map} */
const managers = runtimeScene.__recolorizerExtension.managers || new Map();
let manager = managers.get(sprite.getName());
if (!manager) {
    /** @type {PIXI.Texture[]} */
    const sourceTextures = [];
    for (const animation of sprite._animator._animations) {
        for (const direction of animation.directions) {
            for (const frame of direction.frames) {
                sourceTextures.push(frame.texture);
            }
        }
    }
    manager = new RecolorizationManager(sourceTextures);
    managers.set(sprite.getName(), manager);
}

/** @type {{texture: PIXI.Texture[]}} */
const sourceTextureContainers = [];
for (const animation of sprite._animator._animations) {
    for (const direction of animation.directions) {
        for (const frame of direction.frames) {
            sourceTextureContainers.push(frame);
        }
    }
}

behavior.recolorizer = new Recolorizer(
    manager,
    sourceTextureContainers
);
};
gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.onCreatedContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
{gdjs.evtsExt__Recolorizer__DefineJavaScript.func(runtimeScene, eventsFunctionContext);
}
}

}


{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.onCreatedContext.GDObjectObjects1);

const objects = gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.onCreatedContext.GDObjectObjects1;
gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.onCreatedContext.userFunc0x102ea08(runtimeScene, objects, eventsFunctionContext);

}


};

gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.onCreated = function(parentEventsFunctionContext) {

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
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Recolorizer"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Recolorizer"),
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

gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.onCreatedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.onCreatedContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.onCreatedContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.onCreatedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.onCreatedContext.GDObjectObjects2.length = 0;


return;
}
gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.RecolorizeContext = {};
gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.RecolorizeContext.idToCallbackMap = new Map();
gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.RecolorizeContext.GDObjectObjects1= [];


gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.RecolorizeContext.userFunc0x1093408 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
const behaviorName = eventsFunctionContext.getBehaviorName("Behavior");
const behavior = objects[0].getBehavior(behaviorName);

const originColor = gdjs.rgbOrHexToRGBColor(eventsFunctionContext.getArgument("OriginColor"));
const targetColor = gdjs.rgbOrHexToRGBColor(eventsFunctionContext.getArgument("TargetColor"));
const hueScope = gdjs.evtTools.common.clamp(eventsFunctionContext.getArgument("HueScope") / 360, 0, 180);
const saturationScope = gdjs.evtTools.common.clamp(eventsFunctionContext.getArgument("SaturationScope") / 100, 0, 50);
const lightnessScope = gdjs.evtTools.common.clamp(eventsFunctionContext.getArgument("LightnessScope") / 100, 0, 50);

behavior.recolorizer.recolorizeSprite(originColor, targetColor, hueScope, saturationScope, lightnessScope);
};
gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.RecolorizeContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.RecolorizeContext.GDObjectObjects1);

const objects = gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.RecolorizeContext.GDObjectObjects1;
gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.RecolorizeContext.userFunc0x1093408(runtimeScene, objects, eventsFunctionContext);

}


};

gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.Recolorize = function(OriginColor, TargetColor, HueScope, SaturationScope, LightnessScope, parentEventsFunctionContext) {

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
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Recolorizer"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Recolorizer"),
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
if (argName === "OriginColor") return OriginColor;
if (argName === "TargetColor") return TargetColor;
if (argName === "HueScope") return HueScope;
if (argName === "SaturationScope") return SaturationScope;
if (argName === "LightnessScope") return LightnessScope;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.RecolorizeContext.GDObjectObjects1.length = 0;

gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.RecolorizeContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.RecolorizeContext.GDObjectObjects1.length = 0;


return;
}
gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.ResetColorContext = {};
gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.ResetColorContext.idToCallbackMap = new Map();
gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.ResetColorContext.GDObjectObjects1= [];


gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.ResetColorContext.userFunc0xe9af58 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
const behaviorName = eventsFunctionContext.getBehaviorName("Behavior");
const behavior = objects[0].getBehavior(behaviorName);

behavior.recolorizer.resetSprite();
};
gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.ResetColorContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.ResetColorContext.GDObjectObjects1);

const objects = gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.ResetColorContext.GDObjectObjects1;
gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.ResetColorContext.userFunc0xe9af58(runtimeScene, objects, eventsFunctionContext);

}


};

gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.ResetColor = function(parentEventsFunctionContext) {

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
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Recolorizer"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Recolorizer"),
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

gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.ResetColorContext.GDObjectObjects1.length = 0;

gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.ResetColorContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.ResetColorContext.GDObjectObjects1.length = 0;


return;
}
gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.doStepPostEventsContext = {};
gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.doStepPostEventsContext.idToCallbackMap = new Map();
gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.doStepPostEventsContext.GDObjectObjects1= [];


gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.doStepPostEventsContext.userFunc0x102ea08 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";

/** @type {gdjs.SpriteRuntimeObject} */
const sprite = objects[0];
const behaviorName = eventsFunctionContext.getBehaviorName("Behavior");
const behavior = sprite.getBehavior(behaviorName);

const recolorized = behavior.recolorizer.updateSprite();
if (recolorized) {
    sprite._animationFrameDirty = true;
}
};
gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.doStepPostEventsContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.doStepPostEventsContext.GDObjectObjects1);

const objects = gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.doStepPostEventsContext.GDObjectObjects1;
gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.doStepPostEventsContext.userFunc0x102ea08(runtimeScene, objects, eventsFunctionContext);

}


};

gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.doStepPostEvents = function(parentEventsFunctionContext) {

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
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Recolorizer"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Recolorizer"),
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

gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.doStepPostEventsContext.GDObjectObjects1.length = 0;

gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.doStepPostEventsContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.doStepPostEventsContext.GDObjectObjects1.length = 0;


return;
}
gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.onDestroyContext = {};
gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.onDestroyContext.idToCallbackMap = new Map();
gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.onDestroyContext.GDObjectObjects1= [];
gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.onDestroyContext.GDObjectObjects2= [];


gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.onDestroyContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.onDestroyContext.GDObjectObjects1);
{for(var i = 0, len = gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.onDestroyContext.GDObjectObjects1.length ;i < len;++i) {
    gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.onDestroyContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior")).ResetColor(eventsFunctionContext);
}
}
}

}


};

gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.onDestroy = function(parentEventsFunctionContext) {

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
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Recolorizer"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Recolorizer"),
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

gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.onDestroyContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.onDestroyContext.GDObjectObjects2.length = 0;

gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.onDestroyContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.onDestroyContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.onDestroyContext.GDObjectObjects2.length = 0;


return;
}

gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer.prototype.doStepPreEvents = function() {
  this._onceTriggers.startNewFrame();
};


gdjs.registerBehavior("Recolorizer::SpriteRecolorizer", gdjs.evtsExt__Recolorizer__SpriteRecolorizer.SpriteRecolorizer);
