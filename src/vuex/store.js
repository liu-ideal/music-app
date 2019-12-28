import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
let state={
  playList:[],
  whoIsChoose:0,
  isPlay:false,
  currentSong:{},
  audioObj:null,
  timer:"",
  startTime:"00:00",
  totalTime:"04:00"

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
  },
  deleteOneSong(state,id){
    for (let i = 0; i < state.playList.length; i++) {
      if(id===state.playList[i].id){
        if(id===state.currentSong.id){
          console.log(state.playList[i+1]);
          state.whoIsChoose=state.playList[i+1]?state.playList[i+1].id:state.playList[0].id;
          state.playList.splice(i,1);
          break;
        }
        state.playList.splice(i,1)
      }
    }
  },
  initAudioObj(state,obj){
    state.audioObj=obj
  },
  changestartTime(state,time){
    state.startTime=time;
  },
  changetotalTime(state,time){
    state.totalTime=time;
  }
}
let store=new Vuex.Store({state,mutations});
export default store;
