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
      sPassword:''
    };
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

  // 点击登录
submitData(){
    if(this.state.sCellphone.match(/^\s*$/)) {
      Toast.info('请输入手机号',2);
      return false;
    }
    if(!this.state.sCellphone.match(/^1[3-9][0-9]{9}/)){
      Toast.info('请输入正确的手机号',2);
      return false;
    }
    if(this.state.sPassword.match(/^\s*$/)) {
      Toast.info('请输入密码',2);
      return false;
    }
    let sUrl = config.baseUrl + 'api/home/user/pwdlogin?token='+config.token;
    request(sUrl, 'post',{cellphone:this.state.sCellphone, password:this.state.sPassword}).then(res=>{
      console.log(res);
      if(res.code===200){

      } else {
        Toast.info(res.data,2);
      }
    })
  }
  pushPage(url){
    this.props.history.push(config.path+ url)
  }
  render() {
    return (
      <div className={Css['reg-page']}>
        <SubHeader title="会员登录"></SubHeader>
        <div className={Css['main']}>
          <div className={Css['main-list']}>
            <div className={Css['input-wrap']}>
              <input type="tel" placeholder="请输入手机号" onChange={(e) => {this.checkCellphone(e)}}/>
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
          <div className={Css['btn-sure']} onClick={this.submitData.bind(this)}>登录</div>
          <div className={Css['fast-wrap']}>
            <div className={Css['btn-forget']}>忘记密码</div>
            <div className={Css['quick-reg']} onClick={this.pushPage.bind(this,'reg/index')}>快速注册</div>
          </div>
        </div>
      </div>
    )
  }
}
