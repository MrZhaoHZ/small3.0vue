<template>
    <div class="recommend">
        <p class="recommend-title-subtitle">
            <span class="left">玩家推荐</span>
            <span class="right">年轻就要一起玩</span>
            <span class="justify-span"></span>
        </p>
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :bottomLoadingText="bottomLoadingText" ref="loadmore">
        <ul class="content" id="lazyImg">
            <li class="list" v-for="(item, index) in recommendData" :key="index + '_recommendData'" @click="goActivity(item, index)">
                <div class="list-img">
                    <img v-lazy.lazyImg="item.coverUrl + '?x-oss-process=image/resize,w_400'">
                    <span class="isFree">{{item.isFree==1?'免费':'付费'}}</span>
                    <p class="title">{{item.recReason}}</p>
                    <span class="list-icon"></span>
                    <div class="mask"></div>
                </div>
                <div class="list-details">
                    <div class="list-details-left">
                        <img :src="item.avatar">
                        <div class="name">
                            <p class="nick">{{item.nick}}</p>
                            <p class="catalogName">#{{item.catalogName}}</p>
                        </div>
                    </div>
                    <div class="list-details-right">
                        <p class="time">{{item.startDate}}</p>
                        <p class="address">{{item.area}}.{{item.district}}</p>
                    </div>
                </div>
            </li>
        </ul>
        </mt-loadmore>
        <p class="line" v-show="showline">-----已经没有更多了-----</p>
    </div>
</template>

<script>
import { activity } from '@/http/api'
import { Lazyload, Loadmore, Toast } from 'mint-ui';
export default {
    data(){
        return {
            recommendData: [],
            allLoaded: false,
            page: 1,
            bottomLoadingText: '加载中...',
            showline: false
        }
    },
    created(){
        this.getRecommend();
    },
    methods: {
        getRecommend(){
            let param = {
                page: this.page,
                sex: 1,
                size: 3,
                userLati: '31.866942',
                userLong: '117.282699'
            }
            activity(param).then(res => {
                if(res.code == 0){
                    console.log(res);
                    if(res.data.item){
                        this.recommendData = this.recommendData.concat(res.data.item)
                    }else{
                        this.$refs.loadmore.onBottomLoaded();
                        this.allLoaded = true;
                        this.showline = true;
                    }
                }else{
                    Toast(res.msg)
                }
            }, err => {
                console.log(err);
            })
        },
        loadBottom(){
            this.page ++;
            this.getRecommend();
        },
        goActivity(item, index){
            console.log(item)
            this.$router.push({
                path: '/activitydetails',
                query: {
                    productId: item.productId
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .recommend{
        margin: 0 20/375*100vw;
        margin-top: 36/375*100vw;
        .recommend-title-subtitle{
            text-align: justify;
            .left{
                display: inline-block;
                // width: 80/375*100vw;
                font-size: 20/375*100vw;
                color: #333;
            }
            .right{
                display: inline-block;
                // width: 84/375*100vw;
                font-size: 12/375*100vw;
            }
            .justify-span{
                display: inline-block;
                width: 100%;
            }
        }
        .content{
            // margin-bottom: 50/375*100vw;
            .list{
                position: relative;
                box-shadow: 0 2/375*100vw 12/375*100vw 0 rgba(82,87,104,0.12);
                margin-bottom: 20/375*100vw;
                border-radius: 6/375*100vw;
                .list-img{
                    position: relative;
                    width: 100%;
                    height: 168/375*100vw;
                    img{
                        width: 100%;
                        height: 100%;
                        border-radius: 6/375*100vw 6/375*100vw 0 0;
                    }
                    .isFree{
                        position: absolute;
                        right: 16/375*100vw;
                        top: 18/375*100vw;
                        width: 49/375*100vw;
                        height: 24/375*100vw;
                        font-size: 14/375*100vw;
                        color: #fff;
                        background:rgba(255,255,255, 0.1392);
                        border-radius: 4/375*100vw;
                        text-align: center;
                        line-height: 24/375*100vw;
                        z-index: 100;
                    }
                    .title{
                        position: absolute;
                        left: 20/375*100vw;
                        top: 53/375*100vw;
                        width: 242/375*100vw;
                        font-size: 24/375*100vw;
                        font-weight: 500;
                        color: #fff;
                        z-index: 1000;
                        overflow : hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        // -webkit-box-orient: vertical;
                        /*! autoprefixer: off */
                        -webkit-box-orient: vertical;
                        /* autoprefixer: on */

                    }
                    .list-icon{
                        position: absolute;
                        left: 19/375*100vw;
                        top: 22/375*100vw;
                        width: 23/375*100vw;
                        height: 14/375*100vw;
                        background: url('../../../../../assets/img/home/icon-colon.png') no-repeat;
                        background-size: 100% 100%;
                        z-index: 100;
                    }
                    .mask{
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 168/375*100vw;
                        background: rgba($color: #000000, $alpha: 0.3)
                    }
                }
                .list-details{
                    width: 100%;
                    height: 84/375*100vw;
                    .list-details-left,{
                        float: left;
                        width: 200/375*100vw;
                        height: 100%;
                    }
                    .list-details-right{
                        float: left;
                        width: 130/375*100vw;
                        height: 100%;
                    }
                    .list-details-left{
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
                                left: -9/375*100vw;
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
                    .list-details-right{
                        text-align: center;
                        &::before{
                            content: '';
                            float: left;
                            height: 30/375*100vw;
                            border-left: 1/375*100vw solid #ddd;
                            margin-top: 26/375*100vw;
                            // margin-left: 20/375*100vw;
                            // margin-right: 26/375*100vw;
                        }
                        .time{
                            margin-top: 22/375*100vw;
                            font-weight:500;
                            color:rgba(34,34,34,1);
                            font-size: 14/375*100vw;
                        }
                        .address{
                            color:rgba(174,174,174,1);
                            font-size: 8/375*100vw;
                            // transform: scale(0.83333);
                            // margin-left: -16/375*100vw;
                        }
                    }
                }
            }
        }
        .line{
            text-align: center;
            margin-bottom: 50/375*100vw;
        }
    }
</style>

