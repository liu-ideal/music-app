<template lang="html">
<div class="wrap">
  <div class="totop" v-show="totopShow" v-tap="totop">

  </div>
  <div class="lod" v-if="list.length>0?false:true">

  </div>
  <ul>
    <li v-for="(item,index) in list" :key="item.id">
      <span class="add_to_playlist" v-tap="addToPlaylist.bind(this,item)"></span>
      <div class="info" v-tap="addToPlaylistChoose.bind(this,item)">
        <img :src="`http://imgcache.qq.com/music/photo/album_300/17/300_albumpic_${item.img}_0.jpg`" alt="no">
        <div class="name_author">
         <p class="songname">{{item.title}}</p>
         <p class="songauthor">{{item.author}}--{{item.album}}</p>
        </div>
      </div>
    </li>
  </ul>
  <Tips ref="mytips"></Tips>
</div>
</template>

<script>
import Tips from "./Tips.vue";
export default {
  name:"Song_list",
  data(){
    return{
        totopShow:false
    }
  },
  props:["list"],
  mounted(){
    window.addEventListener("scroll",(e)=>{
      let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      if(scrollTop>400){
        this.totopShow=true
      }else{
        this.totopShow=false
      }
    },false)
    //console.log(this.list);
  },
  components:{
    Tips
  },
  methods:{
    addToPlaylist(item){
      if(this.$store.state.playList.length===0){
        this.$store.commit("addMusic",item);
        this.$store.commit("changeChoose",item.id);
      }else{
        this.$store.commit("addMusic",item);
      }
      this.$refs.mytips.initMy("加入播放列表成功");
    },
    addToPlaylistChoose(item){
      this.$store.commit("addMusic",item);
      this.$store.commit("changeChoose",item.id);
      clearInterval(require("../../utils/globalData.js").timer);
      this.$store.commit("changePlayStatu",false);
    },
    totop(){
      document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      if(document.documentElement.scrollTop){
        document.documentElement.scrollTop=0;
      }else if(window.pageYOffset){
        window.pageYOffset=0
      }else{
        document.body.scrollTop=0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap{
  .totop{
    position: fixed;
    bottom: 48%;
    right: 30px;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-image: url(../../assets/images/totop.png);
    background-repeat: no-repeat;
    background-position: center;
    border: 1px solid rgb(1,132,127);
  }
  .lod{
    background-image: url(../../assets/images/lod.gif);
    height:60vh;
    background-repeat: no-repeat;
    background-position: center;
  }
  ul{
    @media screen and(max-width: 420px){
      font-size: 15px;
    }
    @media screen and(min-width: 421px){
      font-size: 17px;
    }
    color: #000;
    li{
      display: flex;
      flex-wrap: nowrap;
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
        margin: 0 10px;
        background-image: url(../../assets/images/toadd.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
      .info{
        flex-grow: 1;
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        img{
          flex-shrink: 0;
          @media screen and(max-width: 420px){
            width: 60px;
            height: 60px;
          }
          @media screen and(min-width: 421px){
            width: 75px;
            height: 75px;
          }
          margin-right: 10px;
        }
        .name_author{
          .songauthor{
            @media screen and(max-width: 420px){
            font-size: 13px;
            }
            @media screen and(min-width: 421px){
            font-size: 15px;
            }
            font-size: 13px;
            color:rgb(123, 124, 122);
            margin-top: 5px;
          }
        }
      }
    }
  }
}
</style>
