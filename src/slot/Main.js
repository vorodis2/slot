

import { World } from './World.js';



export class Main  {
  	constructor(fun,plus) {  		
  		this.type="Main";
  		this.plus=plus;
  		var self=this;
		this.glaf=null;
		this._width=100;
		this._height=100;
		self.resolution=1
		self.objectBase=null
		self.configHoom=null 
        this.localStorage=undefined;

		var contentHTML= document.createElement('div');
		contentHTML.style.position = 'fixed';
		contentHTML.style.top = '0px';
		contentHTML.style.left = '0px';
		document.body.appendChild(contentHTML);
		var canvas = document.createElement("canvas");		
		contentHTML.appendChild(canvas);


		var engine = new BABYLON.Engine(canvas, true);
		var scene = new BABYLON.Scene(engine);

		//scene.enablePhysics(null, new BABYLON.OimoJSPlugin());
		scene.enablePhysics(null, new BABYLON.CannonJSPlugin());


		var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 0, -5), scene);
		camera.attachControl(canvas, true);


		var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,-1), scene);

        var world=new World(scene);  	
        var gravi=new Gravi(camera,scene)
            
        engine.runRenderLoop(function(){
        	world.upDate()
            scene.render();
            gravi.render();
        });


        function resize(){
        	var w = document.documentElement.clientWidth;
			var h = document.documentElement.clientHeight;
			canvas.width=w;
			canvas.height=h;		
            engine.resize();
        }

        window.addEventListener('resize', function(){
        	resize()
        });
        resize();

  	}
}

export class Gravi  {
  	constructor(camera, scene) { 
  		this.render=function(){
  			camera.rotation.x=0
  			var yy=-9.81
  			var xx=camera.rotation.y*20  			
  			if(Math.abs(xx)>Math.abs(yy*0.8)){
  				if(xx>0)xx=-yy*0.8
  				if(xx<0)xx=yy*0.8	
  			}
   			scene._physicsEngine.setGravity(new BABYLON.Vector3(xx, yy, 0));
  			camera.applyGravity = true;  			
  		}
  	}
}
