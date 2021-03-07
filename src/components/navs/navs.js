import React from 'react';
import { withRouter } from 'react-router-dom';
import {localParam} from "../../assets/js/utils/util";
import config from "../../assets/js/conf/config";
import './navs.css';

class NavsComponent extends React.Component{
  constructor(props){
    super(props);
    this.state={
      status: localParam(this.props.location.search).search.status ? localParam(this.props.location.search).search.status : ''
    }
  }
  componentDidMount() {
  }
  UNSAFE_componentWillReceiveProps(newProps) {
      this.setState({status:localParam(newProps.location.search).search.status})
  }

  replacePage = (url)=>{
    this.props.history.replace(config.path+ url);
  };
  render() {
    return(
      <div className="order-nav">
        <div className={ this.state.status === 'all' ? 'nav-ele active' : 'nav-ele'} onClick={this.replacePage.bind(this,'myorder/order?status=all')}>全部订单</div>
        <div className={ this.state.status === '0' ? 'nav-ele active' : 'nav-ele'} onClick={this.replacePage.bind(this, 'myorder/order?status=0')}>待付款</div>
        <div className={ this.state.status === '1' ? 'nav-ele active' : 'nav-ele'} onClick={this.replacePage.bind(this, 'myorder/order?status=1')}>待收货</div>
        <div className={ this.state.status === '2' ? 'nav-ele active' : 'nav-ele'} onClick={this.replacePage.bind(this, 'myorder/review?status=2')}>待评价</div>
      </div>
    )
  }
}
export default withRouter(NavsComponent);
