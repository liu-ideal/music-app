<template lang="html">
<div>
  app
  <Rotat_play :imgUrl=imgUrl class='rotat_play'></Rotat_play>
  <Test/>
</div>
</template>

<script>
import Rotat_play from "./Rotat_play";
import Test from "./Test";

export default{
  name:"app",
  data(){
    return{
      num:1,
      imgUrl:[require("../../assets/images/lb1.jpg"),require("../../assets/images/lb2.jpg"),require("../../assets/images/lb3.jpg"),require("../../assets/images/lb4.jpg")]
    }
  },
  components:{
    Rotat_play,Test
  }
}
</script>

<style lang="scss" scoped>
@function setRem($rem){
  @return ($rem/375)*1rem;
}
.rotat_play{
  width: setRem(375);
  height: setRem(145);
}
</style>
