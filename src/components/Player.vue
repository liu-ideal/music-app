<template lang="html">
  <div class="wrap">
    <div class="my_header">
      <span class="back" v-tap="goback"></span>
      <div class="song_info"> <p>还记得我吗</p><p class="author">刘刘2</p></div>
      <div class="list"></div>
    </div>
    <div class="my_mid">
     <div class="bg">

     </div>
     <p>暂不支持歌词</p>
     <div class="some_list">
       <span></span>
       <span></span>
       <span></span>
       <span></span>
       <span></span>
     </div>
    </div>
    <div class="my_controler">
      <div class="progress_time">
        <Process @receiveProgress="receiveProgress"></Process>
      </div>
      <div class="play_pause_order">
        <span class="my_order"></span>
        <div class="play_pause">
        <div class="">
          <span></span>
        </div>
        <div class="">
          <span></span>
        </div>
        <div class="">
          <span></span>
        </div>
        </div>
        <span class="list"></span>
      </div>
    </div>
  </div>
</template>

<script>
import Process from "./Progress.vue";
export default {
  name:"Player",
  components:{
    Process
  },
  data(){
    return {

    };
  },
  methods:{
    receiveProgress(data){

    },
    goback(){
      this.$router.push({path:"/"})
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap{
  height: 100vh;
  background-color: rgb(23, 133, 96);
  color: #fff;
  font-size: 16px;
  padding-top: 20px;
  box-sizing: border-box;
  .my_header{

    display: flex;
    align-items: center;
    .back{
      width: 30px;
      height: 30px;
      background-image: url(../../assets/images/back.png);
      background-size: contain;
      margin-left: 10px;
    }
    .song_info{
      flex-grow: 1;
      text-align: center;
      .author{
        font-size: 14px;
      }
    }
    .list{
      width: 30px;
      height: 30px;
      background-image: url(../../assets/images/playerlist.png);
      background-size: contain;
      margin-right: 10px;
    }
  }
  .my_mid{
    margin-top: 20px;
    text-align: center;
    .bg{
      width: 200px;
      height: 200px;
      margin: 30px auto;
      border: 5px solid rgb(100, 133, 96);
      border-radius: 100px;
      background-image: url(../../assets/images/playerbg.jpg);
      background-position: center;

    }
    p{
      margin-top: 15px;
    }
    .some_list{
      display: flex;
      justify-content: space-around;
      margin-top: 30px;
      span{
        width: 30px;
        height: 30px;
        background-size: contain;
        &:nth-child(1){
        background-image: url(../../assets/images/love.png);
        }
        &:nth-child(2){
        background-image: url(../../assets/images/fm.png);
        }
        &:nth-child(3){
        background-image: url(../../assets/images/download.png);
        }
        &:nth-child(4){
        background-image: url(../../assets/images/msg.png);
        }
        &:nth-child(5){
        background-image: url(../../assets/images/more.png);
        }
      }


    }
  }
  .my_controler{
      .progress_time{
        margin: 40px 0;
      }
      .play_pause_order{
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
        .my_order{
          width: 30px;
          height: 30px;
          background-image: url(../../assets/images/oneandone.png);
          background-size: contain;
          margin-left: 15px;
        }
        .play_pause{
          display: flex;
          flex-grow: 1;
          flex-wrap: nowrap;
          justify-content: center;
          align-items: center;
          div{
            &:nth-child(1){
              width: 40px;
              height: 40px;
              border-radius: 20px;
              background-color: rgb(74, 162, 125);
              display: flex;
              justify-content: center;
              align-items: center;
              span{
                width: 30px;
                height: 30px;
                background-image: url(../../assets/images/upsong.png);
                background-size: contain;
              }
            }
            &:nth-child(2){
              width: 50px;
              height: 50px;
              border-radius: 25px;
              margin: 0 20px;
              background-color:rgb(74, 162, 125);
              display: flex;
              justify-content: center;
              align-items: center;
              span{
                width: 40px;
                height: 40px;
                background-image: url(../../assets/images/toplay.png);
                background-size: contain;
                background-position-x: 3px;
              }

            }
            &:nth-child(3){
              width: 40px;
              height: 40px;
              border-radius: 20px;
              background-color:rgb(74, 162, 125);
              display: flex;
              justify-content: center;
              align-items: center;
              span{
                width: 30px;
                height: 30px;
                background-image: url(../../assets/images/lowsong.png);
                background-size: contain;
              }
            }
          }
        }
        .list{
          width: 30px;
          height: 30px;
          background-image: url(../../assets/images/playerlist.png);
          background-size: contain;
          margin-right: 15px;
        }
      }
  }
}
</style>
