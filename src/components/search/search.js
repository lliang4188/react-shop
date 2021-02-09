import React from 'react';
import './search.css';
import { Modal } from 'antd-mobile';
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
  getHotKeywords(){
    request(config.baseUrl+'/api/home/public/hotwords?token='+config.token).then(res=>{
      if (res.code === 200){
        this.setState({aHotKeywords: res.data})
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
  addKeywords(){
    for (let i=0; i< this.aKeywords.length; i++) {
      if (this.aKeywords[i] === this.state.keywords){
        this.aKeywords.splice(i--, 1);
      }
    }
    this.aKeywords.unshift(this.state.keywords);
    localStorage['hk'] = JSON.stringify(this.aKeywords);
    this.props.dispatch(actions.hk.addHistoryKeywords({keywords:this.aKeywords}));
    this.setState({bHistory:true});
  }
  render() {
    return (
        <div className="search-page" style={this.props.pageStyle}>
          <div className="search-header">
            <div className="close" onClick={this.props.childStyle.bind(this,{display:'none'})}>
            </div>
            <div className="search-wrap">
              <input type="text" className="search" placeholder="请输入宝贝名称" onChange={(e)=>{this.setState({keywords:e.target.value})}}/>
              <button className="btn-search" onClick={this.addKeywords.bind(this)}></button>
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
                        <div key={index} className="keywords">
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
                    <div key={index} className="keywords">
                      <div className="inner">{item.title?item.title:'空'}</div>
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
})(SearchComponent)
