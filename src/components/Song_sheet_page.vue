<template lang="html">
  <div class="wrap">
    <div class="set_margin">
      <Common_header_to_page title="歌单"></Common_header_to_page>
    </div>
 <Song_sheet :list="songSheet"></Song_sheet>
  </div>
</template>

<script>
import Song_sheet from "./Song_sheet.vue";
import Common_header_to_page from "./Common_header_to_page.vue";
export default {
  name:"Song_sheet_page",
  data(){
    return{
      songSheet:[]
    }
  },
  components:{
    Song_sheet,Common_header_to_page
  },
  mounted(){
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
.wrap{
  animation-name: gomove;
  animation-duration: 0.2s;
  animation-timing-function: ease;
  .set_margin{
    margin-bottom: 20px
  }
@keyframes gomove{
  from {
    transform: translateX(100px);
  }
  to{
    transform: translateX(0px);
  }
}
}
</style>
