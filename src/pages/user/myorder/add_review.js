import React from 'react';
import config from "../../../assets/js/conf/config";
import {request} from "../../../assets/js/libs/request";
import { connect } from 'react-redux';
import {Toast} from  'antd-mobile';
import SubHeader from "../../../components/header/subheader";
import Css from '../../../assets/css/user/myorder/add_review.css';
import {localParam,safeAuth} from "../../../assets/js/utils/util";

class AddReview extends React.Component {
  constructor(props) {
    super(props);
    safeAuth(props);
    this.state = {
      services:[],
      content: ''
    };
    this.gid = props.location.search ? localParam(props.location.search).search.gid : '';
    this.ordernum = props.location.search ? localParam(props.location.search).search.ordernum : '';
    this.isSubmit =  true;
  }
  componentDidMount() {
    this.getServices();
  }

  componentWillUnmount() {
    this.setState = (state,callback) => {
      return;
    }
  }
  // 星级选择
  selectScore(index, index2){
    let services = this.state.services;
    for (let i=0; i< services[index].scores.length; i++){
      services[index].scores[i].checked = false;
    }
    for (let i=0; i<= index2; i++){
      services[index].scores[i].checked = true;
    }
    this.setState({services: services});
  }

  // 获取星级选择数据
  getServices(){
    let sUrl = config.baseUrl + '/api/home/reviews/service?token=' + config.token;
    request(sUrl).then(res =>{
     if (res.code === 200) {
       let services = res.data;
       for (let i in services){
         services[i].scores = [
           {
             checked: false,
             score: 1
           },
           {
             checked: false,
             score: 2
           },
           {
             checked: false,
             score: 3
           },
           {
             checked: false,
             score: 4
           },
           {
             checked: false,
             score: 5
           }
         ];
       }
       this.setState({services:services});
     }
    })
  }
  // 提交评价数据
  submitSave(){
    if (this.isSubmit){
      this.isSubmit = false;
      let isChecked = false,rsdata=[], scores=[], score=[];
      for (let i=0; i< this.state.services.length; i++) {
        isChecked = false;
        for(let j=0; j<this.state.services[i].scores.length; j++){
          if (this.state.services[i].scores[j].checked){
            isChecked = true;
            break;
          }
        }
        if (!isChecked) {
          this.isSubmit = true;
          Toast.info('请选择'+ this.state.services[i].title, 2);
          return;
        }
      }
      if (this.state.content.match(/^\s*$/)){
        this.isSubmit = true;
        Toast.info('请输入评价内容', 2);
        return;
      }
      // 组装评价数据
      for(let i=0; i<this.state.services.length; i++){
        scores=[];
        for(let j=0; j<this.state.services[i].scores.length; j++) {
          if (this.state.services[i].scores[j].checked){
            scores.push(this.state.services[i].scores[j].score);
          }
        }
        score= scores[scores.length-1];
        rsdata.push({
          gid: this.gid,
          myid: this.props.state.user.uid,
          rsid:this.state.services[i].rsid,
          score:score
        });

      }
      let data= {
        uid: this.props.state.user.uid,
        gid: this.gid,
        content: this.state.content,
        ordernum:this.ordernum,
        rsdata: JSON.stringify(rsdata)
      };
      let url = config.baseUrl+'/api/home/reviews/add?token='+config.token;
      request(url,'post', data).then(res =>{
          if(res.code === 200){
            Toast.info(res.data,2,()=>{
              this.props.history.goBack();
            });
          } else {
            this.isSubmit = true;
          }
      }).catch(error=>{
        console.log(error);
      });
    }


  }
  render() {
    return (
        <div className={Css['add-page']}>
          <SubHeader title="评价"></SubHeader>
          {
            this.state.services.length > 0 ?
              this.state.services.map((item, index)=>{
                return (
                  <div className={Css['review-item']} key={index}>
                    <div className={Css['title-con']}>{item.title}</div>
                    <div className={Css['start-con']}>
                      {
                        item.scores.length > 0 ?
                          item.scores.map((item2, index2)=>{
                            return (
                              <div className={item2.checked ? Css['start']+' '+ Css['active'] : Css['start']}  key={index2} onClick={this.selectScore.bind(this, index, index2)}></div>
                            )
                          })
                          : ''
                      }

                    </div>
                  </div>
                )
              })
              : ''
          }

          <div className={Css['content-wrap']}>
            <textarea placeholder="来分享你的消费感受吧!" onChange={(e)=>{this.setState({content:e.target.value})}}></textarea>
          </div>
          <div className={Css['submit-con']}>
            <button type="button" className={Css['btn-submit']} onClick={this.submitSave.bind(this)} >提交</button>
          </div>
        </div>
    )
  }
}
export default connect((state)=>{
  return {
    state:state
  }
})(AddReview);
