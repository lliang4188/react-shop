import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import asyncComponent from "../../../components/async/AsyncComponent";
import Css from '../../../assets/css/home/goods/details.css';
import {request} from "../../../assets/js/libs/request";
import {lazyImg,localParam} from '../../../assets/js/utils/util';
import config from "../../../assets/js/conf/config";
import DetailsContent from "./details_content";

const DetailsItem = asyncComponent(()=> import('./details_item'));
const DetailContent = asyncComponent(()=> import('./details_content'));
const DetailReviews = asyncComponent(()=> import('./details_reviews'));

export default class GoodsDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
    }
  }
  componentDidMount() {

  }
  UNSAFE_componentWillReceiveProps(nextProps) {

  }

  render() {
    return (
        <div>
          <div className={Css['detail-header']}>
            <div className={Css['back']}></div>
            <div className={Css['detail-nav']}>
              <div className={Css['nav-ele'] + ' ' + Css['active']}>商品</div>
              <div className={Css['nav-ele']}>详情</div>
              <div className={Css['nav-ele']}>评价</div>
            </div>
            <div className={Css['icon-cart']}>
              <div className={Css['spot']}></div>
            </div>
          </div>
          <div>
            <Switch>
              <Route path={config.path + 'goods/details/item'} component={DetailsItem}></Route>
              <Route path={config.path + 'goods/details/content'} component={DetailsContent}></Route>
              <Route path={config.path + 'goods/details/reviews'} component={DetailReviews}></Route>
              <Redirect to={config.path + 'goods/details/item'} ></Redirect>
            </Switch>
          </div>
        </div>

    )
  }
}
