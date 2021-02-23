import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import asyncComponent from "../../../components/async/AsyncComponent";
import Css from '../../../assets/css/home/goods/details.css';
import {localParam} from '../../../assets/js/utils/util';
import config from "../../../assets/js/conf/config";

const DetailsItem = asyncComponent(()=> import('./details_item'));
const DetailContent = asyncComponent(()=> import('./details_content'));
const DetailReviews = asyncComponent(()=> import('./details_reviews'));

class GoodsDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      gid:props.location.search !== '' ? localParam(props.location.search).search.gid : '',
      tabStyle: {
        bItem: true,
        bContent: false,
        bReviews: false
      }
    }
  }
  componentDidMount() {
    this.setTypeStyle(this.props);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setTypeStyle(nextProps);
  }

  goBack(){
    this.props.history.goBack();
  }
  replacePage(url) {
    this.props.history.replace(config.path+ url)
  }
  pushPage(url) {
    this.props.history.push(config.path+ url)
  }
  // 设置选项卡切换样式
  setTypeStyle(props){
      switch (props.location.pathname) {
        case config.path+'goods/details/item':
          this.setState({
            tabStyle:{
              bItem: true,
              bContent: false,
              bReviews: false
            }
          });
          break;
        case config.path+'goods/details/content' :
          this.setState({
            tabStyle:{
              bItem: false,
              bContent: true,
              bReviews: false
            }
          });
          break;
        case config.path+'goods/details/reviews' :
          this.setState({
            tabStyle:{
              bItem: false,
              bContent: false,
              bReviews: true
            }
          });
          break;
        default:
          break;
      }

  }
  componentWillUnmount() {
    this.setState = (state,callback) => {
      return;
    }
  }
  render() {
    return (
        <div>
          <div className={Css['detail-header']}>
            <div className={Css['back']} onClick={this.goBack.bind(this)}></div>
            <div className={Css['detail-nav']}>
              <div className={this.state.tabStyle.bItem ? Css['nav-ele'] + ' ' + Css['active'] :  Css['nav-ele']} onClick={this.replacePage.bind(this, 'goods/details/item?gid='+ this.state.gid)}>商品</div>
              <div className={this.state.tabStyle.bContent ? Css['nav-ele'] + ' ' + Css['active'] : Css['nav-ele']} onClick={this.replacePage.bind(this, 'goods/details/content?gid='+ this.state.gid)}>详情</div>
              <div className={this.state.tabStyle.bReviews ? Css['nav-ele'] + ' ' + Css['active'] : Css['nav-ele']} onClick={this.replacePage.bind(this, 'goods/details/reviews?gid='+ this.state.gid)}>评价</div>
            </div>
            <div className={Css['icon-cart']} onClick={this.pushPage.bind(this,'home/cart')} id="cart-icon">
              <div className={this.props.state.cart.aCartData.length>0 ? Css['spot'] :  Css['spot'] + ' hide'}></div>
            </div>
          </div>
          <div>
            <Switch>
              <Route path={config.path + 'goods/details/item'} component={DetailsItem}></Route>
              <Route path={config.path + 'goods/details/content'} component={DetailContent}></Route>
              <Route path={config.path + 'goods/details/reviews'} component={DetailReviews}></Route>
              <Redirect to={config.path + 'goods/details/item'} ></Redirect>
            </Switch>
          </div>
        </div>

    )
  }
}
export default connect((state)=>{
  return{
    state:state
  }
})(GoodsDetails )