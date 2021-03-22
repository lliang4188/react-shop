import React from 'react';
import Css from '../../../assets/css/home/goods/items.css';
import {request} from "../../../assets/js/libs/request";
import {lazyImg,localParam, isSystem} from '../../../assets/js/utils/util';
import config from "../../../assets/js/conf/config";
import IScroll from '../../../assets/js/libs/iscroll';
export default class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      aGoods:[]
    }
  }
  componentDidMount() {
    this.getDate(this.props);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.getDate(nextProps);
  }

  eventScroll(){
    let  scrollGoods = this.refs['scroll_goods'];
    scrollGoods.addEventListener('touchmove', function (e) { e.preventDefault();},
        { passive: false });
    this.myScroll= new IScroll( scrollGoods, {

      scrollX : false,
      scrollY : true,
      preventDefault : false,
      disablePointer:true,
      disableTouch:false,
      disableMouse:true
    });
  }
  getDate(props){
    let cid = props.location.search ? localParam(props.location.search).search.cid :'';

    request(config.baseUrl+'api/home/category/show?cid='+ cid +'&token='+config.token).then(res =>{

      if (res.code === 200) {
        this.setState({aGoods:res.data},()=>{

          this.eventScroll();
          lazyImg();
          this.myScroll.on('scrollEnd',()=>{
            lazyImg();
          });
        });
      } else {
        this.setState({aGoods:[]});
      }
    })
  }
  componentWillUnmount() {
    this.setState = (state,callback) => {
      return;
    }
  }
  pushPage(url){
    this.props.history.push(config.path + url);
  }

  render() {
    return (
      <div className={Css['goods-content-main']} ref="scroll_goods">

          <div>
            {
              this.state.aGoods.length > 0 ?
                this.state.aGoods.map((item, index)=>{
                  return(
                    <div key={index} className={Css['goods-wrap']}>
                      <div className={Css['classify-name']}>{item.title}</div>
                      <div className={Css['goods-item-wrap']} key={index}>
                        <ul className={Css['goods-list']}>
                          {
                            item.goods != null ?
                              item.goods.map((item2, index2) =>{
                                return(
                                  <li key={index2} onClick={this.pushPage.bind(this,'goods/details/item?gid='+item2.gid)}>
                                    <div className={Css['goods-img']}>
                                     <img src={require("../../../assets/images/common/lazyImg.jpg")} data-echo={item2.image} alt={item2.title}/>
                                    </div>
                                    <div className={Css['goods-text']}>{item2.title}</div>
                                  </li>
                                )
                              })
                              : ''
                          }


                        </ul>
                      </div>
                    </div>

                  )
                })
                : <div class="no-data">没有相关数据~~</div>
            }
            {
              isSystem() === 1 ? <div style={{height:'1.8rem'}}></div> : <div style={{height:'0.5rem'}}></div>
            }

          </div>
        </div>
    )
  }
}
