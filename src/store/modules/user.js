import cookie from '../../lib/cookie.js'

const state = {
    userId: !cookie.getCookie('userId') ? '' : cookie.getCookie('userId'),
    username: !localStorage.getItem('username')? '' : localStorage.getItem('username'),
    icon: !localStorage.getItem('icon')? '' : localStorage.getItem('icon'),
    openId: !cookie.getCookie('openId') ? '' : cookie.getCookie('openId')
}

const getters = {

}

const mutations = {
    updateUser(state, user){
        state.userId = user.userId
        cookie.setCookie('userId', user.userId)
        state.username = user.username
        localStorage.setItem('username', user.username)
        state.icon = user.icon
        localStorage.setItem('icon', user.icon)
    },
    wechatUser(state, user){
        state.userId = user.userId
        cookie.setCookie('userId', user.userId)
        state.openId = user.openId
        cookie.setCookie('openId', user.openId)
    },
    // getUseId(state, user){
    //     state.userId = user.userId
    //     cookie.setCookie('userId', user.userId)
    // }
}

const actions ={

}

export default {
    state,
    getters,
    mutations,
    actions
}