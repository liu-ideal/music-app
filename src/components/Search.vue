<template lang="html">
  <div class="wrap">
    <div class="my_header">
      <span class="back" v-tap="goback"></span>
      <p class="my_title"><input type="text" name="" v-model="value" placeholder="输入歌曲名称" ref="myinput" @keyup.enter="tosearch" @focus="hidMini" @blur="showMini"></p>
      <p class="my_right" v-tap="tosearch">搜索</p>
    </div>
    <div class="content">
      <ul>
        <li v-for="item in searchResult">
          <span class="add_to_playlist" v-tap="addToPlaylist.bind(this,item)"></span>
          <div class="info" v-tap="addToPlaylistChoose.bind(this,item)">
            <p class="my_title">{{item.title}}</p>
            <p class="my_author">{{item.author}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name:"Search",
  data(){
    return {
       value:"",
       searchResult:[]
    };
  },
  methods:{
    goback(){
      this.$router.push({path:"/"})
    },
    tosearch(){
      if(!this.value){return};
      this.axios.get(`/music_api/search?${this.value}`).then((res)=>{//请求新歌信息
        let expr=/callback\((.+)\)/;
        let canJson=res.data.replace(expr,'$1');
        let rusultObj=JSON.parse(canJson);
        let resList=rusultObj.data.song.list;
        let containArray=[];
        for (let i = 0; i < resList.length; i++) {
          let infoObj={};
          infoObj.id=resList[i].songid||"0";
          infoObj.img=resList[i].albumid||"0"
          infoObj.title=resList[i].songname||"无";
          infoObj.author=resList[i].singer[0].name||"无";
          infoObj.album=resList[i].albumname||"无";
          infoObj.src=resList[i].songmid||"0";
          containArray.push(infoObj);
        }
        this.searchResult=containArray;
      });
    },
    addToPlaylist(item){
      this.$store.commit("addMusic",item);
    },
    addToPlaylistChoose(item){
      this.$store.commit("addMusic",item);
      this.$store.commit("changeChoose",item.id);
      clearInterval(require("../../utils/globalData.js").timer);
      this.$store.commit("changePlayStatu",false);
    },
    hidMini(){
      if(require("../../utils/globalData.js").MiniPlayer){
        require("../../utils/globalData.js").MiniPlayer.showMyself=false;
      }
    },
    showMini(){
      if(require("../../utils/globalData.js").MiniPlayer){
        require("../../utils/globalData.js").MiniPlayer.showMyself=true;
      }
    }

  },
  mounted(){
    this.$refs.myinput.focus();
  }
}
</script>

<style lang="scss" scoped>
.wrap{
  color: #fff;
  animation-name: gomove;
  animation-duration: 0.2s;
  animation-timing-function: ease;
  .my_header{
    display: flex;
    background-color: rgb(23, 133, 96);
    height: 60px;
    align-items: center;
    .back{
      width: 30px;
      height: 30px;
      background-image: url(../../assets/images/back.png);
    }
    .my_title{
      margin-left: 15px;
      flex-grow: 1;
      input{
        display: block;
        width: 100%;
        height: 25px;
        border-radius: 10px;
        border-style: none;
        background-color: rgb(53, 186, 142);
        color: white;
        text-indent: 20px;

      }
    }
    .my_right{

      margin-left: 30px;
      margin-right: 20px;

    }
  }
  .content{
    color: #000;
    li{
      display: flex;
      align-items: center;
      @media screen and(max-width: 420px){
            margin-top: 15px;
      }
      @media screen and(min-width: 421px){
            margin-top: 25px;
      }
      .add_to_playlist{
        @media screen and(max-width: 420px){
          width: 20px;
          height: 20px;
        }
        @media screen and(min-width: 421px){
          width: 30px;
          height: 30px;
        }
        flex-shrink: 0;
        margin: 0 15px;
        background-image: url(../../assets/images/toadd.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
      .info{
        flex-grow: 1;
        .my_title{
          @media screen and(max-width: 420px){
          font-size: 14px;
          }
          @media screen and(min-width: 421px){
          font-size: 16px;
          }
          color: rgb(11, 172, 177);
        }
        .my_author{
          font-size: 13px;
          color: rgb(75, 73, 74);
        }
      }
    }

  }
}
@keyframes gomove{
  from {
    transform: translateX(100px);
  }
  to{
    transform: translateX(0px);
  }
}
</style>
