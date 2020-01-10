

//коробки

export class SWBox  {
  	constructor(_slotWord) {  		
  		this.type="SWBox";
  		var self=this;
        this.par=_slotWord
        var scene=this.par.par.scene
  		var width=1;
  		var height=1;
  		var delph=10;
        var rotation=0;
        this.idArr=-1;
        this._active=true;


  	    this.oMesh = BABYLON.Mesh.CreateBox("box", 1, scene);
        this.oMesh.checkCollisions = true;
        this.oMesh.material = this.par.materialBox;
        this.oMesh.receiveShadows = true;


        this.oMesh.physicsImpostor = new BABYLON.PhysicsImpostor(this.oMesh, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);




  		this.setPosition=function(_x, _y, _z){
            this.oMesh.position.x=_x;
            this.oMesh.position.y=_y;
            this.oMesh.position.z=_z;

        }    


        this.setWHD=function(_w, _h, _d){
            this.oMesh.scaling.x=_w;
            this.oMesh.scaling.y=_h;
            this.oMesh.scaling.z=_d;

            
            this.oMesh.physicsImpostor.physicsBody.shapes[0] = new CANNON.Box(new CANNON.Vec3(_w/2,  _h/2, _d/2));
  		}


        //this.oMesh.physicsImpostor.physicsBody.collisionFilterGroup = this.par.GROUP2; 
        //this.oMesh.physicsImpostor.physicsBody.collisionFilterMask= this.par.GROUP2;

  	}

    set active(v) { 
        if(this._active!=v){
            this._active = v; 
            if(v==false){
                this.oMesh.position.x=3+Math.random();
                this.oMesh.position.y=Math.random();
                this.oMesh.position.z=Math.random();
            }
        }       
    }  
    get active() { 
        return  this._active;
    }
}