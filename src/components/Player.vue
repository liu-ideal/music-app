<template lang="html">
  <div class="wrap">
    <div class="my_header">
      <span class="back"></span>
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
      <Process></Process>
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

  }
}
</script>

<style lang="scss" scoped>
.wrap{
  background-color: rgb(23, 133, 96);
  color: #fff;
  font-size: 16px;
  padding-top: 20px;
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
      background-image: url(../../assets/images/playerList.png);
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
      margin: auto;
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

  }
}
</style>
