import React from 'react';
import config from "../../../assets/js/conf/config";
import { connect } from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import asyncComponent from "../../../components/async/AsyncComponent";
import SubHeader from "../../../components/header/subheader";
import Css from '../../../assets/css/user/myorder/index.css';
import NavsComponent from '../../../components/navs/navs';
import {localParam, safeAuth} from "../../../assets/js/utils/util";

const OrderPage = asyncComponent(()=>import('./order'));
const ReviewPage = asyncComponent(()=>import('./review'));

class MyOrder extends React.Component {
  constructor(props) {
    super(props);
    safeAuth(props);
    this.state={
      status: localParam(this.props.location.search).search.status ? localParam(this.props.location.search).search.status : '',
      title: ''
    }
  }
  componentDidMount() {
    this.getTile();
  }
  UNSAFE_componentWillReceiveProps(newProps) {
    this.setState({status: localParam(newProps.location.search).search.status},()=>{
      this.getTile();
    })
  }

  componentWillUnmount() {
    this.setState = (state,callback) => {
      return;
    }
  }
  getTile(){
    switch (this.state.status) {
        case 'all':
          this.setState({title: '全部订单'});
          break;
      case '0' :
        this.setState({title: '待付款'});
        break;
      case '1' :
        this.setState({title: '待收货'});
        break;
      case '2' :
        this.setState({title: '待评价'});
        break;
      default:
        this.setState({title: '全部订单'});
    }
  }

  render() {
    return (
        <div className={Css['order-page']}>
         <SubHeader title={this.state.title}></SubHeader>
         <NavsComponent></NavsComponent>
         <div className={Css['order-main']}>
            <Switch>
              <Route path={config.path+'myorder/order'} component={OrderPage}></Route>
              <Route path={config.path+'myorder/review'} component={ReviewPage}></Route>
            </Switch>
         </div>
        </div>
    )
  }
}
export default connect((state)=>{
  return {
    state:state
  }
})(MyOrder);
