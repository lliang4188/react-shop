import React from 'react';
import Css from '../../../assets/css/home/goods/search.css';
import {request} from "../../../assets/js/libs/request";
import {lazyImg,localParam} from '../../../assets/js/utils/util';
import config from "../../../assets/js/conf/config";
import IScroll from '../../../assets/js/libs/iscroll';
export default class GoodsSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state= {

    }
  }
  componentDidMount() {

  }






  render() {
    return (
      <div className={Css['page']}>
        <div className={Css['search-head']}>
          <div className={Css['search-header']}>
            <div className={Css['back']}></div>
            <div className={Css['search-wrap']}>
              <div className={Css['search-icon']}></div>
              <input type="text" className={Css['search-text']}/>
            </div>
            <div className={Css['btn-screen']}>筛选</div>
          </div>
          <div className={Css['order-main']}>
            <div className={Css['order-item']}>
              综合
              <ul className={Css['order-menu']+ ' hide'}>
                <li className={Css['active']}>综合</li>
                <li>价格从低到高</li>
                <li>价格从高到低</li>
              </ul>
            </div>
            <div className={Css['order-item']}>
              销量
            </div>
          </div>
        </div>
        <div className={Css['goods-main']}>
          <div className={Css['goods-list']}>
            <div className={Css['image']}></div>
            <div className={Css['goods-content']}>
              <div className={Css['goods-title']}>飞利浦猛腾 27英寸IPS平面 2K 165Hz 1ms HDR400 广色域 飞利浦小金刚 游戏电竞 吃鸡显示器 HDMI 275M8RZ</div>
              <div className={Css['price']}>&yen;188.00</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
