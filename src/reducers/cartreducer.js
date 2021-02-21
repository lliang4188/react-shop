let cartData = {
  aCartData:localStorage['cartData'] !== undefined ? JSON.parse(localStorage['cartData']) : [],
  total: localStorage['total'] !== undefined ? parseFloat(localStorage['total']) : 0
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
    case 'setAllChecked':
      setAllChecked(state, action.data);
      return Object.assign({}, state, action);
    default:
      return state;
  }
}
function addCart(state, action) {
  let bSameItem = false;
  if (state.aCartData.length > 0){
    // 有相同的商品数量加1
    for( let key in state.aCartData){
      if (state.aCartData[key].gid === action.gid && JSON.stringify(state.aCartData[key].attrs) === JSON.stringify(action.attrs)){
        state.aCartData[key].amount += 1;
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

  localStorage['cartData']=JSON.stringify(state.aCartData);
}
// 删除商品
function delItem(state,action) {
  state.aCartData.splice(action.index,1);
  localStorage['cartData']=JSON.stringify(state.aCartData);
  setTotal(state);
}
// 选择商品
function checkItem(state,action) {

  state.aCartData[action.index].checked = action.checked;
  setTotal(state);
  localStorage['total'] = state.total;
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
  localStorage['cartData']=JSON.stringify(state.aCartData);
}

// 重新计算
function setTotal(state) {
  let total = 0;
  for (let key in state.aCartData){
    if (state.aCartData[key].checked) {
      total+=parseFloat(state.aCartData[key].price)*parseInt(state.aCartData[key].amount);
    }
    state.total = parseFloat(total.toFixed(2));

  }
  localStorage['total'] = state.total;
}

export default cartReducer;
