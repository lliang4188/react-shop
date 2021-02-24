import React from 'react';
import SubHeader from "../../../components/header/subheader";
import Css from '../../../assets/css/home/reg/index.css';
export default class RegIndex extends React.Component {
  constructor() {
    super();
    this.state= {
      isChecked: false
    }
  }
  render() {
    return (
        <div className={Css['reg-page']}>
          <SubHeader title="会员注册"></SubHeader>
          <div className={Css['main']}>
            <div className={Css['main-list']}>
              <div className={Css['input-wrap']}>
                <input type="tel" placeholder="请输入手机号"/>
              </div>
              <div className={Css['btn-code']}>获取短信验证码</div>
            </div>
            <div className={Css['main-list']}>
              <div className={Css['input-wrap']}>
                <input type="text" placeholder="请输入短信验证码"/>
              </div>
            </div>
            <div className={Css['password-item']}>
              <div className={Css['password-input']}>
                <input type={this.state.isChecked ? 'text': 'password'} placeholder="请输入密码"/>
              </div>
              <div className={this.state.isChecked ? Css['eyes']+ ' ' + Css['open']: Css['eyes']} onClick={()=>{this.setState({isChecked:!this.state.isChecked})}}></div>
            </div>
            <div className={Css['btn-sure']}>注册</div>
          </div>

        </div>
    )
  }
}
