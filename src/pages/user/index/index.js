import React from 'react';
import config from "../../../assets/js/conf/config";
import { connect } from 'react-redux';
import action from '../../../actions';
import SubHeader from "../../../components/header/subheader";
import Css from '../../../assets/css/user/my/index.css';
import {request} from '../../../assets/js/libs/request';
class UserIndex extends React.Component {
  constructor(props) {
    super(props);
  }
  // 退出
  outLogin(){
    let sUrl = config.baseUrl + 'api/home/user/safeout?token='+config.token;
    request(sUrl, 'post', {uid: this.props.state.user.uid}).then(res => {
      console.log(res);
    })
    this.props.dispatch(action.user.outLogin());
    this.props.dispatch(action.cart.clearCart());
    this.props.history.replace(config.path+ 'login/index');
  }
  render() {
    return (
        <div className={Css['my-page']}>
         <SubHeader title="会员中心"></SubHeader>
          <div className={Css['user-info-wrap']}>
            <div className={Css['head']}>
              <img src={require('../../../assets/images/common/pic_head.png')} alt=""/>
            </div>
            <div className={Css['head-info']}>
              <p>昵称</p>
              <p>我的积分：0</p>
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
})(UserIndex);
