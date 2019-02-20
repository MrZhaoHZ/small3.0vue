<template>
    <div class="phoneway">
        <div class="phoneNum">
            <input type="number" placeholder="手机号码" v-model="phoneNumber">
        </div>
        <div class="phoneCode">
            <input type="text" placeholder="验证码" v-model="checkCode">
            <img :src="imgUrl" @click="refreshCode">
        </div>
        <div class="verifyCode">
            <input type="number" placeholder="短信验证码" v-model="verifyCode">
            <span class="getcode" @click="sendCode" v-if="show">{{text}}</span>
            <span class="countdown" v-else>{{count}}</span>
        </div>
        <div class="btn" @click="submit">
            <span>登  录</span>
        </div>
        <p class="protocol" @click="goProtocol">登录即代表同意<span>《一起玩用户协议》</span></p>
    </div>
</template>

<script>
import {checkCodeQuick, verifyCodeQuick, quickLogin} from '@/http/api'
import { Toast, Indicator } from 'mint-ui'
export default {
    data(){
        return{
            phoneCode: '', //该参数由：图形验证码接口返回
            phoneNumber: '', //手机号
            verifyCode: '', //短信验证码
            imgUrl: null, //图形验证码地址链接
            text: '获取验证码' , //发送验证码
            count: '', //倒计时
            checkCode: '', //图形验证码数字
            checked: true,
            reg: /^(1[3-9]{1})\d{9}$/, //手机规则
            regCode: /^\d{4}$/ , //验证码验证规则
            timer: null, //倒计时定时器
            show: true, 
        }
    },
    created(){
        this.getImgCode();
    },
    methods: {
        getImgCode() {
            Indicator.open({
                spinnerType: 'fading-circle'
            });
            checkCodeQuick({ }).then(res => {
                // console.log(res);
                if(res.code == 0){
                    Indicator.close();
                    this.phoneCode = res.data.phoneCode;
                    this.imgUrl = res.data.codeImg;
                }else{
                    Toast(res.msg)
                    Indicator.close();
                }
            }, err => {
                Indicator.close();
                console.log(err);
            })
        },
        refreshCode(){
            this.getImgCode();
        },
        sendCode(){
            Indicator.open({
                spinnerType: 'fading-circle'
            });
            switch(true){
                case this.phoneNumber == '':
                Toast('请输入手机号')
                return false
                break;
                case !this.reg.test(this.phoneNumber):
                Toast('手机号码格式错误')
                return false
                break;
                case this.checkCode == '':
                Toast('请输入图形验证码')
                return false
                break;
                case !this.regCode.test(this.checkCode):
                Toast('图片验证码格式错误')
                return false
                break;
            }
            let param = {
                checkCode: this.checkCode,
                phoneCode: this.phoneCode,
                phoneNumber: this.phoneNumber
            }
            verifyCodeQuick(param).then(res => {
                console.log(res);
                if(res.code == 0){
                    Indicator.close();
                    let wait = 60;
                    let _this = this;
                    this.timer = setInterval(function(){
                        if(wait > 0){
                            wait --;
                            _this.count = '重新获取' + wait + '秒'
                            _this.show = false
                        }else{
                            clearInterval(_this.timer);
                            _this.timer = null;
                            _this.text = '重新获取';
                            _this.show = true;
                        }
                    }, 1000)
                }else{
                    Indicator.close();
                    Toast(res.msg)
                }
            }, err => {
                Indicator.close();
                console.log(err)
            })
        },
        submit(){
            Indicator.open({
                spinnerType: 'fading-circle'
            });
            switch(true){
                case this.phoneNumber == '':
                Toast('请输入手机号')
                return false
                break;
                case !this.reg.test(this.phoneNumber):
                Toast('手机号码格式错误')
                return false
                break;
                case this.checkCode == '':
                Toast('请输入图形验证码')
                return false
                break;
                case !this.regCode.test(this.checkCode):
                Toast('图片验证码格式错误')
                return false
                break;
                case this.verifyCode == '':
                Toast('请输入短信验证码')
                return false
                break;
                case !this.regCode.test(this.verifyCode):
                Toast('短信验证码格式错误')
                return false
                break;
                default:
                let param = {
                    phoneNumber: this.phoneNumber,
                    phoneCode: this.phoneCode,
                    verifyCode: this.verifyCode
                }
                quickLogin(param).then(res => {
                    console.log(res)
                    if(res.code == 0){
                        Indicator.close();
                        if(this.$route.query.redirect){
                            let path = this.$route.query.redirect
                            this.$router.push(path);
                        }else{
                            this.$router.push('/');
                        }
                        this.$store.commit('updateUser', res.data);
                    }else{
                        Indicator.close();
                        Toast(res.msg);
                    }
                }, err => {
                    Indicator.close();
                    console.log(err);
                })
                return
            }
        },
        goProtocol(){
            // console.log(this.$route.query)
            this.$router.push('/userprotocol');
        }
    },
    destroyed(){
        // 销毁定时器
        this.timer = null;
    }
}
</script>

