import Vue from "vue";
import App from "./components/App";
import GudgedTap from "../utils/tapEvent.js";
import router from "./router/vuerouter.js";
window.addEventListener("resize",()=>{
  document.documentElement.style.fontSize=document.documentElement.clientWidth+"px";
},false)
window.addEventListener("load",()=>{
  document.documentElement.style.fontSize=window.screen.width+"px";
},false)

Vue.directive("tap",{
  inserted: function (el,handle) {
    let myvue=new GudgedTap(el,handle.value);
  }
});
var vmm= new Vue({
  el:"#root",
  template:"<router-view></router-view>",
  components:{App},
  router
})
