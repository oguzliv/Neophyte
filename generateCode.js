var CodeGenerationScript = pc.createScript('scriptGenerateCode');


// add json file as attribute to the game/script
CodeGenerationScript.attributes.add('testScreenData', {
    type: 'asset',
    assetType: 'json'
});

CodeGenerationScript.socket = null;
CodeGenerationScript.id = "";
CodeGenerationScript.enemyPos = null;
CodeGenerationScript.enemyBot = null;

var x = 0;
var y = 0;
var z = 0;

CodeGenerationScript.flag = false;

CodeGenerationScript.p1id = null;
CodeGenerationScript.p2id = null;

// initialize code called once per entity
CodeGenerationScript.prototype.initialize = function() {
    
    var userAnswer = "";
    var currentScreen = 0;
    var codeCount = 0;
    var animationMoves = [];
    var animationAnswer = "";
    var animationCodeAnswer = "";
    var playerId;
    
    var socket = io.connect('https://potent-feet.glitch.me');
    CodeGenerationScript.socket = socket;
    // this.player = this.app.root.findByName('player');
    // this.other = this.app.root.findByName('other');
    
/** 
 *      GET CAMERA ELEMENTS - START
**/
    var mazeCam = this.entity.findByName('MazeCamera');
    var testCam = this.entity.findByName('TestCamera');
    var lobbyCam = this.entity.findByName('LobbyCamera');
    
    //Show maze for 1000 ms
//     mazeCam.enabled = "true";
//     testCam.enabled = "false";
    
//     testCam.enabled = "true";
//     mazeCam.enabled = "false";
/** 
 *      GET CAMERA ELEMENTS - END
**/
    
    
    
/** 
 *      GET TEST ELEMENTS - START
**/    
    this.test = this.entity.findByName('Test');
    this.testScreen = this.test.findByName('TestScreen');
    var sectionHeader = this.testScreen.findByName('SectionHeader');
    
    this.testSection = this.testScreen.findByName('TestSection');
    var question = this.testSection.findByName('Question');
    
    
    this.opt1 = this.testSection.findByName('Opt1');
    var opt1Text = this.opt1.findByName('Text');
    
    this.opt2 = this.testSection.findByName('Opt2');
    var opt2Text = this.opt2.findByName('Text');
    
    this.opt3 = this.testSection.findByName('Opt3');
    var opt3Text = this.opt3.findByName('Text');
    
    this.codeSection = this.testScreen.findByName('CodeSection');
    var L1Text = this.codeSection.findByName('L1Text');
    var L2Text = this.codeSection.findByName('L2Text');
    var L3Text = this.codeSection.findByName('L3Text');
    var L4Code = this.codeSection.findByName('L4Code');
    var L5Text = this.codeSection.findByName('L5Text');
    var L6Text = this.codeSection.findByName('L6Text');
    var L7Code = this.codeSection.findByName('L7Code');
    var L8Text = this.codeSection.findByName('L8Text');
    var L9Text = this.codeSection.findByName('L9Text');
    var L10Code = this.codeSection.findByName('L10Code');
    
    this.tutorialSection = this.testScreen.findByName('TutorialSection');
    var tutorialSectionText = this.tutorialSection.findByName('TutorialText');
    
    this.buttonRun = this.testScreen.findByName('ButtonRun'); 
    this.buttonCheckMaze = this.testScreen.findByName('ButtonCheckMaze');
/** 
 *      GET TEST ELEMENTS - END
**/
    
/** 
 *      GET MAZE ELEMENTS - START
**/ 
    this.maze = this.entity.findByName('Maze');
    this.buttonCheckTest = this.maze.findByName('ButtonCheckTest');
    this.buttonAnimate = this.maze.findByName('AnimateButton');
    this.floor = this.maze.findByName('Floor');
    var indicator = this.maze.findByName('Indicator');
    var NeoBot = this.maze.findByName('NeoBot');
    var final = this.maze.findByName('final');
    var unitMoves = [];
    var enemyBot1 = this.maze.findByName('EnemyBot');
    CodeGenerationScript.enemyBot = enemyBot1;
/** 
 *      GET MAZE ELEMENTS - END
**/    
    
/** 
 *      GET LOBBY ELEMENTS - START
**/ 
    this.lobby = this.entity.findByName('Lobby');
    this.buttonConnect = this.lobby.findByName('ButtonConnect');
    this.buttonGo = this.lobby.findByName('ButtonGo');
    this.playerSection = this.lobby.findByName('PlayerSection');
    var lobbyTutorialSection = this.lobby.findByName('TutorialSection');
    var p1ID = this.playerSection.findByName('p1ID');
    CodeGenerationScript.p1id = p1ID;
    var p2ID = this.playerSection.findByName('p2ID');
    CodeGenerationScript.p2id = p2ID;
/** 
 *      GET LOBBY ELEMENTS - END
**/
    
    
    
    
// PARSE AND UTILIZE JSON DATA
    
    var el;
    
    // Get JSON data from project asset
    var testScreenData = this.testScreenData.resource;
    
    // Parse JSON data
    var currentTestScreen = this.parseTestScreenData(testScreenData, 0);
    
    
// CLICK EVENTS
    
    //Enter Game Button
    this.buttonGo.element.on('click', function (event) {
        this.app.root.findByName('Lobby').enabled = false;
        console.log(CodeGenerationScript.flag);
        if(CodeGenerationScript.flag === true){
            mazeCam.enabled = true;
            testCam.enabled = false;
            lobbyCam.enabled = false;
            
            
            
        }
    }, this);
    
    // Connect to server event
    this.buttonConnect.element.on('click', function (event) {
        CodeGenerationScript.socket.emit('connected');
    }, this);
   
    // fill code section event
    this.opt1.element.on('click', function (event) {
        if(currentTestScreen.questionNumber === "1" || currentTestScreen.questionNumber === "5"){
             L4Code.element.text += currentTestScreen.opt1TextOutput + "\n";
        }
        else{
            if(codeCount === 0 && codeCount < currentTestScreen.codeTextAnswer.length){
            L4Code.element.text += currentTestScreen.opt1TextOutput + "\n";
            codeCount++;
            }  
            else if(codeCount === 1 && codeCount < currentTestScreen.codeTextAnswer.length){
                L7Code.element.text += currentTestScreen.opt1TextOutput + "\n";
                codeCount++;
            }  
            else if(codeCount === 2 && codeCount < currentTestScreen.codeTextAnswer.length){
                L10Code.element.text += currentTestScreen.opt1TextOutput + "\n";
                codeCount++;
            }  
        }
        userAnswer += currentTestScreen.opt1AnswerOutput;
        animationAnswer += currentTestScreen.opt1AnswerOutput;
        unitMoves = currentTestScreen.unitMoves.split(",");
    }, this);

    this.opt2.element.on('click', function (event) {
       if(currentTestScreen.questionNumber === "1" || currentTestScreen.questionNumber === "5"){
             L4Code.element.text += currentTestScreen.opt2TextOutput + "\n";
        }
        else{
            if(codeCount === 0 && codeCount < currentTestScreen.codeTextAnswer.length){
            L4Code.element.text += currentTestScreen.opt2TextOutput + "\n";
            codeCount++;
            }  
            else if(codeCount === 1 && codeCount < currentTestScreen.codeTextAnswer.length){
                L7Code.element.text += currentTestScreen.opt2TextOutput + "\n";
                codeCount++;
            }  
            else if(codeCount === 2 && codeCount < currentTestScreen.codeTextAnswer.length){
                L10Code.element.text += currentTestScreen.opt2TextOutput + "\n";
                codeCount++;
            }  
        }
        userAnswer += currentTestScreen.opt2AnswerOutput;
        animationAnswer += currentTestScreen.opt2AnswerOutput;
        unitMoves = currentTestScreen.unitMoves.split(",");
    }, this);

    this.opt3.element.on('click', function (event) {
         if(currentTestScreen.questionNumber === "1" || currentTestScreen.questionNumber === "5"){
             L4Code.element.text += currentTestScreen.opt3TextOutput + "\n";
        }
        else{
            if(codeCount === 0 && codeCount < currentTestScreen.codeTextAnswer.length){
                L4Code.element.text += currentTestScreen.opt3TextOutput + "\n";
                codeCount++;
            }  
            else if(codeCount === 1 && codeCount < currentTestScreen.codeTextAnswer.length){
                L7Code.element.text += currentTestScreen.opt3TextOutput + "\n";
                codeCount++;
            }  
            else if(codeCount === 2 && codeCount < currentTestScreen.codeTextAnswer.length){
                L10Code.element.text += currentTestScreen.opt3TextOutput + "\n";
                codeCount++;
            }  
        }
        userAnswer += currentTestScreen.opt3AnswerOutput;
        animationAnswer += currentTestScreen.opt3AnswerOutput;
        unitMoves = currentTestScreen.unitMoves.split(",");
    }, this);
    
    // Cam Switch Buttons Listeners
    this.buttonCheckMaze.element.on('click', function (event) {
        mazeCam.enabled = true;
        testCam.enabled = false;
    }, this);
    this.buttonCheckTest.element.on('click', function (event) {
        var posPlayer = this.floor.findByName(currentTestScreen.playerPosition).getLocalPosition();
        var posIndicator = this.floor.findByName(currentTestScreen.indicatorPosition).getLocalPosition();
        mazeCam.enabled = false;
        testCam.enabled = true;
        NeoBot.setLocalPosition(posPlayer.x, posPlayer.y, posPlayer.z);
        indicator.setLocalPosition(posIndicator.x, posIndicator.y, posIndicator.z);
    }, this);
    
     // Animation Update Button Listener
    this.buttonAnimate.element.on('click', function (event) {
        //console.log(animationCodeAnswer);
        if(animationAnswer == animationCodeAnswer){
        /** 
         *    ANIMATION UPDATE START
        **/
            for(var i = 0; i < unitMoves.length; i++) {
                // W button
                if(unitMoves[i] === "up"){ 
                    NeoBot.translateLocal(0,0,1.5);
                }
                // A button
                else if(unitMoves[i] === "left"){ 
                    NeoBot.translateLocal(1.5,0,0);
                }
                // S button
                else if(unitMoves[i] === "down"){ 
                    NeoBot.translateLocal(0,0,-1.5);
                }
                // D button
                else if(unitMoves[i] === "right"){
                    NeoBot.translateLocal(-1.5,0,0);
                }
            }
        /** 
         *    ANIMATION UPDATE END
        **/
            animationAnswer = "";
            var NeoBotPos = NeoBot.getLocalPosition();
            CodeGenerationScript.socket.emit('onPositionChange', {x: NeoBotPos.x, y: NeoBotPos.y, z: NeoBotPos.z});
            
            this.wait(100);
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
        }

    }, this);
    
    
    
    // check answer and change TestScene event
    this.buttonRun.element.on('click', function (event) {
        
        /** 
         *    TEST UPDATE START
        **/
        if(userAnswer == currentTestScreen.codeTextAnswer){
            
            // Turn camera to Maze
            mazeCam.enabled = true;
            testCam.enabled = false;
            
            animationCodeAnswer = currentTestScreen.codeTextAnswer;

            // Reset Stuff
            currentScreen += 1;
            currentTestScreen = this.parseTestScreenData(testScreenData, currentScreen);
            sectionHeader.element.text = currentTestScreen.sectionHeader;
            question.element.text = currentTestScreen.questionText;
            opt1Text.element.text = currentTestScreen.opt1Text;
            opt2Text.element.text = currentTestScreen.opt2Text;
            opt3Text.element.text = currentTestScreen.opt3Text;
            tutorialSectionText.element.text = currentTestScreen.tutorialText;
            userAnswer = "";
            L4Code.element.text = "";
            L7Code.element.text = "";
            L10Code.element.text = "";
            L1Text.element.text = currentTestScreen.L1Text;
            L2Text.element.text = currentTestScreen.L2Text;
            L3Text.element.text = currentTestScreen.L3Text;
            L5Text.element.text = currentTestScreen.L5Text;
            L6Text.element.text = currentTestScreen.L6Text;
            L8Text.element.text = currentTestScreen.L8Text;
            L9Text.element.text = currentTestScreen.L9Text;
            codeCount = 0;
        /** 
         *    TEST UPDATE END
        **/
            
        /** 
         *    SERVER UPDATE START
        **/
//             var pos = this.player.getPosition();
   
//             if(pos.x != x || pos.y != y || pos.z != z){
//                 Network.socket.emit('move',{x: pos.x, y: pos.y, z: pos.z});
//                 x = pos.x;
//                 y = pos.y;
//                 z = pos.z;
//             }
        /** 
         *    SERVER UPDATE END
        **/

            // testCam.enabled = true;
            // mazeCam.enabled = false;
        }
        else{
            userAnswer = "";
            L4Code.element.text = "";
            L7Code.element.text = "";
            L10Code.element.text = "";
            codeCount = 0;
        }
    
    }, this);
    
    // Socket listening ports
    socket.on ('playerIn', function (data) {
        console.log(data.clientCounter);
        if(data.clientCounter === 0){
            CodeGenerationScript.id = data.id;
            p1ID.element.text = data.players[0];
        }
        else if(data.clientCounter === 1){
            CodeGenerationScript.id = data.id;
            p1ID.element.text = data.players[0];
            p2ID.element.text = data.players[1];
            CodeGenerationScript.socket.emit('ready');
        }
        
        
    });
    
    socket.on ('playerJoined', function (data) {
        playerId = data.id;
        p2ID.element.text = playerId;
        CodeGenerationScript.socket.emit('ready');
    });
    
    socket.on('receivePosition', function(data){
        x = data.x;
        y = data.y;
        z = data.z;
        CodeGenerationScript.enemyBot.setPosition(x, y, z);
    });
    
    socket.on('go', function(data){
        CodeGenerationScript.flag = data.flag;
    });
    
};

CodeGenerationScript.prototype.parseTestScreenData = function (data, i) {
    
    // all TestScreen array is testScreens
    var testScreens = data.TestScreens;
    // a specific TestScreen element is currentTestScreen
    // it can be manipulated as currentTestScreen.opt1TextOutput
    var  currentTestScreen = testScreens[i];
    return currentTestScreen;
};

CodeGenerationScript.prototype.wait = function (ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
    end = new Date().getTime();
  }
};
