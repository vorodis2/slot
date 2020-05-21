


export class Menu  {
  	constructor(_word) {  		
  		this.type="Menu";
        var self=this
        this.word=_word

        this._points=0

        var content= new DCont(document.body);
        this.label=new DLabel(content,210,5,"очки: 0")

        var wind=new DWindow(content,5,5,"Menu",function(){

        })
        wind.width=200;

        var yy=5
        var sah=0
        var arr=[]

        arr[sah] = new DButton(wind.content,5,yy,"Запустить",function(){
            self.word.slotWord.start(arr[1].value)
        })       
        yy+=50;
        sah++;

        arr[sah] = new DSliderBig(wind.content,5,yy,function(){
            
        },"кол. шариков",1,50)
        arr[sah].value=5
        arr[sah].okrug=1
        yy+=50
        sah++;

        arr[sah] =new DSliderBig(wind.content,5,yy,function(){
            self.word.slotWord.radius=this.value
        },"radius",0.01,0.5)
        arr[sah].value=self.word.slotWord.radius
        arr[sah].okrug=1000
        yy+=50
        sah++;



        arr[sah] = new DSliderBig(wind.content,5,yy,function(){
            self.word.slotWord.width=this.value
        },"width",0.1,2.7)
        arr[sah].value=self.word.slotWord.width
        arr[sah].okrug=100
        yy+=50
        sah++;

        arr[sah] =new DSliderBig(wind.content,5,yy,function(){
            self.word.slotWord.height=this.value
        },"height",0.1,2.7)
        arr[sah].value=self.word.slotWord.height
        arr[sah].okrug=100
        yy+=50
        sah++;


        arr[sah] =new DSliderBig(wind.content,5,yy,function(){
            self.word.slotWord.delph=this.value
        },"delph",0.01,2)
        arr[sah].value=self.word.slotWord.delph
        arr[sah].okrug=100
        yy+=50
        sah++;


        arr[sah] =new DSliderBig(wind.content,5,yy,function(){
            self.word.slotWord.gauge=this.value
        },"gauge",0.01,0.5)
        arr[sah].value=self.word.slotWord.gauge
        arr[sah].okrug=100
        yy+=50
        sah++;


        arr[sah] =new DSliderBig(wind.content,5,yy,function(){
            self.word.slotWord.distNa=this.value
        },"distNa",0.1,1)
        arr[sah].value=self.word.slotWord.distNa
        arr[sah].okrug=100
        yy+=50
        sah++;



        wind.height=yy+32
        for (var i = 0; i < arr.length; i++) {
            arr[i].width=190
        }


        this.funSors= function (v){
            self.points=v
        }

        var wW
        this.resize = function (w,h){
            if(w)wW=w
            var wl=this.label.getRect().width
            this.label.x=(wW-wl)/2;
        }

  	}

    set points(v) { 
        this._points = v; 
        this.label.text="очки: "+v;
        this.resize();
    }  
    get points() { 
        return  this._points;
    }




}