

// 设置cookie

function setCookie(name, value){
    let date = new Date(); 
    let duration = 7; //7天有效期
    date.setTime(date.getTime + duration * 24 * 3600 * 1000);
    // 对value值进行编码,安全性
    let val = escape(value);
    let path = '/'; //保存到默认域名
    if(path != null){
        document.cookie = name + '=' + val + ";expires=" + date.toGMTString() + "; path=" + path;
    }else{
        document.cookie = name + '=' + val + ";expires=" + date.toGMTString();
    }
}

// 获取cookie
function getCookie(name){
    let strCookie = document.cookie;
    let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if(arr = strCookie.match(reg)){
        return unescape(arr[2]);
    }else{
        return '';
    }
}

// 删除cookie
function delCookie(name){
    setCookie(name, '');
}

export default {
    setCookie, getCookie, delCookie
}