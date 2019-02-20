<template>
    <div class="information" v-if="fillData">
        <applyform :formData="fillData" v-on:sendApplyForm="getApplyForm"></applyform>
        <fillbutton :tickets="tickets" :getFormData="applyformData" :getProductId="productId"></fillbutton>
    </div>
</template>

<script>
import applyform from './components/applyform'
import fillbutton from './components/fillbutton'
export default {
    name: 'fillinformation',
    data(){
        return{
            fillData: null,
            tickets: null,
            applyformData: null,
            productId: null,
        }
    },
    components: {
        applyform,
        fillbutton,
    },
    created(){
        this.productId = localStorage.getItem('productId');
        this.tickets = {
            id: this.$route.query.id,
            count: this.$route.query.count
        }
        this.fillData = JSON.parse(localStorage.getItem('productDetailData'))
    },
    methods: {
        getApplyForm(data){
            this.applyformData = data;
        }
    }
}
</script>

<style lang="scss" scoped>

</style>

