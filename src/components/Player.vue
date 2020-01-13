<template lang="html">

  <div class="wrap">
    <div class="my_header">
      <span class="back" v-tap="goback"></span>
      <div class="song_info"> <p>{{song.title}}</p><p class="author">{{song.author}}</p></div>
      <div class="list" v-tap="showPlayList"></div>
    </div>
    <div class="my_mid">
     <div class="bg" :style="currentPlaySong" ref="mybg">

     </div>
     <p>暂不支持歌词</p>
     <div class="some_list">
       <span v-tap="notFinished"></span>
       <span v-tap="notFinished"></span>
       <span v-tap="notFinished"></span>
       <span v-tap="notFinished"></span>
       <span v-tap="notFinished"></span>
     </div>
    </div>
    <div class="my_controler">
      <div class="progress_time">
        <span>{{this.$store.state.startTime}}</span>
        <Process @receiveProgress="receiveProgress" :jindu="jindu" class="my_progress"></Process>
        <span>{{this.$store.state.totalTime}}</span>
      </div>
      <div class="play_pause_order">
        <span class="my_order" v-tap="notFinished"> <span class="my_order_list"></span></span>
        <div class="play_pause">
        <div class="" v-tap="chooseUpSong">
          <span></span>
        </div>
        <div class="" v-tap="changePlayStatu">
          <span :style="currentPlayStatu"></span>
        </div>
        <div class="" v-tap="chooseNextSong">
          <span></span>
        </div>
        </div>
        <span class="list" v-tap="showPlayList"></span>
      </div>
    </div>
    <Tips ref="mytips"></Tips>
  </div>

</template>

<script>
import Process from "./Progress.vue";
import Tips from "./Tips.vue";
export default {
  name:"Player",
  components:{
    Process,Tips
  },
  data(){
    return {
      song:{},
      imgUrl:"",
      timer:"",
      deg:0
    };
  },
  watch:{
    "$store.state.currentSong":function(newvalue){
      //console.log("ooo");
      this.song=newvalue;
      this.imgUrl=`http://imgcache.qq.com/music/photo/album_300/17/300_albumpic_${this.song.img}_0.jpg`;
    },
    "$store.state.isPlay":function(){
      if(this.$store.state.isPlay){
        this.startRotate(this.deg);
      }else {
        clearInterval(this.timer);
      }
    }
  },
  methods:{
    notFinished(){
      this.$refs.mytips.initMy("该功能尚未开放");
    },
    receiveProgress(value){
      if(this.$store.state.audioObj.duration){
        this.$store.state.audioObj.currentTime=this.$store.state.audioObj.duration*value;
      }
    },
    goback(){
      this.$router.push({path:"/"})
    },
    showPlayList(){
      if(require("../../utils/globalData.js").PlayListObj){
        require("../../utils/globalData.js").PlayListObj.showMyself=true;
      }
    },
    changePlayStatu(){
      clearInterval(this.timer);
      let needstatu=!this.$store.state.isPlay;
      this.$store.commit("changePlayStatu",needstatu);
    },
    chooseNextSong(){
      let list= this.$store.state.playList;
      let idCurrent=this.$store.state.whoIsChoose;
      let needChooseId='';
      for (let i = 0; i < list.length; i++) {
        if(list[i].id===idCurrent){
          if(list[i+1]){
            needChooseId=list[i+1].id;
            this.$store.commit("changeChoose",needChooseId);
            this.$store.commit("changePlayStatu",false);
          }else if(i===list.length-1){
              needChooseId=list[0].id;
              this.$store.commit("changeChoose",needChooseId);
              this.$store.commit("changePlayStatu",false);
          }
        }
      }
    },
    chooseUpSong(){
      let list= this.$store.state.playList;
      let idCurrent=this.$store.state.whoIsChoose;
      let needChooseId='';
      for (let i = 0; i < list.length; i++) {
        if(list[i].id===idCurrent){
          if(list[i-1]){
            needChooseId=list[i-1].id;
            this.$store.commit("changeChoose",needChooseId)
          }else if(i===0){
              needChooseId=list[list.length-1].id;
              this.$store.commit("changeChoose",needChooseId);
          }
        }
      }
    },
    startRotate(deg){
      let mydeg=deg||0;
      this.timer=setInterval(()=>{
        this.$refs.mybg.style.transform=`rotate(${mydeg}deg)`;
        mydeg+=1;
        this.deg+=1;
      },100)
    }
  },
  computed:{
    currentPlaySong(){
      let todefault=require("../../assets/images/playerbg.jpg");
      let imgurl=this.imgUrl?`url(${this.imgUrl})`:`url(${todefault})`;
      return {backgroundImage:imgurl};
    },
    currentPlayStatu(){
      let topause=require('../../assets/images/topause.png');
      let toplay=require('../../assets/images/toplay.png');
      let imgurl=this.$store.state.isPlay?`url(${topause})`:`url(${toplay})`;
      let myposition=this.$store.state.isPlay?"0px":"3px";
      return {backgroundImage:imgurl,backgroundPositionX: myposition};
    },
    jindu(){
      if(require("../../utils/globalData.js").MiniPlayer){
        return require("../../utils/globalData.js").MiniPlayer.jindu;
      }

    }
  },
  mounted(){
   this.song=this.$store.state.currentSong;
   this.imgUrl=this.song.img?`http://imgcache.qq.com/music/photo/album_300/17/300_albumpic_${this.song.img}_0.jpg`:require("../../assets/images/playerbg.jpg");
   this.$store.state.isPlay&&this.startRotate();

  },
  destroyed(){
    if(require("../../utils/globalData.js").MiniPlayer){
      require("../../utils/globalData.js").MiniPlayer.showMyself=true;
    }
    clearInterval(this.timer)
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
  animation-name: myin;
  animation-duration: 0.2s;
  animation-timing-function: ease;
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
        display: flex;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        .my_progress{
          width: 70%;
        }
        span{
          margin: 0 10px;
        }

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
          position: relative;
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
                background-repeat: no-repeat;
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
@keyframes myin {
  from{
    transform-origin:100% 100%;
    transform: rotate(45deg);
  }
  to{
    transform-origin:100% 100%;
    transform: rotate(0deg);
  }
}
</style>
