

import { SWBox } from './SWBox.js';
import { SWBDur } from './SWBDur.js';
import { SWBull } from './SWBull.js';

import {SWCollision} from './SWCollision.js';

export class SlotWord  {
  	constructor(_par) {  		
  		this.type="SlotWord";
  		var self=this;
  		this.par=_par

  		var scale=0.01
  		this._width=2;
  		this._height=2;
  		this._delph=0.15;
  		this._gauge=0.1;

  		this._radius=0.1;



  		this._distNa=0.5;

  		this._sors=0;
  		this.funSors=undefined

  		var box,ball
  		var arrBox=[];
  		this.arrBox=arrBox
  		var arrBull=[]
  		this.arrBull=arrBull

  		var arrBDur=[];
  		this.arrBDur=arrBDur;

  		//колизии через инверстМеш FIXE
  		this.collision=new SWCollision(this,function(s, p, p1){  			
  			if(p.name=="sors"){//в очки
  				self.sors++;
  				p1.active=false
  				return;
  			} 			

  			for (var i = 0; i < p.kolBull; i++) { //докидываем шариков 				
  				ball=getBall();
  				ball.ad=[]  ///наполняем уже пройдеными боксами
  				for (var j = 0; j < p1.ad.length; j++) {
  					ball.ad[j]=p1.ad[j]
  				}	

  				var rend=Math.random()*self._radius*2-self._radius
  				ball.setPosit(	p1.oMesh.position.x-rend, 
  								p1.oMesh.position.y-rend,
  								p1.oMesh.position.z-rend
  								);
  				ball.active=true
  				ball.radius=self._radius;

  			}
  		})


  		//для коробок
  		this.materialBox = new BABYLON.StandardMaterial("groundMat",this.par.scene);
  		this.materialBox.alpha=0.85

  		//для дырок
  		this.material1 = new BABYLON.StandardMaterial("xz",this.par.scene);
  		this.material1.alpha=0.25
  		this.material1.diffuseColor = new BABYLON.Color3( 0, 1,0);

  		//для шариков
  		this.materialBull = new BABYLON.StandardMaterial("groundMat",this.par.scene);
  		this.materialBull.diffuseColor = new BABYLON.Color3(1, 0, 0);
  		

  		//край----------- не видимые хрени что бы шарики не улетали
  		var materialSphere2 = new BABYLON.StandardMaterial("texture2", this.par.scene);
    	materialSphere2.diffuseColor = new BABYLON.Color3(1, 0, 0); //Red
    	materialSphere2.alpha = 0;
  		var box1=new SWBox(self);
		box1.oMesh.material=materialSphere2
  		var box2=new SWBox(self);  		
  		box2.oMesh.material=materialSphere2
  		//----------




  		//подчищаем
  		this.clear=function(){
  			for (var i = 0; i < arrBox.length; i++) {
  				arrBox[i].active=false;
  			}

  			for (var i = 0; i < arrBull.length; i++) {
  				arrBull[i].active=false;
  				arrBull[i].ad=[]
  			}

  			for (var i = 0; i < arrBDur.length; i++) {
  				arrBDur[i].active=false;
  			}
  			this.sors=0;
  		}



  		//основная перерисовка
  		this.draw=function(){
  			this.clear();
  			 
  			//крайние стенки
  			box1.setPosition(0,	0, self._delph/2+(self._gauge/2)*1.2);  
  			box1.setWHD(self._width+self._gauge*2, self._height+self._gauge*2, self._gauge ); 

  			box2.setPosition(0,	0, -self._delph/2-(self._gauge/2)*1.2);  
  			box2.setWHD(self._width+self._gauge*2, self._height+self._gauge*2, self._gauge ); 


  			drawRect() //коробка
  			this.drawNa()//ленейка 			
  		}	

  		//берем с кеша дырку
  		function getBDur(){
  			for (var i = 0; i < arrBDur.length; i++) {
  				if(arrBDur[i].active!=true){
  					box=arrBDur[i];
  					box.active=true;
  					return box
  				}
  			}
  			var box=new SWBDur(self);
  			box.idArr=arrBDur.length
  			arrBDur.push(box)

  			return box;
  		}

  		//берем с кеша коробку
  		function getBox(){
  			for (var i = 0; i < arrBox.length; i++) {
  				if(arrBox[i].active!=true){
  					box=arrBox[i];
  					box.active=true;
  					return box
  				}
  			}
  			var box=new SWBox(self);
  			box.idArr=arrBox.length
  			arrBox.push(box)
  			return box;
  		}

  		//берем с кеша шарик
  		function getBall(){
  			for (var i = 0; i < arrBull.length; i++) {
  				if(arrBull[i].active!=true){
  					box=arrBull[i];
  					
  					return box
  				}
  			}
  			
  			arrBull.push(new SWBull(self))
  			arrBull[arrBull.length-1].idArr=arrBull.length-1
  			return arrBull[arrBull.length-1];
  		}


  		//рисуем коробку
  		function drawRect(){  		
  			//верх
  			box=getBDur()
  			box.name="sors"
  			box.setPosition(0,	-self._height/2-self._gauge/2, 	0);  	
  			box.setWHD(self._width+self._gauge*2, self._gauge, self._delph ); 
  			
  			//низ
  			box=getBox()
  			
  			box.setPosition(0,	self._height/2+self._gauge/2, 	0);  	
  			box.setWHD(self._width+self._gauge*2, self._gauge, self._delph);

  			//право
  			box=getBox()
  			box.setPosition(self._width/2+self._gauge/2,	0, 	0);  	
  			box.setWHD( self._gauge, self._height+self._gauge*2, self._delph);

  			//left
  			box=getBox()
  			box.setPosition(-self._width/2-self._gauge/2,	0, 	0);  	
  			box.setWHD( self._gauge, self._height+self._gauge*2, self._delph); 			
  		}
  		

  		//от меню, стартует шарики
  		this.start=function(kol){  			
  			for (var i = 0; i < kol; i++) {  				
  				ball=getBall();
  				ball.setPosit(	(self._width)*Math.random()-(self._width/2), 
  								self._height/2,
  								(self._delph)*Math.random()-(self._delph/2)
  								);
  				ball.radius=this._radius;
  				ball.active=true  				
  			}
  		}



  		//херачим перекладины
  		var arr=[];
  		var kol,kol1,yy,dist;
  		this.drawNa=function(){  
  			
  			this._height
  			kol=Math.floor(this._height/(this._distNa*2))-1
  			
  			kol1=Math.floor(this._width/(this._distNa))
  			dist=this._width/kol1;  		
  			

  			for (var k = 0; k < kol; k++) {
  				yy=-(this._distNa*2)*(k+1)+(self._height/2+self._gauge/2);
  				
  				arr=this.getArr(kol1);

  				for (var i = 0; i < kol1; i++) {
  					if(arr[i]==0){
  						box=getBox();
						box.setPosition(-this._width/2+i*dist+dist/2,	yy, 	0);
  					}else{
  						box=getBDur();
  						box.kolBull=arr[i];
  						box.name="null"
  						box.setPosition(-this._width/2+i*dist+dist/2,	yy-self._gauge, 	0);
  					}  									
  					box.setWHD(dist, self._gauge, self._delph);  					
  				}  				
  			}  			
  		}


  		this.getArr=function(k){  //там где дырки НУМБЕР
  			var a=[]
  			var b=false;
  			for (var i = 0; i < k; i++) {
  				if(Math.random()<0.7){
  					a[i]=0
  				}else{
  					a[i]=Math.round(Math.random()*3)+2
  					b=true;
  				}
  			}
  			if(b!=true){
  				a[Math.floor((Math.random()*k))]=Math.round(Math.random()*3)+2
  			}
  			return a;
  		}
  		this.upDate=function(){
  			this.collision.upDate()
        }

  		this.draw()
  	}

  	set width(v) { 
        this._width = v;        
        this.draw();
    }  
    get width() { 
        return  this._width;
    }

    set height(v) { 
        this._height = v;        
        this.draw();
    }  
    get height() { 
        return  this._height;
    }

    set delph(v) { 
        this._delph = v;        
        this.draw();
    }  
    get delph() { 
        return  this._delph;
    }

    set gauge(v) { 
        this._gauge = v;        
        this.draw();
    }  
    get gauge() { 
        return  this._gauge;
    }

    set radius(v) { 
        this._radius = v; 
        for (var i = 0; i < this.arrBull.length; i++) {
        	this.arrBull[i].radius=v
        }      
    }  
    get radius() { 
        return  this._radius;
    }


    set distNa(v) { 
        this._distNa = v; 
        this.draw();   
    }  
    get distNa() { 
        return  this._distNa;
    }

    set sors(v) { 
        this._sors = v; 
        if(this.funSors) this.funSors(v);
    }  
    get sors() { 
        return  this._sors;
    }    
}

