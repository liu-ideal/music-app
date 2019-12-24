<template lang="html">
  <div class="wrap">
    <Common_header_to_page title="推荐歌曲"></Common_header_to_page>
    <keep-alive>
    <Song_list :list="recSongList"></Song_list>
  </keep-alive>
  </div>
</template>

<script>
import Common_header_to_page from "./Common_header_to_page.vue";
import Song_list from "./Song_list.vue";
export default {
  name:"Recommend_page",
  data(){
    return{
       recSongList:[]
    }
  },
  methods:{

  },
  components:{
 Common_header_to_page,Song_list
 },
 mounted(){
   this.axios.get("http://localhost:8080/music_api/recommend").then((res)=>{//请求歌信息
     console.log(res);
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
     this.recSongList=containArray;

   });
 }

}
</script>

<style lang="scss" scoped>
.wrap{
  animation-name: gomove;
  animation-duration: 0.2s;
  animation-timing-function: ease;
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
