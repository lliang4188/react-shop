import React from 'react';
import config from "../../../assets/js/conf/config";
import { connect } from 'react-redux';
// import action from '../../../actions';
import SubHeader from "../../../components/header/subheader";
import { Toast } from 'antd-mobile';
import Css from '../../../assets/css/user/mobile/index.css';
import {request} from '../../../assets/js/libs/request';
class MobileIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sCellphone: '',
      bCodeSuccess: false,
      sCodeText: '获取验证码',
      sCode: ''
    }
    this.timer = null;
    this.bSendCode = true;
    this.bSubmit = true;
  }
  componentDidMount() {
  }
  componentWillUnmount() {
    clearInterval(this.timer);
    this.setState = (state,callback) => {
      return;
    }
  }
  // 检查手机号
  checkCellphone(e){
    this.setState({sCellphone:e.target.value}, ()=>{
      if(this.bSendCode){
        if (this.state.sCellphone.match(/^1[3-9][0-9]{9}/)) {
          this.setState({bCodeSuccess: true});
        } else {
          this.setState({bCodeSuccess: false});
        }
      }

    });
  }
  // 获取验证码
  async getCode(){
    if(this.bSendCode && this.state.bCodeSuccess) {
      this.bSendCode = false;
      let resData = await this.isSameCellphone();
      if(resData.code === 200){
        if(resData.data.isreg === '1'){
          Toast.info('请输入手机号已存在',2);
          this.bSendCode = true;
          return false;
        }
      }
      let iTime = 10;
      this.timer= setInterval(() => {
        if(iTime>0){
          iTime--;
          this.setState({sCodeText:'重新发送('+ iTime+'s)', bCodeSuccess:false});
        }else {
          clearInterval(this.timer);
          this.bSendCode = true;
          this.setState({sCodeText:'获取验证码', bCodeSuccess:true});
        }
      }, 1000)
    }
  }
  // 点击注册按钮数据
  async submitData(){
    if(this.state.sCellphone.match(/^\s*$/)) {
      Toast.info('请输入手机号',2);
      return false;
    }
    if(!this.state.sCellphone.match(/^1[3-9][0-9]{9}/)){
      Toast.info('请输入正确的手机号',2);
      return false;
    }
    let resData = await this.isSameCellphone();
    if(resData.code === 200){
      if(resData.data.isreg === '1'){
        Toast.info('请输入手机号已存在',2);
        return false;
      }
    }
    if(this.state.sCode.match(/^\s*$/)) {
      Toast.info('请输入短信验证码',2);
      return false;
    }
    if (this.bSubmit){
      this.bSubmit = false;
      let sUrl = config.baseUrl + '/api/user/myinfo/updatecellphone?token='+config.token;
      request(sUrl, 'post',{vcode:this.state.sCode, cellphone:this.state.sCellphone, uid:this.props.state.user.uid}).then(res=>{
        if(res.code===200){
          Toast.info('绑定成功！', 2,()=>{
            this.props.history.goBack();
          });
        }else {
          Toast.info(res.data,2);
        }
      })
    }

  }
  // 检测手机号是否注册
  isSameCellphone(){
    let sUrl = config.baseUrl+'/api/home/user/isreg?token='+ config.token;
    return request(sUrl, 'post',{username:this.state.sCellphone}).then(res =>{
      return(res);
    })
  }
  render() {
    return (
        <div className={Css['mobile-page']}>
         <SubHeader title="绑定手机号"></SubHeader>
         <div className={Css['mobile-main']}>
           <div className={Css['tip']}>新手机号验证后，即可绑定成功！</div>
           <div className={Css['input-con']}>
             <div className={Css['input-wrap']}>
               <input type="tel" placeholder="绑定手机号" onChange={(e) => {this.checkCellphone(e)}}/>
             </div>
             <div className={Css['input-wrap']}>
               <input type="text" placeholder="请输入短信验证码" onChange={(e)=>{this.setState({sCode:e.target.value})}}/>
               <div className={this.state.bCodeSuccess ? Css['btn-code'] + ' ' + Css['success'] : Css['btn-code']} onClick={this.getCode.bind(this)}>{this.state.sCodeText}</div>
             </div>
           </div>
           <div className={Css['btn-con']}>
             <div className={Css['btn-save']} onClick={this.submitData.bind(this)}>立即绑定</div>
           </div>
         </div>
        </div>
    )
  }
}
export default connect((state)=>{
  return {
    state:state
  }
})(MobileIndex);
