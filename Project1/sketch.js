// module aliases
var Engine = Matter.Engine,
    //Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine;
var world;
var boxes = [];
var circles = [];
var boundaries = [];
var ground;

function setup(){
    createCanvas(400,400);
    // create an engine
    engine = Engine.create();
    world = engine.world;
    //Engine.run(engine);

    boundaries.push(new Boundary(150,150,width*0.6,20,0.3))
    boundaries.push(new Boundary(270,300,width*0.6,20,-0.3))
}

// function mouseDragged(){
//     // boxes.push(new Box(mouseX,mouseY,random(10,40),random(10,40)));
//     circles.push(new Circle(mouseX,mouseY,random(5,15)));
// }

function draw(){
    background(51);
    Engine.update(engine);
    circles.push(new Circle(200,50,random(5,15)));
    for(var i=0; i<boxes.length;i++)
        boxes[i].show();
    for(var i=0; i<circles.length;i++){
        circles[i].show();
        if(circles[i].isOffScreen()){
            circles[i].removeFromWorld();
            circles.splice(i,1);
            i--;
        }
    }
        
    for(var i=0;i<boundaries.length;i++)
        boundaries[i].show();
}