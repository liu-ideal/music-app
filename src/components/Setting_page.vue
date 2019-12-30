<template lang="html">
  <div class="wrap" v-leftSlide="hidMyself" @touchmove.stop="ffjf">
    <ul>
      <li v-for="(item,index) in mylist" :key="index+10" v-tap="goChildRoute.bind(this,item.id,item.title)">
      <div>
       <img :src="item.img" alt="">
      </div>
      <p>{{item.title}}</p>
      </li>
    </ul>
    <div class="click_wrap" v-tap="hidMyself">

    </div>
  </div>
</template>

<script>
export default {
  name:"Setting_page",
  data(){
    return{
      mylist:[
        {title:"消息中心",img:require("../../assets/images/101.png"),id:"news"},
        {title:"皮肤中心",img:require("../../assets/images/102.png"),id:"skin"},
        {title:"会员中心",img:require("../../assets/images/103.png"),id:"member"},
        {title:"蝰蛇音效",img:require("../../assets/images/104.png"),id:"effect"},
        {title:"听歌识曲",img:require("../../assets/images/105.png"),id:"know"},
        {title:"铃声彩铃",img:require("../../assets/images/106.png"),id:"ring"},
        {title:"我的商城",img:require("../../assets/images/107.png"),id:"shop"}
      ]
    }
  },
  methods:{
    hidMyself(){
      require("../../utils/globalData.js").SettingPageShow=false;
      this.$emit("toList")
    },
    goChildRoute(id,title){
      this.$router.push({
        name:"setting",params:{id:id,title:title}
      })
    },
    ffjf(){

    }

  },
  mounted(){
    document.addEventListener("touchmove",function(){
      console.log("hello");
      //event.preventDefault()
    },false)
  }
}
</script>

<style lang="scss" scoped>
@function setRem($rem){
  @return ($rem/375)*1rem;
}
.wrap{
  left: 0;
  top: 0;
  color: #fff;
  position: absolute;
  z-index:100;
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  .click_wrap{
    width: 30%;
    height: 100vh;
    background-color: #000;
    opacity: 0.1;
  }
  ul{
    width: 70%;
    height: 100vh;
    box-sizing: border-box;
    background-color: rgb(23, 133, 96);
    padding-top: 30px;
    padding-left: 15px;
    li{
      display: flex;
      height: setRem(40);
      align-items:center;
      div{
        width: setRem(18);
        height: setRem(18);
        margin-right: setRem(18);
        img{
          display: block;
          width: 100%;
          height: 100%;
        }

      }
    }
  }
}
</style>
