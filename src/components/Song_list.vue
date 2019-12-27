<template lang="html">
<div class="wrap">
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
</div>
</template>

<script>
export default {
  name:"Song_list",
  data(){
    return{

    }
  },
  props:["list"],
  mounted(){
    //console.log(this.list);
  },
  methods:{
    addToPlaylist(item){
      this.$store.commit("addMusic",item);
    },
    addToPlaylistChoose(item){
      this.$store.commit("addMusic",item);
      this.$store.commit("changeChoose",item.id);
      clearInterval(require("../../utils/globalData.js").timer);
      this.$store.commit("changePlayStatu",false);
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap{
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