<style lang="scss" scoped>
    .phoneway{
        margin: 0 12/375*100vw;
        // height: 282/375*100vw;
        background: #fff;
        box-shadow: 2px 6px 20px 0px rgba(75,72,73,0.13);
        border-radius: 10/375*100vw;
        position: relative;
        margin-top: 53/375*100vw;
        &::before{
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            top: -12/375*100vw;
            bottom: 0;
            margin: 0 auto;
            width: 80/375*100vw;
            height: 13/375*100vw;
            background: url('../../../assets/img/login/login-icon.png') no-repeat;
            background-size: 100% 100%;
        }
        .phoneNum{
            margin: 0 33/375*100vw;
            border-bottom: 1px solid #EAEAEA;
            text-align: left;
            padding-top: 42/375*100vw;
            padding-bottom: 20/375*100vw;
            font-size: 16/375*100vw;
            color: #352E32;
            input{
                outline: none;
                border: none;
                width: 238/375*100vw;
                height: 24/375*100vw;
                caret-color:#52D89A; 
				-webkit-tap-highlight-color:rgba(0,0,0,0);
            }
        }
        .phoneCode{
            margin: 0 33/375*100vw;
            padding: 14/375*100vw 0;
            border-bottom: 1px solid #EAEAEA;
            text-align: left;
            font-size: 16/375*100vw;
            color: #352E32;
            input{
                display: inline-block;
                outline: none;
                border: none;
                width: 160/375*100vw;
                height: 24/375*100vw;
                vertical-align: middle;
                caret-color:#52D89A; 
				-webkit-tap-highlight-color:rgba(0,0,0,0);
            }
            img{
                display: inline-block;
                width: 103/375*100vw;
                height: 46/375*100vw;
                vertical-align: middle;
            }
        }
        .verifyCode{
            margin: 0 33/375*100vw;
            border-bottom: 1px solid #EAEAEA;
            text-align: left;
            padding-top: 24/375*100vw;
            padding-bottom: 20/375*100vw;
            font-size: 16/375*100vw;
            color: #352E32;
            input{
                outline: none;
                border: none;
                width: 180/375*100vw;
                height: 24/375*100vw;
                caret-color:#52D89A; 
				-webkit-tap-highlight-color:rgba(0,0,0,0);
            }
            .getcode{
                display: inline-block;
                width: 80/375*100vw;
                height: 34/375*100vw;
                text-align: center;
                line-height: 34/375*100vw;
                color: #fff;
                background: linear-gradient(to right, #79E9AC , #34CA8C);
                font-size: 11/375*100vw;
                border-radius: 2/375*100vw;
            }
            .countdown{
                display: inline-block;
                width: 80/375*100vw;
                height: 34/375*100vw;
                text-align: center;
                line-height: 34/375*100vw;
                color: #999999;
                background: #EAEAEA;
                font-size: 11/375*100vw;
                border-radius: 2/375*100vw;
            }
            
        }
        .btn{
            margin: 0 33/375*100vw;
            margin-top: 24/375*100vw;
            height: 50/375*100vw;
            line-height: 50/375*100vw;
            text-align: center;
            font-size: 16/375*100vw;
            color: #fff;
            background:linear-gradient(133deg,rgba(121,233,172,1) 0%,rgba(52,202,140,1) 100%);
            border-radius:8px
        }
        .protocol{
            margin: 0 33/375*100vw;
            padding: 16/375*100vw 0;
            text-align: center;
            color: #352E32;
            font-size: 10/375*100vw;
            span{
                text-decoration: underline;
            }
        }
    }
</style>

