<template>
    <div class="wechat" v-if="isWechat">
        <p class="line"><span></span>或<span></span></p>
        <div class="icon" @click="login">
            <img src="@/assets/img/login/h5-login-wechat@2x.png">
            <span>使用微信号登录</span>
        </div>
    </div>
</template>

<script>
import { getWeixinH5Config, getWeixinH5AccessToken } from '@/http/api'
import { Toast, Indicator } from 'mint-ui'
import isWechat from '../../../lib/isWechat.js'
import cookie from '../../../lib/cookie.js'
export default {
    data(){
        return{
            appId: null, //公众号的唯一标识
            nonceStr: null, //生成签名的随机串
            signature: null, //签名
            timestamp: null, //生成签名的时间戳
            code: null,
            isWechat: null,
            openId: null
        }
    },
    created(){
        this.isWechat = isWechat;
        if(isWechat){
            if(window.location.href.indexOf('code')!=-1){
                // if(window.location.href.indexOf('from')!=-1){
                //     // this.code = window.location.href.split('?')[1].split('&')[1].split('=')[2]
                //     this.code = this.getUrlParam('code')
                // }else{
                //     // this.code = window.location.href.split('?')[1].split('=')[1].split('&')[0]
                    
                // }
                this.code = this.getUrlParam('code')
                console.log(this.code);
                this.getWeixinAccessToken();
            }else{
                this.getWeixinConfig();
            }   
        }

    },
    methods: {
        getUrlParam(name){
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r!=null) return unescape(r[2]); return null;
        },
        getWeixinConfig(){
            Indicator.open();
            let param = {
                url: window.location.origin,
                // url: 'https://dev.17wawawa.com'
            }
            getWeixinH5Config(param).then( res => {
                console.log(res);
                if(res.code == 0){
                    Indicator.close();
                    this.appId = res.data.appId
                    localStorage.setItem('appId', this.appId);
                    this.nonceStr = res.data.nonceStr
                    this.signature = res.data.signature
                    this.timestamp = res.data.timestamp
                }else{
                    Indicator.close();
                    Toast(res.msg)
                }
            }, err => {
                Indicator.close();
                console.log(err);
            })
        },
        getWeixinAccessToken(){
            Indicator.open();
            let param = {
                code: this.code
            }
            getWeixinH5AccessToken(param).then( res => {
                if(res.code == 0){
                    Indicator.close();
                    // this.openId = res.data.openId
                    if(this.$route.query.redirect){
                        let path = this.$route.query.redirect
                        console.log(path);
                        // this.$router.push(path);
                        window.location.href = window.location.origin + '/#' + path;
                    }else{
                        this.$router.push('/');
                    }
                    this.$store.commit('wechatUser', res.data);
                }else{
                    Toast(res.msg)
                    Indicator.close();
                }
            })
        },
        login(){
            this.openId = cookie.getCookie('openId')
            if(this.openId && this.openId != 'undefined'){
                if(this.$route.query.redirect){
                    let path = this.$route.query.redirect
                    // this.$router.push(path);
                    window.location.href = window.location.origin + '/#' + path;
                }else{
                    this.$router.push('/');
                }
            }else{
                let redirect_uri = encodeURIComponent(window.location.href);
                window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appId}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .wechat{
        margin-top: 49/375*100vw;
        .line{
            font-size: 14/375*100vw;
            color:rgba(53,46,50,1);
            opacity: .3;
            span{
                display: inline-block;
                width: 145/375*100vw;
                border-top: 1px solid #ddd;
                vertical-align: middle;
                margin: 0 9/375*100vw;
            }
        }
        .icon{
            margin-top: 15/375*100vw;
            padding-bottom: 100/375*100vw;
            img{
                display: inline-block;
                width: 32/375*100vw;
                height: 32/375*100vw;
                vertical-align: middle;
            }
            span{
                display: inline-block;
                font-size: 14/375*100vw;
                color:rgba(53,46,50,1);
                vertical-align: middle;
            }
        }
    }
</style>

