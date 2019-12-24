<template lang="html">
<div class="wrap">
  <transition name="fade">
<Setting_page v-show="SettingPageShow" @toList="toList" key="1000"></Setting_page>
</transition>
  <M_header title="hello music" @toList="toList" @toAdd="toAdd">
    <div class="to_search_wrap">
      <div class="to_search" v-tap="toSearchPage">
        <i class="iconfont">&#xe61b;</i><span>&nbsp&nbsp搜索歌曲</span>
      </div>
    </div>
</M_header>
  <Rotat_play :imgUrl=imgUrl class='rotat_play'></Rotat_play>
<div class="list_content">
  <div class="recommend_entry_wrap" v-tap="toRecPage">
   <div class="recommend_entry">

   </div>
   <p>推荐</p>
  </div>
  <div class="ranking_entry_wrap"  v-tap="toTopPage">
    <div class="ranking_entry">

    </div>
    <p>排行</p>
  </div>
  <div class="songlist_entry_wrap" v-tap="toSongsheetPage">
    <div class="songlist_entry">

    </div>
    <p>歌单</p>
  </div>
</div>
<div class="last_content_nav">
<p v-for="(item,index) in lastContentNavList" :class="{selected:listSelectedIndex===index}" v-tap="toAddSelected.bind(this,index)">{{item}}</p>
</div>
<keep-alive>
<transition name="mymy">
<component :is="currentTabComponent" :list="currentCom"></component>
</transition>
</keep-alive>
</div>
</template>

<script>
import Rotat_play from "./Rotat_play";
import Test from "./Test";
import M_header from "./M_header";
import Setting_page from "./Setting_page.vue";
import Song_list from "./Song_list.vue";
import Song_sheet from "./Song_sheet.vue";
import Video_list from "./Video_list.vue";
export default{
  name:"App",
  data(){
    return{
      num:1,
      imgUrl:[require("../../assets/images/lb1.jpg"),require("../../assets/images/lb2.jpg"),require("../../assets/images/lb3.jpg"),require("../../assets/images/lb4.jpg")],
      lastContentNavList:["新歌","视频","歌单"],
      listSelectedIndex:0,
      SettingPageShow:require("../../utils/globalData.js").SettingPageShow,
      newSongList:[],
      songSheet:[],
      currentTabComponent:"Song_list"
    }
  },
  components:{
    Rotat_play,Test,M_header,Setting_page,Song_list,Song_sheet,Video_list
  },
  methods:{
    toAdd(){
      console.log("add");
    },
    toList(){

    this.SettingPageShow=require("../../utils/globalData.js").SettingPageShow;
    },
    toSearchPage(){
     this.$router.push({path:"/search"})
    },
    toRecPage(){

      this.$router.push({path:"/rec"})
    },
    toTopPage(){
      this.$router.push({path:"/toplist"})
    },
    toSongsheetPage(){
      this.$router.push({path:"/sheet"})
    },
    toAddSelected(index){
      this.listSelectedIndex=index;
      switch (index) {
        case 0:{
          this.currentTabComponent="Song_list";
          break;
        }
        case 1:{
          this.currentTabComponent="Video_list";
          break;
        }
        case 2:{
          this.currentTabComponent="Song_sheet";
          break;
        }
        default:

      }

    }
  },
  computed:{
    currentCom(){
    let value=  this.currentTabComponent==="Song_list"?this.newSongList:this.songSheet;
    return value;
    }
  },
  mounted(){
     this.axios.get("http://localhost:8080/music_api/toplist").then((res)=>{//请求新歌信息
       let resList=res.data.songlist;
       let containArray=[];
       for (let i = 0; i < resList.length; i++) {
         let infoObj={};
         infoObj.id=resList[i].data.songid||"0";
         infoObj.img=resList[i].data.albumid||"0"
         infoObj.title=resList[i].data.songname||"无";
         infoObj.author=resList[i].data.singer[0].name||"无";
         infoObj.album=resList[i].data.albumname||"无";
         infoObj.src=resList[i].data.songmid||"0";
         containArray.push(infoObj);
       }
       this.newSongList=containArray.slice(50);
       // console.log(this.newSongList);
     });
     // -----------------
     this.axios.get("http://localhost:8080/music_api/songsheet").then((res)=>{//请求歌单信息
       let resList=res.data.plist.list.info;
       let containArray=[];
       let expr=/\{.*\}/;
         for (let i = 0; i < resList.length; i++) {
           let infoObj={};
           infoObj.id=resList[i].specialid||0;
           infoObj.img=resList[i].imgurl.replace(expr,'400')||"0";
           infoObj.title=resList[i].intro||"无";
           let mysongs=[];
           for(let k = 0; k < resList[i].songs.length; k++){
             mysongs.push(resList[i].songs[k].filename)
           }
           infoObj.song=mysongs||"无";

           containArray.push(infoObj);
         }
         this.songSheet=containArray;
        //console.log(containArray);
     });
  }
}
</script>

