

//шарики

export class SWBull {
  	constructor(_slotWord) {  		
  		this.type="SWBull";
  		var self=this;
        this.par=_slotWord
        var scene=this.par.par.scene
  		var width=100;
  		var height=100;
  		var delph=10;
        var rotation=0;
        this.idArr=-1;
        this._active=false;
        this._radius=1

  	    this.oMesh = BABYLON.Mesh.CreateSphere("bull", 16, scene);
        this.oMesh.checkCollisions = true;
        this.oMesh.material = this.par.materialBull;
        this.oMesh.receiveShadows = true;

        this.ad=[]


        this.oMesh.physicsImpostor = new BABYLON.PhysicsImpostor(this.oMesh, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1 }, scene);

        this.oMesh.position.y=999
        this.shape=this.oMesh.physicsImpostor.physicsBody.shapes[0];

        this.oMesh.scaling.x=this._radius;
        this.oMesh.scaling.y=this._radius;
        this.oMesh.scaling.z=this._radius;

  		this.setPosit=function(_x, _y, _z){
            this.oMesh.position.x = _x;
            this.oMesh.position.y=_y;
            this.oMesh.position.z=_z;           
  		}

       
        this.isDur=function(_idDur){            
            for (var i = 0; i < this.ad.length; i++) {
                if(this.ad[i]==_idDur) return true
            }
            this.ad.push(_idDur)
            return false
        }

/*
        this.oMesh.physicsImpostor.physicsBody.addEventListener("collide",function(e){
            trace(e)
        })*/

        //this.oMesh.physicsImpostor.physicsBody.collisionFilterGroup = this.par.GROUP1; 
       // this.oMesh.physicsImpostor.physicsBody.collisionFilterMask= this.par.GROUP1;


  	}

    
    set radius(v) { 
        if(this._radius!=v){
            this._radius = v;
        
            this.oMesh.physicsImpostor.physicsBody.shapes[0].boundingSphereRadius=this._radius/2;
            this.oMesh.physicsImpostor.physicsBody.shapes[0].radius=this._radius/2;

            this.oMesh.scaling.x=this._radius;
            this.oMesh.scaling.y=this._radius;
            this.oMesh.scaling.z=this._radius;
        }       
    }  
    get radius() { 
        return  this._radius;
    }  


    set active(v) { 
        if(this._active!=v){
            this._active = v; 
            
            if(v==false){
                this.oMesh.position.x=-3+Math.random();
                this.oMesh.position.y=Math.random();
                this.oMesh.position.z=Math.random();
                this.oMesh.physicsImpostor.physicsBody.mass=0
            } else{
                this.oMesh.physicsImpostor.physicsBody.mass=1
            }
            trace(this.oMesh.physicsImpostor.physicsBody)
           
        }       
    }  
    get active() { 
        return  this._active;
    }
}