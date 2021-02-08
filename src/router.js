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
// import {AuthRoute} from './routes/private';
import config from "./assets/js/conf/config";
import asyncComponent from "./components/async/AsyncComponent";
const IndexComponent =asyncComponent(()=> import('./pages/home/home/index'));
const GoodsClassify = asyncComponent(() => import('./pages/home/goods/classify'));

export default class  RouterComponent extends React.Component {
  render() {
    return (
        <React.Fragment>
          <Router>
              <React.Fragment>
                <Switch>
                    <Route path={config.path + "home"} component={IndexComponent} ></Route>
                    <Route path={config.path + "goods/classify"} component={GoodsClassify} ></Route>
                    <Redirect to={config.path + "home/index"}></Redirect>
                </Switch>
              </React.Fragment>
          </Router>
        </React.Fragment>
  )
  }
}
