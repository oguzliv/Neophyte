var SceneChange = pc.createScript('sceneChange');

SceneChange.attributes.add("singleId", {type: "string", default: "0", title: "SingleScene"});
SceneChange.attributes.add("multiId", {type: "string", default: "0", title: "MultiScene"});

// initialize code called once per entity
SceneChange.prototype.initialize = function() {
    
    var self = this;
    
    // Get Home Screen
    this.homeScreen = this.app.root.findByName('HomeScreen');
    
    // HomeScreen Elements
    this.buttonSingleplayer = this.homeScreen.findByName('ButtonSingleplayer');
    this.buttonMultiplayer = this.homeScreen.findByName('ButtonMultiplayer');
    
    // Evenet Listeners of Buttons
    this.buttonSingleplayer.element.on('click', function (event) {
        self.changeScenesSingle();
    }, this);
    
    this.buttonMultiplayer.element.on('click', function (event) {
        self.changeScenesMulti();
    }, this);
};

// update code called every frame
SceneChange.prototype.update = function(dt) {
    
};

SceneChange.prototype.changeScenesSingle = function() {
    // Get a reference to the current root object
    var oldHierarchy = this.app.root.findByName ('Root');
    
    // Load the new scene. The scene ID is found by loading the scene in the editor and 
    // taking the number from the URL
    // e.g. If the URL when Scene 1 is loaded is: https://playcanvas.com/editor/scene/475211
    // The ID is the number on the end (475211)
    this.loadScene (this.singleId, function () {
        // Once the new scene has been loaded, destroy the old one
        oldHierarchy.destroy ();
    });
};

SceneChange.prototype.changeScenesMulti = function() {
    // Get a reference to the current root object
    var oldHierarchy = this.app.root.findByName ('Root');
    
    // Load the new scene. The scene ID is found by loading the scene in the editor and 
    // taking the number from the URL
    // e.g. If the URL when Scene 1 is loaded is: https://playcanvas.com/editor/scene/475211
    // The ID is the number on the end (475211)
    this.loadScene (this.multiId, function () {
        // Once the new scene has been loaded, destroy the old one
        oldHierarchy.destroy ();
    });
};

SceneChange.prototype.loadScene = function (id, callback) {
    // Get the path to the scene
    var url = id  + ".json";
    
    // Load the scenes entity hierarchy
    this.app.loadSceneHierarchy(url, function (err, parent) {
        if (!err) {
            callback(parent);
        } else {
            console.error (err);
        }
    });
};
