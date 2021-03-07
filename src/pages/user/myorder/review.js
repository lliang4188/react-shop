import React from 'react';
import config from "../../../assets/js/conf/config";
import {request} from "../../../assets/js/libs/request";
import { connect } from 'react-redux';
import Css from '../../../assets/css/user/myorder/order.css';


class ReviewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  componentDidMount() {
  }

  render() {
    return (
        <React.Fragment>
          <div className={Css['order-list']}>
            <div className={Css['number-wrap']}>
              <span className={Css['number']}>订单编号：381075582</span>
              <span className={Css['status']}>已收货</span>
            </div>
            <div className={Css['item-wrap']}>
              <div className={Css['image']}>

              </div>
              <div className={Css['info-con']}>
                <h4 className={Css['title']}>雪兰黛2018春季新款高跟鞋尖头细跟性感鞋子女韩版透气纱网女单鞋 </h4>
                <span className={Css['amount']+ ' ' + Css['review-amount']}>x 1</span>
              </div>
            </div>
            <div className={Css['total-wrap'] + ' ' + Css['review-wrap']}>
              <div className={Css['status-wrap']}>
                <div className={Css['btn-status']}>评价</div>
              </div>
            </div>
          </div>
        </React.Fragment>
    )
  }
}
export default connect((state)=>{
  return {
    state:state
  }
})(ReviewPage);
