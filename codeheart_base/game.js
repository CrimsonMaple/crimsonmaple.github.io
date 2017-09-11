///////////////////////////////////////////////////////////////
//                                                           //
//                    CONSTANT STATE                         //

// TODO: DECLARE and INTIALIZE your constants here

var time = 1.0 / 30.0; // Ideal time based on ideal framerates.
var start_pos = [597, 408];

var NORTH = "1";
var SOUTH = "3";
var EAST = "0";
var WEST = "2";

var WALK = 1;
var IDLE = 2;

var PI = 3.1415927;

var animationrate = 3;
var sound = loadSound("data/sound/some_music.mp3");

///////////////////////////////////////////////////////////////
//                                                           //
//                     MUTABLE STATE                         //

// TODO: DECLARE your variables here
var key_pressed;
var key_held;
var key_name;

///////////////////////////////////////////////////////////////
//                                                           //
//                      EVENT RULES                          //

// When setup happens...
function onSetup() {
    // TODO: INITIALIZE your variables here
    key_pressed = 0;
    key_held = 0; // False
    
    // Load Map.
    clearRectangle(0, 0, screenWidth, screenHeight);
    
    make_c_pad();
    
    init_player();
}

// When a key is pushed
function onKeyStart(key) {
    key_pressed = key;
    convert_key_pressed(key);
    c_pad(true);
    
    if (key_pressed != 0){
        key_held = 1; // True 
    }
    
    if(key_name == "K"){
        playSound(sound, false);
    }
}

function onKeyEnd(key){
    key_pressed = 0;
    key_held = 0;
    c_pad(false);
    
    stopSound(sound);
}

// Called 30 times or more per second
function onTick() {
    // Some simple drawing 
    draw_screen();
    // Start controls, and read per tick.
    init_controls();
    // Move player
    move_player();
    
    //console.log(cpad.up);
}


///////////////////////////////////////////////////////////////
//                                                           //
//                      HELPER RULES                         //

// Converts a few ascii numbers to stings for easier debugging.
function convert_key_pressed(key){
    key_name = String.fromCharCode(key);
    if (key_name == " "){
        key_name = "space";
    }
}

function draw_screen(){
    drawImage(loadImage("data/images/overworld_map.png"), screenWidth / 2 - 830 , -620, 1660, 1926);
    
    draw_player();
    
    if (key_held == 1) { // True
        fillText("key pressed: " + key_name,
                 370, 
                 30,             
                 makeColor(1, 1, 1, 1.0), 
                 "30px Arial", 
                 "right", 
                 "top");
    }
}

function init_controls(){
    var speed = 200; // Pixels per Second
    var action = player.action;
    var angle;
    
    player.action = IDLE
    
    if(cpad.right && !cpad.up && !cpad.down && !cpad.left){
        player.direction = EAST;
        player.action = WALK;
    }
    if(cpad.left && !cpad.up && !cpad.down && !cpad.right){
        player.direction = WEST;
        player.action = WALK;
    }
    if(cpad.down && !cpad.up && !cpad.right && !cpad.left){
        player.direction = SOUTH;
        player.action = WALK;
    }
    if(cpad.up && !cpad.down && !cpad.right && !cpad.left){
        player.direction = NORTH;
        player.action = WALK;
    }
    
    if (player.action == WALK) {
        // Turn 90 degrees per direction
        angle = player.direction * PI / 2;

        // We have to round off in case small errors give a value
        // slightly different from 0, 1, or -1.
        player.velocity.x = round(cos(angle)) * speed;
        player.velocity.y = round(-sin(angle)) * speed;
    } else {
        player.velocity.x = 0;
        player.velocity.y = 0;
    }

    if (action != player.action) {
        // Reset the animation frame and timer
        player.animationTime  = 0;
        player.animationFrame = 0;
    }
}

function move_player(){
    var frame_num = 3;
    if (player.action == IDLE){
        frame_num = 1;
    }
    
    player.animation_time = player.animation_time + time;
    while(player.animation_time > 1 / animationrate){
        player.animation_time = player.animation_time - 1 / animationrate;
        player.animation_frame = (player.animation_time + 1) % frame_num;
    }
    
    player.position.x = player.position.x + player.velocity.x * time;
    player.position.y = player.position.y + player.velocity.y * time;
    
    //set borders later.
}

function draw_player(){
    if (cpad.down){
        drawImage(loadImage("data/images/player_down_0.png"), player.position.x, player.position.y, 22+22, 26+26);
    }
    if (cpad.up){
        drawImage(loadImage("data/images/player_up_0.png"), player.position.x, player.position.y, 22+22, 26+26);
    }
    if (cpad.left){
        drawImage(loadImage("data/images/player_left_0.png"), player.position.x, player.position.y, 22+22, 26+26);
    }
    if (cpad.right){
        drawImage(loadImage("data/images/player_right_0.png"), player.position.x, player.position.y, 22+22, 26+26);
    }
    
    if(cpad.lastpressed == "magic" && player.action == IDLE){
        drawImage(loadImage("data/images/player_down_0.png"), player.position.x, player.position.y, 22+22, 26+26);
    }
    if(cpad.lastpressed == "up" && player.action == IDLE){
        drawImage(loadImage("data/images/player_up_0.png"), player.position.x, player.position.y, 22+22, 26+26);
    }
    if(cpad.lastpressed == "down" && player.action == IDLE){
        drawImage(loadImage("data/images/player_down_0.png"), player.position.x, player.position.y, 22+22, 26+26);
    }
    if(cpad.lastpressed == "left" && player.action == IDLE){
        drawImage(loadImage("data/images/player_left_0.png"), player.position.x, player.position.y, 22+22, 26+26);
    }
    if(cpad.lastpressed == "right" && player.action == IDLE){
        drawImage(loadImage("data/images/player_right_0.png"), player.position.x, player.position.y, 22+22, 26+26);
    }
}

function init_player(){
    player            = makeObject();
    
    player.position   = makeObject();
    player.position.x = 597;
    player.position.y = 408;
    
    player.velocity   = makeObject();
    player.velocity.x = 0;
    player.velocity.y = 0;
    
    player.direction = SOUTH;
    
    player.action = WALK;
    
    player.animation_frame = 0;
    player.animation_time = 0;
}

function make_c_pad(){
    cpad = makeObject();
    
    cpad.up    = false;
    cpad.down  = false;
    cpad.left  = false;
    cpad.right = false;
    
    cpad.lastpressed = "magic";
}

function c_pad(value){
    if(key_name == "W"){
        cpad.up = value;
        cpad.lastpressed = "up";
    }
    if(key_name == "S"){
        cpad.down = value;
        cpad.lastpressed = "down";
    }
    if(key_name == "A"){
        cpad.left = value;
        cpad.lastpressed = "left";
    }
    if(key_name == "D"){
        cpad.right = value;
        cpad.lastpressed = "right";
    }
}