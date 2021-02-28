let cartData = {
  aCartData:localStorage['cartData'] !== undefined ? JSON.parse(localStorage['cartData']) : [],
  total: localStorage['total'] !== undefined ? parseFloat(localStorage['total']) : 0,
  freight:localStorage['freight'] !== undefined ? parseFloat(localStorage['freight']) : 0
};
function cartReducer(state = cartData, action) {
  switch (action.type) {
    case 'addCart':
      addCart(state, action.data);
      return Object.assign({}, state, action);
    case 'delItem':
      delItem(state, action.data);
      return Object.assign({}, state, action);
    case 'checkItem':
      checkItem(state, action.data);
      return Object.assign({}, state, action);
    case 'allItem':
      setAllChecked(state, action.data);
      return Object.assign({}, state, action);
    case 'incAmount':
      incAmount(state, action.data);
      return Object.assign({}, state, action);
    case 'decAmount':
      decAmount(state, action.data);
      return Object.assign({}, state, action);
    case 'changeAmount':
      changeAmount(state, action.data);
      return Object.assign({}, state, action);
    default:
      return state;
  }
}
// 添加商品
function addCart(state, action) {
  let bSameItem = false;
  if (state.aCartData.length > 0){
    // 有相同的商品数量
    for( let key in state.aCartData){
      if (state.aCartData[key].gid === action.gid && JSON.stringify(state.aCartData[key].attrs) === JSON.stringify(action.attrs)){
        state.aCartData[key].amount += action.amount;
        bSameItem = true;
        break;
      }
    }
  }
  // 没有相同数据增加到购物车
  if (!bSameItem) {
    state.aCartData.push(action);
  }

  setTotal(state);
  setFreight(state);
  localStorage['cartData']=JSON.stringify(state.aCartData);
}
// 删除商品
function delItem(state,action) {
  state.aCartData.splice(action.index,1);
  setTotal(state);
  setFreight(state);
  localStorage['cartData']=JSON.stringify(state.aCartData);
}
// 选择商品
function checkItem(state,action) {

  state.aCartData[action.index].checked = action.checked;
  setTotal(state);
  setFreight(state);
  localStorage['cartData']=JSON.stringify(state.aCartData);
}

// 全选
function setAllChecked(state,action) {
  if (action.checked) {
      for(let key in state.aCartData) {
        state.aCartData[key].checked = true
      }
  } else {
    for (let key in state.aCartData){
      state.aCartData[key].checked = false;
    }
  }

  setTotal(state);
  setFreight(state);
  localStorage['cartData']=JSON.stringify(state.aCartData);
}

// 增加商品数量
function incAmount(state,action) {
  state.aCartData[action.index].amount += 1;
  setTotal(state);
  localStorage['cartData']=JSON.stringify(state.aCartData);
}

// 减少商品数量
function decAmount(state, action) {
  if (state.aCartData[action.index].amount > 1){
    state.aCartData[action.index].amount -=1;
    setTotal(state);
    localStorage['cartData']=JSON.stringify(state.aCartData);
  }
}
// 改变数量
function changeAmount(state, action) {
  state.aCartData[action.index].amount = action.amount;
  setTotal(state);
  localStorage['cartData']=JSON.stringify(state.aCartData);
}
// 重新计算总价
function setTotal(state) {
  let total = 0;
  for (let key in state.aCartData){
    if (state.aCartData[key].checked) {
      total+=parseFloat(state.aCartData[key].price)*parseInt(state.aCartData[key].amount);
    }
  }
  state.total = parseFloat(total.toFixed(2));
  localStorage['total'] = state.total;
}
// 计算运费
function setFreight(state) {
  let aFreight = [];
  for (let key in state.aCartData) {
    if (state.aCartData[key].checked) {
      aFreight.push(state.aCartData[key].freight);
    }
  }
  state.freight = Math.max.apply(null, aFreight);
  localStorage['freight']=state.freight;
}

export default cartReducer;
