<template>
    <div class="ownerhead" v-if="ownerData">
        <img :src="ownerData.icon">
        <div class="right">
            <p class="name">{{ownerData.name}}</p>
            <span class="personal" @click="ownerhomepage">个人主页</span>
            <span class="fans" @click="fans">粉丝 <span class="fansNum">{{ownerData.followedNum}}</span></span>
        </div>
        <span class="user" @click="changeIdentity">我是用户</span>
    </div>
</template>

<script>
import { getUserInfo } from '@/http/api'
import cookie from '../../../lib/cookie'
import { Toast, Indicator } from 'mint-ui';
export default {
    data(){
        return{
            ownerData: null
        }
    },
    created(){
        this.getInfo();
    },
    methods: {
        getInfo(){
            Indicator.open();
            let param = {
                openId: cookie.getCookie('openId') == 'undefined' ? '' : cookie.getCookie('openId'),
                userId: cookie.getCookie('userId') == 'undefined' ? '' : cookie.getCookie('userId')
            }
            getUserInfo(param).then( res => {
                Indicator.close();
                if(res && res.code == 0){
                    this.ownerData = res.data
                }
            })
        },
        changeIdentity(){
            this.$emit('changeIdentity', true)
        },
        fans(){
            this.$router.push({
                path: '/follow',
                query: {
                    id: 0
                }
            })
        },
        ownerhomepage(){
            this.$router.push('/ownerhomepage')
        }
    }
}
</script>

<style lang="scss" scoped>
    .ownerhead{
        position: relative;
        width: 100%;
        height: 130/375*100vw;
        background: linear-gradient(180deg,rgba(78,214,152,1) 0%,rgba(52,202,140,1) 100%);
        img{
            display: inline-block;
            width: 76/376*100vw;
            height: 76/376*100vw;
            border-radius: 50%;
            margin: 0 16/375*100vw;
            margin-top: 2/375*100vw;
            vertical-align: top;
        }
        .right{
            display: inline-block;
            vertical-align: top;
            width: 180/375*100vw;
            .name{
                margin-top: 11/375*100vw;
                color: #fff;
                font-size: 24/375*100vw;
                font-weight: 500;
                margin-bottom: 10/375*100vw;
            }
            .personal{
                display: inline-block;
                padding: 3/375*100vw 4/375*100vw;
                font-size: 12/375*100vw;
                color: #fff;
                background: rgba($color: #000000, $alpha: .12);
                border-radius: 12/375*100vw;
                vertical-align: top;
                &::after{
                    content: '';
                    display: inline-block;
                    width: 6/375*100vw;
                    height: 10/375*100vw;
                    background: url('../../../assets/img/my/owner-right.png') no-repeat;
                    background-size: 100% 100%;
                    vertical-align: top;
                    margin-left: 6/375*100vw;
                    margin-top: 3/375*100vw;
                }
            }
            .fans{
                margin-left: 14/375*100vw;
                color: #fff;
                font-size: 16/375*100vw;
                .fansNum{
                    font-size: 18/375*100vw;
                    font-weight: 500;
                }
            }
        }
        .user{
            position: absolute;
            right: 0;
            top: 26/375*100vw;
            width: 74/375*100vw;
            height: 30/375*100vw;
            background: #fff;
            color: #1AB575;
            font-size: 12/375*100vw;
            box-shadow: 0 2/375*100vw 4/375*100vw 0 rgba(75,72,73,0.08);
            border-radius: 100/375*100vw 0 0 100/375*100vw;
            text-align: center;
            line-height: 30/375*100vw;
            &::after{
                content: '';
                display: inline-block;
                width: 6/375*100vw;
                height: 10/375*100vw;
                background: url('../../../assets/img/my/icon-right.png') no-repeat;
                background-size: 100% 100%;
                margin-left: 5/375*100vw;
                vertical-align: middle;
            }
        }
    }
</style>