<style lang="scss" scoped>
@function setRem($rem){
  @return ($rem/375)*1rem;
}
.wrap{
  font-size: setRem(14);
  .rotat_play{
    width: setRem(375);
    height: setRem(145);
  }
  .to_search_wrap{
    text-align:center;
    padding:0 15px;
    .to_search{
        font-size: 13px;
        height: 25px;
        line-height: 22px;
        border-radius: 11px;
        background-color: rgb(53, 186, 142);
        .iconfont{
          font-family: "iconfont" !important;
          font-size: 18px;
        }
    }
  }
  .list_content{
    @mixin me{
      width: setRem(60);
      height: setRem(60);
      border-radius: setRem(30);
      margin: setRem(15) setRem(15) setRem(3) setRem(15);
      background-size: setRem(30) setRem(30);
      background-repeat: no-repeat;
      background-position: center;
    }
    display: flex;
    justify-content: space-between;
    text-align: center;

    .recommend_entry{
      @include me;
      background-color: rgb(213, 170, 43);
      background-image: url(../../assets/images/recommend.png);
    }
    .ranking_entry{
      @include me;
      background-color: rgb(32, 158, 198);
      background-image: url(../../assets/images/rank.png);
    }
    .songlist_entry{
      @include me;
      background-color: rgb(57, 129, 75);
      background-image: url(../../assets/images/songlist.png);
    }
  }
  .last_content_nav{
    display: flex;
    justify-content: flex-start;
    color: gray;
    p.selected{
      color: #000;
      font-size: setRem(16);
      border-bottom: 2px solid #000;
    }
    p{
      margin: setRem(10);
      padding-bottom: 5px;
    }
  }
}

@font-face {
  font-family: 'iconfont';  /* project id 1568155 */
  src: url('//at.alicdn.com/t/font_1568155_3gb2agq6084.eot');
  src: url('//at.alicdn.com/t/font_1568155_3gb2agq6084.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_1568155_3gb2agq6084.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_1568155_3gb2agq6084.woff') format('woff'),
  url('//at.alicdn.com/t/font_1568155_3gb2agq6084.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_1568155_3gb2agq6084.svg#iconfont') format('svg');
}
.fade-enter{
left: -100%;
color: rgb(23, 133, 96);
}
.fade-enter-active{
transition-property: all;
transition-duration: 0.1s;
transition-timing-function: ease;
}
.fade-enter-to{
left: 0;
color: #fff;
}
.fade-leave{
left: 0;
color: #fff;
}
.fade-leave-active{
  transition-property: all;
  transition-duration: 0.2s;
  transition-timing-function: ease;
}
.fade-leave-to{
  left: -100%;
  color: rgb(23, 133, 96);
}
.mymy-enter{
transform: translateX(80px);
}
.mymy-enter-active{
transition-property: all;
transition-duration: 0.1s;
transition-timing-function: ease;
}
.mymy-enter-to{
transform: translateX(0px);
}

</style>
