import React from 'react';
import ReactDOM from 'react-dom';
import Css from '../../../assets/css/home/goods/details_item.css';
import SwiperCore, {Pagination} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Toast} from 'antd-mobile';
import {request} from "../../../assets/js/libs/request";
import TweenMax from '../../../assets/js/libs/TweenMax';
import {lazyImg,localParam,setScrollTop} from '../../../assets/js/utils/util';
import config from "../../../assets/js/conf/config";
import 'swiper/swiper-bundle.min.css';
SwiperCore.use([ Pagination]);
export default class DetailsItem extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      bMask: false,
      sCartPanel:Css['down'],
      gid:props.location.search !== '' ? localParam(props.location.search).search.gid : '',
      aAttr: [],
      iAmount: 1,
      aSlide:[],
      aTitle: '',
      aPrice: 0,
      aSales: '',
      aFreight: 0,
      aReviews:[],
      iReviewTotal:0

    };
    this.bMove = false;
  }
  componentDidMount() {
    setScrollTop();
    this.getGoodsInfo();
    this.getGoodsAttr();
    this.getReviews();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log(nextProps.props);
  }
  replacePage(url) {
    this.props.history.replace(config.path+ url)
  }
  // 获取商品轮播图和商品信息
  getGoodsInfo(){
    let sUrl = config.baseUrl+'/api/home/goods/info?gid='+ this.state.gid +'&type=details&token=' +config.token;
    request(sUrl).then((res)=>{
      if (res.code === 200) {
        this.setState({
          aSlide: res.data.images,
          aTitle:res.data.title,
          aPrice:res.data.price,
          aSales:res.data.sales,
          aFreight:res.data.freight
        });
      }
    })
  }
  // 获取商品规格属性
  getGoodsAttr(){
    let sUrl = config.baseUrl+'/api/home/goods/info?gid='+ this.state.gid +'&type=spec&token='+config.token;
    request(sUrl).then(res =>{
      if(res.code === 200){
        this.setState({aAttr:res.data});
      }
    })
  }
  // 获取商品评价
  getReviews(){
    let sUrl = config.baseUrl+ '/api/home/reviews/index?gid='+ this.state.gid +'&token='+config.token+'&page=1';
    request(sUrl).then(res =>{
      if(res.code === 200){
          this.setState({aReviews:res.data,iReviewTotal: res.pageinfo.total},()=>{
            lazyImg();
          })
      } else {
        this.setState({aReviews:[]});
      }
    });
  }

  // 显示购物车控制面板
  showCartPanel(){
    this.refs['mask'].addEventListener("touchmove",function (e) {
      e.preventDefault();
    },{ passive: false });
    this.setState({sCartPanel:Css['up'], bMask:true});
  }
  // 隐藏购物车控制面板
  hideCartPanel(){
    if(!this.bMove){
      this.setState({sCartPanel:Css['down'], bMask:false});
    }
  }
  // 选择属性值
  selectAttrVal(attrIndex, valIndex) {
    let aAttr = this.state.aAttr;
    if (aAttr.length > 0) {
      for (let key in aAttr[attrIndex].values) {
        aAttr[attrIndex].values[key].checked = false;
      }
    }
    aAttr[attrIndex].values[valIndex].checked = true;
    this.setState({aAttr: aAttr});
  }

  // 加入收藏
  addFav(){
    Toast.info('收藏成功', 2);
  }
  // 增加数量
  incAmount(){
    let iAmount = this.state.iAmount;
    this.setState({iAmount: ++iAmount});
  }
  // 减少数量
  decAmount(){
    let iAmount = this.state.iAmount;
    if(iAmount > 1){
      this.setState({iAmount: --iAmount});
    }
  }

  // 加入购物车
  addCart() {
    this.checkAttrVal(()=>{
      if (!this.bMove){
        this.bMove = true;
        let oGoodImg = this.refs['goods-img'],
          oGoodsInfo = this.refs['goods-info'],
          oCartPanel = this.refs['cart-panel'],
          oCartIcon = ReactDOM.findDOMNode(document.getElementById('cart-icon'));

        let oCloneImg = oGoodImg.cloneNode(true);
        oGoodsInfo.appendChild(oCloneImg);
        let srcImgX = oGoodImg.offsetLeft;
        let cloneY = parseInt(window.innerHeight - oCartPanel.offsetHeight + oGoodImg.offsetTop-oCartIcon.offsetTop);
        oCloneImg.style.cssText='width:0.3rem; height:0.3rem;position:absolute;z-index:1; left:0.3rem; top:0.2rem';
        TweenMax.to(oCloneImg, 1, {bezier:[{x:srcImgX,y:-100},{x:srcImgX+30, y:-100},{x:oCartIcon.offsetLeft, y:-cloneY}],onComplete:()=>{
            oCloneImg.remove();
            this.bMove = false;
          }});
        TweenMax.to(oCloneImg,0.2,{rotation:360, repeat:-1});
      }
    });

  }
  // 检测是否选中属性值
  checkAttrVal(callback){

    let aAttr = this.state.aAttr,
        attrName= '',
        bSelect = false ;
    if(aAttr.length > 0){
      for(let key in aAttr){
        bSelect = false;

        for(let key2 in aAttr[key].values){
            if (aAttr[key].values[key2].checked){
              bSelect=true;
              break;
            }
          }
        if(!bSelect) {
          attrName = aAttr[key].title;
          break;

        }
      }
      if(!bSelect){
       Toast.info(`请选择${attrName}`,2);
      }
      if(bSelect){
        callback();
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
        <div className={Css['page']}>
          <div className={Css['swiper-wrap']}>
            <Swiper
              className="swiper-wrapper"
              pagination
            >
              {
                this.state.aSlide.length > 0 ?
                  this.state.aSlide.map((item, index)=>{
                    return (
                      <SwiperSlide key={index}>
                        <div>
                          <img src={item} alt=""/>
                        </div>

                      </SwiperSlide>
                    )
                  })
                  :''
              }

            </Swiper>
          </div>
          <div className={Css['goods-ele-main']}>
            <div className={Css['goods-title']}>{this.state.aTitle}</div>
            <div className={Css['price']}> &yen;{this.state.aPrice}</div>
            <div className={Css['sales-wrap']}>
              <span>快递:{this.state.aFreight}元</span>
              <span>月销量{this.state.aSales}件</span>
            </div>
          </div>
          <div className={Css['reviews-main']}>
            <h2 className={Css['reviews-title']}>商品评价（{this.state.iReviewTotal}）</h2>
            <div className={Css['reviews-wrap']}>
              {
                this.state.aReviews.length>0 ?
                  this.state.aReviews.map((item, index) => {
                    return (
                      <div key={index} className={Css['reviews-list']}>
                        <div className={Css['uinfo']}>
                          <div className={Css['head']}>
                            <img src='../../../assets/images/common/lazyImg.jpg' data-echo={item.head} alt={item.nickname}/>
                          </div>
                          <div className={Css['nickname']}>{item.nickname}</div>
                        </div>
                        <div className={Css['reviews-content']}>{item.content}</div>
                        <p className={Css['reviews-date']}>{item.times}</p>
                      </div>
                    )}
                  )
                  : <div className="no-data">没有相关评价~~</div>
              }
            </div>
            <div className={this.state.aReviews.length>0? Css['reviews-more']: 'hide'} onClick={this.replacePage.bind(this,'goods/details/reviews?gid='+this.state.gid)}>查看更多评价</div>
          </div>
          <div className={Css['bottom-btn-wrap']}>
            <div className={Css['btn']} onClick={this.addFav.bind(this)}>收藏</div>
            <div className={Css['btn']} onClick={this.showCartPanel.bind(this)}>加入购物车</div>
          </div>
          <div ref="mask" className={this.state.bMask ? Css['mask'] :Css['mask']+ ' hide'} onClick={this.hideCartPanel.bind(this)}></div>
          <div ref="cart-panel" className={Css['cart-panel'] + ' ' + this.state.sCartPanel}>
            <div className={Css['close-panel-wrap']}>
              <div className={Css['spot']}></div>
              <div className={Css['line']}></div>
              <div className={Css['close']} onClick={this.hideCartPanel.bind(this)}></div>
            </div>
            <div className={Css['goods-info']} ref="goods-info">
              <div className={Css['goods-img']} ref="goods-img">
                <img src={this.state.aSlide.length !==0 ? this.state.aSlide[0]:''} alt={this.state.aTitle}/>
              </div>
              <div className={Css['goods-wrap']}>
                <h4 className={Css['goods-title']}>
                  {this.state.aTitle}
                </h4>
                <div className={Css['goods-other']}>
                  <p className={Css['price']}>&yen;{this.state.aPrice}</p>
                  <p className={Css['goods-code']}>商品编码:{this.state.gid}</p>
                </div>
              </div>
            </div>
            <div className={Css['attr-wrap']}>
              {
                this.state.aAttr.length > 0 ?
                  this.state.aAttr.map((item, index) => {
                    return (
                      <div key={index} className={Css['attr-list']}>
                        <div className={Css['attr-name']}>{item.title}</div>
                        <div className={Css['val-wrap']}>
                          {
                            item.values.length > 0 ?
                              item.values.map((item2, index2) => {
                                return (
                                  <span key={index2} className={item2.checked ? Css['val'] + ' ' + Css['active'] : Css['val']} onClick={this.selectAttrVal.bind(this,index,index2)}>{item2.value}</span>
                                )
                              })
                              : ''
                          }
                        </div>
                      </div>
                    )
                  })

                  :''
              }
            </div>
            <div className={Css['amount-wrap']}>
              <div className={Css['amount-name']}>购买数量</div>
              <div className={Css['amount-input-wrap']}>
                <div className={this.state.iAmount <= 1 ? Css['btn'] + ' ' + Css['dec'] + ' ' + Css['active'] : Css['btn'] + ' ' + Css['dec']} onClick={this.decAmount.bind(this)}>-</div>
                <div className={Css['amount-input']}>
                  <input type="tel" value={this.state.iAmount} onChange={(e)=>{
                    this.setState({iAmount: e.target.value.replace(/[a-zA-Z]|[\u4e00-\u9fa5]|[#|*|,|+|;|.]/g,'')})
                  }}/>
                </div>
                <div className={Css['btn'] + ' ' + Css['inc']} onClick={this.incAmount.bind(this)}>+</div>
              </div>
            </div>
            <div className={Css['sure-btn']} onClick={this.addCart.bind(this)}>确定</div>
          </div>
        </div>

    )
  }
}
