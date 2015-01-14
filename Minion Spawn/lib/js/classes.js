/******************************/
/********Creatures class********/
/******************************/

function Creatures(type){
	this.type=type;
	this.quantity=1;
	this.productionBuildings=new Array();
		this.productionBuildings[0]=new Building(this.type);
	this.technologies=new Array();
}

Creatures.prototype.getQuantity = function() {
    return this.quantity;
};

Creatures.prototype.getType = function(){
	return this.type;
}

Creatures.prototype.setQuantity= function(amount){
	this.quantity=amount;
}

Creatures.prototype.addQuantity= function(amount){
	this.setQuantity(this.getQuantity()+amount);
}

/******************************/
/********Building class********/
/******************************/


function Building(type){
	_this=this;
	this.type=type;
	this.quantity=0;
	this.baseValue=game.constants.baseValues[type];
	
	this.buildbutton=new BuildButton(type,type+"buildbutton",_this);
	
}

Building.prototype.getQuantity = function() {
    return this.quantity;
};

Building.prototype.getType = function(){
	return this.type;
}

Building.prototype.getBaseValue=function(){
	return this.baseValue;
}

Building.prototype.setQuantity= function(amount){
	this.quantity=amount;
}

Building.prototype.addQuantity= function(a){
	amount=a+this.getQuantity();
	this.setQuantity(amount);
}

/******************************/
/********Technology class******/
/******************************/

function Technology(type){
	_this=this;
	this.type=type;
	this.quantity=0;
	this.baseValue=game.constants.baseValues[type];
	
	this.techbutton=new BuildButton(type,type+"buildbutton",_this);
}

/******************************/
/********Button classes**********/
/******************************/

function BuildButton(type,identifier,parentobject){
	this.type=type;
	this.id=identifier;
	this.text="Construye una casa para "+this.type;
	console.log(this.text);
	_this=this;
	//add building button to constructiondiv
	thisbutton=document.createElement("button");
	thisbutton.innerHTML=this.text;
	thisbutton.id=this.id;
	thisbutton.onclick=function(){parentobject.addQuantity(1)};
	
	document.getElementById("constructiondiv").appendChild(thisbutton);
	
	//texto tras el botón
	thisdiv=document.createElement("div");
	thisdiv.class="building";
	thisdiv.id=_this.type+"House";
	document.getElementById("constructiondiv").appendChild(thisdiv);
	
}

function TechButton(type,identifier,parentobject){
	this.type=type;
	this.id=identifier;
	this.text="Mejora la tecnología para los "+this.type;
	console.log(this.text);
	_this=this;
	//add building button to constructiondiv
	thisbutton=document.createElement("button");
	thisbutton.innerHTML=this.text;
	thisbutton.id=this.id;
	thisbutton.onclick=function(){parentobject.addQuantity(1)};
	
	document.getElementById("constructiondiv").appendChild(thisbutton);
	
	//texto tras el botón
	thisdiv=document.createElement("div");
	thisdiv.class="technology";
	thisdiv.id=_this.type+"Tech";
	document.getElementById("constructiondiv").appendChild(thisdiv);
	
}

/******************************/
/**********Game class**********/
/******************************/

function Game(){
	this.initialize=function(){
		
		//VARIABLES PARA USAR
		this.version="0100";
		this.loopcounter=0;
		
		this.savegame=new Savegame();
		
		//GLOBAL
		this.player={};
		this.player.name="yawmoght";
		
		this.world={};
		this.world.name="Phyrexia";
		
		//SETTINGS
		
		this.saveInterval=1; //seconds to save
		
		//CONSTANTES NUMERICAS PARA EL JUEGO
		this.constants={
			baseValues:{
				zombies:1,
				vampires:1,
			}
		}
		
		
		//CREAR CRIATURAS
		this.creatures={};
		this.creatures.zombies=new Creatures("zombies");
		this.creatures.vampires=new Creatures("vampires");
		this.creatures.werewolves=new Creatures("werewolves");
		console.log(document.cookie);
	};
	
	this.update=function(time){
		//CALCULA CPS
		zombies=this.creatures.zombies;
		zombies.addQuantity(zombies.productionBuildings[0].getBaseValue()*zombies.productionBuildings[0].getQuantity()*time);
		zombiesAmount=Math.round(zombies.getQuantity());
		
		//SALVA EN COOKIE
		this.loopcounter++;
		if (this.loopcounter==FPS*saveInterval){
			this.save();
			this.loopcounter=0;
		}
	};
	
	this.draw=function(){
		//ESCRIBE CRIATURAS
		muestraCosaEnSitio(zombiesAmount, "zombiesAmount");
		//ESCRIBE EDIFICIOS
		muestraCosaEnSitio("Cantidad de edificios: "+this.creatures.zombies.productionBuildings[0].getQuantity(), "zombiesHouse");
	};
	
	//writes savegame string to cookie and shows message
	this.save=function(){
		//updates Savegame object
		this.savegame.create();
		//writes cookie according to Savegame
		this.savegame.toCookie();
		
		console.log("Game saved");
		//this.load(savegame); //para prueba
	};

	//loads from a savegame String and shows message
	this.load=function(savegame){
		loadSavegame(savegame);
	};
}

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
		//TODO: Añadir condicionales si hay tecnología para ellos;
		this.creatures={};
		this.creatures.zombies=game.creatures.zombies;
		this.creatures.vampires=game.creatures.vampires;
		this.creatures.werewolves=game.creatures.werewolves;
	}
	
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
		
		//TODO: AÑADIR CONDICIONALES "SI EXISTEN ESTAS CRIATURAS" USANDO TECNOLOGIA
		
		//ZOMBIES
		
		var zombiestart=savearray.indexOf("Z");
		
		var zcantidad=savearray[zombiestart+1];
		game.creatures.zombies.setQuantity(zcantidad);
		
		var zbuildings=savearray[zombiestart+2];
		game.creatures.zombies.productionBuildings[0].setQuantity(zbuildings);
		
		var ztechnology=savearray[zombiestart+3];
		//TODO: Poner tecnologia en su lugar
		
		//VAMPIRES
		
		//WEREWOLVES
		
	}
	
	this.fromCookie=function(){
		cook=document.cookie;
		
		this.fromString(save); //sets properties from Cookie
	}
	
	//escribir en cookie este savegame
	this.toCookie=function(){
		document.cookie="savegame="+this.toString()+";"//"+" expires=Thu, 31 Dec 2015 23:59:59 UTC";
	}
	
	this.toString=function(){
		
		string="G" //global variables
			+"_"+game.version  //4 caracteres
			+"_"+new Date().getTime() //momento del guardado en milisegundos desde 1970
			+"_"+game.player.name
			+"_"+game.world.name
			
			+"_Z" //empiezan variables de los Zombies
			+"_"+game.creatures.zombies.getQuantity()
			+"_"+game.creatures.zombies.productionBuildings[0].getQuantity()
			+"_"+"tecnologia"//TODO: añadir tecnologia
			;
		
		return string;
	}
	
}


/**********************************
 *********FUNCIONES AUXILIARES*****
 **********************************/

//strings ambas, idealmente
function muestraCosaEnSitio(cosa,sitio){
	document.getElementById(sitio).innerHTML=cosa;
}
