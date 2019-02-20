<template>
    <div class="ownerhomefoot" v-if="listData">
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul>
            <li v-for="(item, index) in listData" :key="index + '_listData'">
                <div class="head">
                    <img :src="item.picUrl">
                    <p class="title">{{item.title}}</p>
                    <span class="icon"></span>
                    <div class="mask"></div>
                    <span class="photo" @click="eventAlbum(item)"></span>
                </div>
                <div class="foot">
                    <div class="foot-left">
                        <div class="like">
                            <img src="../../../assets/img/ownerhomepage/like.png">
                            <span>{{item.likeNum}}</span>
                        </div>
                        <div class="reply">
                            <img src="../../../assets/img/ownerhomepage/reply.png">
                            <span>{{item.commentNum}}</span>
                        </div>
                        <div class="share">
                            <img src="../../../assets/img/ownerhomepage/share.png">
                            <span>{{item.shareNum}}</span>
                        </div>
                    </div>
                    <div class="foot-right">
                        <p class="time">
                            <span>{{item.time}}</span>
                        </p>
                        <p class="address">
                            <span>{{item.area}}{{item.district}}</span>
                        </p>
                    </div>
                </div>
            </li>
        </ul>
        </mt-loadmore>
        <p class="line" v-show="showline">-----已经没有更多了-----</p>
    </div>
</template>

<script>
import { indexPage } from '@/http/api'
import cookie from '../../../lib/cookie';
import { Toast, Loadmore, Lazyload } from 'mint-ui';
export default {
    data(){
        return{
            allianUserId: null,
            pageNum: this.pageNum,
            type: null,
            listData: [],
            allLoaded: false,
            showline: false
        }
    },
    props: {
        footData: Array,
        getType: Number
    },
    created(){
        this.listData = this.$props.footData
    },
    methods: {
        getData(){
            if(this.$route.query.allianUserId){
                this.allianUserId = this.$route.query.allianUserId
            }else{
                this.allianUserId = cookie.getCookie('userId') == 'undefined' ? '' : cookie.getCookie('userId')
            }
            let param = {
                allianUserId: this.allianUserId,
                openId: cookie.getCookie('openId') == 'undefined' ? '' : cookie.getCookie('openId'),
                pageNum: this.pageNum,
                pageSize: 5,
                source: '3',
                type: this.type,
                userId: cookie.getCookie('userId') == 'undefined' ? '' : cookie.getCookie('userId')
            }
            indexPage(param).then(res => {
                if(res && res.code == 0){
                    if(res.data.count > 0){
                        this.listData = this.listData.concat(res.data.list)
                    }else{
                        this.allLoaded = true;
                        this.$refs.loadmore.onBottomLoaded();
                        this.showline = true
                    }
                }else{
                    Toast(res.msg)
                }
            })
        },
        loadBottom(){
            this.pageNum ++ ;
            this.getData();
        },
        //活动相册
        eventAlbum(item){
            // console.log(item)
            this.$router.push({
                path: '/eventalbum',
                query: {
                    productId: item.productId
                }
            })
        }
    },
    watch: {
        getType: function(newVal, oldVal){
            this.type = this.$props.getType;
            this.listData = [];
            this.getData();
        },
        footData: function(newval, oldval){
            this.listData = newval
        }
    }
}
</script>

<style lang="scss" scoped>
    .ownerhomefoot{
        margin: 0 12/375*100vw;
        margin-top: 12/375*100vw;
        ul{
            li{
                box-shadow: 2/375*100vw 6/375*100vw 20/375*100vw 0 rgba(75,72,73,0.13);
                border-radius: 6/375*100vw;
                margin-bottom: 12/375*100vw;
                .head{
                    position: relative;
                    height: 175/375*100vw;
                    img{
                        width: 100%;
                        height: 175/375*100vw;
                    }
                    .title{
                        position: absolute;
                        left: 20/375*100vw;
                        top: 55/375*100vw;
                        color: #fff;
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
                        background: rgba($color: #000000, $alpha: .3)
                    }
                    .icon{
                        position: absolute;
                        left: 19/375*100vw;
                        top: 22/375*100vw;
                        width: 23/375*100vw;
                        height: 14/375*100vw;
                        background: url('../../../assets/img/home/icon-colon.png') no-repeat;
                        background-size: 100% 100%;
                        z-index: 100;
                    }
                    .photo{
                        position: absolute;
                        right: 10/375*100vw;
                        top: 10/375*100vw;
                        width: 30/375*100vw;
                        height: 30/375*100vw;
                        background: url('../../../assets/img/ownerhomepage/photo.png') no-repeat;
                        background-size: 100% 100%;
                        border-radius: 50%;
                    }
                }
                .foot{
                    margin: 0 14/375*100vw;
                    .foot-left, .foot-right{
                        display: inline-block;
                    }
                    .foot-left{
                        padding: 23/375*100vw 0;
                        .like, .reply, .share{
                            position: relative;
                            display: inline-block;
                            margin-right: 30/375*100vw;
                            span{
                                position: absolute;
                                right: -10/375*100vw;
                                top: -10/375*100vw;
                                font-size: 11/375*100vw;
                                color: #666;
                            }
                            img{
                                width: 18/375*100vw;
                                height: 18/375*100vw;
                            }
                        }
                    }
                    .foot-right{
                        float: right;
                        padding: 13/375*100vw 0;
                        span{

                        }
                        .time{
                            text-align: center;
                            color: #222222;
                            font-weight:500;
                            font-size: 14/375*100vw;
                        }
                        .address{
                            text-align: center;
                            color: #AEAEAE;
                            font-size: 10/375*100vw;
                        }
                    }
                }
            }
        }
        .line{
            text-align: center;
            margin-top: 20/375*100vw;
            margin-bottom: 50/375*100vw;
        }
    }
</style>

