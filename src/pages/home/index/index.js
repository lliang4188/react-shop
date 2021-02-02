import React from 'react';
import Css from '../../../assets/css/home/index/index.css'
export default class IndexComponent extends React.Component {
  render() {
    return (
        <div class="app">
          <div className={Css['header']}>头部</div>
        </div>
    )
  }
}
