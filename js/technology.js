/******************************/
/********Technology class******/
/******************************/

function Technology(type,name){
	_this=this;
	this.name=name;
	this.type=type;
	this.level=1;
	this.baseValue=game.constants.technologies[type][name];
	
	this.techbutton=new TechButton(type,type+"techbutton",_this);
}