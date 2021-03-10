import React from 'react';
import config from "../../../assets/js/conf/config";
import { connect } from 'react-redux';
import SubHeader from "../../../components/header/subheader";
import Css from '../../../assets/css/user/myorder/detail.css';
import {localParam, safeAuth} from "../../../assets/js/utils/util";


class OrderDetail extends React.Component {
  constructor(props) {
    super(props);
    safeAuth(props);
    this.state={

    }
  }
  componentDidMount() {

  }


  componentWillUnmount() {
    this.setState = (state,callback) => {
      return;
    }
  }


  render() {
    return (
        <div className={Css['detail-page']}>
         <SubHeader title="订单详情"></SubHeader>
         <div className={Css['detail-main']}>
           <div className={Css['order-num']}>订单编号：123456</div>
           <div className={Css['address-wrap']}>
              <div className={Css['address-info']}>
                <span className={Css['name']}>username</span>
                <span className={Css['cellphone']}>13684959262</span>
              </div>
              <p className={Css['address']}>浙江省杭州市上城区街道详细地址</p>
           </div>
           <h2 className={Css['buy-title']}>购买的宝贝</h2>
           <div className={Css['goods-list']}>
             <div className={Css['image']}></div>
             <div className={Css['info-wrap']}>
               <div className={Css['title-wrap']}>
                 <h4 className={Css['title']}>欧美尖头蝴蝶结拖鞋女夏外穿2018新款绸缎面细跟凉拖半拖鞋穆勒鞋</h4>
                 <p className={Css['attr']}><span>x 1</span><span>颜色： 白色</span><span>尺码： 37</span></p>
               </div>
             </div>
             <div className={Css['price']}>&yen;208</div>
           </div>
           <div className={Css['order-status']}>
             <span>支付状态</span>
             <span>待付款</span>
           </div>
           <div className={Css['total-wrap']}>
             <div className={Css['total-item']}>
               <span>商品总额</span>
               <span>&yen;25.5</span>
             </div>
             <div className={Css['total-item']}>
               <span>+运费</span>
               <span>&yen;10</span>
             </div>
           </div>
           <div className={Css['total-bar']}>
             <p>实付金额：<span className={Css['price']}>&yen;35.5</span></p>
             <p className={Css['time']}>下单时间：2021-03-10 22:06:14</p>
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
})(OrderDetail);
