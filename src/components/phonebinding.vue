<template>
    <div class="phonebind">
        <mt-popup
            v-model="popupVisible"
            popup-transition="popup-fade"
            :closeOnClickModal="false">
            <div class="container">
                <p class="title">验证手机号</p>
                <div class="phone">
                    <input type="number" placeholder="手机号码" v-model="phoneNumber">
                </div>
                <div class="code">
                    <input type="number" placeholder="验证码" v-model="verifyCode">
                    <span class="getcode" @click="getcodenum" v-if="show">{{getcode}}</span>
                    <span class="resend" v-else v-html="resend"></span>
                </div>
                <div class="foot" @click="submit">
                    <span>立即验证</span>
                </div>
            </div>
        </mt-popup>
    </div>
</template>

<script>
import { Popup, Toast, Indicator } from 'mint-ui';
import { bindPhoneSendSms, checkBindPhoneVerify } from '@/http/api'
import cookie from '@/lib/cookie.js'
export default {
    data(){
        return{
            phoneNumber: '', //手机号
            verifyCode: '', //短信验证码
            openId: '',
            resend: '',
            getcode: '获取验证码',
            show: true,
            timer: null,
            reg: /^(1[3-9]{1})\d{9}$/, //手机规则
            regCode: /^\d{4}$/, //验证码验证规则
        }
    },
    props: {
        popupVisible: Boolean
    },
    created(){
        this.openId = cookie.getCookie('openId');
    },
    methods: {
        getcodenum(){
            switch(true){
                case this.phoneNumber == '':
                Toast({
                    message: '请输入手机号',
                    position: 'top',
                })
                return false
                break;
                case !this.reg.test(this.phoneNumber):
                Toast({
                    message: '手机号码格式错误',
                    position: 'top',
                })
                return false
                break;
            }
            Indicator.open();
            let param = {
                openId: this.openId,
                phoneNumber: this.phoneNumber
            }
            bindPhoneSendSms(param).then( res => {
                console.log(res);
                if(res.code == 0){
                    Indicator.close();
                    let wait = 60;
                    let _this = this;
                    this.timer = setInterval(() => {
                        if(wait > 0){
                            wait -- ;
                            _this.resend = '重新发送' + wait;
                            _this.show = false
                        }else{
                            clearInterval(_this.timer);
                            _this.show = true;
                            _this.getcode = '重新发送'
                        }
                    }, 1000)
                }else{
                    Indicator.close();
                    Toast({
                        message: res.msg,
                        position: 'top',
                    })
                }
            }, err => {
                Indicator.close();
                console.log(err);
            })
        },
        submit(){
            switch(true){
                case this.phoneNumber == '':
                Toast({
                    message: '请输入手机号',
                    position: 'top',
                })
                return false
                break;
                case !this.reg.test(this.phoneNumber):
                Toast({
                    message: '手机号码格式错误',
                    position: 'top',
                })
                return false
                break;
                case this.verifyCode == '':
                Toast({
                    message: '请输入验证码',
                    position: 'top',
                })
                return false
                break;
                case !this.regCode.test(this.verifyCode):
                Toast({
                    message: '验证码格式错误',
                    position: 'top',
                })
                return false
                break;
            }
            Indicator.open();
            let param = {
                openId: this.openId,
                phoneNumber: this.phoneNumber,
                verifyCode: this.verifyCode
            }
            checkBindPhoneVerify(param).then(res => {
                console.log(res);
                if(res.code == 0){
                    Indicator.close();
                    this.$store.commit('wechatUser', res.data);
                    this.$props.popupVisible = false
                }else{
                    Indicator.close();
                    Toast({
                        message: res.msg,
                        position: 'top',
                    })
                }
            }, err => {
                Indicator.close();
                console.log(err);
            })
        }
    },
    destroyed(){
        // 销毁定时器
        this.timer = null;
    }
}
</script>

<style lang="scss" scoped>
    .phonebind{
        .mint-popup{
            width: 295/375*100vw;
            height: 252/375*100vw;
            border-radius: 8/375*100vw;
            .container{
                position: relative;
                width: 100%;
                height: 252/375*100vw;
                .title{
                    padding-top: 16/375*100vw;
                    padding-bottom: 23/375*100vw;
                    text-align: center;
                    color: rgba(53,59,72,1);
                    font-size: 16/375*100vw;
                }
                .phone{
                    margin: 0 18/375*100vw;
                    padding: 12/375*100vw 0;
                    padding-left: 10/375*100vw;
                    border: 1/375*100vw solid rgba(154, 157, 163, 1);
                    border-radius: 4/375*100vw;
                    input{
                        outline: none;
                        border: none;
                        font-size: 14/375*100vw;
                        caret-color:#52D89A; 
				        -webkit-tap-highlight-color:rgba(0,0,0,0);
                    }
                }
                .code{
                    margin: 0 18/375*100vw;
                    margin-top: 14/375*100vw;
                    padding: 6/375*100vw 0;
                    padding-left: 10/375*100vw;
                    border: 1/375*100vw solid rgba(154, 157, 163, 1);
                    border-radius: 4/375*100vw;
                    input{
                        outline: none;
                        border: none;
                        font-size: 14/375*100vw;
                        caret-color:#52D89A; 
				        -webkit-tap-highlight-color:rgba(0,0,0,0);
                    }
                    .getcode{
                        display: inline-block;
                        width: 85/375*100vw;
                        height: 32/375*100vw;
                        font-size: 12/375*100vw;
                        line-height: 32/375*100vw;
                        text-align: center;
                        background: linear-gradient(to right, #79E9AC , #34CA8C);
                        color: #fff;
                        border-radius: 4/375*100vw;
                    }
                    .resend{
                        display: inline-block;
                        width: 85/375*100vw;
                        height: 32/375*100vw;
                        font-size: 12/375*100vw;
                        line-height: 32/375*100vw;
                        text-align: center;
                        background: rgba(154,157,163,1);
                        color: #fff;
                        border-radius: 4/375*100vw;
                    }
                }
                .foot{
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    width: 100%;
                    height: 50/375*100vw;
                    text-align: center;
                    background: linear-gradient(to right, #79E9AC , #34CA8C);
                    color: #fff;
                    line-height: 50/375*100vw;
                    border-radius: 0 0 8/375*100vw 8/375*100vw;
                }
            }
        }
    }
</style>

