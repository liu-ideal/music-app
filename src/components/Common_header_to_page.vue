<template lang="html">
  <div class="wrap">
    <div class="my_header">
      <span class="back" v-tap="goback"></span>
      <p class="my_title">{{title}}</p>
      <p class="my_right"></p>
    </div>
  </div>
</template>

<script>
export default {
  name:"Common_header_to_page",
  data(){
    return{

    }
  },
  methods:{
    goback(){
      this.$router.push({path:"/"})
    }
  },
  props:[
    "title"
  ]
}
</script>

<style lang="scss" scoped>
@function setRem($rem){
  @return ($rem/375)*1rem;
}
.wrap{
  color: #fff;

  .my_header{
    display: flex;
    background-color: rgb(23, 133, 96);
    height: 60px;
    align-items: center;
    .back{
      width: 30px;
      height: 30px;
      background-image: url(../../assets/images/back.png);
      background-size: contain;
    }
    .my_title{
      margin-left: setRem(15);
      flex-grow: 1;
    }
    .my_right{
      width: 30px;
      height: 30px;
      background-image: url(../../assets/images/more.png);
      margin-right:setRem(20);
    }
  }
  .content{
    color: #000;
  }
}

</style>
