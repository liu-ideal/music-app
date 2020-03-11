<template lang="html">
  <transition name="fade">
  <div class="wrap" v-tap="showPlayerPage" v-show="showMyself">
    <div class="my_img" ref="mybgg">
      <img :src="imgUrl" alt='no'/>
    </div>
    <div class="my_control">
      <Progress @receiveProgress="receiveProgress" class="my_progress" :jindu="jindu"></Progress>
      <div class="info_control">
        <div class="info">
          <p class="title">{{song.title}}</p>
          <p class="author">{{song.author}}</p>
        </div>
        <div class="control">
          <span :style="currentPlayStatu" v-tap-stop="changePlayStatu"></span><span v-tap-stop="chooseNextSong"></span><span v-tap-stop="showPlayList"></span>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
import Progress from "./Progress.vue";
export default {
  name:"Mini_player",
  data(){
    return {
       song:{},
       imgUrl:"http://imgcache.qq.com/music/photo/album_300/17/300_albumpic_9583273_0.jpg",
       showMyself:'',
       timer:"",
       deg:0,
       jindu:0,
       timerTwo:""
    };
  },
  watch:{
    "$store.state.currentSong":function(newvalue){
      this.song=newvalue;
      this.imgUrl=`http://imgcache.qq.com/music/photo/album_300/17/300_albumpic_${this.song.img}_0.jpg`;
    },
    "$store.state.isPlay":function(){
      console.log("ischangeisplay");
      
      clearInterval(this.timer);
      clearInterval(require("../../utils/globalData.js").timer);
      if(this.$store.state.isPlay){
        this.startRotate(this.deg);

        if(!this.$store.state.audioObj.duration){
          //console.log("nn");
          this.$store.state.audioObj.addEventListener("durationchange",this.jjjj,false)
        }else{
          //console.log("non");
          require("../../utils/globalData.js").timer=setInterval(()=>{
            console.log("jinduok");
            
            this.setTimejindu();
            this.$store.commit("changestartTime",this.formatTime(this.$store.state.audioObj.currentTime));
            if(this.$store.state.audioObj.paused){
              this.$store.commit("changePlayStatu",false)
            }
            //console.log("timerTwo");
          },1000)
        }
      }else {
        clearInterval(this.timer);
        clearInterval(this.$store.state.timer)
      }
    }
  },
  computed:{
    currentPlayStatu(){
      let topause=require('../../assets/images/topause.png');
      let toplay=require('../../assets/images/toplay.png');
      let imgurl=this.$store.state.isPlay?`url(${topause})`:`url(${toplay})`;
      return {backgroundImage:imgurl};
    }
  },
  methods:{
    receiveProgress(value){
      if(this.$store.state.audioObj.duration){
        this.$store.state.audioObj.currentTime=this.$store.state.audioObj.duration*value;
      }
    },
    showPlayList(){
      require("../../utils/globalData.js").PlayListObj.showMyself=true;
    },
    showPlayerPage(){
      this.$router.push({path:"/player"});
      this.showMyself=false;
    },
    changePlayStatu(){
      clearInterval(this.timer)
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
            this.$store.commit("changePlayStatu",false)
          }else if(i===list.length-1){
              needChooseId=list[0].id;
              this.$store.commit("changeChoose",needChooseId);
              this.$store.commit("changePlayStatu",false);
          }
        }
      }
    },
    startRotate(deg){
      let mydeg=deg||0;
      this.timer=setInterval(()=>{
        this.$refs.mybgg.style.transform=`rotate(${mydeg}deg)`;
        mydeg+=1;
        this.deg+=1;
      },100)
    },
    setTimejindu(){
      let fengzi=Number(this.$store.state.audioObj.currentTime.toFixed(2));
      let fengmu=Number(this.$store.state.audioObj.duration.toFixed(2));
      this.jindu=Math.floor((fengzi/fengmu)*100)/100;
    },
    jjjj(){
      this.$store.state.audioObj.removeEventListener("durationchange",this.jjjj);
      this.$store.commit("changetotalTime",this.formatTime(this.$store.state.audioObj.duration));

      clearInterval(require("../../utils/globalData.js").timer);
      require("../../utils/globalData.js").timer=setInterval(()=>{
        this.setTimejindu();

        this.$store.commit("changestartTime",this.formatTime(this.$store.state.audioObj.currentTime));

        if(this.$store.state.audioObj.paused){

          this.$store.commit("changePlayStatu",false)
        }
        if(this.$store.state.audioObj.ended){

          this.$store.commit("changePlayStatu",false)
        }
      },1000)
    },
    formatTime(time){
      let numTime= Number(time);
      let second=Math.round(numTime);
      let result='';
       if(second>=360){
         let hh=second-360;
         hh>=10?result=`06:${hh}`:result=`06:0${hh}`;
         } else if (second>=300) {
            let hh=second-300;
            hh>=10?result=`05:${hh}`:result=`05:0${hh}`;
          }else if(second>=240){
            let hh=second-240;
            hh>=10?result=`04:${hh}`:result=`04:0${hh}`;
          }else if(second>=180){
            let hh=second-180;
            hh>=10?result=`03:${hh}`:result=`03:0${hh}`;
          }else if(second>=120){
            let hh=second-120;
            hh>=10?result=`02:${hh}`:result=`02:0${hh}`;
          }else if(second>=60){
            let hh=second-60;
            hh>=10?result=`01:${hh}`:result=`01:0${hh}`;
          }else if(second<60){
            let hh=second;
            hh>=10?result=`00:${hh}`:result=`00:0${hh}`;
          }else{
            result=`00:00`
          }
         return result;
    }
  },
  mounted(){
         if(this.$route.path==="/player"){
           this.showMyself=false;
         }else{
           this.showMyself=true;
         }
        require("../../utils/globalData.js").MiniPlayer=this;
  },
  created(){
    //console.log(document);
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
      width: 80%;
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
            // background-image: url(../../assets/images/toplay.png);
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
