

import { SlotWord } from './SlotWord.js';
import { Menu } from './Menu.js';
export class World  {
  	constructor(_scane) {  		
  		this.type="World";
  		var self=this;
  		this.scane=_scane;

        this.slotWord = new SlotWord(this);//управление миром
        this.menu=new Menu(this);   //менюха
        this.slotWord.funSors=this.menu.funSors

        this.upDate=function(){
            this.slotWord.upDate()
        }           

        this.resize = function (w,h){
            this.menu.resize(w,h)
        }
  	}   
}