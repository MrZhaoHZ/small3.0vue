<template>
    <div class="income">
        <amount v-bind:recoverAmountSum = "data"></amount>
        <withdraw v-bind:withdraw = "data"></withdraw>
    </div>
</template>

<script>
import { getUserAmountInfo } from '@/http/api'
import cookie from '@/lib/cookie'
import { Toast, Indicator } from 'mint-ui'

import amount from './components/amount'
import withdraw from './components/withdraw'
export default {
    name: 'income',
    data(){
        return{
            data: null
        }
    },
    components: {
        amount,
        withdraw
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
            getUserAmountInfo(param).then( res => {
                console.log(res)
                Indicator.close();
                if(res && res.code == 0){
                    this.data = res.data
                }else{
                    Toast(res.msg)
                }
            }, err => {
                Indicator.close();
                console.log(err)
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
