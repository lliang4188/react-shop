// 登录
function login(data) {
  return {
    type: 'login',
    data:data
  }
}
// 退出
function outLogin(data) {
  return {
    type: 'outLogin',
    data:data
  }
}
export {
  login,
  outLogin
}
