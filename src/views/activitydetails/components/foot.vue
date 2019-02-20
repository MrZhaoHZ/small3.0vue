<template>
    <div class="foot">
        <div class="icon">
            <ul v-if="footData.collectPraiseShare">
                <li class="icon-collection" @click="collectClick">
                    <img src="@/assets/img/activitydetails/collection.png" v-if="flagCollect">
                    <img src="@/assets/img/activitydetails/collected.png" v-else>
                    <p>收藏</p>
                    <span>{{footData.collectPraiseShare.collect}}</span>
                </li>
                <li class="icon-like" @click="likeClick">
                    <img src="@/assets/img/activitydetails/like.png" v-if="flagLike">
                    <img src="@/assets/img/activitydetails/liked.png" v-else>
                    <p>点赞</p>
                    <span>{{footData.collectPraiseShare.praise}}</span>
                </li>
                <li class="icon-share" @click="shareClick">
                    <img src="@/assets/img/activitydetails/share.png">
                    <p>分享</p>
                    <span>{{footData.collectPraiseShare.share}}</span>
                </li>
            </ul>
        </div>
        <div class="btn" @click="startClick">{{footData.buttonName}}</div>
        <div class="popupmask" v-show="mask" @click="maskshow"></div>
        <div class="popup">
            <mt-popup
                v-model="popupVisiblePopup"
                position="bottom"
                :closeOnClickModal="true">
                <div class="popup-container">
                    <div class="popup-content">
                        <div class="title">
                            <span>选择票价</span>
                        </div>
                        <div class="list">
                            <ul>
                                <li v-for="(item, index) in footData.ticketlist" :key="index + '_ticket'">
                                    <p :class="['list-price-name', {'list-price-name-select': index==isSelect}]" @click="select(item, index)">
                                        <span class="list-name">{{item.name}}</span>
                                        <span class="list-price">{{item.price}}元</span>
                                    </p>
                                    <p class="list-message" v-if="item.message&&index == isSelect">{{item.message}}</p>
                                    <div class="dataTime" v-if="index == isSelect && item.every == 1">
                                        <span>选择日期</span>
                                        <p @click="openPicker">{{joinDate}}</p>
                                    </div>
                                    <div class="num" v-if="index == isSelect">
                                        <span class="num-title">选择数量</span>
                                        <span class="limitednum">（ 限购{{item.limitednum}}张 ）</span>
                                        <div class="num-cut-add">
                                            <span class="num-price">¥{{item.price}}</span>
                                            <span class="num-price-num">{{item.price}}*{{count}}</span>
                                            <p class="content"><span class="cut" @click="cut">-</span><span class="digital">{{count}}</span><span class="add" @click="add(item, index)">+</span></p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="submit" @click="submit">选好了</div>
                </div>
            </mt-popup>
        </div>
        <mt-datetime-picker
            ref="picker"
            type="date"
            :startDate="new Date(footData.startDate)"
            :endDate="new Date(footData.endDate)"
            v-model="pickerValue"
            @confirm="handleConfirm">
        </mt-datetime-picker>
    </div>
</template>


