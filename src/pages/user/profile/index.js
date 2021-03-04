import React from 'react';
import config from "../../../assets/js/conf/config";
import { connect } from 'react-redux';
import action from '../../../actions';
import SubHeader from "../../../components/header/subheader";
import { ActionSheet } from 'antd-mobile';
import Css from '../../../assets/css/user/profile/index.css';
import {request} from '../../../assets/js/libs/request';
class ProfileIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sHead: require('../../../assets/images/common/pic_head.png'),
      sNickname: '昵称',
      sGender: ''

    }
  }
  componentDidMount() {
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
        this.setState({ sGender:buttonIndex===0 ? '男' : buttonIndex===1 ? '女': this.state.sGender})
      });
  }
  // 获取会员信息
  getUserInfo(){
    if (this.props.state.user.isLogin===true){
      let sUrl = config.baseUrl +'/api/user/myinfo/userinfo/uid/'+ this.props.state.user.uid +'?token=' + config.token;
      request(sUrl).then(res=>{
        if( res.code === 200){
          this.setState({
            sHead: res.data.head,
            sNickname: res.data.nickname,
            sPoint: res.data.points
          })
        }
      })
    }

  }

  render() {
    return (
        <div className={Css['profile-page']}>
         <SubHeader title="个人资料" right-text="保存"></SubHeader>
         <div className={Css['profile-main']}>
           <div className={Css['item'] + ' ' + Css['head']}>
             <span>头像</span>
             <div className={Css['head-img']}>
               <img src={this.state.sHead} alt={this.state.sNickname}/>
               <input type="file"/>
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
