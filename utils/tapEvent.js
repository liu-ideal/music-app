class GudgedTap {
  constructor(el,handle) {
    this.elment=el;
    this.toBind(this.elment);
    this.startPosition={x:0,y:0};
    this.endPosition={x:0,y:0};
    this.result=null;
    this.handle=handle;
  }
  toBind(elment){
    elment.addEventListener("touchstart",(e)=>{
      this.startPosition.x=Number(e.targetTouches[0].clientX);
      this.startPosition.y=Number(e.targetTouches[0].clientY)
    },false);
    elment.addEventListener("touchend",(e)=>{
      this.endPosition.x=Number(e.changedTouches[0].clientX);
      this.endPosition.y=Number(e.changedTouches[0].clientY);
      this.toGudged(this.startPosition,this.endPosition);
      if(this.result){
        this.handle();
      }
    },false)
  }
  toGudged(start,end){
    let moveX=Math.abs(start.x-end.x);
    let moveY=Math.abs(start.y-end.y);
    if(moveX<=10&&moveY<=10){
      this.result=true;
    }else{
      this.result=false;
    }
  }
}
export default GudgedTap;
