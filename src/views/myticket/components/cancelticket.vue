<template>
    <div class="cancelticket" @click="cancel">
        取消报名
    </div>
</template>

<script>
import {returnTicket} from '@/http/api'
import cookie from '@/lib/cookie'
import { Toast, Indicator } from 'mint-ui';
export default {
    data(){
        return{

        }
    },
    methods: {
       cancel(){
           Indicator.open();
           let param = {
               orderNum: this.$route.query.orderNum,
               userId: cookie.getCookie('userId') == 'undefined' ? '' : cookie.getCookie('userId')
           }
           returnTicket(param).then( res => {
               Indicator.close();
               console.log(res)
               if(res && res.code == 0){
                   this.$router.push('/mysignup')
               }else{
                   Toast(res.msg)
               }
           })
       }
    }
}
</script>

<style lang="scss" scoped>
    .cancelticket{
        width: 180/375*100vw;
        height: 45/375*100vw;
        border: 1/375*100vw solid #fff;
        color: #fff;
        margin: 0 auto;
        margin-top: 24/375*100vw;
        margin-bottom: 54/375*100vw;
        text-align: center;
        line-height: 45/375*100vw;
        border-radius: 5/375*100vw;
    }
</style>

