<template lang="html">
<div class="wrap" ref="mywrap">
  <ul>
<transition-group name="fade">
    <li v-for="(item,index) in imgUrl" :key="index+110" v-show="showIndex===index"><img :src="item" alt="nomore"/></li>
</transition-group>
  </ul>
  <div class="controller">
    <span class="to_left" v-tap="goleft" :class="{lighthight:LeftNeedLight}" @touchstart="controllerNeedLight" @touchend="controllerRemoveLight">left</span><span class="to_right" v-tap="goright" :class="{lighthight:rightNeedLight}" @touchstart="controllerNeedLight" @touchend="controllerRemoveLight">right</span>
  </div>
  <div class="tips">
    <i v-for="(item,index) in imgUrl" :key="index" :class="{tips_lighthight:showIndex===index}">{{index}}</i>
  </div>
</div>
</template>
<script>
let globalData =require("../../utils/globalData.js");

export default{
  name:"Rotat_play",
  data(){
    return{
      name:"liupei",
      showIndex:0,
      LeftNeedLight:false,
      rightNeedLight:false,
      playTimer:''
    }
  },
  props:[
    `imgUrl`
  ],
  mounted(){

    this.turnPlay();
  },
  methods:{
    goleft(){
      clearInterval(this.playTimer);
      if(this.showIndex===0){
        this.showIndex=this.imgUrl.length-1;
        return;
      }
      this.showIndex--;
      this.turnPlay();
    },
    goright(){
      clearInterval(this.playTimer);
      if(this.showIndex===this.imgUrl.length-1){
        this.showIndex=0;
        return;
      }
      this.showIndex++;
      this.turnPlay();
    },
    controllerNeedLight(e){
      if(e.target.childNodes[0].data==="left"){
        this.LeftNeedLight=true;
      }else{
        this.rightNeedLight=true;
      }

    },
    controllerRemoveLight(e){
      if(e.target.childNodes[0].data==="left"){
        this.LeftNeedLight=false;
      }else{
        this.rightNeedLight=false;
      }
    },
    turnPlay(){
      this.playTimer=setInterval(()=>{
        if(this.showIndex===this.imgUrl.length-1){this.showIndex=0;return}
        this.showIndex++;
    },3000);

    }
  }
}
</script>
<style lang="scss" scoped>
@function setRem($rem){
  @return ($rem/375)*1rem;
}
.wrap{
  overflow: hidden;
  position: relative;
  ul{
    li{
      img{
        width: 100%;
      }
    }
  }
  .controller{
    display: flex;
    position: absolute;
    width: 100%;
    justify-content: space-between;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    text-indent: -999px;
    .to_left{
      width:setRem(40);
      height: setRem(40);
      background-image: url(../../assets/images/toleft.png);
      background-size: contain;
      opacity: 0.7;
      text-indent: -999px;
      overflow: hidden;
    }
    .to_left.lighthight{
      opacity: 1;
    }
    .to_right{
      width: setRem(40);
      height: setRem(40);
      background-image: url(../../assets/images/toright.png);
      background-size: contain;
      opacity: 0.7;
      text-indent: -999px;
      overflow: hidden;
    }
    .to_right.lighthight{
      opacity: 1;
    }
  }
  .tips{
    display: flex;
    @extend .controller;
    justify-content: center;
    top:90%;
    i{
      width: setRem(10);
      height: setRem(10);
      border-radius: setRem(5);
      background-color: #ccc;
      margin: 0 5px;
    }
    .tips_lighthight{
      background-color: #fff;
    }
  }
}
.fade-enter{
opacity: 0.5;
}
.fade-enter-active{
transition-property: opacity;
transition-duration: 0.8s;
transition-timing-function: ease-in;
}
.fade-enter-to{
opacity: 1;
}
// .fade-leave{
// opacity: 1;
// }
// .fade-leave-active{
//   transition-property: opacity;
//   transition-duration: 2s;
//   transition-timing-function: ease-in;
// }
// .fade-leave-to{
//   opacity: 0;
// }
</style>
