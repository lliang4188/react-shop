import React from 'react';
import SubHeader from "../../../components/header/subheader";
import Css from '../../../assets/css/home/login/index.css';
import config from "../../../assets/js/conf/config";
export default class LoginIndex extends React.Component {
  goPage(url){
    this.props.history.push(config.path + url);
  }
  render() {
    return (
        <div className={Css['login-page']}>
          <SubHeader title="会员登录"></SubHeader>
          <div onClick={this.goPage.bind(this, 'reg/index')}>会员注册</div>
        </div>
    )
  }
}
