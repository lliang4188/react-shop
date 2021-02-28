import React from 'react';
import {connect} from 'react-redux';

import SubHeader from "../../../components/header/subheader";
import Css from '../../../assets/css/home/balance/index.css';
import { safeAuth } from '../../../assets/js/utils/util';
import config from "../../../assets/js/conf/config";

class BalanceIndex extends React.Component {

  constructor(props){
    super(props);
    safeAuth(props);
  }
  pushPage(url){
    this.props.history.push(config.path+ url)
  }

  render() {
    return (
        <div className={Css['page']}>
          <SubHeader title="确认订单"></SubHeader>
          <div className={Css['main']}>
            <div className={Css['address-wrap']} onClick={this.pushPage.bind(this,'address/index')}>
              <div className={Css['receiver']}>
                <span>收货人：username</span>
                <span>13800000000</span>
              </div>
              <div className={Css['address']}>详细地址详细地址详细地址详细地址详细地址详细地址详细地址详细地址详细地址详细地址详细地址详细地址</div>
              <div className={Css['arrow']}></div>
            </div>
            <div className={Css['address-line']}></div>
            <div className={Css['goods-wrap']}>
              {
                this.props.state.cart.aCartData.length > 0 ?
                  this.props.state.cart.aCartData.map((item, index) => {
                    return (
                      item.checked ?
                        <div key={index} className={Css['goods-list']}>
                          <div className={Css['image']}>
                            <img src={item.img} alt={item.title}/>
                          </div>
                          <div className={Css['goods-param']}>
                            <div className={Css['title']}>{item.title}</div>
                            <div className={Css['attr']}>
                              {
                                item.attrs.length > 0 ?
                                  item.attrs.map((item2, index2) => {
                                    return (
                                      <span key={index2}>{item2.title}：{
                                        item2.param.length>0 ?
                                          item2.param.map((item3, index3)=>{
                                            return (
                                              <React.Fragment key={index3}>{item3.title}</React.Fragment>
                                            )
                                          })
                                          :''
                                      }</span>
                                    )}
                                  )
                                  :''
                              }

                            </div>
                            <div className={Css['amount']}>x {item.amount}</div>
                            <div className={Css['price']}>&yen;{item.price}</div>
                          </div>
                        </div>
                      : ''
                    )
                  })
                  : ''
              }


            </div>
            <div className={Css['total-wrap']}>
              <span>商品总额</span>
              <span>&yen;{this.props.state.cart.total}</span>
            </div>
            <div className={Css['total-wrap']}>
              <span>运费</span>
              <span>&yen;{this.props.state.cart.freight}</span>
            </div>
          </div>
          <div className={Css['balance-wrap']}>
            <div className={Css['price-wrap']}>
              <span>实际金额：</span>
              <span>&yen;{parseFloat(this.props.state.cart.total + this.props.state.cart.freight).toFixed(2)}</span>
            </div>
            <div className={Css['btn-balance']}>提交订单</div>
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
