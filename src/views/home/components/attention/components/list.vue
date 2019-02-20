<template>
    <div class="list">
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmoreList">
        <ul id="imgLazy" v-if="listData.length!=0">
            <li class="container" v-for="(item, index) in listData" :key="index + '_listData'" @click="goActivity(item, index)">
                <div class="list-head">
                    <img :src="item.icon">
                    <div class="content">
                        <p class="name">{{item.name}}</p>
                        <p class="fans">
                            <span>粉丝数{{item.followCount}}</span>
                            <span>共{{item.productCount}}场活动</span>
                        </p>
                        <span class="time">{{item.productCreateDate}}</span>
                    </div>
                </div>
                <div class="list-main">
                    <img v-lazy.imgLazy="item.coverUrl + '?x-oss-process=image/resize,w_400'">
                    <span class="productName">{{item.productName}}</span>
                    <span class="icon"></span>
                    <div class="mask"></div>
                </div>
                <div class="list-foot">
                    <div class="left">
                        #{{item.catalogName}}
                    </div>
                    <div class="right">
                        <p>{{item.productStartDate}}</p>
                        <p>{{item.area}}</p>
                    </div>
                </div>
            </li>
        </ul>
        </mt-loadmore>
        <p class="line" v-show="showline">-----已经没有更多了-----</p>
    </div>
</template>

<script>
import { Toast, Lazyload, Loadmore } from 'mint-ui'
import { getProductListByUserFollow } from '@/http/api'
import cookie from '../../../../../lib/cookie'
export default {
    data(){
        return{
            openId: null,
            pageNum: '1', 
            userId: null,
            listData: [],
            allLoaded: false,
            showline: false
        }
    },
    created(){
        this.getList();
    },
    methods: {
        getList(){
            this.openId = cookie.getCookie('openId');
            this.userId = cookie.getCookie('userId');
            let param = {
                openId: this.openId == 'undefined' ? '' : this.openId,
                pageNum: String(this.pageNum) , //string
                userId: this.userId == 'undefined' ? '' : this.userId,
            }
            getProductListByUserFollow(param).then( res => {
                if(res.code == 0){
                    if(res.data.list.length > 0){
                        console.log(res);
                        // this.allLoaded = false;
                        this.listData = this.listData.concat(res.data.list);
                    }else{
                        this.$refs.loadmoreList.onBottomLoaded();
                        this.allLoaded = true
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
            this.pageNum ++;
            console.log(this.pageNum)
            this.getList();
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
    .list{
        margin: 16/375*100vw 19/375*100vw;
        margin-bottom: 100/375*100vw;
        .container{
            box-shadow: 2/375*100vw 6/375*100vw 20/375*100vw 0 rgba(75,72,73,0.13);
            border-radius: 6/375*100vw;
            width: 100%;
            height: 300/375*100vw;
            background: #fff;
            // margin-bottom: 20/375*100vw;
            .list-head{
                position: relative;
                width: 100%;
                height: 68/375*100vw;
                img{
                    display: inline-block;
                    width: 44/375*100vw;
                    height: 44/375*100vw;
                    border-radius: 50%;
                    margin: 12/375*100vw 16/375*100vw;
                    vertical-align: middle;
                }
                .content{
                    
                    display: inline-block;
                    vertical-align: middle;
                    .name{
                        font-size: 14/375*100vw;
                    }
                    .fans{
                        font-size: 12/375*100vw;
                        color:rgba(154,157,163,1);
                    }
                    .time{
                        position: absolute;
                        right: 16/375*100vw;
                        top: 16/375*100vw;
                        font-size: 12/375*100vw;
                        color:rgba(154,157,163,1);
                    }
                }
            }
            .list-main{
                position: relative;
                font-size: 0;
                img{
                    width: 100%;
                    height: 168/375*100vw;
                }
                .icon{
                    position: absolute;
                    left: 20/375*100vw;
                    top: 20/375*100vw;
                    width: 23/375*100vw;
                    height: 14/375*100vw;
                    background: url('../../../../../assets/img/home/icon-colon.png') no-repeat;
                    background-size: 100% 100%;
                    z-index: 100;
                }
                .productName{
                    position: absolute;
                    left: 20/375*100vw;
                    top: 53/375*100vw;
                    width: 242/375*100vw;
                    color: #fff;
                    font-size: 24/375*100vw;
                    font-weight: 500;
                    z-index: 100;
                    overflow : hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    /*! autoprefixer: off */
                    -webkit-box-orient: vertical;
                    /* autoprefixer: on */
                   
                }
                .mask{
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    background: #000;
                    opacity: 0.3;
                }
            }
            .list-foot{
                width: 100%;
                height: 64/375*100vw;
                .left, .right{
                    float: left;
                    width: 50%;
                    height: 30/375*100vw;
                    margin-top: 15/375*100vw;
                    text-align: center;
                }
                .left{
                    line-height: 30/375*100vw;
                    border-right: 1/375*100vw solid rgba(230,230,230,1);
                    box-sizing: border-box;
                    font-size: 13/375*100vw;
                    color:rgba(129,129,129,1);
                }
                .right{
                    font-size: 0;
                    p:first-child{
                        font-size: 14/375*100vw;
                        font-weight:500;
                        color:rgba(34,34,34,1);
                    }
                    p:last-child{
                        font-size: 12/375*100vw;
                        color:rgba(174,174,174,1);
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

