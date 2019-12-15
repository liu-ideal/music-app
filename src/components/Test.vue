<template lang="html">
  <div class="">
    <transition-group name="fade">
    <p v-show="isshow" key="ninh">hahahahah</p>
    <p v-show="isshow" key="ninl">hahahahah</p>
  </transition-group>
    <button type="button" name="button" @click="chagne">ffff</button>
  </div>
</template>

<script>
export default {
  name:"Test",
  data(){
    return{
      isshow:true
    }
  },
  methods:{
    chagne(){
      this.isshow=!this.isshow
    }
  }

}
</script>

<style lang="css" scoped>
/* .fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to  {
  opacity: 0;
} */
.fade-enter{
opacity: 0;
}
.fade-enter-active{
transition-property: opacity;
transition-duration: 2s;
transition-timing-function: ease-in;
}
.fade-enter-to{
opacity: 1;
}
.fade-leave{
opacity: 1;
}
.fade-leave-active{
  transition-property: opacity;
  transition-duration: 2s;
  transition-timing-function: ease-in;
}
.fade-leave-to{
  opacity: 0;
}
</style>
