/******************************/
/**********Game class**********/
/******************************/

function Game(){
	
	//Game Structure
	this.emptyStructure=function(){
		this.player={};
		this.world={};
		this.settings={};
		this.creatures={
			zombies:{},
			vampires:{},
			werewolves:{}
		};
		this.buildings={
			common:{},
			zombies:{
			},
			vampires:{
			},
			werewolves:{
			}
		};
		this.technologies={
			common:{},
			zombies:{},
			vampires:{},
			werewolves:{}
		};
		//CONSTANTES PARA EL JUEGO
		this.constants={creatures:{
                                        zombies:{
                                            magicValue:1
                                        },
                                        vampires:{
                                            magicValue:10
                                        },
                                        werewolves:{}
                                },
				technologies:{
					zombies:{
						Hunger:{
							baseValue:1
						}
						
					},
					vampires:{
						Sharpening:{
							baseValue:1
						}
						
					}
				},
				buildings:{
					zombies:[
                                           {name:"Farm",
                                            baseValue: 1/FPS,// 1/segundo
                                            cost:1,
                                            progressionCost: 2
                                           }],
					vampires:[
                                           {name:"Crypt",
                                            baseValue: 0.5/FPS, // 1/ 2 segundos
                                            cost:100,
                                            progressionCost:2
                                           }]
					}
				};
		};
	
	//sets variables
	this.initialize=function(){
		
		//VARIABLES PARA USAR
		this.version="0100";
		this.loopcounter=0;
		
		this.savegame=new Savegame();
		
		//GLOBAL
		this.player.name="yawmoght";
		
		this.world.name="Phyrexia";
		
		//SETTINGS
		
		this.saveInterval=1; //seconds to save
		
		//TODO: If no cookie, this.newGame();
		
		//CREAR CRIATURAS
		/*this.creatures={};
		this.creatures.zombies=new Creatures("zombies");
		this.creatures.vampires=new Creatures("vampires");
		this.creatures.werewolves=new Creatures("werewolves");
		console.log(document.cookie);*/
		this.newGame();
	};
	
	//starts a clean new game
	this.newGame=function(){
		//resets all the structure
		this.emptyStructure();
		//zombie level tech to one
		this.technologies.zombies.leveltechnology=new Technology("zombies","Hunger");
		this.unlockCreature("zombies");
                this.unlockCreature("vampires");
                
                this.creatures.zombies.addQuantity(1);
                
                this.totalMagic=0;

	};
	
	this.unlockCreature=function(type){
		this.creatures[type]=new Creatures(type);
		this.buildings[type][0]=new Building(type,0); //production building
	};
	
	this.update=function(time){
		//CRIATURAS++
		prodBuilding=this.buildings.zombies[0];
		this.creatures.zombies.addQuantity(prodBuilding.getBaseValue()*prodBuilding.getQuantity()*time);
		zombiesAmount=Math.round(this.creatures.zombies.getQuantity());
		
                prodBuilding=this.buildings.vampires[0];
		this.creatures.vampires.addQuantity(prodBuilding.getBaseValue()*prodBuilding.getQuantity()*time);
		vampiresAmount=Math.round(this.creatures.vampires.getQuantity());
                
		//SALVA EN COOKIE
		this.loopcounter++;
		if (this.loopcounter===FPS*interval*this.saveInterval){ //fps*interval=seconds
			this.save();
			this.loopcounter=0;
		}
	};
	
	this.draw=function(){
		//ESCRIBE CRIATURAS
		muestraCosaEnSitio(zombiesAmount, "zombiesAmount");
                document.getElementById("zombiesToSacrifice").max=game.creatures.zombies.quantity;
                muestraCosaEnSitio(vampiresAmount, "vampiresAmount");
		//ESCRIBE EDIFICIOS
		muestraCosaEnSitio("Cantidad de edificios: "+this.buildings.zombies[0].getQuantity(), "zombiesHouse");
                muestraCosaEnSitio("Cantidad de edificios: "+this.buildings.vampires[0].getQuantity(), "vampiresHouse");
                //ESCRIBE MAGIA TOTAL
                muestraCosaEnSitio(this.totalMagic,"totalMagicdiv");
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