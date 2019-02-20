<template>
    <div class="comingsoon">
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul>
            <li class="container" v-for="(item, index) in comData" :key="index + '_comData'" @click="goActivity(item, index)">
                <div class="head">
                    <img v-lazy="item.cover_url">
                    <p class="name">{{item.name}}</p>
                    <span class="isfree" v-if="item.price == '免费'">{{item.price == '免费' ? item.price : ''}}</span>
                    <div class="mask"></div>
                    <span class="icon"></span>
                </div>
                <div class="foot">
                    <div class="foot-left">
                        <img :src="item.icon">
                        <div class="name">
                            <p class="nick">{{item.userName}}</p>
                            <p class="catalogName">#{{item.catalogName}}</p>
                        </div>
                    </div>
                    <div class="foot-right">
                        <p class="time">{{item.acttime}}</p>
                        <p class="address">{{item.district}} {{item.address}}</p>
                    </div>
                </div>
            </li>
        </ul>
        </mt-loadmore>
        <p class="line" v-show="showline">-----已经没有更多了-----</p>
    </div>
</template>

<script>
import { getProductListByWeek } from '@/http/api'
import { Loadmore, Lazyload, Toast } from 'mint-ui';
export default {
    data(){
        return {
            comData: [],
            pageNum: 1,
            allLoaded: false,
            showline: false
        }
    },
    created(){
        this.getComData();
    },
    methods: {
        getComData(){
            let param = {
                cityId: '935',
                pageNum: String(this.pageNum)
            }
            getProductListByWeek(param).then( res => {
                console.log(res)
                if(res && res.code == 0){
                    if(res.data.list.length > 0){
                        this.comData = this.comData.concat(res.data.list)
                    }else{
                        this.$refs.loadmore.onBottomLoaded();
                        this.allLoaded = true
                        this.showline = true
                    }
                }else{
                    Toast(res.msg)
                }
            }, err => {
                console.log(err)
            })
        },
        goActivity(item, index){
            // console.log(item)
            this.$router.push({
                path: '/activitydetails',
                query: {
                    productId: item.productId
                }
            })
        },
        loadBottom(){
            this.pageNum++;
            this.getComData();
        }
    }
}
</script>

<style lang="scss" scoped>
    .comingsoon{
        margin: 0 19/375*100vw;
        // padding-bottom: 10/375*100vw;
        ul{
            margin-top: 18/375*100vw;
            .container{
                position: relative;
                margin-bottom: 20/375*100vw;
                .head{
                    font-size: 0;
                    height: 168/375*100vw;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                    .mask{
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 168/375*100vw;
                        background: rgba($color: #000000, $alpha: 0.1);
                        z-index: 10;
                    }
                    .name{
                        position: absolute;
                        left: 20/375*100vw;
                        top: 53/375*100vw;
                        width: 242/375*100vw;
                        font-size: 24/375*100vw;
                        color: #fff;
                        z-index: 100;
                        overflow : hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        // -webkit-box-orient: vertical;
                        /*! autoprefixer: off */
                        -webkit-box-orient: vertical;
                        /* autoprefixer: on */
                    }
                    .icon{
                        position: absolute;
                        left: 20/375*100vw;
                        top: 20/375*100vw;
                        width: 23/375*100vw;
                        height: 14/375*100vw;
                        background: url('../../../../../assets/img/home/icon-colon.png') no-repeat;
                        background-size: 100% 100%;
                    }
                    .isfree{
                        position: absolute;
                        right: 16/375*100vw;
                        top: 18/375*100vw;
                        width: 49/375*100vw;
                        height: 24/375*100vw;
                        color: #fff;
                        border-radius:4/375*100vw;
                        background:rgba(255,255,255, 0.1392);
                        font-size: 14/375*100vw;
                        line-height: 24/375*100vw;
                        text-align: center;
                    }
                }
                .foot{
                    width: 100%;
                    height: 84/375*100vw;
                    .foot-left,{
                        float: left;
                        width: 200/375*100vw;
                        height: 100%;
                    }
                    .foot-right{
                        float: left;
                        width: 130/375*100vw;
                        height: 100%;
                    }
                    .foot-left{
                        img{
                            float: left;
                            width: 44/375*100vw;
                            height: 44/375*100vw;
                            border-radius: 50%;
                            margin: 20/375*100vw 0;
                            margin-left: 16/375*100vw;
                            margin-right: 12/375*100vw;
                        }
                        .name{
                            position: relative;
                            float: left;
                            text-align: left;
                            width: 120/375*100vw;
                            font-size: 0;
                            margin: 22/375*100vw 0;
                            .nick{
                                width: 120/375*100vw;
                                display: inline-block;
                                font-size: 14/375*100vw;
                                font-weight:500;
                                color: #111;
                                overflow: hidden;
                                white-space: nowrap;
                            }
                            .catalogName{
                                position: absolute;
                                left: -8/375*100vw;
                                top: 20/375*100vw;
                                // display: inline-block;
                                // padding: 2/375*100vw 7/375*100vw;
                                font-size: 12/375*100vw;
                                background:rgba(244,244,244,1);
                                border-radius: 4/375*100vw;
                                transform: scale(0.75);
                                // margin-left: -10/375*100vw;
                            }
                        }
                    }
                    .foot-right{
                        // overflow: hidden;
                        // text-align: center;
                        &::before{
                            content: '';
                            float: left;
                            height: 30/375*100vw;
                            border-left: 1/375*100vw solid #ddd;
                            margin-top: 26/375*100vw;
                            // margin-left: 40/375*100vw;
                            // margin-right: 26/375*100vw;
                        }
                        .time{
                            margin-top: 22/375*100vw;
                            font-weight:500;
                            color:rgba(34,34,34,1);
                            font-size: 14/375*100vw;
                            text-align: center;
                        }
                        .address{
                            color:rgba(174,174,174,1);
                            font-size: 8/375*100vw;
                            // white-space: nowrap;
                            text-align: center;
                        }
                    }
                }
            }
        }
        .line{
            text-align: center;
            margin-bottom: 100/375*100vw;
        }
    }
</style>

