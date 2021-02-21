import React from 'react';
import { withRouter } from 'react-router-dom';
import './subheader.css';
class SubHeader extends React.Component {
  goBack(){
    this.props.history.goBack();
  }
  render() {
    return (
      <div className="sub-header">
        <div className="back" onClick={this.goBack.bind(this)}></div>
        <h1 className="title">{this.props.title}</h1>
        <div className={this.props['right-text']? 'right-btn' : 'hide'}>{this.props['right-text']}</div>
      </div>
    )
  }
}
export default withRouter(SubHeader);
