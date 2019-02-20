import axios from 'axios'
// import qs from 'qs'
import cookie from '../lib/cookie.js'
import router from '../router/index.js'
import { Toast } from 'mint-ui';

// if( process.env.NODE_ENV == 'development' ){
//     axios.defaults.baseURL = 'https://dev.17wawawa.com'
// }else if( process.env.NODE_ENV == 'production' ){
//     axios.defaults.baseURL = 'https://m.17wawawa.com'
// }

axios.defaults.timeout = 60000; //请求超时


// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'


//请求拦截
axios.interceptors.request.use( config => {
    const userId = cookie.getCookie('userId');
    // const openId = cookie.getCookie('openId');
    userId && (config.headers.Authorization = userId);
    // openId && (config.headers.Authorization = openId);
    return config
}, error => {
    return Promise.error(error);
})

//响应拦截
axios.interceptors.response.use( res => {
    if(res.status = 200){
        return Promise.resolve(res.data);
    } else {
        // Message.error(res.msg);
        Toast(res.msg)
        router.push('/login')
    }
}, error => {
    return Promise.resolve(error.data)
})

/**
 * @description get请求
 * @param {String} url 请求地址
 * @param {obj} params 请求参数
*/

export function get(url, params){
    return new Promise((resolve, reject) => {
        axios.get(url, params).then(res => {
            resolve(res);
        }).catch(error => {
            reject(error);
        })
    })
}


/**
 * @description post请求
 * @param {String} url 请求地址
 * @param {obj} params 请求参数
*/

export function post(url, params){
    return new Promise((resolve, reject) => {
        axios.post(url, params).then(res => {
            resolve(res);
        }).catch(error => {
            reject(error);
        })
    })
}