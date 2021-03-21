import React from 'react';
import config from "../../../assets/js/conf/config";
import { connect } from 'react-redux';
// import action from '../../../actions';
import SubHeader from "../../../components/header/subheader";
import { Toast } from 'antd-mobile';
import Css from '../../../assets/css/user/mobile/index.css';
import {request} from '../../../assets/js/libs/request';
class ModpwdIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
      sPassword: ''
    };
    this.bSubmit = true;
  }
  componentDidMount() {
  }
  componentWillUnmount() {
    this.setState = (state,callback) => {
      return;
    }
  }

  // 点击注册按钮数据
submitData(){
    if(this.state.sPassword.match(/^\s*$/)) {
      Toast.info('请输入密码',2);
      return false;
    }
  if(this.state.sPassword.length < 6) {
    Toast.info('请输入不小于6位的密码',2);
    return false;
  }
    if (this.bSubmit){
      this.bSubmit = false;
      let sUrl = config.baseUrl + '/api/user/myinfo/modpwd?token='+config.token;
      request(sUrl, 'post',{  uid:this.props.state.user.uid,password:this.state.sPassword,}).then(res=>{
        if(res.code===200){
          Toast.info('修改成功！', 2,()=>{
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
         <SubHeader title="修改密码"></SubHeader>
         <div className={Css['mobile-main']}>

           <div className={Css['input-con']}>
             <div className={Css['password-item']}>
               <div className={Css['password-input']}>
                 <form>
                   <input type={this.state.isChecked ? 'text' : 'password'} placeholder="请输入不小于6位的密码" onChange={(e) => {
                     this.setState({sPassword: e.target.value})
                   }} autoComplete="off"/>
                 </form>
               </div>
               <div className={this.state.isChecked ? Css['eyes'] + ' ' + Css['open'] : Css['eyes']} onClick={() => {
                 this.setState({isChecked: !this.state.isChecked})
               }}></div>
             </div>
           </div>
           <div className={Css['btn-con']}>
             <div className={Css['btn-save']} onClick={this.submitData.bind(this)}>确定</div>
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
})(ModpwdIndex);
