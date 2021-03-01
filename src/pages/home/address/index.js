import React from 'react';
import config from "../../../assets/js/conf/config";
import { connect } from 'react-redux';
import SubHeader from "../../../components/header/subheader";
import {request} from '../../../assets/js/libs/request';
import { Modal} from 'antd-mobile';
import Css from  '../../../assets/css/home/address/index.css';
import { safeAuth } from '../../../assets/js/utils/util';

class AddressIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      aAddress:[]
    };
   safeAuth(props);

  }
  componentDidMount() {
    this.getAddress();
  }


  pushPage(url){
    this.props.history.push(config.path+ url)
  }
  // 删除收货地址
  delAddress(index,aid){
    Modal.alert('', '确定要删除吗？', [
      { text: '取消', onPress: () => {}, style: 'default' },
      { text: '确定', onPress: () => {
            console.log(index);
            let aAddress = this.state.aAddress;
            aAddress.splice(index,1);
            this.setState({aAddress:aAddress});
            let sUrl = config.baseUrl+'/api/user/address/del?uid='+this.props.state.user.uid+'&aid='+ aid +'&token='+config.token;
            request(sUrl).then(res=>{
              console.log(res);
            })
        } },
    ]);
  }
  // 获取收货地址列表
  getAddress(){
    let sUrl = config.baseUrl+'/api/user/address/index?uid='+ this.props.state.user.uid +'&token='+config.token;
    request(sUrl).then(res => {

      if(res.code === 200){
        this.setState({aAddress:res.data});

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
        <div>
          <SubHeader title="选择收获地址"></SubHeader>
          <div className={Css['main']}>
            <div className={Css['address-nav']}>
              <div>配送地址</div>
              <div onClick={this.pushPage.bind(this,'address/add')}>+添加收获地址</div>
            </div>
            {
              this.state.aAddress.length>0?
                this.state.aAddress.map((item,index)=>{
                  return (
                    <div key={index} className={Css['address-list']}>
                      <div className={Css['address-info-wrap']}>
                        {item.isdefault==='1'?  <div className={Css['check-mark']}></div> :''}

                        <div className={Css['info-wrap']}>
                          <div className={Css['person']}>
                            <span>{item.name}</span>
                            <span>{item.cellphone}</span>
                          </div>
                          <div className={Css['address']}>
                            {item.isdefault==='1'?  <span className={Css['default']}>默认</span> :''}
                            <span>{item.province}{item.city}{item.area}{item.address}</span>
                          </div>
                        </div>
                      </div>
                      <div className={Css['handle-wrap']}>
                        <div className={Css['edit']}></div>
                        <div className={Css['del']} onClick={this.delAddress.bind(this, index,item.aid)}></div>
                      </div>
                    </div>
                  )
                })
                : ''
            }
          </div>
        </div>
    )
  }
}
export default connect((state)=>{
  return {
    state:state
  }
})(AddressIndex);
