<template lang="html">
  <div class="wrap">
    <div class="progress">
    <div class="timeStart">

    </div>
    <div class="main_progress">
      <div class="real_progress" >
        <span ref='theSpan'></span>
      </div>
    </div>
    <div class="timeTotal">

    </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"Process",
  data(){
    return{

    }
  },
  methods:{

  }
}
</script>

<style lang="scss" scoped>
.wrap{
  .progress{
display: flex;
flex-wrap: nowrap;
flex-direction: row;
justify-content: space-around;
align-items: center;
margin-top: 0.18rem;
font-size: 0.04rem;
}
.progress .main_progress{
  width: 70%;
  height: 0.01rem;
  background-color: black;
  position: relative;
}
 .progress .main_progress .real_progress{
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background-color: #259ef7;
}
.progress .main_progress .real_progress span{
  position: absolute;
  width: 0.032rem;
  height: 0.032rem;
  border-radius: 100%;
  background-color: #259ef7;
  top: -0.01rem;
  left: 0;
}
}
</style>
