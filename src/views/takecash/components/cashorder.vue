<template>
    <div class="cashorder">
        <div class="head">
            <span class="amount">提现金额</span>
            <span class="rule" @click="showRule">提现规则</span>
        </div>
        <div class="middle">
            <span>¥</span>
            <input type="number" v-model="amount">
        </div>
        <div class="foot">
            <span class="able">可提现余额¥{{balance}}，</span>
            <span class="all" @click="allAmount">全部提现</span>
        </div>
        <div class="submit" @click="determine">
            <span>确定</span>
        </div>
        <mt-popup
        v-model="popupVisible"
        popup-transition="popup-fade">
            <div class="ruleDirections">
                <p class="title">提现规则</p>
                <p class="content">
                    活动结束次日即可申请提现,（每月10号下午17：00前申请的提款会在25号操作打款，每月25号中午17：00前申请提款会在次月10号操作打款。每月10日与25日为出款日） 如遇节假日，打款时间顺延，具体到账时间以银行为准
                </p>
            </div>
        </mt-popup>
    </div>
</template>

<script>
import { withdrawVerify } from '@/http/api'
import { Indicator, Toast, Popup } from 'mint-ui';
import cookie from '@/lib/cookie'
export default {
    data(){
        return{
            balance: null,
            amount: null,
            popupVisible: false
        }
    },
    created(){
        this.balance = this.$route.query.balance
    },
    methods: {
        determine(){
            Indicator.open();
            let param = {
                accountId: localStorage.getItem('accountId'),
                amount: this.amount,
                userId: cookie.getCookie('userId') == 'undefined' ? '' : cookie.getCookie('userId')
            }
            withdrawVerify(param).then( res => {
                console.log(res)
                Indicator.close();
                if(res && res.code == 0){
                    this.$router.push('/withdrawrecord')
                    localStorage.removeItem('accountId');
                }else{
                    Toast(res.msg)
                }
            })
        },
        allAmount(){
            this.amount = this.balance;
        },
        showRule(){
            this.popupVisible = true;
        }
    }
}
</script>

<style lang="scss" scoped>
    .cashorder{
        margin: 0 16/375*100vw;
        height: 240/375*100vw;
        border-radius: 0 0 16/375*100vw 16/375*100vw;
        box-shadow: 0px 2/375*100vw 15/375*100vw -3/375*100vw rgba(0,0,0,0.15);
        .head{
            padding-top: 20/375*100vw;
            .amount{
                font-size: 14/375*100vw;
                font-weight: 500;
                color: #000;
                margin-left: 20/375*100vw;
            }
            .rule{
                float: right;
                color: #999;
                font-size: 12/375*100vw;
                &::after{
                    content: 'i';
                    display: inline-block;
                    width: 12/375*100vw;
                    height: 12/375*100vw;
                    color: #999;
                    border: 1/375*100vw solid #999;
                    border-radius: 50%;
                    text-align: center;
                    line-height: 12/375*100vw;
                    margin-left: 6/375*100vw;
                    font-size: 10/375*100vw;
                    margin-right: 20/375*100vw;
                }
            }
        }
        .middle{
            margin: 0 20/375*100vw;
            border-bottom: 1/375*100vw solid #eaeaea;
            margin-top: 20/375*100vw;
            span{
                display: inline-block;
                font-size: 36/375*100vw;
                vertical-align: middle;
                margin-right: 10/375*100vw;
            }
            input{
                display: inline-block;
                font-size: 20/375*100vw;
                outline: none;
                width: 200/375*100vw;
                vertical-align: middle;
            }
        }
        .foot{
            margin: 0 20/375*100vw;
            margin-top: 15/375*100vw;
            font-size: 13/375*100vw;
            .able{
                color: #9A9DA3;
            }
            .all{
                color: #52D89A;
            }
        }
        .submit{
            color: #fff;
            font-size: 18/375*100vw;
            text-align: center;
            margin: 0 30/375*100vw;
            height: 47/375*100vw;
            background:linear-gradient(133deg,rgba(121,233,172,1) 0%,rgba(52,202,140,1) 100%);
            line-height: 47/375*100vw;
            border-radius: 4/375*100vw;
            margin-top: 20/375*100vw;
        }
        .mint-popup{
            border-radius: 10/375*100vw;
        }
        .ruleDirections{
            width: 280/375*100vw;
            height: 247/375*100vw;
            background: #fff;
            border-radius: 10/375*100vw;
            text-align: center;
            .title{
                color: #000;
                font-size: 18/375*100vw;
                margin-top: 25/375*100vw;
                margin-bottom: 10/375*100vw;
            }
            .content{
                color: #888888;
                font-size: 15/375*100vw;
                margin: 0 13/375*100vw;
            }
        }
    }
</style>

