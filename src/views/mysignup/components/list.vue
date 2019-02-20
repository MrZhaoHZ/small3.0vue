<template>
    <div class="signuplist">
        <div v-if="listData.length != 0">
            <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
            <ul>
                <li v-for="(item, index) in listData" :key="index + '_listData'" @click="goActivity(item, index)">
                    <div class="container">
                        <img v-lazy="item.cover_url + '?x-oss-process=image/resize,w_400'">
                        <div class="right">
                            <p class="name">{{item.name}}</p>
                            <div class="address-time">
                                <p class="address">{{item.address}}</p>
                                <p class="time">{{item.acttime}}</p>
                            </div>
                            <span class="price">¥{{item.order_price}}</span>
                        </div>
                    </div>
                    <div class="foot">
                        <span class="num">{{item.count}}张</span>
                        <span>¥{{item.order_price * item.count}}</span>
                        <span class="status" v-if="item.status == 0">拒绝</span>
                        <span class="status" v-else-if="item.status == 1">待审核</span>
                        <span class="status" v-else-if="item.status == 11">待支付</span>
                        <span class="status" v-else-if="item.status == 2">待参加</span>
                        <span class="status" v-else-if="item.status == 3">退票中</span>
                        <span class="status" v-else-if="item.status == 4">已退票</span>
                        <span class="status" v-else-if="item.status == 41">已验票</span>
                        <span class="status" v-else-if="item.status == 5">已结束</span>
                        <span class="status" v-else-if="item.status == 6">已取消</span>
                    </div>
                </li>
            </ul>
            </mt-loadmore>
        </div>
        <div v-else class="blank">
            <img src="../../../assets/img/mycollection/blank.png">
            <p>青春不是一段时光，而是一群人</p>
        </div>
    </div>
</template>

<script>
import { getOrderList } from '@/http/api'
import cookie from '../../../lib/cookie'
import { Loadmore, Lazyload, Toast, Indicator } from 'mint-ui'
export default {
    data(){
        return{
            pageNum: 1,
            status: '',
            listData: [],
            allLoaded: false
        }
    },
    props:  {
        statusData: String
    },
    created(){
        this.getList();
    },
    methods: {
        getList(){
            let param = {
                pageNum: this.pageNum,
                status: this.status,
                userId: cookie.getCookie('userId') == 'undefined' ? '' : cookie.getCookie('userId')
            }
            getOrderList(param).then(res => {
                console.log(res)
                if(res && res.code == 0){
                    if(res.data.list.length != 0){
                        this.listData = this.listData.concat(res.data.list);
                    }else{
                        this.allLoaded = true
                        this.$refs.loadmore.onBottomLoaded();
                    }
                }
            })
        },
        goActivity(item, index){
            console.log(item)
            if(item.status == 11){

            }else if(item.status == 2){
                this.$router.push({
                    path: '/myticket',
                    query: {
                        orderNum: item.orderNum
                    }
                })
            }else{
                this.$router.push({
                    path: '/activitydetails',
                    query: {
                        productId: item.product_id
                    }
                })
            }
        },
        loadBottom(){
            this.pageNum ++
            console.log(this.pageNum)
            this.getList()
        }
    },
    watch: {
        statusData: function(newval, oldval){
            this.status = newval
            this.listData = [];
            this.getList();
        }
    }
}
</script>

<style lang="scss" scoped>
    .signuplist{
        margin: 0 18/375*100vw;
        li{
            box-shadow: 2/375*100vw 6/375*100vw 20/375*100vw 0 rgba(75,72,73,0.13);
            border-radius: 6/375*100vw;
            margin-top: 14/375*100vw;
        }
        .container{
            img{
                display: inline-block;
                width: 130/375*100vw;
                height: 90/375*100vw;
                vertical-align: top;
                margin-top: 10/375*100vw;
                border-radius: 6/375*100vw;
            }
            .right{
                position: relative;
                display: inline-block;
                width: 190/375*100vw;
                height: 110/375*100vw;
                vertical-align: top;
                margin-left: 10/375*100vw;
                .name{
                    max-height: 44/375*100vw;
                    overflow: hidden;
                    font-size: 14/375*100vw;
                    font-weight: 500;
                    color: #1C1C1C;
                    margin-top: 12/375*100vw;
                }
                .address-time{
                    position: absolute;
                    left: 0;
                    bottom: 12/375*100vw;
                    .address, .time{
                        font-size: 12/375*100vw;
                        color: #9B9B9B;
                        font-weight: 300;
                        width: 120/375*100vw;
                        overflow: hidden;
                        white-space: nowrap;
                    }
                }
                .price{
                    position: absolute;
                    right: 10/375*100vw;
                    bottom: 12/375*100vw;
                    color: #353B48;
                    font-size: 12/375*100vw;
                }
                
            }
        }
        .foot{
            width: 100%;
            height: 32/375*100vw;
            background: rgba(247,248,250,1);
            color: #52D89A;
            font-size: 14/375*100vw;
            line-height: 32/375*100vw;
            .status{
                float: right;
                margin-right: 10/375*100vw;
            }
            .num{
                margin-left: 10/375*100vw;
                margin-right: 15/375*100vw;
            }
        }
        .blank{
            text-align: center;
            margin-top: 40/375*100vw;
            color: #ccc;
            img{
                width: 200/375*100vw;
                margin-bottom: 20/375*100vw;
            }
        }
    }
</style>