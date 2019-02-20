<template>
    <div class="myticket">
        <div class="container">
            <headDetail :headData = 'orderData'></headDetail>
        </div>
        <cancelticket></cancelticket>
    </div>
</template>

<script>
import {viewOrdDetail} from '@/http/api'
import cookie from '@/lib/cookie'
import { Indicator, Toast } from 'mint-ui';
import headDetail from './components/headDetail'
import cancelticket from './components/cancelticket'
export default {
    name: 'myticket',
    data(){
        return{
            orderNum: null,
            orderData: null
        }
    },
    created(){
        this.orderNum = this.$route.query.orderNum
        this.getData()
    },
    components: {
        headDetail,
        cancelticket
    },
    methods: {
        getData(){
            Indicator.open();
            let param = {
                orderNum: this.orderNum,
                userId: cookie.getCookie('userId') == 'undefined' ? '' : cookie.getCookie('userId')
            }
            viewOrdDetail(param).then( res => {
                Indicator.close();
                console.log(res)
                if(res && res.code == 0){
                    this.orderData = res.data
                }else{
                    Toast(res.msg)
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .myticket{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        // height: 100%;
        background: #314B5E;
        .container{
            margin: 0 20/375*100vw;
            height: 615/375*100vw;
            box-shadow: 0 5/375*100vw 10/375*100vw 0 rgba(0,0,0,0.2);
            margin-top: 27/375*100vw;
            background: url('../../assets/img/myticket/bg.png') no-repeat;
            background-size: 100% 100%;
        }
    }
</style>

