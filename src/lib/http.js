import request from 'superagent-bluebird-promise'
import QueryString from 'query-string';
import Cookie from 'js-cookie'

function normalizePath(path) {
  const qs = QueryString.parse(window.location.search)
  const token = qs.jwt || qs.redirectToken || getCookie('jwt') || ''
  let query = ''
  
  if (!!token)
    query = (path.indexOf('?') === -1?'?':'&') + 'jwt=' + token

  return path
}

export function post (path, data){
  path = normalizePath(path)
  return request
    .post(path)
    .timeout(60000)
    .withCredentials()
    .send(data)
    .then((res) => {
      return res.text?JSON.parse(res.text):null
    })
    .catch((error)=> {
      if(error.status !== 403) {
        console.log('EPI POST ERROR %s PATH %s DATA %s', JSON.stringify(error), path, JSON.stringify(data))
        //throw Error(error.message)
      }
    })
}

export function get (path){
  path = normalizePath(path)
  return request
    .get(path)
    .timeout(60000)
    .withCredentials()
    .then((res) => {
      return JSON.parse(res.text)
    })
    .catch((error) => {
      if(error.status !== 403) {
        console.log('EPI GET ERROR %s PATH %s', JSON.stringify(error), path)
        //throw Error(error.message)
      }
    })
}

export function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
}
