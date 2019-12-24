<template lang="html">
  <transition name="fade">
<div class="wrap" v-show="showMyself">
  <div class="click_wrap" v-tap="hidMyself">

  </div>
  <div class="content">
    <p>播放列表</p>
    <ul>
      <li>nihao</li>
      <li>nihao</li>
      <li>nihao</li>
    </ul>
  </div>
</div>
</transition>
</template>

<script>
export default {
  name:"PlayList",
  data(){
    return{
      showMyself:false
    }
  },
  methods:{
    hidMyself(){
     require("../../utils/globalData.js").PlayListObj.showMyself=false;
    }
  },
  mounted(){
    require("../../utils/globalData.js").PlayListObj=this;
  }
}
</script>

<style lang="scss" scoped>
.wrap{
  position: fixed;
  bottom:0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 101;
  .click_wrap{
    height: 30%;
    background-color: #000;
    opacity: 0.2;
  }
  .content{
    height: 70%;
    background-color: #ffffff;
  }
}
.fade-enter{
bottom: -100%;
}
.fade-enter-active{
transition-property: all;
transition-duration: 0.2s;
transition-timing-function: ease;
}
.fade-enter-to{
bottom: 0;
}
.fade-leave{
bottom: 0;

}
.fade-leave-active{
  transition-property: all;
  transition-duration: 0.2s;
  transition-timing-function: ease;
}
.fade-leave-to{
  bottom: -100%;
}
</style>
