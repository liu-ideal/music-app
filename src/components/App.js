import Rotat_play from "./Rotat_play";

export default{
  name:"app",
  template:"<div>app<Rotat_play :imgUrl=imgUrl></Rotat_play></div>",
  data(){
    return{
      num:1,
      imgUrl:[require("../../assets/images/lb1.jpg"),require("../../assets/images/lb2.jpg"),require("../../assets/images/lb3.jpg"),require("../../assets/images/lb4.jpg")]
    }
  },
  components:{
    Rotat_play
  }
}
