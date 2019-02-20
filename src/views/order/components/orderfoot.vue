<template>
    <div class="orderfoot">
        <span class="total">合计:  ¥{{footData.order_price}}</span>
        <span class="pay" @click="pay">立即支付</span>
    </div>
</template>

<script>
import { payOrderByWeixin, getWeixinH5AccessToken } from '@/http/api'
import cookie from '@/lib/cookie'
import isWechat from '../../../lib/isWechat'
import { Indicator, MessageBox } from 'mint-ui';
export default {
    data(){
        return{
            orderNum: null,
            userId: null,
            appId: null, 
            timeStamp: null,
            nonceStr: null,
            package: null,
            paySign: null,
            openId: null,
            code: null
        }
    },
    props: {
        footData: Object
    },
    created(){
        this.appId = localStorage.getItem('appId');
        this.userId = cookie.getCookie('userId');
        // this.openId = cookie.getCookie('openId');
        this.orderNum = this.$route.query.orderId
        this.openId = cookie.getCookie('openId')
        if(isWechat){
            if(this.openId){
                return false
            }
            if(window.location.href.indexOf('code')!=-1){
                this.code = this.getUrlParam('code')
                // this.code = window.location.href.split('?')[1].split('=')[1].split('&')[0]
                console.log(this.code);
                this.getWeixinAccessToken();
            }else{
                let redirect_uri = encodeURIComponent(window.location.href);
                window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appId}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
            }   
        }
    },
    methods: {
        getUrlParam(name){
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r!=null) return unescape(r[2]); return null;
        },
        getWeixinAccessToken(){
            Indicator.open();
            let param = {
                code: this.code
            }
            getWeixinH5AccessToken(param).then( res => {
                if(res.code == 0){
                    Indicator.close();
                    this.$store.commit('wechatUser', res.data);
                    window.location.href = window.location.origin + '/#/order?orderId=' + this.orderNum
                }else{
                    Toast(res.msg)
                    Indicator.close();
                }
            })
        },
        pay(){
            let param = {
                orderNum: this.orderNum,
                source: isWechat ? '2' : '4', 
                userId: this.userId,
            }
            payOrderByWeixin(param).then(res => {
                console.log(res, 'payOrderByWeixin')
                if(res.code == 0){
                    if(isWechat){
                        this.timeStamp = res.data.timeStamp
                        this.nonceStr = res.data.nonce_str
                        this.package = 'prepay_id=' + res.data.prepay_id
                        this.paySign = res.data.paySign
                        this.weixinpay();
                    }else{
                        let url = encodeURIComponent('https://m.17wawawa.com/#/mysignup')
                        window.location.href = res.data.mweb_url + '&redirect_url=' + url
                    }
                }
            })
        },
        // 调用微信支付
        onBridgeReady(){
            let _this = this;
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                    "appId": _this.appId, //公众号名称，由商户传入     
                    "timeStamp": _this.timeStamp, //时间戳，自1970年以来的秒数 
                    "nonceStr": _this.nonceStr, //随机串    
                    "package": _this.package, // prepay_id
                    "signType": "MD5", //微信签名方式
                    "paySign": _this.paySign,  //微信签名 
                },
                function(res){
                    console.log(res)
                    if(res.err_msg == "get_brand_wcpay_request:ok"){
                        // alert('支付成功');
                        // _this.$router.push({
                        //     path: '/blankpage',
                        //     query: {
                        //         id: 1
                        //     }
                        // })
                        _this.$router.push('/mysignup')
                    }else{
                        alert('支付失败');
                        _this.$router.push({
                            path: '/order',
                            query: {
                                orderId: _this.orderNum
                            }
                        })
                    }
                }
            )
        },
        // 微信WeixinJSBridge验证
        weixinpay(){
            if(typeof WeixinJSBridge == "undefined"){
                if( document.addEventListener ){
                    document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                }else if (document.attachEvent){
                    document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
                    document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                }
            }else{
                this.onBridgeReady();
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .orderfoot{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 50/375*100vw;
        display: flex;
        line-height: 50/375*100vw;
        text-align: center;
        span{
            flex: 1;
        }
        .total{
            background: #fff;
            font-size: 16/375*100vw;
            color:rgba(113,117,126,1);
        }
        .pay{
            color: #fff;
            background: linear-gradient(to right, #79E9AC , #34CA8C);
            font-size: 18/375*100vw;
        }
    }
</style>

