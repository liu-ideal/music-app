<template lang="html">
<div class="wrap">
  <ul>
    <li v-for="(item,index) in list" :key="item.id">
        <img :src="item.img" alt="no">
        <div class="info">
         <p class="mytile">{{item.title}}</p>
         <p class="songs" v-for="(myitem,index) in item.song">{{myitem}}</p>
        </div>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name:"Song_sheet",
  data(){
    return{

    }
  },
  props:["list"],
  mounted(){


  }
}
</script>

<style lang="scss" scoped>
@function setRem($rem){
  @return ($rem/375)*1rem;
}
.wrap{
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
