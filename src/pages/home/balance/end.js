import React from 'react';
import {connect} from 'react-redux';
import Css from '../../../assets/css/home/balance/index.css';
import { safeAuth } from '../../../assets/js/utils/util';
import config from "../../../assets/js/conf/config";
import {request} from "../../../assets/js/libs/request";
import SubHeader from "../../../components/header/subheader";


class BalanceEnd extends React.Component {
  pushPage (url) {
    this.props.history.push(config.path + url);
  }
  constructor(props){
    super(props);
    safeAuth(props);
    this.state={
      aOrderNum: ''
    }
  }

  componentDidMount() {
    this.getOrderNum();
  }
  // 获取订单编号
  getOrderNum(){
    let sUrl = config.baseUrl + '/api/order/lastordernum?uid='+ this.props.state.user.uid +'&token=' +config.token;
    request(sUrl).then(res =>{
      if (res.code === 200){
        this.setState({aOrderNum:res.data.ordernum})
      }
    })
  }
  componentWillUnmount() {
    this.setState = (state,callback) => {
      return;
    }
  }
  render() {
    return (
        <div className={Css['page']}>
          <SubHeader title="订单结束"></SubHeader>
          <div className={Css['main']}>
            <div className={Css['order-end']}>
              <div className={Css['success-text']}>下单成功！</div>
              <div className={Css['order-text']}>订单编号：{this.state.aOrderNum}</div>
              <div className={Css['view']} onClick={this.pushPage.bind(this, 'myorder/order?status = all')}>查看订单</div>
              <div className={Css['btn-pay']}>去付款</div>
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
})(BalanceEnd);
