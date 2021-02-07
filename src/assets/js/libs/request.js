import ReactDom from 'react-dom';



let onLoad = ReactDom.findDOMNode(document.getElementById('page-load'));
function request (pUrl, pType= 'GET') {
  showLoad();
  return fetch(pUrl, {method: pType}).then(res => {
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
