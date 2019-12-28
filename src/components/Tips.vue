<template lang="html">
  <div class="mwrap" v-if="show">
    {{title}}
  </div>
</template>

<script>
export default {
  name:"Tips",
  data(){
    return{
      title:"",
      show:false,
      timer:""
    }
  },
  mounted(){

  },
  methods:{
    initMy(title){
      clearTimeout(this.timer);
        this.show=false;
        this.$nextTick(()=>{
          this.show=true;
          this.title=title;
          this.timer=setTimeout(()=>{
            this.show=false;
          },1500)
        })

    }
  }
}
</script>

<style lang="scss" scoped>
.mwrap{
  position: fixed;
  background-color: rgba(0, 0, 0, 0.65);
  color: rgb(225, 229, 232);
  font-size: 14px;
  padding:15px 30px;
  text-align: center;
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);
  z-index: 999;
  animation-name: myinf;
  animation-duration: 0.3s;
  animation-timing-function: ease;
}
@keyframes myinf {
  from{
    transform: rotateX(-90deg) translate(-50%,-50%);

  }
  to{
    transform: rotateX(0deg) translate(-50%,-50%);
  }
}
</style>
