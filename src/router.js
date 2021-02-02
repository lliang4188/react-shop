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
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
// import {AuthRoute} from './routes/private';
import asyncComponent from "./components/async/AsyncComponent";
// import IndexComponent from "./pages/home/index";
const IndexComponent =asyncComponent(()=> import('./pages/home/index/index'))

export default class  RouterComponent extends React.Component {
  render() {
    return (
        <React.Fragment>
          <Router>
              <React.Fragment>
                <Switch>
                    <Route path="/" exact component={IndexComponent} ></Route>
                </Switch>
              </React.Fragment>
          </Router>
        </React.Fragment>
  )
  }
}
