<template>
    
</template>

<script>
import { submitOrder } from '@/http/api'
import { Popup, Indicator, Toast } from 'mint-ui';
import cookie from '@/lib/cookie'
export default {
    data(){
        return {
            isSelect: 0, //当前选中
            count: 1, // 数量
            id: null, //票的id
        }
    },
    props: {
        popupData: Object,
        popupVisiblePopup: Boolean,
    },
    created(){
        if(this.$props.popupData.ticketlist.length!=0){
            this.id = this.$props.popupData.ticketlist[this.isSelect].id;
            console.log(this.id)
        }
    },
    methods: {
        select(item, index){
            this.id = item.id
            this.isSelect = index;
        },
        cut(){
            if(this.count == 1){
                return false
            }
            this.count --;
        },
        add(item, index){
            if(this.count == item.limitednum){
                return false
            }
            this.count ++;
        },
        submit(){
            if(this.$props.popupData.applyForm.length == 0){
                if(!cookie.getCookie('userId')){
                    console.log(1)
                    this.$router.push({
                        path: '/login',
                        query: {
                            redirect: '/activitydetails?productId=' + localStorage.getItem('productId')
                        }
                    })
                    return false
                }
                Indicator.open();
                let param = {
                    applyForm: this.$props.popupData.applyForm,
                    productId: this.$route.query.productId,
                    ticket: {
                        id: this.$props.popupData.ticketlist[this.isSelect].id,
                        count: this.count
                    },
                    userId: cookie.getCookie('userId')
                }
                submitOrder(param).then( res => {
                    console.log(res)
                    Indicator.close();
                    if(res && res.code == 0){
                        if(this.$props.popupData.ticketlist[this.isSelect].price == 0){
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
            }else{
                this.$router.push({
                    path: '/fillinformation',
                    query: {
                        id: this.id,
                        count: this.count,
                        price: this.$props.popupData.ticketlist[this.isSelect].price
                    }
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .popup{
        .popup-container{
            width: 375/375*100vw;
            height: 467/375*100vw;
            .popup-content{
                margin-top: 27/375*100vw;
                padding: 0 18/375*100vw;
                .title{
                    margin-bottom: 14/375*100vw;
                    span{
                        display: inline-block;
                        font-size: 16/375*100vw;
                        vertical-align: top;
                        &::before{
                            content: '';
                            display: inline-block;
                            width: 3/375*100vw;
                            height: 20/375*100vw;
                            background: linear-gradient(133deg,rgba(121,233,172,1) 0%,rgba(52,202,140,1) 100%);
                            vertical-align: top;
                            margin-right: 6/375*100vw;
                        }   
                    }
                }
                .list{
                    ul{
                        width: 100%;
                        li{
                            margin-bottom: 12/375*100vw;
                            .list-price-name{
                                display: flex;
                                border: 1px solid rgba(154,157,163,1);
                                padding: 13/375*100vw;
                                border-radius: 4/375*100vw;
                                color: rgba(113,117,126,1);
                                span{
                                    flex: 1;
                                    font-size: 13/375*100vw;
                                }
                                .list-price{
                                    text-align: right;
                                }
                            }
                            .list-price-name-select{
                                border:1px solid rgba(26,173,25,1);
                                color:rgba(26,173,25,1);
                            }
                            .list-message{
                                font-size: 12/375*100vw;
                                color: rgba(154,157,163,1);
                                margin-top: 6/375*100vw;
                            }
                            .num{
                                position: absolute;
                                left: 0;
                                bottom: 50/375*100vw;
                                width: 100%;
                                height: 110/375*100vw;
                                z-index: 100;
                                .num-title{
                                    padding-left: 18/375*100vw;
                                    display: inline-block;
                                    font-size: 16/375*100vw;
                                    vertical-align: top;
                                    &::before{
                                        content: '';
                                        display: inline-block;
                                        width: 3/375*100vw;
                                        height: 20/375*100vw;
                                        background: linear-gradient(133deg,rgba(121,233,172,1) 0%,rgba(52,202,140,1) 100%);
                                        vertical-align: top;
                                        margin-right: 6/375*100vw;
                                    }   
                                }
                                .limitednum{
                                    display: inline-block;
                                    color: rgba(26,173,25,1);
                                    font-size:12px;
                                    vertical-align: top;
                                }
                                .num-cut-add{
                                    border: 1/375*100vw solid rgba(154,157,163,1);
                                    border-radius: 4/375*100vw;
                                    padding: 12/375*100vw;
                                    margin: 0 18/375*100vw;
                                    margin-top: 15/375*100vw;
                                    .num-price{
                                        font-size: 14/375*100vw;
                                        color: rgba(26,173,25,1);
                                        margin-right: 26/375*100vw;
                                    }
                                    .num-price-num{
                                        font-size: 13/375*100vw;
                                        color:rgba(154,157,163,1);
                                    }
                                    .content{
                                        // display: inline-block;
                                        float: right;
                                        font-size: 16/375*100vw;
                                        color: rgba(53,59,72,1);
                                        .cut{
                                            display: inline-block;
                                            margin-right: 24/375*100vw;
                                            border: 1/375*100vw solid rgba(154,157,163,1);
                                            width: 21/375*100vw;
                                            height: 21/375*100vw;
                                            border-radius: 2/375*100vw;
                                            text-align: center;
                                            line-height: 21/375*100vw;
                                            vertical-align: middle;
                                            color: rgba(113,117,126,1);
                                        }
                                        .add{
                                            display: inline-block;
                                            margin-left: 24/375*100vw;
                                            border: 1/375*100vw solid rgba(154,157,163,1);
                                            width: 21/375*100vw;
                                            height: 21/375*100vw;
                                            border-radius: 2/375*100vw;
                                            text-align: center;
                                            line-height: 21/375*100vw;
                                            vertical-align: middle;
                                            color: rgba(113,117,126,1);
                                        }
                                        .digital{
                                            display: inline-block;
                                            vertical-align: middle;
                                            color:rgba(53,59,72,1);
                                            font-size: 16/375*100vw;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            
            .submit{
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 50/375*100vw;
                background:linear-gradient(133deg,rgba(121,233,172,1) 0%,rgba(52,202,140,1) 100%);
                text-align: center;
                line-height: 50/375*100vw;
                color: #fff;
            }
        }
    }
</style>
