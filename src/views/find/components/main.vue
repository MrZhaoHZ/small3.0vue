<template>
    <div class="findmain">
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul>
            <li class="list" v-for="(item, index) in mainList" :key="index + '_mainList'" @click="goAcdetails(item, index)">
                <img :src="item.cover_url">
                <div class="right">
                    <p class="name">{{item.name}}</p>
                    <div class="address-time">
                        <p class="address">{{item.district}} {{item.address}}</p>
                        <p>{{item.acttime}}</p>
                    </div>
                    <span class="price">¥{{item.price}}</span>
                </div>
            </li>
        </ul>
        </mt-loadmore>
    </div>
</template>

<script>
import {getProductList} from '@/http/api'
import cookie from '@/lib/cookie'
import { Toast, Loadmore } from 'mint-ui';
export default {
    data(){
        return{
            pageNum: 1,
            mainList: [],
            catalogId: null,
            cityId: '',
            priceId: null,
            timeId: null,
            allLoaded: false
        }
    },
    props: {
        mainData: Object,
        isChange: Boolean
    },
    created(){
        this.getData();
    },
    methods: {
        getData(){
            let param = {
                catalogId: this.catalogId,
                cityId: '',
                pageNum: this.pageNum,
                priceId: this.priceId,
                timeId: this.timeId,
                userId: cookie.getCookie('userId') == 'undefined' ? '' : cookie.getCookie('userId')
            }
            getProductList(param).then( res => {
                console.log(res)
                if(res && res.code == 0){
                    if(res.data.list.length > 0){
                        this.mainList = this.mainList.concat(res.data.list)
                    }else{
                        this.$refs.loadmore.onBottomLoaded();
                        this.allLoaded = true;
                    }
                }else{
                    Toast(res.msg)
                }
            })
        },
        loadBottom(){
            this.pageNum ++
            this.getData();
        },
        goAcdetails(item, index){
            console.log(item)
            this.$router.push({
                path: '/activitydetails',
                query: {
                    productId: item.productId
                }
            })
        }
    },
    watch: {
        isChange: function(newVal, oldVal){
            this.mainList = [];
            this.catalogId = this.$props.mainData.catalogId
            this.cityId = this.$props.mainData.cityId
            this.priceId = this.$props.mainData.priceId
            this.timeId = this.$props.mainData.timeId
            this.getData()
        }
    }
}
</script>

<style lang="scss" scoped>
    .findmain{
        margin: 0 18/375*100vw;
        ul{
            margin-top: 18/375*100vw;
        }
        .list{
            height: 110/375*100vw;
            box-shadow: 2/375*100vw 6/375*100vw 20/375*100vw 0 rgba(75,72,73,0.13);
            border-radius: 6/375*100vw;
            margin-bottom: 12/375*100vw;
            img{
                display: inline-block;
                width: 130/375*100vw;
                height: 90/375*100vw;
                vertical-align: top;
                border-radius: 4/375*100vw;
                margin-top: 10/375*100vw;
            }
            .right{
                position: relative;
                display: inline-block;
                width: 190/375*100vw;
                vertical-align: top;
                margin-left: 8/375*100vw;
                height: 100%;
                .name{
                    font-size: 20/375*100vw;
                    color: #1C1C1C;
                    font-weight: 500;
                    margin-top: 12/375*100vw;
                    overflow : hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    /*! autoprefixer: off */
                    -webkit-box-orient: vertical;
                    /* autoprefixer: on */
                }
                .address-time{
                    position: absolute;
                    left: 0;
                    bottom: 10/375*100vw;
                    font-size: 12/375*100vw;
                    .address{
                        width: 140/375*100vw;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                    }
                }
                .price{
                    position: absolute;
                    right: 10/375*100vw;
                    bottom: 10/375*100vw;
                    font-size: 12/375*100vw;
                    color: #353B48;
                }
            }
        }
    }
</style>

