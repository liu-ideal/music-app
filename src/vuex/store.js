import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
let state={
  playList:[],
  whoIsChoose:0,
  isPlay:false

}
let mutations={
  addMusic(state,data){
    state.playList.push(data);
    let contain=state.playList;
    state.playList=[];
    state.playList=contain;
  },
  changeChoose(state,id){
    state.whoIsChoose=id;
  }
}
let store=new Vuex.Store({state,mutations});
export default store;
