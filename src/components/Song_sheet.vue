<template lang="html">
<div class="wrap">
  <div class="lod" v-if="list.length>0?false:true">

  </div>
  <ul>
    <li v-for="(item,index) in list" :key="item.id" v-tap="goSheet">
        <img :src="item.img" alt="no">
        <div class="info">
         <p class="mytile">{{item.title}}</p>
         <p class="songs" v-for="(myitem,index) in item.song">{{myitem}}</p>
        </div>
    </li>
  </ul>
  <Tips ref="mytips"></Tips>
</div>
</template>

<script>
import Tips from "./Tips.vue";
export default {
  name:"Song_sheet",
  data(){
    return{

    }
  },
  props:["list"],
  mounted(){


  },
  components:{
  Tips
  },
  methods:{
    goSheet(){
      this.$refs.mytips.initMy("歌单详情页未开放");
    }
  }
}
</script>

<style lang="scss" scoped>
@function setRem($rem){
  @return ($rem/375)*1rem;
}
.wrap{
  .lod{
    background-image: url(../../assets/images/lod.gif);
    height:60vh;
    background-repeat: no-repeat;
    background-position: center;
  }
  ul{
    font-size: setRem(15);
    color: #000;
    padding-left: 10px;
    li{
      display: flex;
      flex-wrap: nowrap;
      margin-bottom: setRem(15);
      img{
        width: setRem(100);
        height:setRem(100);
        margin-right: setRem(10);
        flex-shrink: 0;
      }
      .info{
        flex-grow: 1;
        flex-shrink: 0;
        .mytile{
          max-width: setRem(200);
          height: setRem(20);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

        }
        .songs{
          font-size:setRem(13);
          color: rgb(114, 114, 117);
          margin-top: 5px;
          max-width: setRem(200);
          height: setRem(20);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
