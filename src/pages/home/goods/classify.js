import React from 'react';
import {Route, Switch} from 'react-router-dom';
import asyncComponent from "../../../components/async/AsyncComponent";
import {request} from "../../../assets/js/libs/request";
import Css from '../../../assets/css/home/goods/classify.css';
import config from '../../../assets/js/conf/config';
import IScroll from '../../../assets/js/libs/iscroll';
import {localParam} from '../../../assets/js/utils/util';
import SearchComponent from "../../../components/search/search";
const GoodsItems = asyncComponent(()=>import('./items'));
export default class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      aClassify: [],
      pageStyle:{display:'none'}
    };
    this.myScroll = null;
    this.aTempClassify = [];
    this.cid = props.location.search ? localParam(props.location.search).search.cid : '492';
  }
  componentDidMount() {
    this.getClassifyData();
  }
  UNSAFE_componentWillReceiveProps() {

  }
  replacePage(pUrl){
    this.props.history.replace(config.path+pUrl);
  }
  goBack(){
    this.props.history.goBack();
  }
  changeSearch(){
    this.setState({pageStyle:{display: 'block'}});
  }
  getStyle(val) {
    this.setState({pageStyle: val});
  }

  eventScroll(){
    let scrollMenu = this.refs['scroll_menu'];
    scrollMenu.addEventListener('touchmove', function (e) { e.preventDefault();},
      false);
    this.myScroll= new IScroll(scrollMenu, {

      scrollX : false,
      scrollY : true,
      preventDefault : false,
      disablePointer:true,
      disableTouch:false,
      disableMouse:true
    });
  }

  getClassifyData(){
    request(config.baseUrl+'/api/home/category/menu?token='+config.token).then(res=>{
      if (res.code === 200){
        this.aTempClassify = res.data;
        for (let i=0; i < this.aTempClassify.length; i++){
          this.aTempClassify[i].bActive= false;
        }
        this.setState({aClassify:res.data},()=>{
          this.eventScroll();
          this.defaultStyle();
        });
      }
    })
  }

  changeStyle (pUrl,pIndex){
    if (this.aTempClassify.length > 0){
      for (let i=0; i < this.aTempClassify.length; i++) {
        this.aTempClassify[i].bActive = false;
      }
    }
    this.aTempClassify[pIndex].bActive = true;
    this.handleScroll(pIndex);
    this.replacePage(pUrl)
  }

  handleScroll(pIndex){
    let oScrollClassify = this.refs['scroll_menu'];
    let iTopHeight = Math.round(parseInt(this.refs['item-'+pIndex].offsetHeight *pIndex));
    let iBottomHeight = oScrollClassify.scrollHeight - iTopHeight;
    let iHalfHeight = Math.round(parseInt(oScrollClassify.offsetHeight))/3;
    if (iTopHeight > iHalfHeight && iBottomHeight > oScrollClassify.offsetHeight) {
      this.myScroll.scrollTo(0, -iTopHeight, 800);
    }
  }
  defaultStyle(){
    if (this.aTempClassify.length > 0 ){
      for (let i=0; i < this.aTempClassify.length; i++){
        if(this.aTempClassify[i].cid === this.cid){
          this.aTempClassify[i].bActive = true;
          this.setState({ aClassify: this.aTempClassify});
          break;
        }


      }
    }
  }
  componentWillUnmount() {
    this.setState = (state,callback) => {
      return;
    }
  }
  render() {
    return (
        <div>
          <div className={Css['search-header']}>
            <div className={Css['back']} onClick={this.goBack.bind(this)}></div>
            <div className={Css['search']} onClick={this.changeSearch.bind(this)}>请输入宝贝名称</div>
          </div>
          <div className={Css['goods-main']}>
            <div className={Css['classify-menu']} ref="scroll_menu">
              <div>
                {
                  this.state.aClassify != null ?
                  this.state.aClassify.map((item, index)=>{
                    return (
                      <div key={index} ref={'item-'+index} className={item.bActive ? Css['menu-item']+' '+ Css['active'] : Css['menu-item']} onClick={this.changeStyle.bind(this, 'goods/classify/items?cid='+item.cid+'',index)}>{item.title}</div>
                    )
                  }
                  )
                  :
                  ''
                }
              </div>

            </div>
            <div className={Css['goods-content']}>
              <Switch>
                <Route path={config.path+'goods/classify/items'} component={GoodsItems}/>
              </Switch>
            </div>
          </div>
          <SearchComponent pageStyle={this.state.pageStyle} childStyle={this.getStyle.bind(this)}></SearchComponent>
        </div>
    )
  }
}
