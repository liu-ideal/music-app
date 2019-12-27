<template lang="html">
  <transition name="fade">
<div class="wrap" v-show="showMyself">
  <div class="click_wrap" v-tap="hidMyself">

  </div>
  <div class="content">
    <p class="mytitle">播放列表</p>
    <ul>
      <li v-for="(item,index) in this.$store.state.playList" :key="item.id" v-tap="toPlay.bind(this,item)">
        <div class="info" :class="{active:isChoose(item)}">
          <p class="myindex">{{index+1}}</p>
          <div class="title_author">
            <p class="title">{{item.title}}</p>
            <p class="author">{{item.author}}</p>
          </div>
        </div>
        <span class="todelete" v-tap-stop="deleteOneSong.bind(this,item)"></span>
      </li>
    </ul>
  </div>
  <audio :src="audioSrc" ref="myaudio">

  </audio>

  </video>
</div>
</transition>
</template>

<script>
export default {
  name:"PlayList",
  data(){
    return{
      showMyself:false,
      audioSrc:""

    }
  },
  methods:{
    hidMyself(){
     require("../../utils/globalData.js").PlayListObj.showMyself=false;
   },
   getCurrentSong(id){
     let rusult="";
      for (let i = 0; i < this.$store.state.playList.length; i++) {
        if(this.$store.state.playList[i].id===id){
          rusult=this.$store.state.playList[i];
        }
      }
      return rusult;
   },
   toPlay(item){
     this.$store.commit("changeChoose",item.id);
   },
   deleteOneSong(item){
     this.$store.commit("deleteOneSong",item.id)
   }
  },
  computed:{
    isChoose(){
      return (item)=>{
        let result=this.$store.state.whoIsChoose===item.id;
        return result;
      }
    }
  },
  mounted(){
    require("../../utils/globalData.js").PlayListObj=this;
    this.$store.commit("initAudioObj",this.$refs.myaudio);

  },
  watch:{
    "$store.state.whoIsChoose":function(newvalue,old){
      this.$store.commit("setCurrentSong",this.getCurrentSong(newvalue));
      let songmid=this.getCurrentSong(newvalue).src;
      this.axios.get(`http://localhost:8080/music_api/playurl?${songmid}`).then((res)=>{//请求新歌信息
        let result=res.data.data.items[0];
        let songUrl=`http://ws.stream.qqmusic.qq.com/${result.filename}?fromtag=0&guid=126548448&vkey=${result.vkey}`;
        this.audioSrc=songUrl;
        this.$nextTick(function(){
          console.log("1");
          this.$refs.myaudio.play();
          this.$store.commit("changePlayStatu",true);
        })
      });
    },
    "$store.state.isPlay":function(){
      if(this.$store.state.isPlay){
        this.$refs.myaudio.getAttribute("src")&&this.$refs.myaudio.play();

        console.log(this.$refs.myaudio.duration,this.$refs.myaudio.readyState,this.$refs.myaudio.buffered,this.$refs.myaudio.currentTime);
      }else {
        this.$refs.myaudio.getAttribute("src")&&this.$refs.myaudio.pause();
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap{
  position: fixed;
  bottom:0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 101;
  .click_wrap{
    height: 30%;
    background-color: #000;
    opacity: 0.2;
  }
  .content{
    height: 70%;
    background-color: #ffffff;
    overflow: scroll;
    .mytitle{
      font-size: 15px;
      height: 30px;
      line-height: 30px;
      border-bottom: 1px solid gray;
      text-indent: 10px;
      font-weight: bold;
      color: rgb(42, 43, 43);
    }
    ul{
      li{
        display: flex;
        padding: 0 10px 3px 10px;
        border-bottom: 1px solid gray;
        justify-content: space-between;
        align-items: center;
        .info{
          display: flex;
          align-items: center;
          .myindex{
            font-size: 15px;
          }
          .title_author{
            margin-left: 15px;
            .title{
              font-size: 14px;
            }
            .author{
              font-size: 13px;
              color: rgb(66, 67, 68);
            }
          }

        }
        .active{
          .myindex{
            color: rgb(10, 133, 77);
          }
          .title_author{
            .title{
              color: rgb(10, 133, 77);

            }
            .author{
              color: rgb(10, 133, 77);

            }
          }
        }
        .todelete{
          width: 25px;
          height: 25px;
          background-image: url(../../assets/images/delete.png);
          background-size: 100%;
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
