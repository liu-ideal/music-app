<template lang="html">
  <div class="wrap">
    <div class="content">
    <span class="mylist" v-tap="toList"></span>
    <p class="mytitle">{{title}}</p>
    <span class="myadd" v-tap="toAdd"></span>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name:"M_header",
  data(){
    return{

    }
  },
  props:[
    "title"
  ],
  methods:{
    toList(){
      require("../../utils/globalData.js").SettingPageShow=true;
      this.$emit("toList");
    },
    toAdd(){
      this.$emit("toAdd")
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap{
  background-color: rgb(23, 133, 96);
  color: #fff;
 font-size: 20px;
   padding-bottom: 10px;
  .content{
    font-size: 100%;
    display: flex;
    align-items: center;
    .mylist{
      width: 26px;
      height: 26px;
      margin: 8px;
      background-image: url(../../assets/images/list.png);
      background-size: contain;
    }
    .myadd{
      width: 26px;
      height: 26px;
      margin: 8px;
      background-image: url(../../assets/images/add.png);
      background-size: contain;
    }
    .mytitle{
      flex-grow: 1;
      text-align: center;
      height: 50px;
      line-height: 50px;
      @media screen and(max-width: 320px){
        font-size: 14px;
      }
      @media screen and(min-width: 321px)and(max-width: 480px){
        font-size: 17px;
      }
    }
  }
}
</style>
