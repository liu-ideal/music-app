import Vuerouter from "vue-router";
import Vue from "vue";
import Setting_page_child from "../components/Setting_page_child.vue";
import App from "../components/App";
import Search from "../components/Search";
import Player from "../components/Player";
import Recommend_page from "../components/Recommend_page";
import Toplist_page from "../components/Toplist_page";
import Song_sheet_page from "../components/Song_sheet_page";
Vue.use(Vuerouter);
let  mylist=[
    {title:"消息中心",img:require("../../assets/images/101.png"),id:"news"},
    {title:"皮肤中心",img:require("../../assets/images/102.png"),id:"skin"},
    {title:"会员中心",img:require("../../assets/images/103.png"),id:"member"},
    {title:"蝰蛇音效",img:require("../../assets/images/104.png"),id:"effect"},
    {title:"听歌识曲",img:require("../../assets/images/105.png"),id:"know"},
    {title:"铃声彩铃",img:require("../../assets/images/106.png"),id:"ring"},
    {title:"我的商城",img:require("../../assets/images/107.png"),id:"shop"}
  ];
let routerObj={
  routes:[
    {path:"/",component:App},
    {path:"/setting/:id",component:Setting_page_child,name:"setting",beforeEnter: (to, from, next) => {
      for (let i = 0; i < mylist.length; i++) {
        if(to.params.id===mylist[i].id){
          to.params.title=mylist[i].title;
          next();
          return ;
        }
      }
    }},
    {path:"/search",component:Search},
    {path:"/player",component:Player},
    {path:"/rec",component:Recommend_page},
    {path:"/toplist",component:Toplist_page},
    {path:"/sheet",component:Song_sheet_page}
  ]
}
export default new Vuerouter(routerObj)
