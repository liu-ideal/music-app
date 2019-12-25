<template lang="html">
  <div class="wrap">
    <div class="my_img">
      <img src="http://imgcache.qq.com/music/photo/album_300/17/300_albumpic_9562594_0.jpg" alt="no">
    </div>
    <div class="my_control">
      <Progress @receiveProgress="receiveProgress" class="my_progress"></Progress>
      <div class="info_control">
        <div class="info">
          <p class="title">不外如是</p>
          <p class="author">张杰</p>
        </div>
        <div class="control">
          <span></span><span></span><span v-tap="showPlayList"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Progress from "./Progress.vue";
export default {
  name:"Mini_player",
  data(){
    return {

    };
  },
  methods:{
    receiveProgress(){

    },
    showPlayList(){
      
      require("../../utils/globalData.js").PlayListObj.showMyself=true;
    }
  },
  mounted(){

  },
  components:{
    Progress
  }
}
</script>

<style lang="scss" scoped>
.wrap{
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  z-index: 100;
  height: 60px;
  background-color: #a69b9b;

  .my_img{
    width: 60px;
    height: 60px;
    border-radius: 30px;
    border: 2px solid rgb(194, 203, 203);
    overflow: hidden;
    flex-shrink: 0;
    margin: -6px 10px 5px 10px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .my_control{
    flex-grow: 1;
    margin-top: 10px;
    .my_progress{
      width: 90%;
    }
    .info_control{
      display: flex;
      flex-wrap:nowrap;
      justify-content: space-between;
      .info{
        .author{
          color: rgb(68, 107, 126);
        }
        p{
          @media screen and(max-width: 375px){
            font-size: 13px;
          }
          @media screen and(min-width: 376px){
            font-size: 14px;
          }
          @media screen and(min-width: 480px){
            font-size: 15px;
          }
          max-width: 100px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .control{
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-right: 20px;
        span{
          @media screen and(max-width: 375px){
            width: 25px;
            height: 25px;
          }
          @media screen and(min-width: 376px){
            width: 30px;
            height: 30px;
          }
          @media screen and(min-width: 480px){
            width: 35px;
            height: 35px;
          }
          background-size: 100% 100%;
          margin: 0 10px;
          &:nth-child(1){
            background-image: url(../../assets/images/toplay.png);
          }
          &:nth-child(2){
            background-image: url(../../assets/images/lowsong.png);
          }
          &:nth-child(3){
            background-image: url(../../assets/images/playerlist.png);
          }
        }
      }
    }
  }
}
</style>
