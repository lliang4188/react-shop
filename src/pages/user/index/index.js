import React from 'react';
import config from "../../../assets/js/conf/config";
import { connect } from 'react-redux';
import action from '../../../actions';
import {request} from '../../../assets/js/libs/request';
import { safeAuth } from '../../../assets/js/utils/util';
class UserIndex extends React.Component {
  constructor(props) {
    super(props);
   safeAuth(props);
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
        <div>
          <p>昵称：{this.props.state.user.nickname}</p>
          <button type="button" onClick={this.outLogin.bind(this)}>安全退出</button>
        </div>
    )
  }
}
export default connect((state)=>{
  return {
    state:state
  }
})(UserIndex);
