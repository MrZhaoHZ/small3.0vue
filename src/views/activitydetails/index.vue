<template>
    <div class="activity-details" v-if="productDetailData">
        <achead :headData="productDetailData"></achead>
        <acmain :mainData="productDetailData"></acmain>
        <acfooter :footData="productDetailData"></acfooter>
    </div>
</template>

<script>
import { getProductDetail } from '@/http/api'
import { Toast, Indicator } from 'mint-ui'
import acfooter from './components/foot'
import acmain from './components/main'
import achead from './components/head'

export default {
    data(){
        return {
            productId: '',
            productDetailData: null,
        }
    },
    components: {
        acfooter,
        acmain,
        achead
    },
    created() {
        this.productId = this.$route.query.productId;
        localStorage.setItem('productId', this.productId)
        this.getProductDetailData();
    },
    methods: {
        getProductDetailData(){
            Indicator.open();
            getProductDetail({productId: this.productId}).then( res => {
                Indicator.close();
                if(res.code == 0){
                    this.productDetailData = res.data;
                    localStorage.setItem('productDetailData', JSON.stringify(res.data));
                }else{
                    Toast(res.msg)
                }
            }, err => {
                console.log(err);
                Indicator.close();
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    
</style>

