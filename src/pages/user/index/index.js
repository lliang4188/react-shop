import React from 'react';
import config from "../../../assets/js/conf/config";
import { connect } from 'react-redux';
import action from '../../../actions';
import SubHeader from "../../../components/header/subheader";
import { Modal} from 'antd-mobile';
import Css from '../../../assets/css/user/my/index.css';
import {request} from '../../../assets/js/libs/request';
class UserIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sHead: require('../../../assets/images/common/pic_head.png'),
      sNickname: '昵称',
      sPoint: 0,
      sBtnText: '登录/注册'

    }
  }
  componentDidMount() {
    this.getUserInfo();
  }

  // 退出
  outLogin(){
    if (this.props.state.user.isLogin===true){
      Modal.alert('','确认要退出吗？',[
        { text: '取消', onPress: () => {}, style: 'default' },
        { text: '确定', onPress:() =>{
            let sUrl = config.baseUrl + 'api/home/user/safeout?token='+config.token;
            request(sUrl, 'post', {uid: this.props.state.user.uid}).then(res => {
              if (res.code === 200){
                this.props.dispatch(action.user.outLogin());
                this.props.dispatch(action.cart.clearCart());
                this.props.history.replace(config.path+ 'login/index');
              }
            })

          }}
      ]);

    } else {
      this.props.history.replace(config.path+ 'login/index');
    }
  }
  pushPage(url){
    this.props.history.push(config.path+url);
  }
  // 获取会员信息
  getUserInfo(){
    if (this.props.state.user.isLogin===true){
      let sUrl = config.baseUrl +'/api/user/myinfo/userinfo/uid='+ this.props.state.user.uid +'?token=' + config.token;
      request(sUrl).then(res=>{
        if( res.code === 200){
          this.setState({
            sHead: res.data.head !=='' ? res.data.head : this.state.sHead,
            sNickname: res.data.nickname,
            sPoint: res.data.points
          })
        }
      })
    }

  }

  render() {
    return (
        <div className={Css['my-page']}>
         <SubHeader title="会员中心"></SubHeader>
          <div className={Css['user-info-wrap']}>
            <div className={Css['head']}>
              <img src={this.state.sHead} alt={this.state.sNickname}/>
            </div>
            <div className={Css['head-info']}>
              <p>{this.state.sNickname}</p>
              <p>我的积分：{this.state.sPoint}</p>
            </div>
          </div>
          <div className={Css['order-name-wrap']}>
            <div className={Css['order-name']}>全部订单</div>
            <div className={Css['show-word']} onClick={this.pushPage.bind(this,'myorder/order?status=all')}>查看全部订单 &gt;</div>
          </div>
          <div className={Css['order-status-wrap']}>
            <div className={Css['item']} onClick={this.pushPage.bind(this,'myorder/order?status=0')}>待支付</div>
            <div className={Css['item']} onClick={this.pushPage.bind(this,'myorder/order?status=1')}>待收货</div>
            <div className={Css['item']} onClick={this.pushPage.bind(this,'myorder/order/review?status=2')}>待评价</div>
          </div>
          <div className={Css['menu-list-wrap']}>
            <div className={Css['menu-item']} onClick={this.pushPage.bind(this,'profile/index')}>个人资料</div>
            <div className={Css['menu-item']}>收货地址</div>
            <div className={Css['menu-item']}>绑定手机</div>
            <div className={Css['menu-item']}>修改密码</div>
            <div className={Css['menu-item']}>我的收藏</div>
            <div className={Css['btn']} onClick={this.outLogin.bind(this)}>{this.props.state.user.isLogin === true?'安全退出':'登录/注册'}</div>
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
