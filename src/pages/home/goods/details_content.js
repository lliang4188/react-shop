import React from 'react';
import Css from '../../../assets/css/home/goods/details_item.css';
import {request} from "../../../assets/js/libs/request";
import {localParam} from '../../../assets/js/utils/util';
import config from "../../../assets/js/conf/config";
export default class DetailsContent extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      contents: '',
      gid:props.location.search !== '' ? localParam(props.location.search).search.gid : ''
    }
  }
  componentDidMount() {
    let sUrl = config.baseUrl + 'api/home/goods/info?gid='+ this.state.gid +'&type=details&token='+config.token;
    request(sUrl).then(res => {
      if(res.code === 200) {
        this.setState({contents: res.data.bodys})
      }
    })
  }

  componentWillUnmount() {
    this.setState = (state,callback) => {
      return;
    }
  }
  render() {
    return (
        <div className={Css['page']}>
          <div className={Css['content-wrap']}>
            <div dangerouslySetInnerHTML={{__html:this.state.contents}}></div>
          </div>
        </div>

    )
  }
}
