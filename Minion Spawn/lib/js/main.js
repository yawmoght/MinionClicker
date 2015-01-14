var game=new Game();
game.initialize();
console.log("initialized");
FPS=30; //target FPS
var interval=1000/FPS; //60FPS
setInterval(loop,interval);

var before=new Date();
function loop(){
	
	game.draw();
	
	now = new Date();
    var elapsedTime = (now.getTime() - before.getTime());
    
    if(elapsedTime > interval)
    {
        //Recover the motion lost while inactive.
        time = Math.floor(elapsedTime/interval);
    }
    else
    {
        time=1;
    }

    before = new Date();   

	
	game.update(time);
}