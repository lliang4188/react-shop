import React from 'react';
import './search.css';
import { withRouter } from 'react-router-dom';
import { Modal, Toast} from 'antd-mobile';
import {request} from "../../assets/js/libs/request";
import config from "../../assets/js/conf/config";
import {connect} from 'react-redux';
import actions from '../../actions';

class SearchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      bHistory: true,
      aHotKeywords:[],
      keywords: ''
    };
    this.aKeywords = props.state.hk.keywords;
  }
  componentDidMount() {
    if(this.props.state.hk.keywords.length>0){
      this.setState({bHistory: true})
    } else {
      this.setState({bHistory: false})
    }
    this.getHotKeywords();

  }
  goPage(url, keywords){

    if (this.props.isLocal === '1') {
      this.props.childKeywords(keywords);
    } else {
      this.props.history.push(config.path + url);

    }

  }
  getHotKeywords(){
    request(config.baseUrl+'/api/home/public/hotwords?token='+config.token).then(res=>{
      if (res.code === 200){
        this.setState({aHotKeywords: res.data});
      } else {
        this.setState({aHotKeywords: []});
      }
    });

  }
  clearHistory() {
    Modal.alert('', '确定要删除吗？', [
        { text: '取消', onPress: () => {}, style: 'default' },
      { text: '确定', onPress: () => {
        this.setState({bHistory: false});
        localStorage.removeItem('hk');
          this.props.dispatch(actions.hk.addHistoryKeywords({keywords:[]}));
          this.aKeywords = [];
        } },
    ]);
  }
  addHistoryKeywords(){
    let keywords = this.state.keywords || this.props.keywords;
    if ( this.refs['keywords'].value!=="") {
      for (let i=0; i< this.aKeywords.length; i++) {
        if (this.aKeywords[i] === keywords){
          this.aKeywords.splice(i--, 1);
        }
      }
      this.aKeywords.unshift(keywords);
      localStorage['hk'] = JSON.stringify(this.aKeywords);
      this.props.dispatch(actions.hk.addHistoryKeywords({keywords:this.aKeywords}));
      this.setState({bHistory:true});
      this.goPage('goods/search?keywords='+keywords,keywords);
    } else {
      Toast.info('请输入宝贝名称', 2);
    }

  }
  componentWillUnmount() {
    this.setState = (state,callback) => {
      return;
    }
  }
  render() {
    return (
        <div className="search-page" style={this.props.pageStyle}>
          <div className="search-header">
            <div className="close" onClick={this.props.childStyle.bind(this,{display:'none'})}>
            </div>
            <div className="search-wrap">
              <input type="text" className="search" placeholder="请输入宝贝名称" defaultValue={this.props.keywords} onChange={(e)=>{this.setState({keywords:e.target.value})}} ref="keywords"/>
              <button className="btn-search" onClick={this.addHistoryKeywords.bind(this)}></button>
            </div>
          </div>
          <div className="search-main">
            <div className={this.state.bHistory ? '':'hide'}>
              <div className="search-title-wrap" >
                <div className="search-title">最近搜索</div>
                <div className="btn-delete" onClick={this.clearHistory.bind(this)}></div>
              </div>
              <div className="search-keywords-wrap">
                {
                  this.props.state.hk.keywords != null ?
                    this.props.state.hk.keywords.map((item, index)=> {
                      return (
                        <div key={index} className="keywords" onClick={this.goPage.bind(this,'goods/search?keywords='+ item,item)}>
                          <div className="inner">{item}</div>
                        </div>
                      )
                    })
                    :
                    ''
                }
              </div>
            </div>

            <div className="search-title-wrap" >
              <div className="search-title">热门搜索</div>
            </div>
            <div className="search-keywords-wrap">
              {
                this.state.aHotKeywords !=null ?
                  this.state.aHotKeywords.map((item, index)=>{
                  return (
                    <div key={index} className={ item.title ?  'keywords': 'hide'} onClick={this.goPage.bind(this,'goods/search?keywords='+ item.title,item.title)}>
                      <div className="inner">{item.title}</div>
                    </div>
                  )

              })
                  :''
              }
            </div>
          </div>
        </div>
    )
  }
}
export default connect((state)=>{
  return{
    state:state
  }
})(withRouter(SearchComponent))
