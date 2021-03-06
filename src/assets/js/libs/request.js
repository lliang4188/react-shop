import ReactDom from 'react-dom';
let onLoad = ReactDom.findDOMNode(document.getElementById('page-load'));
function request (pUrl, pType= 'get'.toLocaleLowerCase(), data={}) {
  showLoad();

  let config = {},
      headers={},
      params='';
  if (pType ==='file'.toLocaleLowerCase()){
     pType = 'post';
    if(data instanceof Object){
      params = new FormData();
      for(let key in data){
        params.append(key,data[key]);
      }
      config = {
        method:pType,
        body: params
      }
    }
  } else if (pType === 'get'.toLocaleLowerCase()) {
    config = {
      method: pType
    }
  } else {
    headers = {
      'Content-Type':'application/x-www-form-urlencoded'
    };
    if (data instanceof Object) {
      for (let key in data){
        params+= `&${key}=${encodeURIComponent(data[key])}`;
      }
      params = params.slice(1);
    }
    config = {
      method: pType,
      headers,
      body:params
    }
    hideLoad();
  }

  return fetch(pUrl, config).then(res => {
    hideLoad();
    return res.json();
  });
}

function showLoad() {
  onLoad.style.display = 'block';
}
function hideLoad() {
  onLoad.style.display = 'none';
}
export {
  request
}
