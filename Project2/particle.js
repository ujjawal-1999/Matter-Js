function Particle(x,y,r,fixed){
    var options = {
        friction:0,
        restitution:0.95,
        isStatic:fixed
    }
    this.body = Bodies.circle(x, y, r,options);
    this.r = r;
    World.add(world, this.body);

    this.isOffScreen = function(){
        var pos = this.body.position;
        return (pos.y > height+100);
    }
    this.removeFromWorld = function(){
        World.remove(world,this.body);
    }

    this.show = function(){
        var pos = this.body.position;
        push();
        translate(pos.x,pos.y);
        rectMode(CENTER);
        strokeWeight(1);
        stroke(255);
        fill(127);
        ellipse(0,0,this.r*2);
        line(0,0,this.r,0);
        pop();
    }
}