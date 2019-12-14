<template lang="html">
<div class="wrap">
  <ul>
    <li v-for="item in imgUrl"><img :src="item" alt="nomore"/></li>
  </ul>
</div>
</template>
<script>
export default{
  name:"Rotat_play",
  data(){
    return{
      name:"liupei"
    }
  },
  props:[
    `imgUrl`
  ],
  created(){
    console.log(this.$props);
  }
}
</script>
<style lang="scss" scoped>
$red:red;
.wrap{
  color: $red;
  ul{
    position: absolute;
    display: flex;
    top:0;
    left: 0;
    li{
      img{
        width: 0.5rem
      }
    }
  }
}
</style>
