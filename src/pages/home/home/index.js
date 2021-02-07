import React from 'react';
import {Route,Switch} from 'react-router-dom';
import asyncComponent from "../../../components/async/AsyncComponent";
import Css from '../../../assets/css/home/home/index.css';
import config from "../../../assets/js/conf/config";
const IndexComponent = asyncComponent(()=>import('../index/index'));
const CartIndex = asyncComponent(()=>import('../cart/index'));
const UserIndex = asyncComponent(()=> import('../../user/index/index'));
export default class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      bHomeStyle: true,
      bCartStyle: false,
      bMyStyle: false,
    }
  }
  componentDidMount() {
    this.handleNavStyle(this.props);
  }
  UNSAFE_componentWillReceiveProps(newProps) {
    this.handleNavStyle(newProps);
  }

  goPage (pUrl) {
    this.props.history.replace(config.path + pUrl);
  }
  handleNavStyle(props) {
    switch (props.location.pathname) {
      case config.path+ 'home/index':
        this.setState({
          bHomeStyle: true,
          bCartStyle: false,
          bMyStyle: false
        });
        break;
      case config.path+ 'home/cart':
        this.setState({
          bHomeStyle: false,
          bCartStyle: true,
          bMyStyle: false
        });
        break;
      case config.path+ 'home/my':
        this.setState({
          bHomeStyle: false,
          bCartStyle: false,
          bMyStyle: true
        });
        break;
      default:
        break;
    }
  }
  render() {
    return (
        <div>
          <div>
            <React.Fragment>
              <Switch>
                <Route path={ config.path + "home/index"} component={IndexComponent}></Route>
                <Route path={ config.path + "home/cart"} component={CartIndex}></Route>
                <Route path={ config.path + "home/my"} component={UserIndex}></Route>
              </Switch>
            </React.Fragment>
          </div>
          <div className={Css['bottom-nav']}>
            <div className={Css['bottom-list']}>
              <span className={this.state.bHomeStyle ? Css['list-item']+ ' ' + Css['active']:Css['list-item']} onClick={this.goPage.bind(this,'home/index')}>首页</span>
              <span className={this.state.bCartStyle ? Css['list-item']+ ' ' + Css['active']:Css['list-item']} onClick={this.goPage.bind(this,'home/cart')}>购物车</span>
              <span className={this.state.bMyStyle ? Css['list-item']+ ' ' + Css['active']:Css['list-item']} onClick={this.goPage.bind(this,'home/my')}>我的</span>
            </div>
          </div>
        </div>
    )
  }
}
