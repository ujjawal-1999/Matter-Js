// module aliases
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine;
var world;
var particles = [];
var plinkos = [];
var boundaries = [];
var cols = 9;
var rows = 9;

function setup(){
    var canvas = createCanvas(600,700);
    colorMode(HSB);
    // create an engine
    engine = Engine.create();
    world = engine.world;
    world.gravity.y = 1.1;
    //Engine.run(engine);
    var spacing = width/cols;
    for(var j = 0; j< rows; j++){
        for(var i = 0; i< cols+1; i++){
            var x = i * spacing;
            if(j&1)
                x += spacing/2;

            var y = spacing + j * spacing;
            var p = new Plinko(x,y,10);
            plinkos.push(p);
        }
    }

    var b = new Boundary(width/2,height + 50, width, 100);
    boundaries.push(b);

    for(var i=0; i< cols+2; i++){
        var x = i * spacing;
        var h = 60;
        var w = 10;
        var y = height - h/2;
        var b = new Boundary(x,y,w,h);
        boundaries.push(b);
    }
}

function newParticle(){
    var p = new Particle(300,50,7);
    particles.push(p);
}

function draw(){
    if(frameCount % 20 == 0){
        newParticle();
    }
    background(0,20,20);
    Engine.update(engine);
    for(var i = 0; i< particles.length; i++){
        particles[i].show();
        if(particles[i].offScreen()){
            World.remove(world,particles[i].body);
            particles.splice(i,1);
            i--;
        }

    }
    for(var i = 0; i < plinkos.length; i++)
        plinkos[i].show();
    for(var i = 0; i < boundaries.length; i++)
        boundaries[i].show();
}