import React from 'react';
import { withRouter } from 'react-router-dom';
import config from "../../assets/js/conf/config";
import './subheader.css';
class SubHeader extends React.Component {
  goBack(){
    if (this.props.location.pathname === config.path + '/address/index') {
      this.props.history.replace(config.path + '/balance/index')
    } else {
      this.props.history.goBack();
    }
  }
  getClick(){
    this.props['onClickRightBtn']();
  }
  render() {
    return (
      <div className="sub-header">
        <div className="back" onClick={this.goBack.bind(this)}></div>
        <h1 className="title">{this.props.title}</h1>
        <div className={this.props['right-text']? 'right-btn' : 'hide'} onClick={this.getClick.bind(this)}>{this.props['right-text']}</div>
      </div>
    )
  }
}
export default withRouter(SubHeader);
