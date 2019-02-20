<template>
    <div class="ticket-setting">
        <p class="title">
            票券设置:<span>（不添加默认为免费票，每人限购1张）</span>
        </p>
        <div class="tickets" v-if="tickets.length" v-for="(item, index) in tickets" :key="index+'_tickets'">
            <span class="ticket-name">{{item.name}}</span>
            <span class="ticket-num">x{{item.num}}</span>
            <span class="ticket-type">{{item.isPay?'付费':'免费'}}</span>
        </div>
        <div class="content" @click="addTicket">
            <span class="text">新增门票+</span>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            tickets: [],
        }
    },
    created(){
        this.tickets = this.$store.state.release.thirdStep.ticketsData.tickets;
    },
    methods: {
        addTicket(){
            this.$router.push('/ticket')
        }
    }
}
</script>

<style lang="scss" scoped>
    .ticket-setting{
        padding-top: 26/375*100vw;
        .title{
            font-size: 15/375*100vw;
            color: #333333;
            margin: 0;
            margin-bottom: 12/375*100vw;
            span{
                font-size: 12/375*100vw;
            }
        }
        .tickets{
            height: 50/375*100vw;
            background: #F9F9F9;
            border-radius: 4/375*100vw;
            margin-bottom: 12/375*100vw;
            line-height: 50/375*100vw;
            font-size: 14/375*100vw;
            color: #3F4658;
            .ticket-name{
                display: inline-block;
                font-size: 15/375*100vw;
                width: 135/375*100vw;
                overflow: hidden;
                vertical-align: middle;
                &::before{
                    content: '';
                    display: inline-block;
                    width: 33/375*100vw;
                    height: 33/375*100vw;
                    background: url('../../../../../assets/img/release/ticket_icon.png') no-repeat;
                    background-size: 100% 100%;
                    vertical-align: middle;
                    margin-left: 16/375*100vw;
                    margin-right: 12/375*100vw;
                }
            }
            .ticket-num{
                margin-left: 35/375*100vw;
                display: inline-block;
                width: 50/375*100vw;
                vertical-align: middle;
            }
            .ticket-type{
                margin-left: 20/375*100vw;
            }
        }
        .content{
            width: 152/375*100vw;
            height: 54/375*100vw;
            line-height: 54/375*100vw;
            background: #f9f9f9;
            border-radius: 4/375*100vw;
            .text{
                color: #3F4658;
                font-size: 15/375*100vw;
                margin-left: 15/375*100vw;
                &::after{
                    content: '';
                    display: inline-block;
                    width: 33/375*100vw;
                    height: 33/375*100vw;
                    background: url('../../../../../assets/img/release/ticket_icon.png') no-repeat;
                    background-size: 100% 100%;
                    vertical-align: middle;
                    margin-left: 20/375*100vw;
                    // margin-right: 12/375*100vw;
                }
            }
        }
    }
</style>

