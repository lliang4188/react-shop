import React from 'react';
import Css from '../../../assets/css/home/goods/details.css';
import {request} from "../../../assets/js/libs/request";
import {lazyImg,localParam} from '../../../assets/js/utils/util';
import config from "../../../assets/js/conf/config";
export default class DetailsItem extends React.Component {
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
          商品页面
        </div>

    )
  }
}
