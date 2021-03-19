import React from 'react';
import config from "../../../assets/js/conf/config";
import { connect } from 'react-redux';

import SubHeader from "../../../components/header/subheader";
import Css from '../../../assets/css/user/address/index.css';
import {request} from '../../../assets/js/libs/request';
class UserAddressIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: []
    }
  }
  componentDidMount() {
    this.getData();
  }
  getData(){
    let sUrl = config.baseUrl+ '/api/user/address/index?uid=' + this.props.state.user.uid + '&token=' + config.token;
    request(sUrl).then(res => {
      if (res.code === 200){
        this.setState({address:res.data});
      }
    }).catch(error =>{
      console.log(error)
    })

  }

  pushPage(url) {
    this.props.history.push(config.path + url);
  }
  render() {
    return (
        <div className={Css['address-page']}>
          <SubHeader title="收货地址管理"></SubHeader>
          {
            this.state.address.length > 0 ?
                this.state.address.map((item,index) => {
                  return (
                      <div className={Css['address-list']} key={index} onClick={this.pushPage.bind(this, 'use/address/mod?aid='+item.aid)}>
                        <div className={Css['text-wrap']}>
                          <p>
                            {
                              item.isdefault === '1' ?
                                  <span className={Css['default']}>[默认]</span>
                                  : ''
                            }
                            <span className={Css['name']}>{item.name}</span>
                            <span>{item.cellphone}</span>
                          </p>
                          <p className={Css['address']}>{item.province + item.city  + item.area + item.address}</p>
                        </div>
                      </div>
                  )
                })
                : ''
          }

          <div className={Css['add-bottom-wrap']}>
            <div className={Css['btn-add']} onClick={this.pushPage.bind(this,'address/add')}>+ 添加新地址</div>
          </div>
        </div>
    )
  }
}
export default connect((state)=>{
  return {
    state:state
  }
})(UserAddressIndex);