<script>
import { collectOrShare, getWeixinH5Config, getCollectLikeStatus, submitOrder } from '@/http/api'
import cookie from '@/lib/cookie'
import wx from 'weixin-js-sdk'
import isWechat from '../../../lib/isWechat.js'
import { Toast, Indicator, DatetimePicker } from 'mint-ui';
export default {
    data(){
        return {
            flagCollect: true,
            flagLike: true,
            openId: null,
            userId: null,
            appId: null,
            nonceStr: null,
            signature: null,
            timestamp: null,
            shareUrl: '', //分享的链接
            imgUrl: 'https://cdn.17wawawa.com/h5/logoH5.png', //分享的图片
            mask: false,
            productId: null,
            popupVisiblePopup: false,
            isSelect: 0, //当前选中
            count: 1, // 数量
            id: null, //票的id
            previous: null,
            previousLike: null,
            pickerValue: null,
            joinDate: ''
        }
    },
    props: {
        footData: Object
    },
    created(){
        this.openId = cookie.getCookie('openId');
        this.userId = cookie.getCookie('userId');
        this.productId = this.$route.query.productId;
        if(this.$props.footData.ticketlist.length!=0){
            this.id = this.$props.footData.ticketlist[this.isSelect].id;
            console.log(this.id)
        }
        this.joinDate = this.$props.footData.startDate.split(' ')[0]
        this.shareUrl = window.location.href.split('#')[0] + '#/activitydetails?productId=' + this.productId;
        // this.shareUrl = window.location.href.split('#')[0] + '#/activitydetails'
        if(isWechat){
            this.shareActivitydetails();
        }
        this.getCollect();
        
    },
    methods: {

        // 函数节流
        throttle(fn, wait, time){
            let previous = null
            let timer = null
            return function(){
                let now = +new Date();
                if( !previous ){
                    return previous = now;
                } 
                if(now - previous > time){
                    clearTimeout(timer);
                    fn()
                    previous = now;
                }else{
                    clearTimeout(timer);
                    timer = setTimeout(function(){
                        fn();
                    }, wait);
                }
            }
        },
        // 获取收藏和点赞状态
        getCollect(){
            if(this.openId || this.userId){
                let param = {
                    object_id: this.productId,
                    object_type: 1,
                    openId: this.openId,
                    userId: this.userId
                }
                getCollectLikeStatus(param).then(res => {
                    console.log(res)
                    if(res.code == 0){
                        if(!res.data.CollectLickStatus){
                            return false
                        }
                        if(res.data.CollectLickStatus.collectStatus == 0){
                            this.flagCollect = true
                        }else{
                            this.flagCollect = false
                        }
                        if(res.data.CollectLickStatus.likeStatus == 0){
                            this.flagLike = true
                        }else{
                            this.flagLike = false
                        }
                    }
                })
            }
        },
        // 微信分享配置
        shareActivitydetails(){
            let param = {
                // url: window.location.origin,
                url: window.location.href.split('#')[0]
            }
            getWeixinH5Config(param).then(res => {
                console.log(res)
                if(res.code == 0){
                    this.appId = res.data.appId;
                    this.nonceStr = res.data.nonceStr;
                    this.signature = res.data.signature;
                    this.timestamp = res.data.timestamp;
                    let _this = this;
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: _this.appId, // 必填，公众号的唯一标识
                        timestamp: _this.timestamp, // 必填，生成签名的时间戳
                        nonceStr: _this.nonceStr, // 必填，生成签名的随机串
                        signature: _this.signature,// 必填，签名
                        jsApiList: [
                            'updateAppMessageShareData',
                            'updateTimelineShareData',
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage',
                            'onMenuShareQQ',
                            'onMenuShareQZone'
                        ] // 必填，需要使用的JS接口列表
                    });
                    wx.ready(function(){
                        // wx.updateAppMessageShareData({
                        //     title: _this.$props.footData.name, //分享标题
                        //     desc: _this.$props.footData.shareLabel, // 分享描述
                        //     link: _this.shareUrl, //分享的链接
                        //     imgUrl: _this.imgUrl, //分享图标
                        // }, function(res){
                        //     let param = { //分享
                        //         action_type: 4,
                        //         object_id: _this.productId,
                        //         object_type: 1,
                        //         openId: _this.openId,
                        //         sign: 1,
                        //         userId: _this.userId
                        //     }
                        //     collectOrShare(param).then(res => {
                        //         console.log(res)
                        //     })
                        // }),
                        // wx.updateTimelineShareData({
                        //     title: _this.$props.footData.name, // 分享标题
                        //     link: _this.shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        //     imgUrl: _this.imgUrl, // 分享图标
                        // }, function(res){
                        //     let param = { //分享
                        //         action_type: 4,
                        //         object_id: _this.productId,
                        //         object_type: 1,
                        //         openId: _this.openId,
                        //         sign: 1,
                        //         userId: _this.userId
                        //     }
                        //     collectOrShare(param).then(res => {
                        //         console.log(res)
                        //     })
                        // })

                        wx.onMenuShareTimeline({ //分享到朋友圈
                            title: _this.$props.footData.name, // 分享标题
                            link: _this.shareUrl + '&ADTAG=tx.wx.pyq' , // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: _this.$props.footData.cover_url, // 分享图标
                            success: function(){

                                let param = { //分享
                                    action_type: 4,
                                    object_id: _this.productId,
                                    object_type: 1,
                                    openId: _this.openId=='undefined'?'':_this.openId,
                                    sign: 1,
                                    userId: _this.userId=='undefined'?'':_this.userId
                                }
                                collectOrShare(param).then(res => {
                                    console.log(res)
                                })
                                
                            }
                        })
                        wx.onMenuShareAppMessage({ //分享给朋友
                            title: _this.$props.footData.name, // 分享标题
                            desc: _this.$props.footData.shareLabel,
                            link: _this.shareUrl + '&ADTAG=tx.wx.hh', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: _this.$props.footData.cover_url, // 分享图标
                            success: function(){
                                let param = { //分享
                                    action_type: 4,
                                    object_id: _this.productId,
                                    object_type: 1,
                                    openId: _this.openId=='undefined'?'':_this.openId,
                                    sign: 1,
                                    userId: _this.userId=='undefined'?'':_this.userId
                                }
                                collectOrShare(param).then(res => {
                                    console.log(res)
                                })
                            }
                        })
                        wx.onMenuShareQQ({ //分享给qq
                            title: _this.$props.footData.name, // 分享标题
                            desc: _this.$props.footData.shareLabel,
                            link: _this.shareUrl + '&ADTAG=tx.qq.hh', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: _this.$props.footData.cover_url, // 分享图标
                            success: function(){
                                let param = { //分享
                                    action_type: 4,
                                    object_id: _this.productId,
                                    object_type: 1,
                                    openId: _this.openId=='undefined'?'':_this.openId,
                                    sign: 1,
                                    userId: _this.userId=='undefined'?'':_this.userId
                                }
                                collectOrShare(param).then(res => {
                                    console.log(res)
                                })
                            }
                        })
                        wx.onMenuShareQZone({ //分享给qq空间
                            title: _this.$props.footData.name, // 分享标题
                            desc: _this.$props.footData.shareLabel,
                            link: _this.shareUrl + '&ADTAG=tx.qq.qzone', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: _this.$props.footData.cover_url, // 分享图标
                            success: function(){
                                let param = { //分享
                                    action_type: 4,
                                    object_id: _this.productId,
                                    object_type: 1,
                                    openId: _this.openId=='undefined'?'':_this.openId,
                                    sign: 1,
                                    userId: _this.userId=='undefined'?'':_this.userId
                                }
                                collectOrShare(param).then(res => {
                                    console.log(res)
                                })
                            }
                        })
                    })
                    wx.error(function(res){
                        console.log(res)
                    })
                }
            })
        },
        // 收藏
        collectClick(){
            let time = 1000
            let now = +new Date(); 
            if(now - this.previous > time){
                if(!(this.openId || this.userId)){
                    this.$router.push({
                        path: '/login',
                        query: {
                            redirect: '/activitydetails?productId=' + this.productId
                        }
                    })
                    return false
                }
                if(this.flagCollect){
                    let param = { //收藏
                        action_type: 1,
                        object_id: this.productId,
                        object_type: 1,
                        openId: this.openId=='undefined'?'':this.openId,
                        sign: 1,
                        userId: this.userId=='undefined'?'':this.userId
                    }
                    collectOrShare(param).then( res => {
                        console.log(res, '收藏');
                        if(res.code == 0){
                            this.flagCollect = false;
                            this.$props.footData.collectPraiseShare.collect += 1;
                        }else{
                            Toast(res.msg)
                        }
                    })
                }else{
                    let param = { //取消收藏
                        action_type: 1,
                        object_id: localStorage.getItem('productId'),
                        object_type: 1,
                        openId: this.openId=='undefined'?'':this.openId,
                        sign: 0,
                        userId: this.userId=='undefined'?'':this.userId
                    }
                    collectOrShare(param).then( res => {
                        console.log(res, '取消收藏')
                        if(res.code == 0){
                            this.flagCollect = true;
                            this.$props.footData.collectPraiseShare.collect -= 1;
                        }else{
                            Toast(res.msg)
                        }
                    })
                }
                this.previous = now;
            }
        },
        // 点赞
        likeClick(){
            let time = 1000
            let now = +new Date(); 
            if(now - this.previousLike > time){
                if(!(this.openId || this.userId)){
                    this.$router.push({
                        path: '/login',
                        query: {
                            redirect: '/activitydetails?productId=' + this.productId
                        }
                    })
                    return false
                }
                if(this.flagLike){
                    let param = { // 点赞
                        action_type: 2,
                        object_id: localStorage.getItem('productId'),
                        object_type: 1,
                        openId: this.openId=='undefined'?'':this.openId,
                        sign: 1,
                        userId: this.userId=='undefined'?'':this.userId
                    }
                    collectOrShare(param).then(res => {
                        console.log(res, '点赞')
                        if(res.code == 0){
                            this.flagLike = false;
                            this.$props.footData.collectPraiseShare.praise += 1;
                        }else{
                            Toast(res.msg)
                        }
                    })
                }else{
                    let param = { // 取消点赞
                        action_type: 2,
                        object_id: localStorage.getItem('productId'),
                        object_type: 1,
                        openId: this.openId=='undefined'?'':this.openId,
                        sign: 0,
                        userId: this.userId=='undefined'?'':this.userId
                    }
                    collectOrShare(param).then(res => {
                        console.log(res, '取消点赞')
                        if(res.code == 0){
                            this.flagLike = true;
                            this.$props.footData.collectPraiseShare.praise -= 1;
                        }else{
                            Toast(res.msg)
                        }
                    })
                }
                this.previousLike = now;
            }
        },
        // 分享
        shareClick(){
            if(!isWechat){
                Toast('请在微信中打开')
            }else{
                this.mask = true;
            }
        },
        maskshow(){
            this.mask = false;
        },
        // 开始抢票
        startClick(){
            if(this.$props.footData.buttonName == '开始组队' && this.$props.footData.applyForm.length == 0){
                Indicator.open();
                let param = {
                    applyForm: this.$props.footData.applyForm,
                    productId: this.productId,
                    ticket: {
                        id: this.$props.footData.ticketlist[0].id,
                        count: '1',
                        joinDate: this.joinDate
                    },
                    userId: this.userId
                }
                submitOrder(param).then( res => {
                    console.log(res)
                    Indicator.close();
                    if(res.code == 0){
                        // this.$router.push({
                        //     path: '/blankpage',
                        //     query: {
                        //         id: 1
                        //     }
                        // })
                        this.$router.push('/mysignup')
                    }else{
                        Indicator.close();
                        Toast(res.msg)
                    }
                }, err => {
                    console.log(err);
                })
            }else{
                this.popupVisiblePopup = true
            }
        },
        select(item, index){
            this.id = item.id
            this.isSelect = index;
            this.joinDate = this.$props.footData.startDate.split(' ')[0]
        },
        cut(){
            if(this.count == 1){
                return false
            }
            this.count --;
        },
        add(item, index){
            if(this.count == item.limitednum){
                return false
            }
            this.count ++;
        },
        submit(){
            if(this.$props.footData.applyForm.length == 0){
                if(!cookie.getCookie('userId')){
                    console.log(1)
                    this.$router.push({
                        path: '/login',
                        query: {
                            redirect: '/activitydetails?productId=' + localStorage.getItem('productId')
                        }
                    })
                    return false
                }
                Indicator.open();
                let param = {
                    applyForm: this.$props.footData.applyForm,
                    productId: this.$route.query.productId,
                    ticket: {
                        id: this.$props.footData.ticketlist[this.isSelect].id,
                        count: this.count,
                        joinDate: this.joinDate
                    },
                    userId: cookie.getCookie('userId')
                }
                submitOrder(param).then( res => {
                    console.log(res)
                    Indicator.close();
                    if(res && res.code == 0){
                        if(this.$props.footData.ticketlist[this.isSelect].price == 0){
                            // this.$router.push({
                            //     path: '/blankpage',
                            //     query: {
                            //         id: 1
                            //     }
                            // })
                            this.$router.push('/mysignup')
                        }else{
                            this.$router.push({
                                path: '/order',
                                query: {
                                    orderId: res.data.orderId
                                }
                            })
                        }
                    }else{
                        Indicator.close();
                        Toast(res.msg);
                    }
                }, err => {
                    Indicator.close();
                    console.log(err);
                })
            }else{
                this.$router.push({
                    path: '/fillinformation',
                    query: {
                        id: this.id,
                        count: this.count,
                        price: this.$props.footData.ticketlist[this.isSelect].price
                    }
                })
            }
        },

        openPicker() {
            this.$refs.picker.open();
        },
        handleConfirm(value){
            let year = value.getFullYear()
            let month = value.getMonth() + 1 < 10 ? '0' + (value.getMonth() + 1) : value.getMonth() + 1;
            let day = value.getDate() < 10 ? '0' + value.getDate() : value.getDate();
            this.joinDate = year + '-' + month + '-' + day
            console.log(this.joinDate)
        }
    }
}
</script>

