<template lang="html">
  <div class="">
    <div class="wrap">
      <div class="main_progress" @touchmove.stop='toMove' @touchend.stop='changeProgress'>
        <div class="real_progress" >
          <span ref='theSpan'></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"Process",
  data(){
    return{
      myprogress:0
    }
  },
  watch:{
    jindu(newvalue){

      this.setPosition(newvalue)
    }
  },
  methods:{
    toMove(e){
  let leftt=document.querySelector('.main_progress').offsetLeft;
  let widthh=document.querySelector('.main_progress').offsetWidth;
  let goMove=e.changedTouches[0].clientX-5-leftt;//重置触点
  if(goMove<-5||goMove>widthh){return};
  let jindu=Math.floor((goMove/widthh)*100)/100;//这是进度百分比
  if(jindu<0){jindu=0};
  this.setPosition(jindu);
  this.myprogress=jindu;
  this.$emit("receiveProgress",jindu);
},
changeProgress(e){
  let leftt=document.querySelector('.main_progress').offsetLeft;
  let widthh=document.querySelector('.main_progress').offsetWidth;
  let goMove=e.changedTouches[0].clientX-5-leftt;//重置触点
  if(goMove<-5||goMove>widthh){return};
  let jindu=Math.floor((goMove/widthh)*100)/100;//这是进度百分比
  if(jindu<0){jindu=0};
  this.setPosition(jindu);
  this.myprogress=jindu;
  this.$emit("receiveProgress",jindu);
},
setPosition(jindu){
  let widthh=document.querySelector('.main_progress').offsetWidth;
  this.$refs.theSpan.style.left=jindu*widthh +'px';
  document.querySelector('.real_progress').style.width=jindu*widthh +'px';
}
},
props:["jindu"]
}
</script>
<style lang="scss" scoped>
.wrap{
  height: 8px;
 .main_progress{
  width: 100%;
  height: 4px;
  background-color: rgb(5, 83, 43);
  position: relative;
 .real_progress{
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background-color: #259ef7;
  span{
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background-color: #f1f5f9;
  top:-4px;
  left: 0;
}
}
}
}
</style>
