<template>
    <div class="ordermain">
        <div class="ticket-price">
            <span class="title">收费票</span>
            <span class="price">¥{{mainData.price}}*{{mainData.count}}</span>
        </div>
        <div class="ticket-applyform" v-if="mainData.applyForm">
            <span class="title">报名信息</span>
            <span class="icon" @click="applyformShow == true ? applyformShow=false : applyformShow=true"></span>
            <ul class="explain" v-show="applyformShow">
                <li v-for="(item, index) in mainData.applyForm" :key="index + '_applyForm'">
                    <span>{{item.name}}:</span>
                    <span>{{item.value}}</span>
                </li>
            </ul>
        </div>
        <div class="ticket-pay">
            <span class="title">付款说明</span>
            <span class="icon" @click="tickeMessageShow == true ? tickeMessageShow=false : tickeMessageShow=true"></span>
            <div class="explain" v-show="tickeMessageShow">
                <p>1.支付成功后你将收到活动的电子票和短信通知，参加活动时请出示二维码凭证。</p>
                <p>2.如果你需要支付电子票的发票，请于参加活动时向活动主办方索取。</p>
                <p>3.付款成功如果未收到电子票短信，请联系一起玩官方客服（0571-88113366）。</p>
            </div>
        </div>
        <div class="ticket-refund">
            <span class="title">退款说明</span>
            <span class="icon" @click="refundShow == true ? refundShow=false : refundShow=true"></span>
            <div class="explain" v-if="!mainData.tickeMessageShow" v-show="refundShow">
                <p>委托【一起玩】退款</p>
                <p>退款说明:</p>
                <p>1、本活动由主办方委托【一起玩】代为处理退款事宜</p>
                <p>2.活动开始前24小时支持退票，活动开始前24小时内不支持退票</p>
                <p>3.退票将收取票价的10%作为手续费</p>
            </div>
            <div v-else v-show="refundShow">
                <p>{{mainData.tickeMessageShow}}</p>
            </div>
        </div>
        <div class="ticket-payway">
            <span class="title">选择支付方式</span>
            <span></span>
        </div>
        <div class="wechat">
            <span class="title">微信支付</span>
            <span class="icon-s"></span>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            applyformShow: false,
            tickeMessageShow: false,
            refundShow: false
        }
    },
    props: {
        mainData: Object
    }
}
</script>

<style lang="scss" scoped>
    .ordermain{
        .ticket-price, .ticket-pay, .ticket-applyform, .ticket-refund, .ticket-payway, .wechat{
            width: 100%;
            padding: 14/375*100vw 0;
            text-align: justify;
            overflow: hidden;
            display: inline-block;
            border-bottom: 1/375*100vw solid rgba(229,229,229,1);
            // font-size: 0;
            .title{
                font-size: 16/375*100vw;
                color:rgba(113,117,126,1);
            }
            .price{
                float: right;
                color:rgba(154,157,163,1);
                // margin-top: 2/375*100vw;
            }
            .explain{
                padding: 10/375*100vw 0;
                span{
                    font-size: 12/375*100vw;
                    color: #999;
                    // margin-right: 10/375*100vw;
                }
                p{
                    font-size: 12/375*100vw;
                    color: #999;
                }
            }
        }
        .ticket-pay, .ticket-applyform, .ticket-refund{
            .icon{
                float: right;
                background: url('../../../assets/img/order/icon-left.png') no-repeat;
                width: 5/375*100vw;
                height: 10/375*100vw;
                background-size: 100% 100%;
                margin-top: 5/375*100vw;
            }
        }
        .wechat{
            margin-bottom: 100/375*100vw;
            .title{
                display: inline-block;
                vertical-align: top;
                &::before{
                    content: '';
                    display: inline-block;
                    width: 20/375*100vw;
                    height: 18/375*100vw;
                    background: url('../../../assets/img/order/pay.png') no-repeat;
                    background-size: 100% 100%;
                    vertical-align: top;
                    margin-right: 20/375*100vw;
                }
            }
            .icon-s{
                float: right;
                background: url('../../../assets/img/order/ic_select_s@2x.png') no-repeat;
                width: 23/375*100vw;
                height: 23/375*100vw;
                background-size: 100% 100%;
                // margin-top: 5/375*100vw;
            }
        }
        
    }
</style>

