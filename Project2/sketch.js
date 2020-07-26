// module aliases
var Engine = Matter.Engine,
    //Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Constraint = Matter.Constraint,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;

var engine;
var world;
var particles = [];
var boundaries = [];
var ground;

var mouseConstraint;

function setup(){
    var canvas = createCanvas(400,400);
    // create an engine
    engine = Engine.create();
    world = engine.world;
    //Engine.run(engine);

    var prev = null;

    for(var x = 200; x < 360; x += 20){
        var fixed = (!prev);
        var p = new Particle(x,100,10,fixed);
        particles.push(p);

        if(prev){
            var options = {
                bodyA: p.body,
                bodyB: prev.body,
                length: 25,
                stiffness:0.4
            }  
            var constraint = Constraint.create(options);
    
            World.add(world,constraint);
        }
        prev = p;
    }
    

    boundaries.push(new Boundary(200,height,width,20));

    var canvasmouse = Mouse.create(canvas.elt);
    canvasmouse.pixelRatio = pixelDensity();
    var options = {
        mouse:canvasmouse
    }
    
    mouseConstraint = MouseConstraint.create(engine,options);

    World.add(world,mouseConstraint);

}

function draw(){
    background(51);
    Engine.update(engine);
    for(var i=0;i<boundaries.length;i++)
        boundaries[i].show();
    for(var i=0;i<particles.length;i++)
        particles[i].show();
    if(mouseConstraint.body){
        var position = mouseConstraint.body.position;
        var offset = mouseConstraint.constraint.pointB;
        var m = mouseConstraint.mouse.position;

        stroke(0,255,0);
        line(position.x + offset.x,position.y + offset.y,m.x,m.y);
    }
    // line(particles[0].body.position.x, particles[0].body.position.y,particles[1].body.position.x, particles[1].body.position.y);
}