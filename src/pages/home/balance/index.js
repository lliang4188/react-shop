import React from 'react';
import {connect} from 'react-redux';
import SubHeader from "../../../components/header/subheader";
import Css from '../../../assets/css/home/balance/index.css';

class BalanceIndex extends React.Component {
  render() {
    return (
        <div className={Css['page']}>
          <SubHeader title="确认订单"></SubHeader>
          <div className={Css['main']}>
            <div className={Css['address-wrap']}>
              <div className={Css['receiver']}>
                <span>收货人：username</span>
                <span>13800000000</span>
              </div>
              <div className={Css['address']}>详细地址详细地址详细地址详细地址详细地址详细地址详细地址详细地址详细地址详细地址详细地址详细地址</div>
              <div className={Css['arrow']}></div>
            </div>
            <div className={Css['address-line']}></div>
          </div>
        </div>
    )
  }
}

export default connect((state)=>{
  return {
    state:state
  }
})(BalanceIndex);