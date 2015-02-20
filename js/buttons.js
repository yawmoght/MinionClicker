/******************************/
/********Button classes**********/
/******************************/

function BuildButton(type,name,identifier,parentobject){
	this.type=type;
	this.id=identifier;
	this.text="Construye una casa para "+this.type;
	_this=this;
        
	//add building button to constructiondiv
	thisbutton=document.createElement("button");
	thisbutton.innerHTML=this.text;
	thisbutton.id=this.id;
	thisbutton.onclick=function(){
                   
                    if (game.totalMagic<parentobject.cost){
                        console.log(game.totalMagic +"es menor que"+parentobject.cost);
                        return;
                    };
                    game.totalMagic-=parentobject.cost;
                    parentobject.addQuantity(1);
                    parentobject.cost=parentobject.newCost();
                };
	
	document.getElementById("constructiondiv").appendChild(thisbutton);
	
	//texto tras el bot�n
	thisdiv=document.createElement("div");
	thisdiv.class="building";
	thisdiv.id=_this.type+"House";
	document.getElementById("constructiondiv").appendChild(thisdiv);
	
}

function TechButton(type,name,identifier,parentobject){
	this.type=type;
	this.id=identifier;
	this.text="Mejora la tecnolog�a "+this.type;
	console.log(this.text);
	_this=this;
	//add building button to constructiondiv
	thisbutton=document.createElement("button");
	thisbutton.innerHTML=this.text;
	thisbutton.id=this.id;
	thisbutton.onclick=function(){parentobject.addQuantity(1);};
	
	document.getElementById("constructiondiv").appendChild(thisbutton);
	
	//texto tras el bot�n
	thisdiv=document.createElement("div");
	thisdiv.class="building";
	thisdiv.id=_this.type+"House";
	document.getElementById("constructiondiv").appendChild(thisdiv);
	
}


function TechButton(type,identifier,parentobject){
	this.type=type;
	this.id=identifier;
	this.text="Mejora la tecnolog�a para los "+this.type;
	_this=this;
	//add building button to constructiondiv
	thisbutton=document.createElement("button");
	thisbutton.innerHTML=this.text;
	thisbutton.id=this.id;
	thisbutton.onclick=function(){parentobject.addQuantity(1);};
	
	document.getElementById("constructiondiv").appendChild(thisbutton);
	
	//texto tras el bot�n
	thisdiv=document.createElement("div");
	thisdiv.class="technology";
	thisdiv.id=_this.type+"Tech";
	document.getElementById("constructiondiv").appendChild(thisdiv);
	
}

//parentobject= Creature
function SacrificeButton(type,identifier,parentobject){
    this.type=type;
    this.id=identifier;
    this.text="Sacrifica "+type;
    _this=this;
    console.log(type+"Sacrificediv");
    sacrificediv=document.getElementById(type+"Sacrificediv");
    
    //add place to select how mahy
    toSacrifice=document.createElement("input");
    toSacrifice.type="range";
    toSacrifice.id=type+"ToSacrifice";
    toSacrifice.min=0;
    toSacrifice.max=parentobject.quantity;
    sacrificediv.appendChild(toSacrifice);
    
    //add sacrifice button to creatures amount
    
    thisbutton=document.createElement("button");
    thisbutton.innerHTML=this.text;
    thisbutton.id=this.id;
    thisbutton.onclick=function(){
        amount=document.getElementById(type+"ToSacrifice").value;
        console.log(game.creatures[type].quantity);
        console.log(amount);
        if (amount>game.creatures[type].quantity){
            //TODO: Message log
            return;
        }
        game.creatures[type].sacrifice(amount);
    };
    sacrificediv.appendChild(thisbutton);
}