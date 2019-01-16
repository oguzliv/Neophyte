var Ui = pc.createScript('ui');

Ui.attributes.add('css', {type: 'asset', assetType:'css', title: 'CSS Asset'});
Ui.attributes.add('html', {type: 'asset', assetType:'html', title: 'HTML Asset'});

// initialize code called once per entity
Ui.prototype.initialize = function() {
    
    // Create css style sheet
    var style1 = document.createElement('style');
    style1.innerHTML = this.css.resource || '';
    
    // Append to head
    document.head.appendChild(style1);
    
    // Adding html 
    this.input1 = document.createElement('html');
    
    this.input1.classList.add('container');
    this.input1.innerHTML = this.html.resource || '';
    
    // Appending into body
    document.body.appendChild(this.input1);
    
};

// update code called every frame
Ui.prototype.update = function(dt) {
    
};

// swap method called for script hot-reloading
// inherit your script state here
// Ui.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/
