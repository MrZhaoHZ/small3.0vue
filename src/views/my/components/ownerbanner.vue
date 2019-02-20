<template>
    <div class="ownerbanner">
        <div class="left" @click="code">
            <div class="text">   
                <p>扫码验票</p>
                <p>审核人员的票券</p>
            </div>
            <span class="icon"></span>
        </div>
        <div class="right" @click="income">
            <div class="text">
                <p>活动收入</p>
                <p>看看有多少收入</p>
            </div>
            <span class="icon"></span>
        </div>
    </div>
</template>

<script>
import { getWeixinH5Config, checkTicket } from '@/http/api'
import wx from 'weixin-js-sdk'
import isWechat from '../../../lib/isWechat'
import cookie from '../../../lib/cookie'
import { Toast } from 'mint-ui';
export default {
    data(){
        return{
            appId: null,
            timestamp: null,
            nonceStr: null,
            signature: null
        }
    },
    created(){
        
    },
    methods: {
        wxConfig(){
            let param = {
                url: window.location.href.split('#')[0]
            }
            getWeixinH5Config(param).then( res => {
                console.log(res)
                if(res && res.code == 0){
                    this.appId = res.data.appId;
                    this.nonceStr = res.data.nonceStr;
                    this.signature = res.data.signature;
                    this.timestamp = res.data.timestamp;
                    let _this = this;
                    wx.config({
                        debug: false,
                        appId: _this.appId,
                        timestamp: _this.timestamp,
                        nonceStr: _this.nonceStr,
                        signature: _this.signature,
                        jsApiList: ['scanQRCode']
                    })
                    wx.ready(function(){
                        wx.scanQRCode({
                            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                            scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                            success: function (res) {
                                var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                                let param = {
                                    code: result.split('?')[1].split('=')[1],
                                    userId: cookie.getCookie('userId') == 'undefined' ? '' : cookie.getCookie('userId')
                                }
                                checkTicket(param).then( resCheck => {
                                    console.log(resCheck)
                                    if(resCheck && resCheck.code == 0){
                                        Toast('验证通过')
                                    }else{
                                        Toast(res.msg)
                                    }
                                })
                            }
                        });
                    })
                }
            })
        },
        code(){
            this.wxConfig();
        },
        income(){
            this.$router.push('/income')
        }
    }
}
</script>

<style lang="scss" scoped>
    .ownerbanner{
        position: relative;
        left: 0;
        top: -43/375*100vw;
        margin: 0 12/375*100vw;
        height: 86/375*100vw;
        box-shadow: 2/375*100vw 6/375*100vw 20/375*100vw 0 rgba(75,72,73,0.13);
        border-radius: 10/375*100vw;
        background: #fff;
        .left, .right{
            float: left;
            width: 50%;
            height: 100%;
            box-sizing: border-box;
            .text{
                display: inline-block;
                margin-left: 18/375*100vw;
                margin-top: 22/375*100vw;
                vertical-align: middle;
                p:first-child{
                    font-size: 14/375*100vw;
                    color: #373C43;
                }
                p:last-child{
                    font-size: 12/375*100vw;
                    color: #989CA8;
                }
            }
            .icon{
                display: inline-block;
                width: 50/375*100vw;
                height: 50/375*100vw;
                margin-top: 18/375*100vw;
                vertical-align: middle;
                // margin-left: 12/375*100vw;
            }
        }
        .left{
            &::after{
                content: '';
                display: inline-block;
                // width: 1/375*100vw;
                height: 39/375*100vw;
                border: 1/375*100vw solid #F0F0F0;
                vertical-align: middle;
                margin-top: 20/375*100vw;
                margin-left: 16/375*100vw;
            }
            .icon{
                background: url('../../../assets/img/my/owner-code.png') no-repeat;
                background-size: 100% 100%;
            }
        }
        .right{
            .icon{
                background: url('../../../assets/img/my/owner-income.png') no-repeat;
                background-size: 100% 100%;
            }
        }
    }
</style>
