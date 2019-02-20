<template>
    <div class="withdrawrecord" v-if="recordData">
        <ul>
            <li class="list" v-for="(item, index) in recordData" :key="index + '_recordData'">
                <p class="amount">¥{{item.amount}}</p>
                <span class="time">申请日期:{{item.create_date}}</span>
                <span class="status" v-if="item.status == 0">待打款</span>
                <span v-else-if="item.status == 1" :class="['status', {'statusHandle': item.status == 1}]">银行处理中</span>
                <span class="status" v-else-if="item.status == 2">已打款</span>
                <span class="status" v-else-if="item.status == 3">已关闭</span>
            </li>
        </ul>
    </div>
</template>

<script>
import { getUserPaymemt } from '@/http/api'
import cookie from '@/lib/cookie'
import { Toast, Indicator } from 'mint-ui';
export default {
    name: 'withdrawrecord',
    data(){
        return{
            recordData: null
        }
    },
    created(){
        this.getData()
    },
    methods: {
        getData(){
            Indicator.open();
            let param = {
                userId: cookie.getCookie('userId') == 'undefined' ? '' : cookie.getCookie('userId')
            }
            getUserPaymemt(param).then( res => {
                Indicator.close();
                console.log(res)
                if(res && res.code == 0){
                    this.recordData = res.data.paymentList
                }else{
                    Toast(res.msg)
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .withdrawrecord{
        margin: 0 16/375*100vw;
        border-top: 1/375*100vw solid #E9E8EA;
        margin-top: 21/375*100vw;
        .list{
            border-bottom: 1/375*100vw solid #E9E8EA;
            padding: 15/375*100vw 0 11/375*100vw 0;
            .amount{
                color: #4B4B4B;
                font-size: 18/375*100vw;
            }
            .time{
                font-size: 10/375*100vw;
                color: #8B8B8B;
            }
            .status{
                float: right;
                font-size: 12/375*100vw;
                margin-top: -20/375*100vw;
                color: #4B4B4B;
            }
            .statusHandle{
                color: #48D395;
            }
        }
    }
</style>

