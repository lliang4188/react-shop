import React from 'react';
import config from "../../../assets/js/conf/config";
import {lazyImg} from "../../../assets/js/utils/util";
import {request} from "../../../assets/js/libs/request";
import Swiper from '../../../assets/js/libs/swiper.min';
import '../../../assets/css/common/swiper.min.css';
import Css from '../../../assets/css/home/index/index.css';
import SearchComponent from "../../../components/search/search";
export default class IndexComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      aSwiper: [],
      aNav: [],
      aGoods:[],
      aRecoGoods:[],
      bScroll: false,
      pageStyle:{display:'none'}
    };
    this.bScroll= true;
  }
  componentDidMount() {
    this.getSwiper();
    this.getNav();
    this.getGoodsLevel();
    this.getReco();
    window.addEventListener('scroll',this.eventScroll.bind(this),false);
  }
  componentWillUnmount() {
    this.bScroll =false;
    window.removeEventListener('scroll',this.eventScroll.bind(this));
  }

  eventScroll(){
    if (this.bScroll){
      let iScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if(iScrollTop >= 60){
        this.setState({ bScroll:true})
      } else {
        this.setState({ bScroll:false})
      }
    }


  }
  getSwiper(){
    request(config.baseUrl+'/api/home/index/slide?token='+config.token).then(res => {
       if (res.code === 200) {
         this.setState({aSwiper:res.data},()=>{
           Swiper = new Swiper('.'+Css['swiper-wrap'], {
             autoplay:3000,
             pagination: '.swiper-pagination',
             autoplayDisableOnInteraction: false
           })
         })
       }
    });
  }

  getNav(){
    request(config.baseUrl+'/api/home/index/nav?token='+config.token).then(res =>{
      if (res.code === 200){
        this.setState({aNav:res.data});
      }
    })
  }
  getGoodsLevel(){
    request(config.baseUrl+'/api/home/index/goodsLevel?token='+config.token).then(res=>{

      if (res.code === 200) {
        this.setState({aGoods: res.data},()=>{
          lazyImg();
        })
      }
    })
  }

  getReco(){
    request(config.baseUrl+'/api/home/index/recom?token='+config.token).then(res=>{
      if (res.code === 200) {
        this.setState({aRecoGoods: res.data},()=>{
          lazyImg();
        })
      }
    })
  }
  pushPage (pUrl){
    this.props.history.push(config.path+pUrl)
  }
  changeSearch(){
    this.setState({pageStyle:{display: 'block'}});
  }
  getStyle(val) {
    this.setState({pageStyle: val});
  }

  render() {
    return (
        <div className={Css['page']}>
          <div>
          <div className={this.state.bScroll ? Css['search-header']+ ' ' + Css['red-bg']:Css['search-header']}>
            <div className={Css['classify-icon']} onClick={this.pushPage.bind(this, 'goods/classify/items')}></div>
            <div className={Css['search-wrap']} onClick={this.changeSearch.bind(this)}>
              <i className={Css['search-icon']}></i>
              <div className={Css['search-text']}>请输入宝贝名称</div>
            </div>
            <div className={Css['login-wrap']}>
              <span>登录</span>
            </div>
          </div>
          <div className={Css['swiper-wrap']}>
            <div className="swiper-wrapper">
              {
                this.state.aSwiper != null ?
                this.state.aSwiper.map((item, index)=>{
                  return (
                    <div key={index} className="swiper-slide"><a href={item.webs} target="_blank" rel="noopener noreferrer" ><img src={item.image} alt={item.title}/></a></div>
                  )
                }) : ''
              }
            </div>
            <div className="swiper-pagination"></div>
          </div>
          <div className={Css['quick-nav']}>
            {
              this.state.aNav != null ?
              this.state.aNav.map((item, index)=> {
                return (
                  <div key={index} className={Css['item']}>{item.title}</div>
                )
              }) : ''
            }
          </div>
          {
            this.state.aGoods != null ?
              this.state.aGoods.map((item, index)=>{
                return(
                  <div key={index} className={Css['goods-level-wrap']}>
                    <div className={Css['classify-title']+ ' '+ Css['color' +(index+1)]}>—— {item.title} ——</div>
                    {index %2 === 0 ?
                      <div className={Css['goods-level1-wrap']}>
                        {
                          item.items != null ?
                                <div className={Css['goods-level1-item0']}>
                                  <div className={Css['goods-title']}>{item.items[0].title}</div>
                                  <div className={Css['goods-info']}>
                                    <span className={Css['goods-text']}>精品打折</span>
                                    <span className={Css['goods-price'+(index+1)]}>{item.items[0].price}元</span>
                                  </div>
                                  <div className={Css['goods-img']}>
                                    <img src={require('../../../assets/images/common/lazyImg.jpg')} data-echo={item.items[0].image} alt={item.items[0].title}/>
                                  </div>
                                </div>
                            :''
                        }
                        <div className={Css['goods-level1-item1']}>
                          {
                            item.items != null ?
                              item.items.slice(1,3).map((item2, index2)=>{
                                return (
                                  <div key={index2} className={Css['goods-row']}>
                                    <div className={Css['goods-row-info']}>
                                      <div className={Css['goods-row-title']}>{item2.title}</div>
                                      <div className={Css['goods-row-text']}>品质精选</div>
                                    </div>
                                    <div className={Css['goods-row-img']}>
                                      <img src={require('../../../assets/images/common/lazyImg.jpg')} data-echo={item2.image} alt={item2.title}/>
                                    </div>
                                  </div>
                                )
                              })
                              :''
                          }

                        </div>
                      </div>
                      :
                      <div className={Css['goods-level1-wrap']}>
                        {
                          item.items != null ?
                            item.items.slice(0,2).map((item2,index2)=>{
                              return (
                                <div key={index2} className={Css['goods-level1-item0']}>
                                  <div className={Css['goods-title2']}>{item2.title}</div>
                                  <div className={Css['goods-text2']}>精品打折</div>
                                  <div className={Css['goods-img2']}>
                                    <img src={require('../../../assets/images/common/lazyImg.jpg')} data-echo={item2.image} alt="item2.title"/>
                                  </div>
                                </div>
                              )
                            })
                            :''
                        }
                      </div>
                    }

                    <div className={Css['goods-list-warp']}>
                      {
                        item.items != null ?
                          item.items.slice(index%2===1?2:3).map((item2,index2)=> {
                              return (
                                <div key={index2} className={Css['goods-list']}>
                                  <div className={Css['title']}>{item2.title}</div>
                                  <div className={Css['image']}>
                                    <img src={item2.image} alt={item2.title}/>
                                  </div>
                                  <div className={Css['price']}>&yen;{item2.price}</div>
                                  <div className={Css['unprice']}>&yen;{item2.price*1.5}</div>
                                </div>
                              )
                            }
                          )
                          :''
                      }
                    </div>
                  </div>
                )
              })
              :''
          }
          <div className={Css['reco-title-warp']}>
            <div className={Css['line']}></div>
            <div className={Css['reco-text-wrap']}>为你推荐</div>
            <div className={Css['line']}></div>
          </div>
          <div className={Css['reco-item-wrap']}>
            {
              this.state.aRecoGoods != null ?
                this.state.aRecoGoods.map((item2, index2)=>{
                  return(
                    <div key={index2} className={Css['reco-item']}>
                      <div className={Css['inner']}>
                        <div className={Css['image']}>
                          <img src={require('../../../assets/images/common/lazyImg.jpg')} data-echo={item2.image} alt={item2.title}/>
                        </div>
                        <div className={Css['title']}>{item2.title}</div>
                        <div className={Css['price']}>&yen;{item2.price}</div>
                      </div>
                    </div>
                  )
                })
                :''
            }
          </div>
          </div>
          <SearchComponent pageStyle={this.state.pageStyle} childStyle={this.getStyle.bind(this)}></SearchComponent>
        </div>
    )
  }
}
