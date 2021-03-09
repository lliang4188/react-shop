/*
HashRouter:有#号
BrowserRouter:没有#号
Route：设置路由与组件关联
Switch:只要匹配到一个地址不往下匹配，相当于for循环里面的break
Link:跳转页面，相当于vue里面的router-link
exact :完全匹配路由
Redirect:路由重定向
*/
import React from 'react';
import {HashRouter as Router,Route,Switch, Redirect} from 'react-router-dom';
import config from "./assets/js/conf/config";
import asyncComponent from "./components/async/AsyncComponent";
import {AuthRoute} from "./routes/private";
const IndexComponent =asyncComponent(()=> import('./pages/home/home/index'));
const GoodsClassify = asyncComponent(() => import('./pages/home/goods/classify'));
const GoodsSearch = asyncComponent(() => import('./pages/home/goods/search'));
const GoodsDetails = asyncComponent(() => import('./pages/home/goods/details'));
const LoginIndex = asyncComponent(() => import('./pages/home/login'));
const RegIndex = asyncComponent(() => import('./pages/home/reg'));
const BalanceIndex = asyncComponent(() => import('./pages/home/balance'));
const AddressIndex = asyncComponent(() => import('./pages/home/address/index'));
const AddressAdd = asyncComponent(() => import('./pages/home/address/add'));
const AddressMod = asyncComponent(() => import('./pages/home/address/mod'));
const BalanceEnd = asyncComponent(() => import('./pages/home/balance/end'));
const ProfileIndex = asyncComponent(() => import('./pages/user/profile/index'));
const MyOrder = asyncComponent(() => import('./pages/user/myorder/index'));
const Transfer = asyncComponent(() => import('./pages/transfer'));


export default class  RouterComponent extends React.Component {
  render() {
    return (
        <React.Fragment>
          <Router>
              <React.Fragment>
                <Switch>
                    <Route path={config.path + "home"} component={IndexComponent} ></Route>
                    <Route path={config.path + "goods/classify"} component={GoodsClassify} ></Route>
                    <Route path={config.path + "goods/search"} component={GoodsSearch} ></Route>
                    <Route path={config.path + "goods/details"} component={GoodsDetails} ></Route>
                    <Route path={config.path + "login/index"} component={LoginIndex} ></Route>
                    <Route path={config.path + "reg/index"} component={RegIndex} ></Route>
                    <AuthRoute path={config.path + "balance/index"} component={BalanceIndex} ></AuthRoute>
                    <AuthRoute path={config.path + "address/index"} component={AddressIndex} ></AuthRoute>
                    <AuthRoute path={config.path + "address/add"} component={AddressAdd} ></AuthRoute>
                    <AuthRoute path={config.path + "address/mod"} component={AddressMod} ></AuthRoute>
                    <AuthRoute path={config.path + "balance/end"} component={BalanceEnd} ></AuthRoute>
                    <AuthRoute path={config.path + "profile/index"} component={ProfileIndex} ></AuthRoute>
                    <AuthRoute path={config.path + "myorder"} component={MyOrder} ></AuthRoute>
                    <AuthRoute path={config.path + "transfer"} component={Transfer}></AuthRoute>
                    <Redirect to={config.path + "home/index"}></Redirect>
                </Switch>
              </React.Fragment>
          </Router>
        </React.Fragment>
  )
  }
}
