<template lang="html">
<div class="wrap">
  <transition-group name="fade">
<Setting_page v-show="SettingPageShow" @toList="toList" key="1000"></Setting_page>
</transition-group>
  <M_header title="hello music" @toList="toList" @toAdd="toAdd">
    <div class="to_search_wrap">
      <div class="to_search" v-tap="toSearchPage">
        <i class="iconfont">&#xe61b;</i><span>&nbsp&nbsp搜索歌曲</span>
      </div>
    </div>
</M_header>
  <Rotat_play :imgUrl=imgUrl class='rotat_play'></Rotat_play>
<div class="list_content">
  <div class="recommend_entry_wrap">
   <div class="recommend_entry">

   </div>
   <p>推荐</p>
  </div>
  <div class="ranking_entry_wrap">
    <div class="ranking_entry">

    </div>
    <p>排行</p>
  </div>
  <div class="songlist_entry_wrap">
    <div class="songlist_entry">

    </div>
    <p>歌单</p>
  </div>
</div>
<div class="last_content_nav">
<p v-for="(item,index) in lastContentNavList" :class="{selected:listSelectedIndex===index}" v-tap="toAddSelected.bind(this,index)">{{item}}</p>
</div>
</div>
</template>

<script>
import Rotat_play from "./Rotat_play";
import Test from "./Test";
import M_header from "./M_header";
import Setting_page from "./Setting_page.vue";
export default{
  name:"App",
  data(){
    return{
      num:1,
      imgUrl:[require("../../assets/images/lb1.jpg"),require("../../assets/images/lb2.jpg"),require("../../assets/images/lb3.jpg"),require("../../assets/images/lb4.jpg")],
      lastContentNavList:["新歌","视频","歌单"],
      listSelectedIndex:0,
      SettingPageShow:require("../../utils/globalData.js").SettingPageShow
    }
  },
  components:{
    Rotat_play,Test,M_header,Setting_page
  },
  methods:{
    toAdd(){
      console.log("add");
    },
    toList(){

    this.SettingPageShow=require("../../utils/globalData.js").SettingPageShow;
    },
    toSearchPage(){

    },
    toAddSelected(index){
      this.listSelectedIndex=index;
      console.log(index);
    }
  },
  mounted(){
    console.log();
  }
}
</script>

<style lang="scss" scoped>
@function setRem($rem){
  @return ($rem/375)*1rem;
}
.wrap{
  font-size: 14px;
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
      width: 60px;
      height: 60px;
      border-radius: 30px;
      margin: 15px 15px 3px 15px;
      background-size: 30px 30px;
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
      font-size: 16px;
      border-bottom: 2px solid #000;
    }
    p{
      margin: 10px;
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
width: 0;
}
.fade-enter-active{
transition-property: width;
transition-duration: 0.1s;
transition-timing-function: ease;
}
.fade-enter-to{
width: 100%;
}
.fade-leave{
width: 100%;
}
.fade-leave-active{
  transition-property: width;
  transition-duration: 0.1s;
  transition-timing-function: ease;
}
.fade-leave-to{
  width: 0;
}
</style>
