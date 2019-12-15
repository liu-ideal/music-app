import Vue from "vue";
import App from "./components/App.js";
import GudgedTap from "../utils/tapEvent.js";



Vue.directive("tap",{
  inserted: function (el,handle) {
    let myvue=new GudgedTap(el,handle.value);
  }
});
var vmm= new Vue({
  el:"#root",
  template:"<App/>",
  components:{App}
})
