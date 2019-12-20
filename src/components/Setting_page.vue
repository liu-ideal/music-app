<template lang="html">
  <div class="wrap">
    <ul>
      <li v-for="(item,index) in mylist" :key="index+10" v-tap="goChildRoute">
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
        {title:"消息中心",img:require("../../assets/images/101.png")},
        {title:"皮肤中心",img:require("../../assets/images/102.png")},
        {title:"会员中心",img:require("../../assets/images/103.png")},
        {title:"蝰蛇音效",img:require("../../assets/images/104.png")},
        {title:"听歌识曲",img:require("../../assets/images/105.png")},
        {title:"铃声彩铃",img:require("../../assets/images/106.png")},
        {title:"我的商城",img:require("../../assets/images/107.png")}
      ]
    }
  },
  methods:{
    hidMyself(){
      require("../../utils/globalData.js").SettingPageShow=false;
      this.$emit("toList")
    },
    goChildRoute(){
      this.$router.push({
        name:"setting",params:{title:"消息中心"}
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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
      height: 40px;
      align-items:center;
      div{
        width: 18px;
        height: 18px;
        margin-right: 10px;
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
