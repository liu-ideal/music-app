import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
let state={
  playList:[],
  whoIsChoose:0,
  isPlay:false,
  currentSong:{}

}
let mutations={
  addMusic(state,data){
    let isExist=false;
    for (let i = 0; i < state.playList.length; i++) {
      if(data.id===state.playList[i].id){
        isExist=true;
      }
    }
    if(!isExist){
      state.playList.push(data);
      let contain=state.playList;
      state.playList=[];
      state.playList=contain;
    }
  },
  changeChoose(state,id){
    state.whoIsChoose=id;
  },
  setCurrentSong(state,songObj){
    state.currentSong=songObj;
  },
  changePlayStatu(state,statu){
    state.isPlay=statu;
  }
}
let store=new Vuex.Store({state,mutations});
export default store;
