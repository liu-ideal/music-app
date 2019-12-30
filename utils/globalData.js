var globalData={
  SettingPageShow:false,
  PlayListObj:null,
  MiniPlayer:null,
  timer:"",
  getJsonpUrl:function(songmid,callback){
    return `https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?callback=${callback}&format=jsonp205361747&platform=yqq&cid=205361747&songmid=${songmid}&filename=C400${songmid}.m4a&guid=126548448`;
  }
};
module.exports= globalData;
