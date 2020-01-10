

//дырки руляться со шариками

export class SWBDur  {
  	constructor(_slotWord) {  		
  		this.type="SWBDur";
  		var self=this;
        this.par=_slotWord
        var scene=this.par.par.scene
  		var width=1;
  		var height=1;
  		var delph=10;
        var rotation=0;


        this.name="null"

        this.idArr=-1;
        this._active=true;
        this.kolBull=2;


  	    this.oMesh = BABYLON.Mesh.CreateBox("box", 1, scene);
       
       //this.oMesh.checkCollisions = true;
        this.oMesh.material = this.par.material1;
        this.oMesh.receiveShadows = true;





  		this.setPosition=function(_x, _y, _z){
            this.oMesh.position.x=_x;
            this.oMesh.position.y=_y;
            this.oMesh.position.z=_z;

        }    


        this.setWHD=function(_w, _h, _d){
            this.oMesh.scaling.x=_w;
            this.oMesh.scaling.y=_h;
            this.oMesh.scaling.z=_d;
  		}
  	}

    set active(v) { 
        if(this._active!=v){
            this._active = v; 
            if(v==false){
                this.oMesh.position.x=3+Math.random();
                this.oMesh.position.y=-2+Math.random();
                this.oMesh.position.z=Math.random();
            }
        }       
    }  
    get active() { 
        return  this._active;
    }
}