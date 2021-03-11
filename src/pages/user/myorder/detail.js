import React from 'react';
import config from "../../../assets/js/conf/config";
import { connect } from 'react-redux';
import SubHeader from "../../../components/header/subheader";
import Css from '../../../assets/css/user/myorder/detail.css';
import {localParam, safeAuth, setScrollTop} from "../../../assets/js/utils/util";
import {request} from "../../../assets/js/libs/request";


class OrderDetail extends React.Component {
  constructor(props) {
    super(props);
    safeAuth(props);
    this.state={
      ordernum:props.location.search ? localParam(props.location.search).search.ordernum : '',
      name: '',
      cellphone: '',
      orderNum: '',
      province: '',
      city: '',
      area: '',
      address: '',
      status: '',
      freight: 0,
      total: 0,
      trueTotal: 0,
      orderTime: '',
      goods: []
    }
  }
  componentDidMount() {
    setScrollTop();
    this.getData();
  }

  componentWillUnmount() {
    this.setState = (state,callback) => {
      return;
    }
  }

  getData (){
    let sUrl = config.baseUrl + '/api/user/myorder/desc?uid='+ this.props.state.user.uid +'&ordernum='+ this.state.ordernum +'&token=' +config.token;
    request(sUrl).then(res => {
      if (res.code === 200) {
        this.setState({
          name: res.data.name,
          cellphone: res.data.cellphone,
          orderNum: res.data.ordernum,
          province: res.data.province,
          city: res.data.city,
          area: res.data.area,
          address: res.data.address,
          status: res.status,
          freight: res.data.freight,
          total: res.data.total,
          trueTotal: res.data.truetotal,
          orderTime: res.data.ordertime,
          goods: res.data.goods
        })
      }
    });
  }
  pushPage(url){
    console.log(url);
    this.props.history.push(config.path + url);
  }



  render() {
    return (
        <div className={Css['detail-page']}>
         <SubHeader title="订单详情"></SubHeader>
         <div className={Css['detail-main']}>
           <div className={Css['order-num']}>订单编号：{this.state.orderNum}</div>
           <div className={Css['address-wrap']}>
              <div className={Css['address-info']}>
                <span className={Css['name']}>{this.state.name}</span>
                <span className={Css['cellphone']}>{this.state.cellphone}</span>
              </div>
              <p className={Css['address']}>{this.state.province + this.state.city + this.state.area + this.state.address}</p>
           </div>
           <h2 className={Css['buy-title']}>购买的宝贝</h2>
           {
             this.state.goods.length>0 ?
                 this.state.goods.map((item, index) =>{
                   return (
                       <div className={Css['goods-list']} key={index} onClick={this.pushPage.bind(this, 'goods/details/item?gid='+item.gid)}>
                         <div className={Css['image']}>
                           <img src={item.image} alt={item.title}/>
                         </div>
                         <div className={Css['info-wrap']}>
                           <div className={Css['title-wrap']}>
                             <h4 className={Css['title']}>{item.title}</h4>

                             <p className={Css['attr']}>
                               <span>x {item.amount}</span>
                               {
                                 item.param.length> 0 ?
                                     item.param.map((item2, index2) => {
                                       return (
                                           <span key={index2}>{item2.title}：{item2.attrid}</span>
                                       )
                                     })
                                     :''
                               }
                               </p>
                           </div>
                           <div className={Css['price']}>&yen;{item.price}</div>
                         </div>

                       </div>
                   )
                 })
                 :''
           }

           <div className={Css['order-status']}>
             <span>支付状态</span>
             <span>{this.state.status  === 0 ? '待付款' : this.state.status  === 1 ? '待收货' : this.state.status  === 2 ? '已收货': ''}</span>
           </div>
           <div className={Css['total-wrap']}>
             <div className={Css['total-item']}>
               <span>商品总额</span>
               <span>&yen;{this.state.total}</span>
             </div>
             <div className={Css['total-item']}>
               <span>+运费</span>
               <span className={this.state.freight === 0 ? Css['free']: ''}>{this.state.freight === 0 ? '免运费' : '￥' +this.state.freight  }</span>
             </div>
           </div>
           <div className={Css['total-bar']}>
             <p>实付金额：<span className={Css['price']}>&yen;{this.state.trueTotal}</span></p>
             <p className={Css['time']}>下单时间：{this.state.orderTime}</p>
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
