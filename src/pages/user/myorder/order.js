import React from 'react';
import config from "../../../assets/js/conf/config";
import {request} from "../../../assets/js/libs/request";
import { connect } from 'react-redux';
import Css from '../../../assets/css/user/myorder/order.css';
import {localParam} from "../../../assets/js/utils/util";


class OrderPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: localParam(this.props.location.search).search.status ? localParam(this.props.location.search).search.status : '',
      aOrder:[]
    }
  }
  componentDidMount() {
    this.getData();
  }
  getData(){
    let sUrl= config.baseUrl+ '/api/user/myorder/index?uid='+ this.props.state.user.uid +'& status=' + this.state.status + '&token='+ config.token +'&page=1';
    request(sUrl).then(res=>{
      console.log(res);
      if (res.code === 200) {
        this.setState({aOrder: res.data});
      }
    })
  }

  render() {
    return (
        <React.Fragment>
          {
            this.state.aOrder.length > 0 ?
              this.state.aOrder.map((item, index) =>{
                return (
                  <div className={Css['order-list']} key={index}>
                    <div className={Css['number-wrap']}>
                      <span className={Css['number']}>订单编号：{item.ordernum}</span>
                      <span className={Css['status']}>{item.status === '0' ? '待付款' : item.status === '1' ? '确认收货': '' }</span>
                    </div>
                    {
                      item.goods.length > 0 ?
                        item.goods.map((item2, index2) => {
                          return (
                          <div className={Css['item-wrap']} key={index2}>
                            <div className={Css['image']}>
                              <img src={item2.image} alt={item2.title}/>
                            </div>
                            <div className={Css['info-con']}>
                              <h4 className={Css['title']}>{item2.title} </h4>
                              <span className={Css['amount']}>x {item2.amount}</span>
                            </div>
                          </div>
                          )
                        })
                        :''
                    }

                    <div className={Css['total-wrap']}>
                      <span className={Css['total']}>实付金额：<strong className={Css['price']}>&yen;{item.total}</strong></span>
                      <div className={Css['status-wrap']}>
                        { item.status !== '2' ?
                          <div className={Css['btn-status']}>{ item.status === '0' ? '取消订单' : item.status === '1' ? '确认收货' : ''  }</div>
                          : ''

                        }
                      </div>
                    </div>
                  </div>
                )
              })
              :''
          }

        </React.Fragment>
    )
  }
}
export default connect((state)=>{
  return {
    state:state
  }
})(OrderPage);
