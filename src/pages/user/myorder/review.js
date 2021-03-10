import React from 'react';
import config from "../../../assets/js/conf/config";
import {request} from "../../../assets/js/libs/request";
import { connect } from 'react-redux';
import Css from '../../../assets/css/user/myorder/order.css';


class ReviewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aOrder:[]
    }
    this.oUpRefresh= null;
    this.curPage= 1;
    this.maxPage = 0;
    this.offsetBottom = 100;
  }
  componentDidMount() {
    this.getData();
  }

  componentWillUnmount() {
    this.oUpRefresh = null;
    this.setState = (state,callback) => {
      return;
    }
  }

  getData(){
    let sUrl = config.baseUrl + '/api/user/myorder/reviewOrder?uid='+ this.props.state.user.uid +'&page='+ this.curPage  +'&token=' + config.token;
    request(sUrl).then(res => {
      console.log(res);
      if (res.code === 200) {
        this.setState({aOrder:res.data});
      }
    })

  }


  render() {
    return (
        <React.Fragment>
          {
            this.state.aOrder.length > 0 ?
              this.state.aOrder.map((item, index)=>{
                return (
                    <div className={Css['order-list']} key={index}>
                      <div className={Css['number-wrap']}>
                        <span className={Css['number']}>订单编号：{item.ordernum}</span>
                        <span className={Css['status']}>{item.status === '0' ? '待付款' : item.status === '1' ? '确认收货': '' }</span>
                      </div>
                      {
                        item.goods.length> 0 ?
                            item.goods.map((item2, index2)=>{
                              return (
                                  <React.Fragment key={index2}>
                                    <div className={Css['item-wrap']}>
                                      <div className={Css['image']}>
                                        <img src={require("../../../assets/images/common/lazyImg.jpg")} data-echo={item2.image} alt={item2.title}/>
                                      </div>
                                      <div className={Css['info-con']}>
                                        <h4 className={Css['title']}>{item2.title}</h4>
                                        <span className={Css['amount']+ ' ' + Css['review-amount']}>x {item2.amount}</span>
                                      </div>
                                    </div>
                                    <div className={Css['total-wrap'] + ' ' + Css['review-wrap']}>
                                      <div className={Css['status-wrap']}>
                                        <div className={Css['btn-status']}>{item2.isreview === '0' ? '评价' : '追加评价'}</div>
                                      </div>
                                    </div>
                                  </React.Fragment>

                              )
                            })
                            :''
                      }


                    </div>
                )
              })
                : ''
          }

        </React.Fragment>
    )
  }
}
export default connect((state)=>{
  return {
    state:state
  }
})(ReviewPage);