<style lang ="scss" scoped>
    .foot{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 50/375*100vw;
        display: flex;
        background: #fff;
        div{
            flex: auto;
        }
        .btn{
            width: 205/375*100vw;
            background:linear-gradient(133deg,rgba(121,233,172,1) 0%,rgba(52,202,140,1) 100%);
            color: #fff;
            text-align: center;
            line-height: 50/375*100vw;
        }
        .icon{
            width: 170/375*100vw;
            height: 50/375*100vw;
            ul{
                display: flex;
                font-size: 0;
                height: 50/375*100vw;
                li{
                    position: relative;
                    display: inline-block;
                    flex: auto;
                    font-size: 10/375*100vw;
                    text-align: center;
                    height: 100%;
                    span{
                        position: absolute;
                        right: 0;
                        top: 0;
                        width: 18/375*100vw;
                        font-size: 11/375*100vw;
                        text-align: left;
                    }
                    p{
                        color: rgba(103,103,103,1);
                    }
                }
                .icon-collection{
                    img{
                        width: 21/375*100vw;
                        height: 21/375*100vw;
                    }
                }
                .icon-like{
                    img{
                        width: 19/375*100vw;
                        height: 17/375*100vw;
                        margin-top: 4/375*100vw;
                    }
                }
                .icon-share{
                    img{
                        width: 18/375*100vw;
                        height: 18/375*100vw;
                        margin-top: 4/375*100vw;
                    }
                }
            }
        }
        .popupmask{
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: url('../../../assets/img/activitydetails/sharemask@2x.png') no-repeat;
            background-size: 100% 100%;
        }
        .popup{
            .popup-container{
                width: 375/375*100vw;
                height: 467/375*100vw;
                .popup-content{
                    margin-top: 27/375*100vw;
                    padding: 0 18/375*100vw;
                    .title{
                        margin-bottom: 14/375*100vw;
                        span{
                            display: inline-block;
                            font-size: 16/375*100vw;
                            vertical-align: top;
                            &::before{
                                content: '';
                                display: inline-block;
                                width: 3/375*100vw;
                                height: 20/375*100vw;
                                background: linear-gradient(133deg,rgba(121,233,172,1) 0%,rgba(52,202,140,1) 100%);
                                vertical-align: top;
                                margin-right: 6/375*100vw;
                            }   
                        }
                    }
                    .list{
                        ul{
                            width: 100%;
                            height: 260/375*100vw;
                            overflow: auto;
                            li{
                                margin-bottom: 12/375*100vw;
                                .list-price-name{
                                    display: flex;
                                    border: 1px solid rgba(154,157,163,1);
                                    padding: 13/375*100vw;
                                    border-radius: 4/375*100vw;
                                    color: rgba(113,117,126,1);
                                    span{
                                        flex: 1;
                                        font-size: 13/375*100vw;
                                    }
                                    .list-price{
                                        text-align: right;
                                    }
                                }
                                .list-price-name-select{
                                    border:1px solid rgba(26,173,25,1);
                                    color:rgba(26,173,25,1);
                                }
                                .list-message{
                                    font-size: 12/375*100vw;
                                    color: rgba(154,157,163,1);
                                    margin-top: 6/375*100vw;
                                }
                                .num{
                                    position: absolute;
                                    left: 0;
                                    bottom: 50/375*100vw;
                                    width: 100%;
                                    height: 110/375*100vw;
                                    z-index: 100;
                                    .num-title{
                                        padding-left: 18/375*100vw;
                                        display: inline-block;
                                        font-size: 16/375*100vw;
                                        vertical-align: top;
                                        &::before{
                                            content: '';
                                            display: inline-block;
                                            width: 3/375*100vw;
                                            height: 20/375*100vw;
                                            background: linear-gradient(133deg,rgba(121,233,172,1) 0%,rgba(52,202,140,1) 100%);
                                            vertical-align: top;
                                            margin-right: 6/375*100vw;
                                        }   
                                    }
                                    .limitednum{
                                        display: inline-block;
                                        color: rgba(26,173,25,1);
                                        font-size:12px;
                                        vertical-align: top;
                                    }
                                    .num-cut-add{
                                        border: 1/375*100vw solid rgba(154,157,163,1);
                                        border-radius: 4/375*100vw;
                                        padding: 12/375*100vw;
                                        margin: 0 18/375*100vw;
                                        margin-top: 15/375*100vw;
                                        .num-price{
                                            font-size: 14/375*100vw;
                                            color: rgba(26,173,25,1);
                                            margin-right: 26/375*100vw;
                                        }
                                        .num-price-num{
                                            font-size: 13/375*100vw;
                                            color:rgba(154,157,163,1);
                                        }
                                        .content{
                                            // display: inline-block;
                                            float: right;
                                            font-size: 16/375*100vw;
                                            color: rgba(53,59,72,1);
                                            .cut{
                                                display: inline-block;
                                                margin-right: 24/375*100vw;
                                                border: 1/375*100vw solid rgba(154,157,163,1);
                                                width: 21/375*100vw;
                                                height: 21/375*100vw;
                                                border-radius: 2/375*100vw;
                                                text-align: center;
                                                line-height: 21/375*100vw;
                                                vertical-align: middle;
                                                color: rgba(113,117,126,1);
                                            }
                                            .add{
                                                display: inline-block;
                                                margin-left: 24/375*100vw;
                                                border: 1/375*100vw solid rgba(154,157,163,1);
                                                width: 21/375*100vw;
                                                height: 21/375*100vw;
                                                border-radius: 2/375*100vw;
                                                text-align: center;
                                                line-height: 21/375*100vw;
                                                vertical-align: middle;
                                                color: rgba(113,117,126,1);
                                            }
                                            .digital{
                                                display: inline-block;
                                                vertical-align: middle;
                                                color:rgba(53,59,72,1);
                                                font-size: 16/375*100vw;
                                            }
                                        }
                                    }
                                }
                                .dataTime{
                                    margin: 20/375*100vw 0;
                                    span{
                                        display: inline-block;
                                        font-size: 16/375*100vw;
                                        vertical-align: top;
                                        &::before{
                                            content: '';
                                            display: inline-block;
                                            width: 3/375*100vw;
                                            height: 20/375*100vw;
                                            background: linear-gradient(133deg,rgba(121,233,172,1) 0%,rgba(52,202,140,1) 100%);
                                            vertical-align: top;
                                            margin-right: 6/375*100vw;
                                        }   
                                    }
                                    p{
                                        width: 140/375*100vw;
                                        height: 35/375*100vw;
                                        border: 1/375*100vw solid #ddd;
                                        border-radius: 4/375*100vw;
                                        margin-top: 5/375*100vw;
                                        text-align: center;
                                        line-height: 35/375*100vw;
                                    }
                                }
                            }
                        }
                    }
                }
                .submit{
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    width: 100%;
                    height: 50/375*100vw;
                    background:linear-gradient(133deg,rgba(121,233,172,1) 0%,rgba(52,202,140,1) 100%);
                    text-align: center;
                    line-height: 50/375*100vw;
                    color: #fff;
                }
            }
        }
    }
</style>
