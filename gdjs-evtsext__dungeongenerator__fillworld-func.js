
if (typeof gdjs.evtsExt__DungeonGenerator__FillWorld !== "undefined") {
  gdjs.evtsExt__DungeonGenerator__FillWorld.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__DungeonGenerator__FillWorld = {};
gdjs.evtsExt__DungeonGenerator__FillWorld.idToCallbackMap = new Map();
gdjs.evtsExt__DungeonGenerator__FillWorld.GDTerrainObjectObjects1= [];
gdjs.evtsExt__DungeonGenerator__FillWorld.GDTerrainObjectObjects2= [];
gdjs.evtsExt__DungeonGenerator__FillWorld.GDTerrainObjectObjects3= [];
gdjs.evtsExt__DungeonGenerator__FillWorld.GDTerrainObjectObjects4= [];


gdjs.evtsExt__DungeonGenerator__FillWorld.mapOfGDgdjs_9546evtsExt_9595_9595DungeonGenerator_9595_9595FillWorld_9546GDTerrainObjectObjects4Objects = Hashtable.newFrom({"TerrainObject": gdjs.evtsExt__DungeonGenerator__FillWorld.GDTerrainObjectObjects4});
gdjs.evtsExt__DungeonGenerator__FillWorld.eventsList0 = function(runtimeScene, eventsFunctionContext) {

};gdjs.evtsExt__DungeonGenerator__FillWorld.eventsList1 = function(runtimeScene, eventsFunctionContext) {

{


const repeatCount4 = (Number(eventsFunctionContext.getArgument("MapWidth")) || 0);
for (let repeatIndex4 = 0;repeatIndex4 < repeatCount4;++repeatIndex4) {
gdjs.evtsExt__DungeonGenerator__FillWorld.GDTerrainObjectObjects4.length = 0;


let isConditionTrue_0 = false;
if (true)
{
{gdjs.evtTools.object.createObjectOnScene(eventsFunctionContext, gdjs.evtsExt__DungeonGenerator__FillWorld.mapOfGDgdjs_9546evtsExt_9595_9595DungeonGenerator_9595_9595FillWorld_9546GDTerrainObjectObjects4Objects, gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().get("__DungeonGenerator").getChild("CounterX")) * (Number(eventsFunctionContext.getArgument("TileSize")) || 0), gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().get("__DungeonGenerator").getChild("CounterY")) * (Number(eventsFunctionContext.getArgument("TileSize")) || 0), "" + eventsFunctionContext.getArgument("Layer"));
}
{for(var i = 0, len = gdjs.evtsExt__DungeonGenerator__FillWorld.GDTerrainObjectObjects4.length ;i < len;++i) {
    gdjs.evtsExt__DungeonGenerator__FillWorld.GDTerrainObjectObjects4[i].setWidth((Number(eventsFunctionContext.getArgument("TileSize")) || 0));
}
}
{for(var i = 0, len = gdjs.evtsExt__DungeonGenerator__FillWorld.GDTerrainObjectObjects4.length ;i < len;++i) {
    gdjs.evtsExt__DungeonGenerator__FillWorld.GDTerrainObjectObjects4[i].setHeight((Number(eventsFunctionContext.getArgument("TileSize")) || 0));
}
}
{runtimeScene.getScene().getVariables().get("__DungeonGenerator").getChild("CounterX").add(1);
}
}
}

}


{


let isConditionTrue_0 = false;
{
{runtimeScene.getScene().getVariables().get("__DungeonGenerator").getChild("CounterX").setNumber(0);
}
{runtimeScene.getScene().getVariables().get("__DungeonGenerator").getChild("CounterY").add(1);
}
}

}


};gdjs.evtsExt__DungeonGenerator__FillWorld.eventsList2 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
{runtimeScene.getScene().getVariables().get("__DungeonGenerator").getChild("CounterX").setNumber(0);
}
{runtimeScene.getScene().getVariables().get("__DungeonGenerator").getChild("CounterY").setNumber(0);
}
}

}


{


const repeatCount2 = (Number(eventsFunctionContext.getArgument("MapHeight")) || 0);
for (let repeatIndex2 = 0;repeatIndex2 < repeatCount2;++repeatIndex2) {

let isConditionTrue_0 = false;
if (true)
{

{ //Subevents: 
gdjs.evtsExt__DungeonGenerator__FillWorld.eventsList1(runtimeScene, eventsFunctionContext);} //Subevents end.
}
}

}


};gdjs.evtsExt__DungeonGenerator__FillWorld.eventsList3 = function(runtimeScene, eventsFunctionContext) {

{


gdjs.evtsExt__DungeonGenerator__FillWorld.eventsList2(runtimeScene, eventsFunctionContext);
}


};

gdjs.evtsExt__DungeonGenerator__FillWorld.func = function(runtimeScene, TileSize, MapWidth, MapHeight, TerrainObject, parentEventsFunctionContext) {
let scopeInstanceContainer = null;
var eventsFunctionContext = {
  _objectsMap: {
"TerrainObject": TerrainObject
},
  _objectArraysMap: {
"TerrainObject": gdjs.objectsListsToArray(TerrainObject)
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("DungeonGenerator"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("DungeonGenerator"),
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
if (argName === "TileSize") return TileSize;
if (argName === "MapWidth") return MapWidth;
if (argName === "MapHeight") return MapHeight;
    return "";
  },
  getOnceTriggers: function() { return runtimeScene.getOnceTriggers(); }
};

gdjs.evtsExt__DungeonGenerator__FillWorld.GDTerrainObjectObjects1.length = 0;
gdjs.evtsExt__DungeonGenerator__FillWorld.GDTerrainObjectObjects2.length = 0;
gdjs.evtsExt__DungeonGenerator__FillWorld.GDTerrainObjectObjects3.length = 0;
gdjs.evtsExt__DungeonGenerator__FillWorld.GDTerrainObjectObjects4.length = 0;

gdjs.evtsExt__DungeonGenerator__FillWorld.eventsList3(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__DungeonGenerator__FillWorld.GDTerrainObjectObjects1.length = 0;
gdjs.evtsExt__DungeonGenerator__FillWorld.GDTerrainObjectObjects2.length = 0;
gdjs.evtsExt__DungeonGenerator__FillWorld.GDTerrainObjectObjects3.length = 0;
gdjs.evtsExt__DungeonGenerator__FillWorld.GDTerrainObjectObjects4.length = 0;


return;
}

gdjs.evtsExt__DungeonGenerator__FillWorld.registeredGdjsCallbacks = [];