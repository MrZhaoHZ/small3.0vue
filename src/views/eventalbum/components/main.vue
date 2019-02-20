<template>
    <div class="eventalbumMain" v-if="imgList">
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul>
            <li v-for="(item, index) in imgList" :key="item.id" :class="{'limargin': (index + 2)%3 == 0}">
                <img v-lazy="item.picUrl" @click="bigImg(index)">
                <span class="icon" @click="delImg(item, index)" v-if="editImg"></span>
            </li>
        </ul>
        </mt-loadmore>
        <div class="box" v-show="showBox">
            <div class="content">
                <p class="title">确定删除?</p>
                <span class="left" @click="showBox = false">取消</span>
                <span class="right" @click="sure">删除</span>
            </div>
        </div>
        <div class="swipe" v-if="showSwipe">
            <mt-swipe :auto = "0" :showIndicators = 'false' :continuous = 'false' :defaultIndex = 'defaultIndex'>
                <mt-swipe-item v-for="(img, i) in imgList" :key="i + '_imgList'">
                    <img :src="img.picUrl" @click="closeBigImg">
                </mt-swipe-item>
            </mt-swipe>
        </div>
    </div>
</template>

<script>
import { uploadProductPhoto, getProductPhoto } from '@/http/api'
import cookie from '../../../lib/cookie';
import { Indicator, Toast, Lazyload, Loadmore, Swipe, SwipeItem } from 'mint-ui';
export default {
    data(){
        return{
            showBox: false,
            delIndex: null,
            delId: null,
            editImg: false,
            allLoaded: false,
            pageNum: 1,
            imgList: [],
            showSwipe: false,
            defaultIndex: null
        }
    },
    created(){
        this.imgList = this.$props.albumMainData
    },
    props: {
        albumMainData: Array,
        id: Number,
        isEditImg: Boolean
    },
    methods: {
        delImg(item, index){
            this.showBox = true;
            this.delIndex  = index;
            this.delId = item.id
            console.log(this.delIndex)
            console.log(item)
        },
        sure(){
            Indicator.open();
            let param = {
                photoId: this.delId,
                userId: cookie.getCookie('userId') == 'undefined' ? '' : cookie.getCookie('userId')
            }
            uploadProductPhoto(param).then( res => {
                Indicator.close();
                this.showBox = false
                if(res && res.code == 0){
                    console.log(this.delIndex);
                    console.log(this.imgList)
                    this.imgList.splice(this.delIndex, 1)

                }else{
                    Toast(res.msg)
                }
            })
        },
        loadBottom(){
            this.pageNum ++ ;
            let param = {
                pageNum: this.pageNum,
                pageSize: 9,
                productId: this.$route.query.productId,
                userId: cookie.getCookie('userId') == 'undefined' ? '' : cookie.getCookie('userId')
            }
            getProductPhoto(param).then( res => {
                console.log(res)
                if(res && res.code == 0){
                    if(res.data.productPhotoList.photoList.length > 0){
                        this.imgList = this.imgList.concat(res.data.productPhotoList.photoList)
                    }else{
                        this.allLoaded = true;
                        this.$refs.loadmore.onBottomLoaded();
                    }
                }else{
                    Toast(res.msg)
                }
            })
        },
        bigImg(index){
            this.showSwipe = true;
            this.defaultIndex = index;
        },
        closeBigImg(){
            this.showSwipe = false;
        }   
    },
    watch: {
        isEditImg: function(newval, oldval){
            this.editImg = newval
        }
    }
}
</script>

<style lang="scss" scoped>
    .eventalbumMain{
        margin-top: 20/375*100vw;
        ul{
            font-size: 0;
            li{
                position: relative;
                display: inline-block;
                width: 123/375*100vw;
                height: 123/375*100vw;
                margin-bottom: 3/375*100vw;
                img{
                    width: 100%;
                    height: 100%;
                }
                .icon{
                    position: absolute;
                    right: 0;
                    top: 0;
                    width: 16/375*100vw;
                    height: 16/375*100vw;
                    background: url('../../../assets/img/uploadphotos/del.png') no-repeat;
                    background-size: 100% 100%;
                    z-index: 10;
                }
            }
            .limargin{
                margin: 0 3/375*100vw;
            }
        }
        .box{
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba($color: #000000, $alpha: .5);
            z-index: 100;
            .content{
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                width: 315/375*100vw;
                height: 156/375*100vw;
                background: #fff;
                border-radius: 10/375*100vw;
                .title{
                    text-align: center;
                    font-size: 18/375*100vw;
                    color: #000;
                    margin-top: 30/375*100vw;
                    margin-bottom: 38/375*100vw;
                }
                span{
                    width: 132/375*100vw;
                    height: 50/375*100vw;
                    text-align: center;
                    line-height: 50/375*100vw;
                    font-size: 14/375*100vw;
                    border-radius: 25/375*100vw;
                }
                .left{
                    float: left;
                    margin-left: 20/375*100vw;
                    background: #F5F5F8;
                    color: #404852;
                }
                .right{
                    float: right;
                    color: #fff;
                    background: linear-gradient(133deg,rgba(121,233,172,1) 0%,rgba(52,202,140,1) 100%);
                    margin-right: 20/375*100vw;
                }
            }
        }
        .swipe{
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: #000;
            z-index: 1000;
            .mint-swipe{
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                width: 100%;
                height: 100%;
                background: #000;
                .mint-swipe-item{
                    img{
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%);
                        width: 100%;
                    }
                }
            }
        }
    }
</style>

