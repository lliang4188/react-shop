import React from 'react';
import {connect} from 'react-redux';
import actions from '../../../actions';
import SubHeader from "../../../components/header/subheader";
import Css from "../../../assets/css/home/cart/index.css";


class CartIndex extends React.Component {
  constructor(){
    super();
    this.state = {
        bAllChecked: true
    }
  }
  componentDidMount() {
    this.isAllChecked();
  }
  // 删除商品
  delItem(index){
    if (this.props.state.cart.aCartData.length > 0) {
      this.props.dispatch(actions.cart.delItem({index:index}));
    }
  }
  // 选择商品
  checkItem( index,checked ){
    if (this.props.state.cart.aCartData.length > 0) {
      this.props.dispatch(actions.cart.checkItem({index:index, checked:checked}));
    }
    this.isAllChecked();
  }

  // 是否全选
  isAllChecked(){
    if (this.props.state.cart.aCartData.length > 0) {
      let bChecked = true;
      for (let key in this.props.state.cart.aCartData) {
        if(!this.props.state.cart.aCartData[key].checked){
          this.setState({bAllChecked:false});
          bChecked = false;
        }
        if(bChecked){
          this.setState({bAllChecked:true});
        }
      }
    }
  }
  // 点击全选
  setAllChecked(checked){
    if (this.props.state.cart.aCartData.length > 0){
      this.setState({bAllChecked:checked});
      this.props.dispatch(actions.cart.setAllChecked({checked:checked}));
    }
  }
  componentWillUnmount() {
    this.setState = (state,callback) => {
      return;
    }
  }
  render() {
    return (
        <div className={Css['cart-page']}>
          <SubHeader title="购物车"></SubHeader>
          <div className={Css['cart-main']}>
            {
              this.props.state.cart.aCartData.length > 0 ?
                this.props.state.cart.aCartData.map((item, index)=>{
                  return (
                    <div key={index} className={Css['cart-list']}>
                      <div className={item.checked ? Css['select-btn']+ ' '+ Css['active']: Css['select-btn']} onClick={this.checkItem.bind(this, index, !item.checked)}></div>
                      <div className={Css['img-wrap']}>
                        <div className={Css['image']}>
                          <img src={item.img} alt={item.title}/>
                        </div>
                        <div className={Css['del']} onClick={this.delItem.bind(this, index)}>删除</div>
                      </div>
                      <div className={Css['goods-wrap']}>
                        <div className={Css['goods-title']}>{item.title}</div>
                        <div className={Css['goods-attr']}>
                          {
                            item.attrs.length > 0 ?
                              item.attrs.map((item2, index2) => {
                                return(
                                  <span key={index2} >{item2.title}：
                                    {
                                      item2.param.length > 0 ?
                                        item2.param.map((item3, index3) => {
                                          return(
                                            <React.Fragment key={index3}>{item3.title}</React.Fragment>
                                          )
                                        })
                                        :''
                                    }
                                  </span>
                                )
                              })
                              :''
                          }
                        </div>
                        <div className={Css['buy-wrap']}>
                          <span className={Css['price']}>&yen;{item.price}</span>
                          <div className={Css['amount-input-wrap']}>
                            <div className={Css['btn']+ ' ' + Css['dec']+ ' ' + Css['active']}>-</div>
                            <div className={Css['amount-input']}>
                              <input type="tel" defaultValue={item.amount}/>
                            </div>
                            <div className={Css['btn']+ ' ' + Css['inc']}>+</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
                :''
            }

          </div>
          <div className={Css['bottom-nav']}>
            <div className={Css['select-wrap']} onClick={this.setAllChecked.bind(this, !this.state.bAllChecked)}>
              <div className={this.state.bAllChecked ? Css['select-btn']+ ' ' +Css['active']: Css['select-btn']} ></div>
              <span className={Css['select-text']}>全选</span>
            </div>
            <div className={Css['total']}>运费：<span>&yen;10</span>合计：<span>&yen;{this.props.state.cart.total}</span></div>
            <div className={Css['order-btn']}>去结算</div>

          </div>
        </div>
    )
  }
}

export default connect((state)=>{
  return{
    state:state
  }
})(CartIndex)
