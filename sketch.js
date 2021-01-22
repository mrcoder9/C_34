var ball;
var database,position;

function setup(){

    database = firebase.database();

    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    var ballRef = database.ref('ball/position');
    ballRef.on("value",readPos,showErr); 
}

function draw(){
    background("white");
    if(position!== undefined){
    if(keyDown(LEFT_ARROW)){
        writePos(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePos(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePos(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePos(0,+1);
    }
    drawSprites();
}
}

function writePos(x,y){
    database.ref('ball/position').set({
        x : position.x + x,
        y : position.y + y
    });
    
}

function readPos(data)
{
    position = data.val();
    ball.x = position.x;
    ball.y = position.y;
}

function showErr()
{
    console.log("Error!!!!");
}
