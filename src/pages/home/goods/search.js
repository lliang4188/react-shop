import React from 'react';
import Css from '../../../assets/css/home/goods/search.css';
import {request} from "../../../assets/js/libs/request";
import {lazyImg, localParam} from '../../../assets/js/utils/util';
import config from "../../../assets/js/conf/config";
import SearchComponent from "../../../components/search/search";
import UpRefresh from '../../../assets/js/libs/uprefresh';
import IScroll from '../../../assets/js/libs/iscroll';

export default class GoodsSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
     screenMove: '',
     maskShow: false,
     bPriceMenu: false,
     bSalesMenu: false,
     pageStyle:{display:'none'},
     aGoods: [],
     sKeywords: '',
     aPriceOrder:[
         { title: '综合', type: 'all', checked: true },
         { title: '价格从低到高', type: 'up', checked:false },
         { title: '价格从高到低', type: 'down', checked: false }
         ],
     aClassify: {
       checked:true,
       items:[]
     },
      aPrice: {
       checked: true,
       items:[
         {price1:1, price2:50, checked:false},
         {price1:51, price2:99, checked:false},
         {price1:100, price2:300, checked:false},
         {price1:301, price2:1000, checked:false},
         {price1:1001, price2:4000, checked:false},
         {price1:4001, price2:9999, checked:false}
       ]
      },
      fPrice1: 0,
      fPrice2: 0,
      aAttr: [],
      itemTotal: 0
    }
    this.myScroll= null;
    this.oUpRefresh= null;
    this.curPage= 1;
    this.maxPage = 0;
    this.offsetBottom = 100;
    this.bPriceMenu = false;
    this.bSalesMenu = false;
    this.oType = 'all';
    this.sParams = '';
    this.sKeywords = '';
    this.cid = '';
    this.fPrice1 = '';
    this.fPrice2 = '';
    this.sParam = '';
    this.aParam = [];
  }
  componentDidMount() {
    this.myScroll = new IScroll(this.refs['screen'], {
      screenX: false,
      scrollY: true,
      preventDefault: false,
      disablePointer:true,
      disableTouch:false,
      disableMouse:true
    });

    this.sKeywords = decodeURIComponent(localParam(this.props.location.search).search.keywords);
    this.setState({sKeywords:this.sKeywords});
    this.getPageDate();
    this.getClassifyData();
    this.getAttrData();
  }
  // 显示筛选面板
  showScreen(){
    this.refs['mask'].addEventListener("touchmove",function (e) {
      e.preventDefault();
    },{ passive: false },false);

    this.refs['screen'].addEventListener("touchmove",function (e) {
      e.preventDefault();
    },{ passive: false },false);
    this.setState({  screenMove:Css['move'], maskShow: true });
  }
  // 隐藏筛选面板
  hideScreen(){
    this.setState({  screenMove:Css['un-move'], maskShow:false });
  }
  goBack(){
    this.props.history.goBack();
  }
  // 显示隐藏价格排序
  handlePriceOrder (){
    this.bSalesMenu = false;
    this.setState({bSalesMenu:false});
    if (!this.bPriceMenu) {
      this.bPriceMenu = true;
      this.setState({ bPriceMenu:true})
    } else {
      this.bPriceMenu = false;
      this.setState({ bPriceMenu:false})
    }
  }

  // 显示隐藏销量排序
  handleSalesOrder(){
    this.bPriceMenu = false;
    this.setState({bPriceMenu:false});
    if (!this.bSalesMenu) {
      this.setState({ bSalesMenu:true })
    } else {
      this.setState({ bSalesMenu:false})
    }
  }
  changeSearch(){
    this.setState({pageStyle:{display: 'block'}});
  }
  getStyle(val) {
    this.setState({pageStyle: val});
  }

  getPageDate(){
    this.setParams();

    let url = config.baseUrl + '/api/home/goods/search?'+ this.sParams + '&page=1&token=' + config.token;
    request(url).then(res =>{
      if (res.code === 200) {
        this.setState({aGoods: res.data, itemTotal:res.pageinfo.total},()=>{
          lazyImg();
        });
        this.maxPage = res.pageinfo.pagenum;
        this.getScrollPage();
      } else {
        this.setState({aGoods: [], itemTotal:0});
      }
    })
  }
  getScrollPage(){
    this.oUpRefresh = new UpRefresh({'curPage': this.curPage, 'maxPage':this.maxPage, 'offsetBottom': this.offsetBottom},  curPage => {
      let url = config.baseUrl + 'api/home/goods/search?' + this.sParams + '&page=' + curPage + '&token=' + config.token;
      request(url).then(res =>{
        if (res.code === 200) {
            lazyImg();
              if (res.data.length > 0 ) {
                let aGoods = this.state.aGoods;
                for( let i=0; i<res.data.length; i++) {
                  aGoods.push(res.data[i]);
                }
                this.setState({aGoods: aGoods}, ()=> {
                  lazyImg();
                });
              }

          }


      })
    })
  }
  setParams (){
    this.sParams = 'kwords='+ this.sKeywords +'&param='+ this.sParams +'&price1='+ this.fPrice1 +'&price2='+ this.fPrice2 +'&otype=' + this.oType + '&cid='+ this.cid
  }
  // 价格排序
  checkedPriceOrder(index){
    let aPriceOrder = this.state.aPriceOrder;
    for( let i=0; i < aPriceOrder.length; i++) {
      aPriceOrder[i].checked = false;
    }
    aPriceOrder[index].checked = true;
    this.setState({aPriceOrder: aPriceOrder});
    this.oType = aPriceOrder[index].type;
    this.getPageDate();
  }
  getChildKeywords(val){
    this.sKeywords = val;
    this.setState({sKeywords:val,pageStyle:{display: 'none'}});
    this.props.history.replace(config.path + 'goods/search?keywords='+ val);
    this.setRest();
    this.getPageDate();
    this.getAttrData();
  }
  // 分类筛选显示隐藏
  handleClassify() {
    let aClassify = this.state.aClassify;
    if (aClassify.checked) {
      aClassify.checked = false;
    } else {
      aClassify.checked = true;
    }
    this.setState({aClassify: aClassify});
  }

  // 选择分类
  checkedClassify(index){
    let aClassify= this.state.aClassify;
    if (aClassify.items.length > 0){
      for(let i=0; i< aClassify.items.length; i++) {
        if (i !== index) {
          aClassify.items[i].checked = false;
        }
      }
      if (aClassify.items[index].checked) {
        aClassify.items[index].checked = false;
        this.cid = '';
      } else  {
        aClassify.items[index].checked = true;
        this.cid = aClassify.items[index].cid;
      }
      this.setState({aClassify: aClassify});
    }
  }

  // 价格范围显示隐藏
  handlePrice() {
    let aPrice = this.state.aPrice;
    if (aPrice.checked) {
      aPrice.checked = false;
    } else {
      aPrice.checked =true;
    }
    this.setState({aPrice: aPrice});
  }
  // 选择价格
  checkedPrice(index, price1, price2) {
    let aPrice = this.state.aPrice,
        fPrice1 = price1,
        fPrice2 = price2;
    if (aPrice.items.length> 0) {
      for (let i=0; i<aPrice.items.length; i++) {
        if (i !== index){
          aPrice.items[i].checked = false;
        }
      }
      if (aPrice.items[index].checked) {
        aPrice.items[index].checked = false;
        fPrice1 = 0;
        fPrice2 = 0;
        this.fPrice1='';
        this.fPrice2 = '';
      } else {
        aPrice.items[index].checked = true;
        this.fPrice1 = aPrice.items[index].price1;
        this.fPrice2 = aPrice.items[index].price2;

      }
      this.setState({aPrice: aPrice, fPrice1: fPrice1, fPrice2:fPrice2});
    }
  }
  // 阻止冒泡
  preventBubble(e) {
    e.stopPropagation();
  }

  // 显示隐藏属性
  handleAttr (index) {
   let aAttr = this.state.aAttr;
   if (aAttr[index].checked) {
     aAttr[index].checked = false;
   } else {
     aAttr[index].checked = true;
   }
   this.setState({aAttr: aAttr});
  }
  // 选择属性的值
  checkedParams (attrIndex, paramIndex){
    let aAttr = this.state.aAttr;
    if (aAttr[attrIndex].param[paramIndex].checked) {
      aAttr[attrIndex].param[paramIndex].checked = false;
      for (let i=0; i < this.aParam.length; i++) {
        if(this.aParam[i] ===aAttr[attrIndex].param[paramIndex].pid){
          this.aParam.splice(i--,1);
          break;
        }
      }
    } else {
      aAttr[attrIndex].param[paramIndex].checked = true;
      this.aParam.push(aAttr[attrIndex].param[paramIndex].pid);
    }
    this.sParams = this.aParam.length > 0 ? JSON.stringify(this.aParam) : '';
    console.log(this.aParam);
    this.setState({aAttr: aAttr});
  }
  // 获取分类数据
  getClassifyData() {
      let url = config.baseUrl + '/api/home/category/menu?token=' + config.token;
      request(url).then(res => {
        if (res.code === 200) {
          let aClassify = this.state.aClassify;
          aClassify.items = res.data;
          for(let i=0; i< aClassify.items.length; i++){
            aClassify.items[i].checked = false;
          }
          this.setState({aClassify:aClassify},()=>{
            this.myScroll.refresh();
          });

        }
      })
  }
  // 获取属性数据
  getAttrData() {
    let url = config.baseUrl + '/api/home/goods/param?kwords=' + this.sKeywords +'&token=' + config.token;
    request(url).then(res => {
      if (res.code === 200) {
        let aAttr = res.data;
        for (let i=0; i<aAttr.length; i++) {
            aAttr[i].checked = true;
            if (aAttr[i].param.length > 0){
              for (let j=0; j<aAttr[i].param.length; j++) {
                aAttr[i].param[j].checked = false;
              }
            }
        }
       this.setState({aAttr:aAttr},()=>{
         this.myScroll.refresh();
       })
      }
    })
  }
  // 确定搜索
  goSearch() {
    this.getPageDate();
    this.hideScreen();
  }
  // 监听价格范围1的值
  changePrice1 (e){
    this.setState({fPrice1: e.target.value.replace(/[a-zA-Z]|[\u4e00-\u9fa5]|[#|*|,|+|;]/g,'')},()=> {
      this.fPrice1 = this.state.fPrice1;
    })
  }
  // 监听价格范围2的值
  changePrice2 (e){
    this.setState({fPrice2: e.target.value.replace(/[a-zA-Z]|[\u4e00-\u9fa5]|[#|*|,|+|;]/g,'')},()=> {
      this.fPrice2 = this.state.fPrice2;
    })
  }
  // 全部重置
  setRest() {
    this.sParams='';
    this.aParam = [];
    this.cid = '';
    this.fPrice1 = '';
    this.fPrice2 ='';
    this.oType = '';
    // 分类重置
    let aClassify = this.state.aClassify;
    if (aClassify.items.length > 0) {
      for (let i=0; i<aClassify.items.length; i++ ) {
        aClassify.items[i].checked = false;
      }
    }
    // 价格范围重置
    let aPrice = this.state.aPrice;
    for(let i=0; i<aPrice.items.length; i++) {
      aPrice.items[i].checked= false;
    }
    // 属性重置
    let aAttr = this.state.aAttr;
    if(aAttr.length > 0) {
      for( let i=0; i< aAttr.length; i++) {
        for (let j=0; j<aAttr[i].param.length; j++){
          aAttr[i].param[j].checked = false;
        }
      }
    }
    this.setState({fPrice1:0, fPrice2:0, aClassify:aClassify, aPrice: aPrice, aAttr: aAttr});
  }
  pushPage(url){
    this.props.history.push(config.path+ url);
  }
  componentWillUnmount() {
    this.setState = (state,callback) => {
      return;
    }
  }
  render() {
    return (
      <div className={Css['page']}>
        <div className={Css['search-head']}>
          <div className={Css['search-header']}>
            <div className={Css['back']} onClick={this.goBack.bind(this)}></div>
            <div className={Css['search-wrap']}>
              <div className={Css['search-icon']}></div>
              <div className={this.state.sKeywords ? Css['search-text'] : Css['search-text'] +' ' + Css['search-text-null'] }  onClick={this.changeSearch.bind(this)}>{ this.state.sKeywords ? this.state.sKeywords : '请输入宝贝名称'}</div>
            </div>
            <div className={Css['btn-screen']} onClick={this.showScreen.bind(this)}>筛选</div>
          </div>
          <div className={Css['order-main']}>
            <div className={this.state.bPriceMenu ? Css['order-item'] + ' ' + Css['active'] : Css['order-item']} onClick={this.handlePriceOrder.bind(this)}>
              综合
              <ul className={this.state.bPriceMenu ?  Css['order-menu'] : Css['order-menu']+ ' hide'}>
                {
                  this.state.aPriceOrder.map((item, index) => {
                    return (
                        <li key={index} onClick={this.checkedPriceOrder.bind(this,index)} className={item.checked ? Css['active'] : ''}>{ item.title }</li>
                    )
                  })
                }
              </ul>
            </div>
            <div className={this.state.bSalesMenu ? Css['order-item'] + ' ' + Css['active']: Css['order-item']} onClick={this.handleSalesOrder.bind(this)}>
              销量
            </div>
          </div>
        </div>
        <div className={Css['goods-main']}>
          {
            this.state.aGoods.length > 0 ?
                this.state.aGoods.map((item, index) => {
                  return (
                    <div key={index} className={Css['goods-list']} onClick={this.pushPage.bind(this,'goods/details/item?gid='+ item.gid)}>
                      <div className={Css['image']}>
                        <img src={require("../../../assets/images/common/lazyImg.jpg")} data-echo={item.image} alt={item.title}/>
                      </div>
                      <div className={Css['goods-content']}>
                        <div className={Css['goods-title']}>{item.title}</div>
                        <div className={Css['price']}>&yen;{item.price}</div>
                        <div className={Css['sales']}>销量 <span>{item.sales}</span> 件</div>
                      </div>
                    </div>
                  )
                })
                : <div className="search-no">没有搜到相关商品！</div>
          }
        </div>
        <div ref="mask" className={ this.state.maskShow ? Css['mask'] : Css['mask']+ ' hide'} onClick={this.hideScreen.bind(this)}></div>
        <div ref="screen" className={Css['screen'] + ' ' + this.state.screenMove }>
          <div>
            <div className={Css['attr-wrap']}>
              <div className={this.state.aClassify.checked ? Css['attr-title-wrap'] : Css['attr-title-wrap'] + ' ' + Css['up']} onClick={this.handleClassify.bind(this)}>
                <div className={Css['title']}>分类</div>
              </div>
              <div className={this.state.aClassify.checked ? Css['item-wrap'] : Css['item-wrap'] + ' hide' }>
                {
                  this.state.aClassify.items.length > 0 ?
                    this.state.aClassify.items.map((item, index)=>{
                      return (
                          <div key={index} className={item.checked ? Css['item'] + ' ' + Css['active'] :  Css['item'] } onClick={this.checkedClassify.bind(this, index)} >
                            <span className={Css['inner']}>{item.title}</span>
                          </div>
                      )
                    })
                      :''
                }
              </div>
            </div>
            <div className={Css['attr-wrap']}>
              <div className={this.state.aPrice.checked ? Css['attr-title-wrap'] :  Css['attr-title-wrap'] + ' ' + Css['up']} onClick={this.handlePrice.bind(this)}>
                <div className={Css['title']}>价格区间</div>
                <div onClick={this.preventBubble.bind(this)}>
                  <input type="number" className={Css['price-input']} placeholder="最低价" value={this.state.fPrice1=== 0 ? '' : this.state.fPrice1 } onChange={this.changePrice1.bind(this)}  />
                </div>
                <div className={Css['price-line']}></div>
                <div onClick={this.preventBubble.bind(this)}>
                  <input type="number" className={Css['price-input']} placeholder="最高价" value={this.state.fPrice2=== 0 ? '' : this.state.fPrice2 } onChange={this.changePrice2.bind(this)}   />
                </div>
              </div>
              <div className={this.state.aPrice.checked ? Css['item-wrap'] : Css['item-wrap'] + ' hide'}>
                {
                  this.state.aPrice.items.length > 0 ?
                      this.state.aPrice.items.map((item, index) => {
                        return (
                            <div key={index} className={item.checked ? Css['item']+' '+ Css['active'] : Css['item']} onClick={this.checkedPrice.bind(this, index, item.price1, item.price2)}>
                              <span className={Css['inner']}>{item.price1}-{item.price2}</span>
                            </div>
                        )
                      })
                      :''
                }
              </div>
            </div>
            {
              this.state.aAttr.length > 0 ?
                  this.state.aAttr.map((item, index) =>{
                    return (
                        <React.Fragment key={index}>
                          <div  className={index === 0 ? Css['attr-wrap']+' '+ Css['attr-brand']: Css['attr-wrap']}>
                            <div className={item.checked ? Css['attr-title-wrap'] : Css['attr-title-wrap'] + ' ' + Css['up']} onClick={this.handleAttr.bind(this, index)}>
                              <div className={Css['title']}>{item.title}</div>
                            </div>
                            <div className={item.checked ? Css['item-wrap'] :Css['item-wrap'] + ' hide'}>
                              {
                                item.param.length > 0 ?
                                    item.param.map((item2, index2) => {
                                      return (
                                              <div key={index2} className={item2.checked ? Css['item']+' '+ Css['active'] : Css['item'] } onClick={this.checkedParams.bind(this, index, index2)}>
                                                <span className={Css['inner']}>{item2.title}</span>
                                                </div>
                                          )

                                    }) : ''
                              }
                            </div>
                          </div>
                        </React.Fragment>

                    )
                  })
                  :''
            }
            <div style={{height:'1.04rem'}}></div>
          </div>
          <div className={Css['handel-wrap']}>
            <div className={Css['item']}>共<span>{this.state.itemTotal}</span>件</div>
            <div className={Css['item']} onClick={this.setRest.bind(this)}>全部重置</div>
            <div className={Css['item']} onClick={this.goSearch.bind(this)}>确定</div>
          </div>
        </div>
        <SearchComponent pageStyle={this.state.pageStyle} childStyle={this.getStyle.bind(this)} isLocal="1" childKeywords={this.getChildKeywords.bind(this)} keywords={this.state.sKeywords }></SearchComponent>
      </div>
    )
  }
}
