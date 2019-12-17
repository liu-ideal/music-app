<template lang="html">
<div class="wrap">
  <M_header title="hello music" @toList="toList" @toAdd="toAdd">
    <div class="to_search_wrap">
      <div class="to_search" v-tap="toSearchPage">
        <i class="iconfont">&#xe61b;</i><span>&nbsp&nbsp搜索歌曲</span>
      </div>
    </div>
</M_header>
  <Rotat_play :imgUrl=imgUrl class='rotat_play'></Rotat_play>
<div class="list_content">
  <div class="recommend_entry">

  </div>
  <div class="ranking_entry">

  </div>
  <div class="songlist_entry">

  </div>
</div>
</div>
</template>

<script>
import Rotat_play from "./Rotat_play";
import Test from "./Test";
import M_header from "./M_header";
export default{
  name:"App",
  data(){
    return{
      num:1,
      imgUrl:[require("../../assets/images/lb1.jpg"),require("../../assets/images/lb2.jpg"),require("../../assets/images/lb3.jpg"),require("../../assets/images/lb4.jpg")]
    }
  },
  components:{
    Rotat_play,Test,M_header
  },
  methods:{
    toAdd(){
      console.log("add");
    },
    toList(){

    },
    toSearchPage(){

    }
  }
}
</script>

<style lang="scss" scoped>
@function setRem($rem){
  @return ($rem/375)*1rem;
}
.wrap{
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
      margin: 15px;
    }
    display: flex;
    justify-content: space-between;
    .recommend_entry{
      @include me;
      background-color: rgb(213, 170, 43);
    }
    .ranking_entry{
      @include me;
      background-color: rgb(32, 158, 198);
    }
    .songlist_entry{
      @include me;
      background-color: rgb(57, 129, 75);
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
</style>
