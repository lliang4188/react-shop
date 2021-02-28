import React from 'react';
import config from "../../../assets/js/conf/config";
import { connect } from 'react-redux';
import SubHeader from "../../../components/header/subheader";
import {request} from '../../../assets/js/libs/request';
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
        <div>
          <SubHeader title="选择收获地址"></SubHeader>
          <button type="button" style={{marginTop:'1rem'}} onClick={this.pushPage.bind(this,'address/add')}>添加收货地址</button>
        </div>
    )
  }
}
export default connect((state)=>{
  return {
    state:state
  }
})(AddressIndex);
