var Leaderboard = pc.createScript('leaderboard');

// the text entry template to clone
Leaderboard.attributes.add("template", {type: "entity"}); 
// the parent leaderboard for the personal score
Leaderboard.attributes.add("personal", {type: "entity"}); 
// the parent leaderboard for the top ten
Leaderboard.attributes.add("leaderboard", {type: "entity"}); 

Leaderboard.prototype.initialize = function() {
    var self = this;
    
    this.entries = [];
    
    this.load(function (data) {
        self.clear();
        
        // add the personal entry
        var y = -75;
        self.addEntry(self.personal, y, data.personal.position, data.personal.name, data.personal.score);
        
        // add the top ten
        y = -60;
        for (var i = 0; i < Math.min(data.leaderboard.length, 10); i++) {
            self.addEntry(self.leaderboard, y, i+1, data.leaderboard[i].name, data.leaderboard[i].score);
            y -= 99; // offset each entry
        }
    });
};

// clear all leaderboard entries
Leaderboard.prototype.clear = function () {
    for (var i = 0; i < this.entries.length; i++) {
        this.entries[i].destroy();
    }
    
    this.entries = [];
};

// add a new entry into the leaderboard
Leaderboard.prototype.addEntry = function (parent, y, position, name, score) {
    var entry = this.template.clone();
    entry.enabled = true;
    
    entry.findByName("Position").element.text = position.toString();
    entry.findByName("Name").element.text = name.toUpperCase();
    entry.findByName("Score").element.text = score.toString();
    
    this.entries.push(entry);
    
    parent.addChild(entry);    
    entry.translateLocal(0, y, 0);
};

// Mock loading leaderboard data, for this demo we just get the data from a JSON file in the project
// For your project you could download this from a server backend
Leaderboard.prototype.load = function (callback) {
    var asset = this.app.assets.find("leaderboard-data.json");
    asset.ready(function () {
        callback(asset.resource);
    });
    this.app.assets.load(asset);    
};
