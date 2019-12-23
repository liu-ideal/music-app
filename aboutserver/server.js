const http = require('http');
const https = require('https');
const url = require('url');
http.createServer(function(req,res){
  let urlObj=url.parse(req.url);
  let responseObj=res;
  responseObj.setHeader("Access-Control-Allow-Origin","*");
  function isMusicApi(pathname){
    let rexp=/^\/music_api/;
        return rexp.test(pathname);
  }
  function isSongSheet(pathname){
    let rexp=/\/songsheet$/;
    return rexp.test(pathname);
  }
  function isSongSheetList(pathname){
    let rexp=/\/songsheetlist/;
    return rexp.test(pathname);
  }
  function isRecommend(pathname){
    let rexp=/\/recommend/;
    return rexp.test(pathname);
  }
  function isSearch(pathname){
    let rexp=/\/search/;
    return rexp.test(pathname);
  }
  function isTopList(pathname){
    let rexp=/\/toplist/;
    return rexp.test(pathname);
  }
  function isPlayUrl(pathname){
    let rexp=/\/playurl/;
    return rexp.test(pathname);
  }
  if(isMusicApi(urlObj.pathname)){
      responseObj.writeHead(200, {'Content-Type': 'text/plain'});
      if(isSongSheet(urlObj.pathname)){
        getServerData("http",`http://m.kugou.com/plist/index&json=true`).then((data)=>{responseObj.end(data)});
      }else if(isSongSheetList(urlObj.pathname)){
        getServerData("http",`http://m.kugou.com/plist/list/${urlObj.query}?json=true`).then((data)=>{responseObj.end(data)});
      }else if(isRecommend(urlObj.pathname)){
        console.log("recommend");
        getServerData("https",`https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-
8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=36&_=1520777874472`).then((data)=>{responseObj.end(data)});
      }else if(isSearch(urlObj.pathname)){
        console.log("search",urlObj.query);
        getServerData("https",`https://c.y.qq.com/soso/fcgi-bin/client_search_cp?aggr=1&cr=1&flag_qc=0&p=1&n=30&w=${urlObj.query}`).then((data)=>{
          responseObj.end(data)
        });
      }else if(isTopList(urlObj.pathname)){
        console.log("toplist");
        getServerData("https",`https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-
8&outCharset=utf-8%C2%ACice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=27&_=1519963122923`).then((data)=>{responseObj.end(data)});
      }else if(isPlayUrl(urlObj.pathname)){
         console.log("playurl");
         getServerData("https",`https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?
format=json205361747&platform=yqq&cid=205361747&songmid=${urlObj.query}&filename=C400${urlObj.query}.m4a&guid=126548448`).then((data)=>{responseObj.end(data)});
      }else{
        responseObj.end();
      }
  }
  function getServerData(protocal,url){
    return new Promise((resolve,reject)=>{
      if(protocal==="http"){
        http.get(url,function(res){
          let resultData='';
          res.setEncoding('utf8');
          res.on("data",(data)=>{
            resultData+=data;
          })
          res.on("end",()=>{
          //let resultObj= JSON.parse(resultData);
          // let songMid=resultObj.songlist[0].data.songmid;
          // let fileName=`C400${songMid}.m4a`;
          // http.get(`http://m.kugou.com/singer/info/3060&json=true`,(res)=>{
          //   console.log(res.statusCode);
          //   let resultData='';
          //   res.setEncoding('utf8');
          //   res.on("data",(data)=>{
          //     resultData+=data;
          //   })
          //   res.on("end",()=>{
          //     responseObj.end(resultData);
          //   })
          // })
            resolve(resultData);
          })
        })
      }else{
        https.get(url,function(res){
          let resultData='';
          res.setEncoding('utf8');
          res.on("data",(data)=>{
            resultData+=data;
          })
          res.on("end",()=>{
          //let resultObj= JSON.parse(resultData);
          // let songMid=resultObj.songlist[0].data.songmid;
          // let fileName=`C400${songMid}.m4a`;
          // http.get(`http://m.kugou.com/singer/info/3060&json=true`,(res)=>{
          //   console.log(res.statusCode);
          //   let resultData='';
          //   res.setEncoding('utf8');
          //   res.on("data",(data)=>{
          //     resultData+=data;
          //   })
          //   res.on("end",()=>{
          //     responseObj.end(resultData);
          //   })
          // })
            resolve(resultData);
          })
        })
      }

    })
  }
//   http.get(`http://trackercdnbj.kugou.com/i/v2/?
// album_audio_id=99121191&behavior=play&cmd=25&album_id=34731198&hash=F74FD1ED51354EB233861F6F38A9877A&userid=
// 0&pid=2&version=9108&area_code=1&appid=1005&key=407732fc325852538ca836581fe4e370&pidversion=3001&with_res_ta
// g=1`,function(res){
//     console.log(res.statusCode);
//
//     let resultData='';
//     res.setEncoding('utf8');
//     res.on("data",(data)=>{
//       resultData+=data;
//     })
//     res.on("end",()=>{
//     //let resultObj= JSON.parse(resultData);
//     // let songMid=resultObj.songlist[0].data.songmid;
//     // let fileName=`C400${songMid}.m4a`;
//     // http.get(`http://m.kugou.com/singer/info/3060&json=true`,(res)=>{
//     //   console.log(res.statusCode);
//     //   let resultData='';
//     //   res.setEncoding('utf8');
//     //   res.on("data",(data)=>{
//     //     resultData+=data;
//     //   })
//     //   res.on("end",()=>{
//     //     responseObj.end(resultData);
//     //   })
//     // })
//       responseObj.end(resultData);
//     })
//   })



}).listen(8080,()=>{
  console.log("server running");
})
// "use strict";
// var xml=new XMLHttpRequest();
// var exp=/<.{1,30}>/g;
// xml.open('get',"http://localhost:8080/music_api/playurl?002UeFOY2trM6k");
// xml.send();
// xml.onreadystatechange=function(){
//   if(xml.readyState===4&&xml.status===200){
//   // var myjson= xml.responseText.replace(exp,'');
//   // var myfilename=exp.exec(xml.responseText)[0].replace(/[<>]/g,'');
//   //   var result= JSON.parse(myjson);
//   //   var vkey=result.data.items[0].vkey;
//   //   var mySongUrl=`http://ws.stream.qqmusic.qq.com/${myfilename}?fromtag=0&guid=126548448&vkey=${vkey}`;
//   //   console.log(result);
//   //   console.log(myfilename);
//   //   document.getElementById("app").setAttribute("src",mySongUrl);
//   // console.log(JSON.parse(xml.responseText));
// //var resultString=xml.responseText.replace(exp,'');
//
//   console.log(xml.responseText);
//   }
// }
// music_api/toplist
// music_api/search?简单爱
// music_api/recommend
// music_api/songsheetlist?12345
// music_api/songsheet
// music_api/playurl?002UeFOY2trM6k
//http://ws.stream.qqmusic.qq.com/C400002UeFOY2trM6k.m4a?fromtag=0&guid=126548448&vkey=19D96E67F8F69C79E1914A4B7F4CE8A456EB7F9B6F734EACA2BB8326DACB094E2B39F4A5493406E42ACFDC8EE0F6B7825FEDD834E3F91195
