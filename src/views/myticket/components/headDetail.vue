<template>
    <div class="headDetail" v-if="headData">
        <p class="title">{{headData.name}}</p>
        <p class="address"><span class="icon"></span>{{headData.address}}<span></span></p>
        <p class="time">
            <span class="icon"></span>
            {{headData.acttime}}
        </p>
        <p class="ticket">
            <span class="icon"></span>
            ¥{{headData.price}}*{{headData.count}}
        </p>
        <p class="pay">
            <span class="left">实付金额</span>
            <span class="right">¥{{headData.price}}</span>
        </p>
        <div class="qrcode">
            <img :src="headData.ticketEntityList[0].code_url">
            <p>券码：{{headData.ticketEntityList[0].code}}</p>
        </div>
        <!-- <div class="share">
            <span>分享给朋友</span>
            <span></span>
        </div> -->
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    props: {
        headData: Object
    }
}
</script>

<style lang="scss" scoped>
    .headDetail{
        margin: 0 20/375*100vw;
        .title{
            font-size: 20/375*100vw;
            color: #353B48;
            font-weight: 500;
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            /*! autoprefixer: off */
            -webkit-box-orient: vertical;
            /* autoprefixer: on */
            padding-top: 40/375*100vw;
        }
        .time, .ticket, .address{
            margin-top: 14/375*100vw;
            font-size: 16/375*100vw;
            color: #353B48;
        }
        .address{
            margin-top: 21/375*100vw;
            font-size: 16/375*100vw;
            color: #353B48;
        }
        .pay{
            margin-top: 17/375*100vw;
            height: 70/375*100vw;
            background: #F7F8FA;
            line-height: 70/375*100vw;
            border-bottom: 1/375*100vw dashed #20CE1F;
            .right{
                float: right;
                margin-right: 28/375*100vw;
                color: #1AAD19;
                font-size: 18/375*100vw;
            }
            .left{
                margin-left: 28/375*100vw;
                color: #353B48;
                font-size: 18/375*100vw;
            }
        }
        .qrcode{
            text-align: center;
            margin-top: 42/375*100vw;
            img{
                width: 144/375*100vw;
                height: 144/375*100vw;
            }
        }
        .share{
            text-align: center;
            margin-top: 52/375*100vw;
        }
    }
</style>

