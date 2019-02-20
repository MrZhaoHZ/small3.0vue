<template>
<div>
    <div class="fillbutton" @click="submit">
        下一步
    </div>
    <phonebind :popupVisible="phonebindshow"></phonebind>
</div>
</template>

<script>
import cookie from '@/lib/cookie'
import { Toast, Indicator, Popup } from 'mint-ui';
import { bindPhoneSendSms, checkBindPhoneVerify, submitOrder } from '@/http/api'
import phonebind from '../../../components/phonebinding'
export default {
    data(){
        return{
            phonebindshow: false,
            applyForm: null,
            ticket: null,
            userId: null,
            price: null,
            reg: /^(1[3-9]{1})\d{9}$/, //手机规则
            subData: []
        }
    },
    props: {
        tickets: Object,
        getFormData: Array,
        getProductId: String
    },
    components: {
        phonebind
    },
    created(){
        this.userId = cookie.getCookie('userId');
        this.openId = cookie.getCookie('openId');
        this.price = this.$route.query.price
    },
    methods: {
        submit(){
            if(this.userId == '' || this.userId == 'undefined'){
                this.phonebindshow = true;
                return false
            }
            this.subData = this.$props.getFormData;
            for(let i= 0, len = this.subData.length; i < len; i++){
                switch(true){
                    case this.subData[i].field_value == null:
                        Toast('请输入' + this.subData[i].fieldName)
                        return false
                    break;
                    case (this.subData[i].fieldName == '电话' && !this.reg.test(this.subData[i].field_value)):
                        Toast('请输入正确的手机号')
                        return false
                    break;
                }
            }
            for(let i= 0, len = this.subData.length; i < len; i++){
                delete this.subData[i].fieldName
            }
            let param = {
                ticket: this.$props.tickets,
                applyForm: this.subData,
                productId: this.$props.getProductId,
                userId: this.userId
            }
            Indicator.open();            
            submitOrder(param).then( res => {
                console.log(res);
                Indicator.close();
                if(res && res.code == 0){
                    if(this.price == 0){
                        // this.$router.push({
                        //     path: '/blankpage',
                        //     query: {
                        //         id: 1
                        //     }
                        // })
                        this.$router.push('/mysignup')
                    }else{
                        this.$router.push({
                            path: '/order',
                            query: {
                                orderId: res.data.orderId
                            }
                        })
                    }
                }else{
                    Toast(res.msg);
                }
            }, err => {
                Indicator.close();
                console.log(err);
            })
        },
    }
}
</script>

<style lang="scss" scoped>
    .fillbutton{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 50/375*100vw;
        text-align: center;
        line-height: 50/375*100vw;
        color: #fff;
        background: linear-gradient(to right, #79E9AC , #34CA8C);
    }
</style>

