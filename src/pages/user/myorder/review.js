import React from 'react';
import config from "../../../assets/js/conf/config";
import {request} from "../../../assets/js/libs/request";
import { connect } from 'react-redux';
import Css from '../../../assets/css/user/myorder/order.css';
import {lazyImg, setScrollTop} from "../../../assets/js/utils/util";
import UpRefresh from '../../../assets/js/libs/uprefresh';

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
    setScrollTop();
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
        this.setState({aOrder:res.data},()=>{
          lazyImg();
          this.getScrollPage();
        });
      }
    })
  }
  getScrollPage(){
    this.oUpRefresh = new UpRefresh({'curPage': this.curPage, 'maxPage':this.maxPage, 'offsetBottom': this.offsetBottom},curPage =>{
      let sUrl = config.baseUrl + '/api/user/myorder/reviewOrder?uid='+ this.props.state.user.uid +'&page='+ this.curPage  +'&token=' + config.token;
      request(sUrl).then(res => {
        if (res.code === 200) {
          if (res.data.length > 0) {
            let aOrder = this.state.aOrder;
            for(let i=0; i<aOrder.length; i++){
              aOrder.push(res.data[i]);
            }
            this.setState({aOrder:aOrder}, ()=>{
              lazyImg();
            });
          }
        }
      })
    });
  }
  pushPage(url) {
    console.log(url);
    this.props.history.push(config.path + url);
  }

  render() {
    return (
        <React.Fragment>
          {
            this.state.aOrder.length > 0 ?
              this.state.aOrder.map((item, index)=>{
                return (
                    <div className={Css['order-list']} key={index} >
                      <div className={Css['number-wrap']}>
                        <span className={Css['number']}>订单编号：{item.ordernum}</span>
                        <span className={Css['status']}>{item.status === '0' ? '待付款' : item.status === '1' ? '确认收货': '' }</span>
                      </div>
                      {
                        item.goods.length> 0 ?
                            item.goods.map((item2, index2)=>{
                              return (
                                  <div className={Css['list-wrap']} onClick={this.pushPage.bind(this,'goods/details/item?gid='+item2.gid)} key={index2}>
                                    <div className={Css['item-wrap']} >
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
                                        <div className={Css['btn-status']} onClick={(e)=>{e.stopPropagation(); this.pushPage('order/add_review?gid='+item2.gid+'&ordernum='+ item.ordernum)}}>{item2.isreview === '0' ? '评价' : '追加评价'}</div>
                                      </div>
                                    </div>
                                  </div>

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
