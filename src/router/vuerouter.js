import Vuerouter from "vue-router";
import Vue from "vue";
import Setting_page_child from "../components/Setting_page_child.vue";
import App from "../components/App";
Vue.use(Vuerouter);
let routerObj={
  routes:[
    {path:"/",component:App},
    {path:"/setting",component:Setting_page_child,name:"setting"}
  ]
}
export default new Vuerouter(routerObj)
