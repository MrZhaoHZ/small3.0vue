<template>
    <div class="mybanner">
        <div class="left" @click="signUp">
            <div class="text">   
                <p>我报名的</p>
                <p>看看要去的活动</p>
            </div>
            <span class="icon"></span>
        </div>
        <div class="right" @click="shopping">
            <div class="text">
                <p>我购买的</p>
                <p>有你买到的好物</p>
            </div>
            <span class="icon"></span>
        </div>
        <!-- <ul>
            <li>
                <img src="" alt="">
                <p>我报名的</p>
            </li>
            <li>
                <img src="" alt="">
                <p>我购买的</p>
            </li>
            <li>
                <img src="" alt="">
                <p>我的钱包</p>
            </li>
            <li>
                <img src="" alt="">
                <p>我的部落</p>
            </li>
        </ul> -->
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    data(){
        return{

        }
    },
    methods: {
        signUp(){
            this.$router.push('/mysignup')
        },
        shopping(){
            // Toast('请前往微信搜索一起玩电商打开查看')
            window.location.href = 'https://100000266743.retail.n.weimob.com/saas/retail/100000266743/63831743/user/member/center'
        }
    }
}
</script>

<style lang="scss" scoped>
    .mybanner{
        position: relative;
        top: -43/375*100vw;
        margin: 0 12/375*100vw;
        height: 86/375*100vw;
        background: #fff;
        border-radius: 10/375*100vw;
        box-shadow: 0 6/375*100vw 20/375*100vw 0 rgba(75,72,73,0.13);
        .left, .right{
            float: left;
            width: 50%;
            height: 100%;
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
                background: url('../../../assets/img/my/myapply.png') no-repeat;
                background-size: 100% 100%;
            }
        }
        .right{
            .icon{
                background: url('../../../assets/img/my/mybuy.png') no-repeat;
                background-size: 100% 100%;
            }
        }
    }
</style>

