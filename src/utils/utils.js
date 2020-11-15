export function debounce(fun,delay) {
  let timer = null;
  return function(...args) {
    if(timer) clearTimeout(timer)

    timer = setTimeout(() => {
      fun.apply(this,args)
    },delay)
  }
}

export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};

export function getTime(data,type) {
  var _data = data;
  //如果是13位正常，如果是10位则需要转化为毫秒
  if (String(data).length == 13) {
    _data = data
  } else {
    _data = data*1000
  }
  const time = new Date(_data);    
  let Y = time.getFullYear();
  let M = time.getMonth() + 1;
  let D = time.getDate();
  let h = time.getHours();
  let m = time.getMinutes();
  let s = time.getSeconds();
  M = M < 10 ? "0" + M : M;
  D = D < 10 ? "0" + D : D;
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;
  //自定义选择想要返回的类型
  if(type=="YMD"){
    return `${M}月 ${D}, ${Y}`
  }else if(type=="hms"){
    return `${h}:${m}:${s}`
  }else if(type=="YMDhm"){
    return `${Y}-${M}-${D} ${h}:${m}`
  }else{
    return `${Y}-${M}-${D} ${h}:${m}:${s}`
  }
}
