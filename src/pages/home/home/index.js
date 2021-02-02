import React from 'react';
import Css from '../../../assets/css/home/home/index.css';
export default class HomeComponent extends React.Component {
  render() {
    return (
        <div>
          <div className={Css['bottom-nav']}>
            <div className={Css['bottom-list']}>
              <span className={Css['list-item']}>首页</span>
              <span className={Css['list-item']}>购物车</span>
              <span className={Css['list-item']}>我的</span>
            </div>
          </div>
        </div>
    )
  }
}
