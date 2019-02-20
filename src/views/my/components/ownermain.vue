<template>
    <div class="ownermain">
        <mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul>
            <li class="list" v-for="(item, index) in ownermainData" :key="index + '_ownermainData'">
                <img :src="item.cover_url">
                <div class="right">
                    <p class="name">{{item.name}}</p>
                    <div class="address-date">
                        <p class="address">{{item.address}}</p>
                        <span>{{item.startDateStr}}</span>
                    </div>
                    <span class="status" v-if="item.status == 0">草稿</span>
                    <span class="status" v-else-if="item.status == 1">待上架</span>
                    <span class="status" v-else-if="item.status == 2">已上架</span>
                    <span class="status" v-else-if="item.status == 3">已下架</span>
                </div>
            </li>
        </ul>
        </mt-loadmore>
        <p class="line" v-show="showline">-----已经没有更多了-----</p>
    </div>
</template>

<script>
import { findProductByUserID } from '@/http/api'
import cookie from '../../../lib/cookie'
import { Loadmore, Toast } from 'mint-ui';
export default {
    data(){
        return{
            ownermainData: [],
            page: 1,
            allLoaded: false,
            showline: false
        }
    },
    created(){
        this.getData();
    },
    methods: {
        getData(){
            let param = {
                page: this.page,
                size: 5,
                userId: cookie.getCookie('userId') == 'undefined' ? '' : cookie.getCookie('userId')
            }
            findProductByUserID(param).then(res => {
                console.log(res)
                if(res && res.code == 0){
                    if(res.data.productList.length > 0){
                        this.ownermainData = this.ownermainData.concat(res.data.productList)
                    }else{
                        this.$refs.loadmore.onBottomLoaded()
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
        loadBottom(){
            this.page ++;
            console.log(this.page)
            this.getData();
        }
    }
}
</script>

<style lang="scss" scoped>
    .ownermain{
        margin: 0 18/375*100vw;
        // margin-bottom: 60/375*100vw;
        .list{
            width: 100%;
            height: 110/375*100vw;
            box-shadow: 2/375*100vw 6/375*100vw 20/375*100vw 0 rgba(75,72,73,0.13);
            margin-bottom: 12/375*100vw;
            img{
                display: inline-block;
                width: 144/375*100vw;
                height: 90/375*100vw;
                margin: 10/375*100vw 0;
                border-radius: 6/375*100vw;
                vertical-align: top;
            }
            .right{
                position: relative;
                display: inline-block;
                width: 170/375*100vw;
                vertical-align: top;
                margin-left: 10/375*100vw;
                height: 100%;
                .name{
                    color: #1C1C1C;
                    font-weight: 500;
                    font-size: 16/375*100vw;
                    overflow : hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    /*! autoprefixer: off */
                    -webkit-box-orient: vertical;
                    /* autoprefixer: on */
                    margin-top: 10/375*100vw;
                }
                .address-date{
                    position: absolute;
                    left: 0;
                    bottom: 7/375*100vw;
                    color: #9B9B9B;
                    font-size: 12/375*100vw;
                    font-weight: 300;
                    .address{
                        // width: 120/375*100vw;
                        overflow : hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        /*! autoprefixer: off */
                        -webkit-box-orient: vertical;
                        /* autoprefixer: on */
                    }
                }
                .status{
                    position: absolute;
                    right: 10/375*100vw;
                    bottom: 5/375*100vw;
                    font-size: 12/375*100vw;
                }
            }
        }
        .line{
            text-align: center;
            margin-bottom: 50/375*100vw;
        }
    }
</style>

