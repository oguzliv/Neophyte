var UisceneScenario = pc.createScript('uisceneScenario');

UisceneScenario.attributes.add('css', {type: 'asset', assetType:'css', title: 'CSS Asset'});
UisceneScenario.attributes.add('html', {type: 'asset', assetType:'html', title: 'HTML Asset'});
UisceneScenario.attributes.add('users', {type: 'asset', assetType: 'json'});

UisceneScenario.input1 = null;
UisceneScenario.style1 = null;
UisceneScenario.usersArray = [];

// initialize code called once per entity
UisceneScenario.prototype.initialize = function() {
    
    var self = this;
    
    // Get Screens
    this.mainScreen = this.entity.findByName('MainMenuScreen');
    this.homeScreen = this.entity.findByName('HomeScreen');
    
    // Screen Cameras
    var mainScreenCamera = this.mainScreen.findByName('MainMenuCamera');
    var homeScreenCamera = this.homeScreen.findByName('HomeCamera');
    
    // Set initial camera enablenesses
    mainScreenCamera.enabled = true;
    homeScreenCamera.enabled = false;
    
    // HomeScreen Elements
    //this.buttonSingleplayer = this.homeScreen.findByName('ButtonSingleplayer');
    //this.buttonMultiplayer = this.homeScreen.findByName('ButtonMultiplayer');
    
    // MainScreen Elements
    this.buttonLogin = this.mainScreen.findByName('LoginButton');
    this.buttonSignup = this.mainScreen.findByName('SignUpButton');
    
    // Create CSS styling sheet
    var style1 = document.createElement('style');
    style1.innerHTML = this.css.resource || '';
    
    UisceneScenario.style1 = style1;
    // Adding html 
    var input1 = document.createElement('html');

    input1.classList.add('container');
    input1.innerHTML = this.html.resource || '';
    
    UisceneScenario.input1 = input1;
    
    // JSON initialization operations
    var el;
    
    // Get JSON data from project asset
    var userData = this.users.resource;
    
    // Parse JSON data
    var usersArray = this.parseUserData(userData);
    UisceneScenario.usersArray = usersArray;
    
    
    // Listeners for Buttons
    this.buttonLogin.element.on('click', function (event) {
        
        // Append to head
        document.head.appendChild(style1);
        
        // Appending into body
        document.body.appendChild(input1);
        
        self.bindEvents(homeScreenCamera, mainScreenCamera);
        
    }, false);
    
    this.buttonSignup.element.on('click', function (event) {
        
    }, this);
    
//     this.buttonSingleplayer.element.on('click', function (event) {
        
//     }, this);
    
//     this.buttonMultiplayer.element.on('click', function (event) {
        
//     }, this);
    
};

UisceneScenario.prototype.parseUserData = function (data) {
    
    // all users array is Users
    var users = data.Users;
    return users;
};

UisceneScenario.prototype.bindEvents = function(homeCamera, mainCamera){
    var self1 = this;
    var username1;
    var password1;
    var checkIndex;
    
    //getting button element by its CSS Class
    var button = UisceneScenario.input1.querySelector('.loginButton');
    var userfield = document.getElementById('user');
    var password = document.getElementById('pass');
    
    
    
    //if button found
    if(button){
        //eventlistener added on click
        button.addEventListener('click', function() {
            if(userfield)
                username1 = userfield.value;
            if(password)
                password1 = password.value;
            
            // Control operations - start
            console.log("username : ", username1);
            console.log("password : ", password1);
            // Control operations - end
            
            for(var i = 0; i < UisceneScenario.usersArray.length; i++){
                if(UisceneScenario.usersArray[i].username == username1)
                    checkIndex = i;
            }
            if(UisceneScenario.usersArray[checkIndex].password == password1){
                // Removing from body
                document.body.removeChild(UisceneScenario.input1);
                // Removing from head
                document.head.removeChild(UisceneScenario.style1);
        
                homeCamera.enabled = true;
                mainCamera.enabled = false;
            }
                
            
            
            
        },this);
    }
};

// update code called every frame
UisceneScenario.prototype.update = function(dt) {
    
};

UisceneScenario.prototype.homeScreenCamera = function(){
    
};

