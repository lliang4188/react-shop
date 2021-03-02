import React from 'react';
import config from "../../../assets/js/conf/config";
import { connect } from 'react-redux';
import SubHeader from "../../../components/header/subheader";
import {request} from '../../../assets/js/libs/request';
import { Picker, Toast } from 'antd-mobile';
import {province} from '../../../assets/data/province';
import { safeAuth, localParam } from '../../../assets/js/utils/util';
import Css from '../../../assets/css/home/address/add.css';
class AddressMod extends React.Component {
  constructor(props) {
    super(props);
   safeAuth(props);
   this.state = {
     pickerValue: [],
     sProvince: '',
     sCity: '',
     sArea: '',
     sName: '',
     sCellphone:'',
     sAddress:'',
     bChecked:false
   }
   this.aid = localParam(this.props.location.search).search.aid;
  }
  componentDidMount() {
    this.getAddress();
  }
  componentWillUnmount(){
    this.setState=(state,callback)=>{
      return;
    }
  }
  //提交数据到后台
  submitData(){
    if(this.state.sName.match(/^\s*$/)) {
      Toast.info('请输入收货人姓名', 2);
      return false;
    }
    if(this.state.sCellphone.match(/^\s*$/)) {
      Toast.info('请输入手机号码', 2);
      return false;
    }
    if(!this.state.sCellphone.match(/^1[3-9][0-9]{9}/)) {
      Toast.info('请输入正确的手机号码', 2);
      return false;
    }
    if(JSON.stringify(this.state.pickerValue).match(/^\s*$/)){
      Toast.info('请选择所在地区', 2);
      return false;
    }
    if(this.state.sAddress.match(/^\s*$/)){
      Toast.info("请输入详细地址", 2);
      return false;
    }
    let url = config.baseUrl+'api/user/address/mod?token='+config.token;
    let data = {
      aid: this.aid,
      uid: this.props.state.user.uid,
      name: this.state.sName,
      cellphone: this.state.sCellphone,
      province: this.state.sProvince,
      city: this.state.sCity,
      area: this.state.sArea,
      address: this.state.sAddress,
      isdefault: this.state.bChecked ? '1': '0'
    };
    request(url, 'post', data).then((res)=>{
      if(res.code === 200){
        if (this.state.bChecked) {
          localStorage['addressId'] = this.aid;
          sessionStorage.removeItem('addressId');
        } else {
          localStorage.removeItem('addressId');
        }
        Toast.info('修改成功',2,()=>{
          this.props.history.goBack();
        })
      } else {
        Toast.info(res.data, 2);
      }
    })
  }
  // 获取收货地址信息
  getAddress(){
    let sUrl = config.baseUrl + '/api/user/address/info?uid='+ this.props.state.user.uid +'&aid='+ this.aid +'&token=' +config.token;
    request(sUrl).then(res => {
     if (res.code ===200){
       this.setState({
         sName: res.data.name,
         sCellphone: res.data.cellphone,
         sProvince: res.data.province,
         sCity: res.data.city,
         sArea: res.data.area,
         sAddress: res.data.address,
         bChecked: res.data.isdefault === '1'? true : false,
         pickerValue: `${res.data.province},${res.data.city},${res.data.area}`
       })
     }
    })
  }
  render() {
    return (
        <div className={Css['main']}>
          <SubHeader title="修改收货地址"></SubHeader>

            <div className={Css['add-item']}>
              <div className={Css['add-name']} >收货人</div>
              <div className={Css['add-content']}>
                <input type="text" placeholder="收货人姓名" value={this.state.sName} onChange={(e)=>{this.setState({sName:e.target.value})}}/>
              </div>
            </div>
            <div className={Css['add-item']}>
              <div className={Css['add-name']}>联系方式</div>
              <div className={Css['add-content']}>
                <input type="text" placeholder="联系人手机号" value={this.state.sCellphone} onChange={(e)=>{this.setState({sCellphone:e.target.value})}}/>
              </div>
            </div>
            <div className={Css['add-item']}>
              <div className={Css['add-name']}>所在地区</div>
              <div className={Css['add-content']}>
                <Picker
                  title="选择地区"
                  data={province}
                  onOk={e=>{
                    this.setState({pickerValue:e,sProvince:e[0], sCity:e[1], sArea:e[2] !== undefined ? e[2] : ''});
                  }}
                >
                <input type="text" placeholder="请选择所在地区" readOnly value={this.state.pickerValue}/>
                </Picker>
              </div>
            </div>
            <div className={Css['add-item']}>
              <div className={Css['add-name']}>详细地址</div>
              <div className={Css['add-content']}>
                <input type="text" placeholder="街道详细地址" value={this.state.sAddress} onChange={(e) =>{this.setState({sAddress:e.target.value})}}/>
              </div>
            </div>
            <div className={Css['add-item']}>
              <div className={Css['add-name']}>设置为默认地址</div>
              <div className={Css['add-content']}>
                <input type="checkbox" checked={this.state.bChecked} onChange={(e)=> this.setState({bChecked:!this.state.bChecked})} />
              </div>
            </div>
            <div className={Css['save-wrap']}>
              <button type="button" className={Css['btn-save']} onClick={this.submitData.bind(this)}>保存</button>
            </div>
        </div>
    )
  }
}
export default connect((state)=>{
  return {
    state:state
  }
})(AddressMod);
