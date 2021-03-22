import React from 'react';
import config from "../../../assets/js/conf/config";
import { connect } from 'react-redux';
// import action from '../../../actions';
import SubHeader from "../../../components/header/subheader";
import {lazyImg} from '../../../assets/js/utils/util';
import { Modal } from 'antd-mobile';
import UpRefresh from '../../../assets/js/libs/uprefresh';
import Css from '../../../assets/css/user/myfav/index.css';
import {request} from '../../../assets/js/libs/request';
class MyFav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favData: []
    };
    this.oUpRefresh = null;
    this.curPage= 1;
    this.maxPage = 0;
    this.offsetBottom = 100;
  }
  componentDidMount() {
    this.getData();
  }
  componentWillUnmount() {
    this.setState = (state,callback) => {
      return;
    }
  }
  // 获取收藏数据
  getData(){
    let sUrl = config.baseUrl+ '/api/user/fav/index?uid='+ this.props.state.user.uid +'&token='+ config.token +'&page=1';
    request(sUrl).then(res =>{
      if (res.code===200){
        this.setState({favData: res.data},()=>{
          lazyImg();
          this.maxPage = res.pageinfo.pagenum;
          this.getScrollPage();
        })
      }
    }).catch(error =>{
      console.log(error);
    })

  }
  getScrollPage(){
    this.oUpRefresh = new UpRefresh({'curPage': this.curPage, 'maxPage':this.maxPage, 'offsetBottom': this.offsetBottom},  curPage => {
      let url = config.baseUrl+ '/api/user/fav/index?uid='+ this.props.state.user.uid +'&token='+ config.token +'&page='+curPage;
      request(url).then(res =>{
        if (res.code === 200) {
          lazyImg();
          if (res.data.length > 0 ) {
            let favData = this.state.favData;
            for( let i=0; i<res.data.length; i++) {
              favData.push(res.data[i]);
            }
            this.setState({favData: favData}, ()=> {
              lazyImg();
            });
          }

        }


      })
    })
  }
  // 删除收藏
  delFav(index,fid){
    Modal.alert('','确认要删除吗？',[
      { text: '取消', onPress: () => {}, style: 'default' },
      { text: '确定', onPress:() =>{
          let sUrl = config.baseUrl + '/api/user/fav/del?uid='+ this.props.state.user.uid +'&fid='+ fid +'&token='+config.token;
          request(sUrl, 'post', {uid: this.props.state.user.uid, fid:fid}).then(res => {
            if (res.code === 200){
              let favData = this.state.favData;
              favData.splice(index, 1);
              this.setState({favData:favData},()=>{
                lazyImg();
              });
            }
          })

        }}
    ]);
  }
  // 页面跳转
  pushPage(url){
    this.props.history.push(config.path+ url);
  }

  render() {
    return (
        <div className={Css['fav-page']}>
         <SubHeader title="我的收藏"></SubHeader>
         <div className={Css['fav-list']}>
           {
             this.state.favData !== null ?
               this.state.favData.map((item, index) =>{
                 return (
                   <div className={Css['list-item']} key={index} onClick={this.pushPage.bind(this, 'goods/details/item?gid='+ item.gid)}>
                     <div className={Css['image']}>
                       <img src={require("../../../assets/images/common/lazyImg.jpg")} data-echo={item.image} alt={item.title}/>
                     </div>
                     <div className={Css['title']}>{item.title}</div>
                     <div className={Css['price']}>&yen;{item.price}</div>
                     <div className={Css['btn-wrap']}>
                       <div className={Css['btn']} onClick={(e)=>{e.stopPropagation(); this.pushPage('goods/details/item?gid='+ item.gid)}}>购买</div>
                       <div className={Css['btn']} onClick={(e)=>{ e.stopPropagation(); this.delFav(index,item.fid)}}>删除</div>
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
})(MyFav);
