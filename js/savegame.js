/**********************************
 *********SAVEGAME CLASS***********
 **********************************/

function Savegame(){
	
	/*this.version;
	this.time;
	this.playername;
	this.worldname;*/
	
	//funcion para crear o recrear el objeto savegame existiendo ya un juego
	this.create=function(){
		//GLOBAL VARIABLES
		this.version=game.version;
		this.time=new Date().getTime();
		this.playername=game.player.name;
		this.worldname=game.world.name;
		this.totalmagic=game.totalmagic;
		
		//CREATURES VARIABLES
		//TODO: A�adir condicionales si hay tecnolog�a para ellos;
		this.creatures={};
		this.creatures.zombies=game.creatures.zombies;
		this.creatures.vampires=game.creatures.vampires;
		this.creatures.werewolves=game.creatures.werewolves;
	};
	
	//funcion para crear un objeto savegame a partir de un string
	this.fromString=function(savegame){
		
		var savearray=savegame.split("_"); //savegame string separada por estos caracteres
		console.log(savearray);
		
		//GAME VARIABLES (version, time, name, world, total)
		var gamestart=savearray.indexOf("G");
		var version=savearray[gamestart+1];
		this.version=version;
		
		var savetime=savearray[gamestart+2];
		this.time=savetime;
		// TODO: poner este savetime como before en el codigo de main.js
		
		var name=savearray[gamestart+3];
		this.playername=name;
		
		var world=savearray[gamestart+4];
		this.worldname=world;
		
		var totalmagic=savearray[gamestart+5];
		this.totalmagic=totalmagic;
		//Esto lo debe hacer ANTES de calcular el incremento en game.update(time)
		
		//CREATURE VARIABLES
		
		//TODO: A�ADIR CONDICIONALES "SI EXISTEN ESTAS CRIATURAS" USANDO TECNOLOGIA
		
		//ZOMBIES
		
		var zombiestart=savearray.indexOf("Z");
		
		var zcantidad=savearray[zombiestart+1];
		game.creatures.zombies.setQuantity(zcantidad);
		
		var zbuildings=savearray[zombiestart+2];
		game.buildings.zombies[0].setQuantity(zbuildings);
		
		var ztechnology=savearray[zombiestart+3];
		//TODO: Poner tecnologia en su lugar
		
		//VAMPIRES
		
		//WEREWOLVES
		
	};
	
	this.fromCookie=function(){
		cook=document.cookie;
		
		this.fromString(save); //sets properties from Cookie
	};
	
	//escribir en cookie este savegame
	this.toCookie=function(){
		document.cookie="savegame="+this.toString()+";";//"+" expires=Thu, 31 Dec 2015 23:59:59 UTC";
	};
	
	this.toString=function(){
		
		string="G" //global variables
			+"_"+game.version  //4 caracteres
			+"_"+new Date().getTime() //momento del guardado en milisegundos desde 1970
			+"_"+game.player.name
			+"_"+game.world.name
			
			+"_Z" //empiezan variables de los Zombies
			+"_"+game.creatures.zombies.getQuantity()
			+"_"+game.buildings.zombies[0].getQuantity()
			+"_"+"tecnologia"//TODO: a�adir tecnologia
			;
		
		return string;
	};
	
}
