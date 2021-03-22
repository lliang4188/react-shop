import echo from '../libs/echo';
import config from "../conf/config";
import {request} from "../libs/request";
import action from "../../../actions";
function lazyImg(){
  echo.init({
    offset : 100,//可是区域多少像素可以被加载
    throttle : 0 //设置图片延迟加载的时间
  });
}
function localParam(search, hash) {
  search = search || window.location.search;
  hash = hash || window.location.hash;
  var fn = function(str, reg) {
    if (str) {
      var data = {};
      str.replace(reg, function($0, $1, $2, $3) {
        data[$1] = $3;
      });
      return data;
    }
  }
  return {
    search : fn(search, new RegExp("([^?=&]+)(=([^&]*))?", "g")) || {},
    hash : fn(hash, new RegExp("([^#=&]+)(=([^&]*))?", "g")) || {}
  };
}
function setScrollTop(val=0){
  setTimeout(()=>{
    document.body.scrollTop=val;
    document.documentElement.scrollTop=val;
  },500);
}
// 会员登录安全验证
function safeAuth(props) {
  let sUrl = config.baseUrl+'api/home/user/safe?token='+config.token;
  request(sUrl, 'post', {uid:props.state.user.uid, auth_token: props.state.user.authToken}).then( res =>{
    if(res.code !== 200){
      props.dispatch(action.user.outLogin());
      props.dispatch(action.cart.clearCart());
      props.history.replace(config.path + 'login/index')
    }
  })
}
//判断平台
function isSystem(){
  const isWeixin=/micromessenger/i.test(navigator.userAgent);
  const isQQ=/QQ/i.test(navigator.userAgent);
  const isAndroid=/Android/i.test(navigator.userAgent);
  const isIphone=/iphone/i.test(navigator.userAgent);
  const isPCWindow=/window/i.test(navigator.userAgent);
  const isPCMac=/mac/i.test(navigator.userAgent);
  if(isWeixin){
    return 0;
  }
  else if(isIphone && !isQQ){
    return 1;
  }
  else if(isAndroid && !isQQ){
    return  2;
  }
  else if(isPCWindow){
    return 3;
  }
  else if(isPCMac && !isQQ){
    return 4;
  }else if(isQQ){
    return 5;
  }
}
export {
  lazyImg,
  localParam,
  setScrollTop,
  safeAuth,
  isSystem
}
