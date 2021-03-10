import React from 'react';
import config from "../../../assets/js/conf/config";
import {request} from "../../../assets/js/libs/request";
import { connect } from 'react-redux';
import { Modal, Toast  } from 'antd-mobile';
import Css from '../../../assets/css/user/myorder/order.css';
import {lazyImg, localParam} from "../../../assets/js/utils/util";
import UpRefresh from '../../../assets/js/libs/uprefresh';


class OrderPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: localParam(this.props.location.search).search.status ? localParam(this.props.location.search).search.status : '',
      aOrder:[],
      itemTotal: 0
    };
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
    let sUrl= config.baseUrl+ '/api/user/myorder/index?uid='+ this.props.state.user.uid +'& status=' + this.state.status + '&token='+ config.token +'&page='+this.curPage;
    request(sUrl).then(res=>{
      if (res.code === 200) {
        this.maxPage=res.pageinfo.pagenum;
        this.setState({aOrder: res.data},()=>{
          lazyImg();
          this.getScrollPage();
        });

      }
    })
  }
  getScrollPage(){
    this.oUpRefresh = new UpRefresh({'curPage': this.curPage, 'maxPage':this.maxPage, 'offsetBottom': this.offsetBottom},curPage =>{
      let url = config.baseUrl+ '/api/user/myorder/index?uid='+ this.props.state.user.uid +'& status=' + this.state.status + '&token='+ config.token +'&page='+curPage;
      request(url).then(res => {
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
  // 取消订单
  cancelOrder(ordernum, index){
    Modal.alert('','确认要取消订单吗？',[
      { text: '取消', onPress: () => {}, style: 'default' },
      { text: '确定', onPress:() =>{
          let sUrl=config.baseUrl+'/api/user/myorder/clearorder?uid='+this.props.state.user.uid+'&ordernum='+ordernum+'&token='+config.token;
          request(sUrl).then(res=>{
             let aOrder = this.state.aOrder;
             aOrder.splice(index,1);
             this.setState({aOrder:aOrder});
           })
        }}
    ]);
  }
  // 确认收货
  firmOrder(ordernum, index){
    let sUrl = config.baseUrl+'/api/user/myorder/finalorder?uid='+ this.props.state.user.uid +'&ordernum='+ ordernum +'&token='+config.token;
    request(sUrl).then(res =>{
      if (res.code === 200){
       let aOrder = this.state.aOrder;
        aOrder[index].status = 2;
        this.setState({aOrder:aOrder});
      }
      Toast.info(res.data, 2);
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
                              <img src={require("../../../assets/images/common/lazyImg.jpg")} data-echo={item2.image} alt={item2.title}/>
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
                          <div className={item.status=== '0' ? Css['btn-status'] + ' ' + Css['btn-gray'] : Css['btn-status']} onClick={item.status==='0' ? this.cancelOrder.bind(this, item.ordernum, index) : item.status==='1' ? this.firmOrder.bind(this, item.ordernum, index): ()=>{}}>{ item.status === '0' ? '取消订单' : item.status === '1' ? '确认收货' : ''  }</div>
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
