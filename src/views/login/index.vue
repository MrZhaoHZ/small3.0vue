<template>
    <div class="login">
        <div class="login-bg">
            <div class="login-logo"></div>
            <phone></phone>
            <wechat></wechat>
        </div>
    </div>
</template>

<script>
import phone from './components/phone'
import wechat from './components/wechat'
export default {
    name: 'login',
    data(){
        return{
            
        }
    },
    components: {
        phone,
        wechat
    },
    methods:{
        
    }
}
</script>

<style lang="scss" scoped>
    .login{
        width: 100%;
        min-height: 100%;
        background: linear-gradient(to bottom, #79E9AC, #34CA8C 350/375*100vw, #fff 317/375*100vw);
        padding-bottom: 317/375*100vw;
        .login-bg{
            width: 100%;
            height: 350/375*100vw;
            background: url('../../assets/img/login/h5-login-bg@2x.png') no-repeat;
            background-size: 100% 100%;
            text-align: center;
            .login-logo{
                display: inline-block;
                width: 167/375*100vw;
                height: 91/375*100vw;
                background: url('../../assets/img/login/h5-login-logo@2x.png') no-repeat;
                background-size: 100% 100%;
                margin-top: 50/375*100vw;
            }
        }
    }
</style>


