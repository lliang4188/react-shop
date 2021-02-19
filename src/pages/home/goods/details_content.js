import React from 'react';
import Css from '../../../assets/css/home/goods/details_item.css';
import {request} from "../../../assets/js/libs/request";
import {lazyImg,localParam} from '../../../assets/js/utils/util';
import config from "../../../assets/js/conf/config";
export default class DetailsContent extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
    }
  }
  componentDidMount() {

  }
  UNSAFE_componentWillReceiveProps(nextProps) {

  }
  componentWillUnmount() {
    this.setState = (state,callback) => {
      return;
    }
  }
  render() {
    return (
        <div className={Css['page']}>
          商品详情
        </div>

    )
  }
}
