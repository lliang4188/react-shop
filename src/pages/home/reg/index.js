import React from 'react';
import config from "../../../assets/js/conf/config";
import {request} from "../../../assets/js/libs/request";
import SubHeader from "../../../components/header/subheader";
import { Toast } from 'antd-mobile';
import Css from '../../../assets/css/home/reg/index.css';
export default class RegIndex extends React.Component {
  constructor() {
    super();
    this.state= {
      isChecked: false,
      sCellphone: '',
      bCodeSuccess: false,
      sCodeText: '获取短信验证码',
      sCode: '',
      sPassword:''
    }
    this.timer = null;
    this.bSendCode = true;
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
  getCode(){
    if(this.bSendCode && this.state.bCodeSuccess) {
      this.bSendCode = false;
      let iTime = 10;
      this.timer= setInterval(() => {
        if(iTime>0){
          iTime--;
          this.setState({sCodeText:'重新发送('+ iTime+'s)', bCodeSuccess:false});
        }else {
          clearInterval(this.timer);
          this.bSendCode = true;
          this.setState({sCodeText:'获取短信验证码', bCodeSuccess:true});
        }
      }, 1000)
    }
  }
  // 点击注册按钮数据
  submitData(){
    if(this.state.sCellphone.match(/^\s*$/)) {
      Toast.info('请输入手机号',2);
      return false;
    }
    if(!this.state.sCellphone.match(/^1[3-9][0-9]{9}/)){
      Toast.info('请输入正确的手机号',2);
      return false;
    }
    this.isSameCellphone((data)=>{
      console.log(this.state.sCellphone);
      console.log(data);
    });
    if(this.state.sCode.match(/^\s*$/)) {
      Toast.info('请输入短信验证码',2);
      return false;
    }
    if(this.state.sPassword.match(/^\s*$/)) {
      Toast.info('请输入密码',2);
      return false;
    }
  }
  // 检测手机号是否注册
  isSameCellphone(callback){
    let sUrl = config.baseUrl+'/api/home/user/isreg?token='+ config.token;
    request(sUrl, 'post',{username:this.state.sCellphone}).then(res =>{
      callback(res);
    })
  }
  render() {
    return (
        <div className={Css['reg-page']}>
          <SubHeader title="会员注册"></SubHeader>
          <div className={Css['main']}>
            <div className={Css['main-list']}>
              <div className={Css['input-wrap']}>
                <input type="tel" placeholder="请输入手机号" onChange={(e) => {this.checkCellphone(e)}} disabled={this.bSendCode ? false : true}/>
              </div>
              <div className={this.state.bCodeSuccess ? Css['btn-code'] + ' ' + Css['success'] : Css['btn-code']} onClick={this.getCode.bind(this)}>{this.state.sCodeText}</div>
            </div>
            <div className={Css['main-list']}>
              <div className={Css['input-wrap']}>
                <input type="text" placeholder="请输入短信验证码" onChange={(e)=>{this.setState({sCode:e.target.value})}}/>
              </div>
            </div>
            <div className={Css['password-item']}>
              <div className={Css['password-input']}>
                <form>
                <input type={this.state.isChecked ? 'text': 'password'} placeholder="请输入密码" onChange={(e)=>{this.setState({sPassword:e.target.value})}} autoComplete="off"/>
                </form>
              </div>
              <div className={this.state.isChecked ? Css['eyes']+ ' ' + Css['open']: Css['eyes']} onClick={()=>{this.setState({isChecked:!this.state.isChecked})}}></div>
            </div>
            <div className={Css['btn-sure']} onClick={this.submitData.bind(this)}>注册</div>
          </div>
        </div>
    )
  }
}
