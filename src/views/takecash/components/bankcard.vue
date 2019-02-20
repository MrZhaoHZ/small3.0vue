<template>
    <div class="bankcard">
        <p v-if="cardData" class=cardMsg>
            <span>到账银行卡</span>
            <span>{{cardData.accountProvider}} ({{cardData.accountNo.substr(cardData.accountNo.length-4)}})</span>
        </p>
        <p v-else class="addCard" @click="addCard">添加银行卡</p>
    </div>
</template>

<script>
import { getPaymentAccount } from '@/http/api'
import cookie from '@/lib/cookie'
import { Toast, Indicator } from 'mint-ui';
export default {
    data(){
        return{
            cardData: null
        }
    },
    created(){
        this.getData();
    },
    methods: {
        getData(){
            Indicator.open();
            let param = {
                userId: cookie.getCookie('userId') == 'undefined' ? '' : cookie.getCookie('userId')
            }
            getPaymentAccount(param).then( res => {
                console.log(res)
                Indicator.close();
                if(res && res.code == 0){
                    this.cardData = res.data
                    localStorage.setItem('accountId', res.data.id)
                }else{
                    Toast(res.msg)
                }
            })
        },
        addCard(){
            this.$router.push('/blankcard')
        }
    }
}
</script>

<style lang="scss" scoped>
    .bankcard{
        margin: 0 16/375*100vw;
        margin-top: 27/375*100vw;
        background: rgba(154,157,163, .2);
        height: 87/375*100vw;
        border-radius: 16/375*100vw 16/375*100vw 0 0;
        line-height: 87/375*100vw;
        box-shadow: 0px 2/375*100vw 15/375*100vw -3/375*100vw rgba(0,0,0,0.15);
        .addCard{
            font-size: 18/375*100vw;
            color: #71757E;
            text-align: center;
        }
        .cardMsg{
            font-size: 18/375*100vw;
            span:first-child{
                margin: 0 50/375*100vw 0 23/375*100vw;
                color: #4A4A4A;
            }
            span:last-child{
                color: #333333;
            }
        }
    }
</style>

