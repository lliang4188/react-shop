import React from 'react';
import {connect} from 'react-redux';
import { Toast } from "antd-mobile";
import Css from '../../../assets/css/home/balance/index.css';
import { safeAuth } from '../../../assets/js/utils/util';
import config from "../../../assets/js/conf/config";
import {request} from "../../../assets/js/libs/request";
import SubHeader from "../../../components/header/subheader";


class BalanceIndex extends React.Component {

  constructor(props){
    super(props);
    safeAuth(props);
    this.state={
      sName: '',
      sCellphone: '',
      sProvince: '',
      sCity: '',
      sArea: '',
      sAddress:''
    }
    this.bSubmit = true;
  }

  componentDidMount() {
    if (sessionStorage['addressId'] !== undefined) {
      this.getSelectAddress();
    } else {
      this.getDefaultAddress();
    }
  }

  replacePage(url){
    this.props.history.replace(config.path+ url)
  }
  // 获取选择收货地址
  getSelectAddress (){
    if(sessionStorage['addressId'] !== undefined){
      let sUrl = config.baseUrl + '/api/user/address/info?uid=' + this.props.state.user.uid + '&aid=' + sessionStorage['addressId'] + '&token=' +config.token;
      request(sUrl).then(res=>{
        if(res.code === 200){
          this.setState({
            sName:res.data.name,
            sCellphone:res.data.cellphone,
            sProvince:res.data.province,
            sCity: res.data.city,
            sArea: res.data.area,
            sAddress: res.data.address
          })
        }
      })
    }
  }
  // 获取默认收货地址
  getDefaultAddress (){
    let sUrl = config.baseUrl +'/api/user/address/defaultAddress?uid='+ this.props.state.user.uid +'&token='+config.token;
    request(sUrl).then(res =>{
      if (res.code === 200) {
        localStorage['addressId'] = res.data.aid;
        this.setState({
          sName:res.data.name,
          sCellphone:res.data.cellphone,
          sProvince:res.data.province,
          sCity: res.data.city,
          sArea: res.data.area,
          sAddress: res.data.address
        })
      }
    })
  }
  // 提交订单
  submitOrder(){
    let sAddressId = sessionStorage['addressId'] || localStorage['addressId'];
    if (sAddressId !== undefined){
      if (this.props.state.cart.total > 0) {
        if(this.bSubmit) {
          let sUrl = config.baseUrl + '/api/order/add?token=' +config.token;
          let sAddressId = sessionStorage['addressId'] || localStorage['addressId'];
          let jData = {
            uid: this.props.state.user.uid,
            freight: this.props.state.cart.freight,
            addsid: sAddressId,
            goodsData: JSON.stringify(this.props.state.cart.aCartData)
          }
          request(sUrl, 'post', jData).then(res=>{
             if (res.code===200){
               this.props.history.push(config.path+ 'balance/end')
             }
          })
        }

      } else {
        Toast.info('您的购物车还没有商品', 2);
      }
    } else {
      Toast.info('请选择收货地址', 2);
    }
  }
  componentWillUnmount() {
    this.setState = (state,callback) => {
      return;
    }
  }
  render() {
    return (
        <div className={Css['page']}>
          <SubHeader title="确认订单"></SubHeader>
          <div className={Css['main']}>
            <div className={Css['address-wrap']} onClick={this.replacePage.bind(this,'address/index')}>
              {
                sessionStorage['addressId'] !== undefined || localStorage['addressId'] !== undefined ?
                    <React.Fragment>
                      <div className={Css['receiver']}>
                        <span>收货人：{ this.state.sName }</span>
                        <span>{this.state.sCellphone}</span>
                      </div>
                      <div className={Css['address']}>{this.state.sProvince + this.state.sCity + this.state.sArea + this.state.sAddress}</div>
                    </React.Fragment>
                    :
                    <div className={Css['address-none']}>您的收货地址为空，点击添加收货地址</div>
              }
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
            <div className={Css['btn-balance']} onClick={this.submitOrder.bind(this)}>提交订单</div>
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
