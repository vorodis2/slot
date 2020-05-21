


export class SWCollision  {
  	constructor(_slotWord, _fun) {  		
  		this.type="SWCollision";
  		var self=this;
        this.par=_slotWord;


        var arrBox=_slotWord.arrBox;
  		var arrBull=_slotWord.arrBull;
  		var arrBDur=_slotWord.arrBDur;
  		

        this.upDate=function(){
        	
        	
        	for (var i = 0; i < arrBDur.length; i++) {
        		if(arrBDur[i].active==true){
        			for (var j = 0; j < arrBull.length; j++) {        				
						if(arrBull[j].active==true){
							//trace(i+ " " +j+"   "+arrBDur[i].idArr+"+++"+arrBull[j].idArr)
							

							if(arrBull[j].oMesh.position.y<this.par._height/2-0.01)	        				
	        				if (arrBDur[i].oMesh.intersectsMesh(arrBull[j].oMesh, true)) {
	        					
	        					if(arrBull[j].isDur(arrBDur[i].idArr)==false){        						
	        						/*trace(arrBull[j].idArr+"EEEEEEEEE"+arrBDur[i].idArr+"   "+arrBull[i].oMesh.position.y);
	        						trace(arrBull[i].oMesh.position.y+" <  "+(this.par._height/2-0.01))*/
	        						_fun("collision",arrBDur[i], arrBull[j])
	        					}	        					
	        				}
	        				//trace(arrBull[i].oMesh.position.y+" <  "+(this.par._height-0.01))
	        			}
        			}
        		}
        	}
        }

    }
}