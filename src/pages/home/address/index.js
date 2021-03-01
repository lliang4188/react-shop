import React from 'react';
import config from "../../../assets/js/conf/config";
import { connect } from 'react-redux';
import SubHeader from "../../../components/header/subheader";
import {request} from '../../../assets/js/libs/request';
import Css from  '../../../assets/css/home/address/index.css';
import { safeAuth } from '../../../assets/js/utils/util';
class AddressIndex extends React.Component {
  constructor(props) {
    super(props);
   safeAuth(props);
  }
  pushPage(url){
    this.props.history.push(config.path+ url)
  }
  render() {
    return (
        <div className={Css['main']}>
          <SubHeader title="选择收获地址"></SubHeader>
          <div className={Css['address-nav']}>
            <div>配送地址</div>
            <div onClick={this.pushPage.bind(this,'address/add')}>+添加收获地址</div>
          </div>
          <div className={Css['address-list']}>
            <div className={Css['address-info-wrap']}>
              <div className={Css['check-mark']}></div>
              <div className={Css['info-wrap']}>
                <div className={Css['person']}>
                  <span>username</span>
                  <span>13684959262</span>
                </div>
                <div className={Css['address']}>
                  <span className={Css['default']}>默认</span>
                  <span>天津市天津市和平区街道详细地址天津市天津市和平区街道详细地址</span>
                </div>
              </div>
            </div>
            <div className={Css['handle-wrap']}>
              <div className={Css['edit']}></div>
              <div className={Css['del']}></div>
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
})(AddressIndex);
