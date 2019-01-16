var RobotMovement = pc.createScript('robotMovement');

RobotMovement.states = {
    idle: { 
        animation: 'Playbot_idle' 
    },
    run: { 
        animation: 'Playbot_run' 
    }
};
// initialize code called once per entity
RobotMovement.prototype.initialize = function() {
    this.blendTime = 0.2;

    this.setState('idle');

    this.app.keyboard.on(pc.EVENT_KEYDOWN, this.keyDown, this);
    this.app.keyboard.on(pc.EVENT_KEYUP, this.keyUp, this);
};

// update code called every frame
RobotMovement.prototype.update = function(dt) {
    
    if(this.app.keyboard.isPressed(pc.input.KEY_A)){
    this.entity.translateLocal(0.1,0,0);
    }

    if(this.app.keyboard.isPressed(pc.input.KEY_D)){
    this.entity.translateLocal(-0.1,0,0);
    }

    if(this.app.keyboard.isPressed(pc.input.KEY_W)){
    this.entity.translateLocal(0,0,0.1);
    }

    if(this.app.keyboard.isPressed(pc.input.KEY_S)){
    this.entity.translateLocal(0,0,-0.1);
    }
};

//Animation state is updated at each key stroke
RobotMovement.prototype.setState = function (state) {
    var states = RobotMovement.states;
    
    this.state = state;
    // Set the current animation, taking 0.2 seconds to blend from
    // the current animation state to the start of the target animation.
    this.entity.animation.play(states[state].animation, this.blendTime);
};

RobotMovement.prototype.keyDown = function (e) {
    if ((e.key === pc.KEY_W) || (e.key === pc.KEY_A) || (e.key === pc.KEY_S) || 
        (e.key === pc.KEY_D) && (this.state !== 'run')) {
        this.setState('run');
    }
};

RobotMovement.prototype.keyUp = function (e) {
    if ((e.key === pc.KEY_W) || (e.key === pc.KEY_A) || (e.key === pc.KEY_S) || 
        (e.key === pc.KEY_D) && (this.state === 'run')) {
        this.setState('idle');
    }
};
// swap method called for script hot-reloading
// inherit your script state here
// RobotMovement.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/
