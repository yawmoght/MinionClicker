/******************************/
/********Creatures class********/
/******************************/

function Creatures(type){
	this.type=type;
	this.quantity=0;
        _this=this;
        this.magicValue=game.constants.creatures[type].magicValue;
	//game.buildings.zombies.productionBuildings=new Array();
	//	game.buildings.zombies.productionBuildings[0]=new Building(this.type);
	//this.technologies=new Array();
        this.sacrificeButton=new SacrificeButton(type,"sacrifice"+type,_this);
}

Creatures.prototype.getQuantity = function() {
    return this.quantity;
};

Creatures.prototype.getType = function(){
	return this.type;
};

Creatures.prototype.setQuantity= function(amount){
	this.quantity=amount;
};

Creatures.prototype.addQuantity= function(amount){
	this.setQuantity(this.getQuantity()+amount);
};

Creatures.prototype.sacrifice=function (amount){
    this.addQuantity(-amount);
    game.totalMagic+=amount*this.magicValue;
};