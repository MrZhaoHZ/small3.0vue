<template>
    <div class="order" v-if="orderData">
        <orderhead :headData="orderData"></orderhead>
        <ordermain :mainData="orderData"></ordermain>
        <orderfoot :footData="orderData"></orderfoot>
    </div>
</template>

<script>
import cookie from '@/lib/cookie'
import { viewOrdDetail } from '@/http/api'
import orderhead from './components/orderhead'
import ordermain from './components/ordermain'
import orderfoot from './components/orderfoot'
export default {
    data(){
        return{
            orderData: null
        }
    },
    components:{
        orderhead,
        ordermain,
        orderfoot
    },
    created(){
        // console.log(this.$route.query)
        let param = {
            orderNum: this.$route.query.orderId,
            userId: cookie.getCookie('userId')
        }
        viewOrdDetail(param).then( res => {
            console.log(res)
            if(res.code == 0){
                this.orderData = res.data
            }
        }, err => {
            console.log(err)
        })
    }
}
</script>

<style lang="scss" scoped>
    .order{
        padding: 0 18/375*100vw;
    }
</style>

