<template>
    <div class="myhead" v-if="userData">
        <img class="userAvatar" :src="userData.icon">
        <div class="userMsg">
            <p class="name">{{userData.name}}</p>
            <p class="attentionNum" @click="attention"><span>关注</span>{{userData.followNum}}</p>
        </div>
        <span class="owner" @click="changeIdentity">我是盟主</span>
    </div>
</template>

<script>
import { getUserInfo } from '@/http/api'
import cookie from '../../../lib/cookie'
import { Toast, Indicator } from 'mint-ui'
export default {
    data(){
        return {
            userData: null
        }
    },
    created(){
        this.getUserMessage();
    },
    methods: {
        getUserMessage(){
            let param = {
                openId: cookie.getCookie('openId') == 'undefined' ? '' : cookie.getCookie('openId'),
                userId: cookie.getCookie('userId') == 'undefined' ? '' : cookie.getCookie('userId')
            }
            Indicator.open();
            getUserInfo(param).then(res => {
                Indicator.close();
                if(res && res.code == 0){
                    this.userData = res.data
                }else{
                    Toast(res.msg)
                }
            }, err => {
                Indicator.close();
                console.log(err)
            })
        },
        attention(){
            this.$router.push('/follow')
        },
        changeIdentity(){
            this.$emit('changeIdentity', false)
        }
    }
}
</script>

<style lang="scss" scoped>
    .myhead{
        position: relative;
        width: 100%;
        height: 130/375*100vw;
        background: linear-gradient(180deg,rgba(78,214,152,1) 0%,rgba(52,202,140,1) 100%);
        .userAvatar{
            display: inline-block;
            width: 76/375*100vw;
            height: 76/375*100vw;
            border-radius: 50%;
            vertical-align: middle;
            margin-left: 16/375*100vw;
            margin-top: 2/375*100vw;
        }
        .userMsg{
            display: inline-block;
            vertical-align: middle;
            .name{
                font-size: 24/375*100vw;
                font-weight:500;
                color: #fff;
            }
            .attentionNum{
                font-size: 18/375*100vw;
                color: #fff;
                font-weight:500;
                span{
                    font-size: 14/375*100vw;
                    opacity: 0.88;
                    font-weight: 400;
                    margin-right: 5/375*100vw;
                }
            }
        }
        .owner{
            position: absolute;
            right: 0;
            top: 26/375*100vw;
            width: 74/375*100vw;
            height: 30/375*100vw;
            background: #fff;
            color: #1AB575;
            line-height: 30/375*100vw;
            text-align: center;
            font-size: 12/375*100vw;
            box-shadow: 0 2/375*100vw 4/375*100vw 0 rgba(75,72,73,0.08);
            border-radius: 100/375*100vw 0 0 100/375*100vw;
            &::after{
                content: '';
                display: inline-block;
                width: 6/375*100vw;
                height: 10/375*100vw;
                background: url('../../../assets/img/my/icon-right.png') no-repeat;
                background-size: 100% 100%;
                // vertical-align: top;
                margin-right: -4/375*100vw;
                margin-left: 8/375*100vw;
            }
        }
    }
</style>

