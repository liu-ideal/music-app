<template lang="html">
  <div class="wrap">
    <div class="my_header">
      <span class="back" v-tap="goback"></span>
      <p class="my_title"><input type="text" name="" v-model="value" placeholder="输入歌曲名称" ref="myinput"></p>
      <p class="my_right" v-tap="tosearch">搜索</p>
    </div>
    <div class="content">
      {{this.$route.params.title}}
      <p>暂无数据</p>

    </div>
  </div>
</template>

<script>
export default {
  name:"Search",
  data(){
    return {
       value:""
    };
  },
  methods:{
    goback(){
      this.$router.push({path:"/"})
    },
    tosearch(){

    }
  },
  mounted(){
    this.$refs.myinput.focus();
  }
}
</script>

<style lang="scss" scoped>
.wrap{
  color: #fff;
  animation-name: gomove;
  animation-duration: 0.2s;
  animation-timing-function: ease;
  .my_header{
    display: flex;
    background-color: rgb(23, 133, 96);
    height: 60px;
    align-items: center;
    .back{
      width: 30px;
      height: 30px;
      background-image: url(../../assets/images/back.png);
    }
    .my_title{
      margin-left: 15px;
      flex-grow: 1;
      input{
        display: block;
        width: 100%;
        height: 25px;
        border-radius: 10px;
        border-style: none;
        background-color: rgb(53, 186, 142);
        color: white;
        text-indent: 20px;

      }
    }
    .my_right{

      margin-left: 30px;
      margin-right: 20px;

    }
  }
  .content{
    color: #000;
  }
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
