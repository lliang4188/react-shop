import React from 'react';
import config from "../../../assets/js/conf/config";
import { connect } from 'react-redux';
// import action from '../../../actions';
import SubHeader from "../../../components/header/subheader";
import { ActionSheet, Toast } from 'antd-mobile';
import Css from '../../../assets/css/user/profile/index.css';
import {request} from '../../../assets/js/libs/request';
import {setScrollTop} from "../../../assets/js/utils/util";
class ProfileIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sHead: require('../../../assets/images/common/pic_head.png'),
      sNickname: '昵称',
      sGender: '',
      iGender: 0,
      sHeadName:''

    }
  }
  componentDidMount() {
    setScrollTop();
    this.getUserInfo();
  }
  showActionSheet = () => {
    const BUTTONS = ['男', '女', '取消'];
    ActionSheet.showActionSheetWithOptions({
        options: BUTTONS,
        cancelButtonIndex: BUTTONS.length - 1,
        title: '请选择性别',

        maskClosable: true,
        'data-seed': 'logId',
        onTouchStart: e => e.preventDefault(),
      },
      (buttonIndex) => {
        if(buttonIndex !==2){
          this.setState({ sGender:buttonIndex===0 ? '男' : buttonIndex===1 ? '女': this.state.sGender,iGender:buttonIndex===0?1:buttonIndex===1?2:this.state.iGender});
        }
      });
  }
  // 获取会员信息
  getUserInfo(){
    if (this.props.state.user.isLogin===true){
      let sUrl = config.baseUrl +'/api/user/myinfo/userinfo/uid/'+ this.props.state.user.uid +'?token=' + config.token;
      request(sUrl).then(res=>{
        if( res.code === 200){
          this.setState({
            sHead: res.data.head !=='' ? res.data.head : this.state.sHead,
            sNickname: res.data.nickname,
            sPoint: res.data.points,
            iGender: res.data.gender,
            sGender:res.data.gender==='1'?'男':res.data.gender==='2'?'女':''
          })
        }
      })
    }
  }

  // 上传头像
  uploadHead(){
    let sUrl = config.baseUrl + '/api/user/myinfo/formdatahead?token='+ config.token;
    request(sUrl, 'file',{headfile:this.refs['headfile'].files[0]}).then(res =>{
      if(res.code === 200){
        this.setState({sHead:'http://vueshop.glbuys.com/userfiles/head/'+res.data.msbox,sHeadName:res.data.msbox})
      }
    })
  }
  // 保存
  submitSave(){
    if (this.state.sNickname.match(/^\s*$/)){
      Toast.info('请输入昵称',2);
      return false;
    }
    if (this.state.sGender.match(/^\s*$/)){
      Toast.info('请选择性别',2);
      return false;
    }
    let sUrl = config.baseUrl+ '/api/user/myinfo/updateuser?token=' +config.token;
    let jData = {
      uid: this.props.state.user.uid,
      nickname: this.state.sNickname,
      gender:this.state.iGender,
      head: this.state.sHeadName
    }
    request(sUrl, 'post', jData).then(res =>{
       if(res.code ===200){
         Toast.info(res.data,2,()=>{
           this.props.history.goBack();
         })
       }
    })
  }

  render() {
    return (
        <div className={Css['profile-page']}>
         <SubHeader title="个人资料" right-text="保存" onClickRightBtn={this.submitSave.bind(this)}></SubHeader>
         <div className={Css['profile-main']}>
           <div className={Css['item'] + ' ' + Css['head']}>
             <span>头像</span>
             <div className={Css['head-img']}>
               <img src={this.state.sHead} alt={this.state.sNickname}/>
               <input ref="headfile" type="file" onChange={this.uploadHead.bind(this)}/>
             </div>
           </div>
           <div className={Css['item']}>
             <span>昵称</span>
             <div className={Css['data']}>
               <input type="text" value={this.state.sNickname} onChange={(e) => {this.setState({sNickname:e.target.value})}} placeholder="请设置昵称"/>
             </div>
           </div>
           <div className={Css['item']}>
             <span>性别</span>
             <div className={Css['data']} >
               <input type="text" value={this.state.sGender}  readOnly onClick={this.showActionSheet.bind(this)}  placeholder="选择性别"/>
             </div>
           </div>
         </div>
        </div>
    )
  }
}
export default connect((state)=>{
  return {
    state:state
  }
})(ProfileIndex);
