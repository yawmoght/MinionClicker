/******************************/
/********Building class********/
/******************************/


function Building(type,index){
	_this=this;
	this.type=type;
	this.quantity=0;
        this.baseCost=game.constants.buildings[type][index].cost;
        this.progressionCost=game.constants.buildings[type][index].progressionCost;
        this.cost=this.baseCost; //it will change via newCost
        this.name=game.constants.buildings[type][index].name;
	this.baseValue=game.constants.buildings[type][index].baseValue;
	
	this.buildbutton=new BuildButton(type,name,type+"buildbutton",_this);
}

Building.prototype.getQuantity = function() {
    return this.quantity;
};

Building.prototype.getType = function(){
	return this.type;
};

Building.prototype.getBaseValue=function(){
	return this.baseValue;
};

Building.prototype.setQuantity= function(amount){
	this.quantity=amount;
};

Building.prototype.addQuantity= function(a){
	amount=a+this.getQuantity();
	this.setQuantity(amount);
};

Building.prototype.newCost=function(){
        return this.cost*this.progressionCost; //para que al sumar 5, multiplique por 2
};