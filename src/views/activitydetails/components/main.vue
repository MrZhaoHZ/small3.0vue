<template>
    <div class="main">
        <div class="user-info">
            <div class="user-icon">
                <img :src="mainData.user.icon">
                <span v-if="!isAttention" class="user-attention" @click="getAttention(mainData)">+</span>
            </div>
            <div class="user-name-tag">
                <p class="user-name">{{mainData.user.userName}}</p>
                <div class="user-tag">
                    <span v-for="(tag, i) in mainData.user.tag" :key="i + '_tag'">{{tag}}</span>
                </div>
            </div>
        </div>
        <div class="activity-name-type">
            <p class="activity-type">#{{name}}</p>
            <p class="activity-name">{{mainData.name}}</p>
        </div>
        <div class="activity-address">
            <p @click="showMap">{{mainData.area}}.{{mainData.address}}</p>
        </div>
        <div class="activity-time">
            <p>{{mainData.startBeforeEndDateStr}}</p>
        </div>
        <div class="activity-ticket-price">
            <p class="price">票价 {{mainData.price}}</p>
            <p class="msg">
                <span>仅剩{{mainData.browse_count}}人</span>
                <span>被浏览{{mainData.productLookNum}}次</span>
            </p>
        </div>
        <div class="activity-album" v-if="mainData.picUrlList.length!=0">
            <div class="title">
                <p class="photo">活动相册</p>
            </div>
            <div class="content">
                <div class="container" v-for="(urlItem, indexUrl) in mainData.picUrlList" :key="indexUrl + '_url'">
                    <img :src="urlItem">
                </div>
            </div>
        </div>
        <div class="activity-description">
            <p class="title">活动详情</p>
            <div v-if="mainData.description.indexOf('type')!= -1 && mainData.description.indexOf('src') != -1">
            <div class="container" v-for="(item, index) in JSON.parse(mainData.description)" :key="index+'_description'">
                <p v-if="item.type == 'text' && item.title == 0" v-html="item.src.replace(/\n/g,'<br/>')"></p>
                <p v-else-if="item.type =='text' && item.title == 1" v-html="item.src.replace(/\n/g,'<br/>')" class="text"></p>
                <p v-else-if="item.type =='text'" v-html="item.src.replace(/\n/g,'<br/>')"></p>
                <img :src="item.src[0]" v-if="item.type == 'image'">
                <br>
            </div>
            </div>
            <div v-else class="oldDescription">
                <div v-html="mainData.description"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { getProductCatalogList, followUser, unfollowUser, getUserSnsInfo } from "@/http/api";
import cookie from '../../../lib/cookie'
export default {
    data(){
        return{
            catalogList:null,
            name: null,
            isAttention: false, //是否关注 false为否， true为是
        }
    },
    props: {
        mainData: Object
    },
    created(){
        getProductCatalogList().then(res => {
            console.log(res);
            if(res.code == 0){
                this.catalogList = res.data;
                for(let i=0; i<this.catalogList.length; i++){
                    if(this.catalogList[i].id == this.$props.mainData.catalogId){
                        this.name = this.catalogList[i].name
                    }
                }
            }
        })
        let openId = cookie.getCookie('openId') == 'undefined' ? '' : cookie.getCookie('openId')
        let userId = cookie.getCookie('userId') == 'undefined' ? '' : cookie.getCookie('userId')
        if(openId || userId){
            this.getIsAttention();
        }
    },
    methods:{
        showMap(){
            window.location.href = `https://apis.map.qq.com/tools/poimarker?type=0&marker=coord:${this.$props.mainData.long_latitude};title=${this.$props.mainData.area};addr:${this.$props.mainData.address}&key=T2YBZ-FGZR4-SZQUE-XO5WB-T4D46-PEBG2&referer=myapp`
        },
        getAttention(mainData){
            // console.log(mainData)
            if(!this.isAttention){
                let param = {
                    objUserId: mainData.alliesUserId,
                    openId: cookie.getCookie('openId') == 'undefined' ? '' : cookie.getCookie('openId'),
                    userId: cookie.getCookie('userId') == 'undefined' ? '' : cookie.getCookie('userId')
                }
                followUser(param).then( res => {
                    console.log(res)
                })
            }else{

            }
            
        },
        getIsAttention(){
            let param = {
                alliesUserId: String(this.$props.mainData.alliesUserId),
                openId: cookie.getCookie('openId') == 'undefined' ? '' : cookie.getCookie('openId'),
                userId: cookie.getCookie('userId') == 'undefined' ? '' : cookie.getCookie('userId')
            }
            getUserSnsInfo(param).then( res => {
                console.log(res)
                if(res && res.code == 0){
                    if(res.data.count == -1){
                        this.isAttention = true
                    }else if(res.data.count == 0){
                        this.isAttention = false
                    }else if(res.data.count > 0){
                        this.isAttention = true
                    }
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .main{
        position: relative;
        top: -109/375*100vw;
        padding: 0 16/375*100vw;
        border-radius: 12px 12px 0px 0px;
        background: #fff;
        // z-index: 100;
        .user-info{
            width: 100%;
            height: 80/375*100vw;
            .user-icon{
                display: inline-block;
                position: relative;
                top: -20/375*100vw;
                width: 90/375*100vw;
                height: 90/375*100vw;
                border-radius: 50%;
                text-align: center;
                background: #fff;
                img{
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    width: 80/375*100vw;
                    height: 80/375*100vw;
                    border-radius: 50%;
                    // border: 1px solid yellow;
                    transform: translate(-50%, -50%)
                }
                .user-attention{
                    position: absolute;
                    right: 5/375*100vw;
                    bottom: 5/375*100vw;
                    width: 25/375*100vw;
                    height: 25/375*100vw;
                    color: #fff;
                    text-align: center;
                    line-height: 25/375*100vw;
                    border-radius: 50%;
                    background:linear-gradient(133deg,rgba(121,233,172,1) 0%,rgba(52,202,140,1) 100%);
                }
            }
            .user-name-tag{
                display: inline-block;
                vertical-align: top;
                height: 100%;
                margin-left: 10/375*100vw;
                .user-name{
                    width: 220/375*100vw;
                    overflow: hidden;
                    white-space: nowrap;
                    font-size: 18/375*100vw;
                    font-weight: 500;
                    color:rgba(72,72,72,1);
                    margin-top: 10/375*100vw;
                }
                .user-tag{
                    width: 220/375*100vw;
                    overflow: hidden;
                    margin-top: 4/375*100vw;
                    white-space: nowrap;
                    span{
                        display: inline-block;
                        padding: 4/375*100vw 6/375*100vw;
                        font-size: 12/375*100vw;
                        border-radius: 9/375*100vw;
                        background:rgba(0,0,0,0.06);
                        margin-right: 10/375*100vw;
                    }
                }
            }
        }
        .activity-name-type{
            margin-top: 2/375*100vw;
            .activity-type{
                font-size: 12/375*100vw;
                color:rgba(72,72,72,1);
            }
            .activity-name{
                font-size: 24/375*100vw;
                font-weight:600;
                color:rgba(72,72,72,1);
            }
        }
        .activity-address{
            margin-top: 14/375*100vw;
            p{
                color:rgba(72,72,72,1);
                font-size: 16/375*100vw;
                &::after{
                    content: '';
                    display: inline-block;
                    width: 30/375*100vw;
                    height: 30/375*100vw;
                    border-radius: 50%;
                    vertical-align: middle;
                    margin-left: 10/375*100vw;
                    background: url('../../../assets/img/release/address.png') no-repeat;
                    background-size: 100% 100%;
                }
            }
        }
        .activity-time{
            margin-top: 10/375*100vw;
            p{
                font-size: 16/375*100vw;
                color:rgba(72,72,72,1);
            }
        }
        .activity-ticket-price{
            margin-top: 16/375*100vw;
            display: flex;
            height: 28/375*100vw;
            line-height: 28/375*100vw;
            padding-bottom: 15/375*100vw;
            border-bottom: 1/375*100vw solid rgba(151,151,151,0.12);
            p{
                flex: auto;
            }
            .price{
                font-size: 20/375*100vw;
                font-weight:500;
                // color:rgba(72,72,72,1);
                color: #34ca8c;
            }
            .msg{
                text-align: right;
                font-size: 12/375*100vw;
                color:rgba(154,157,163,1);
            }
        }
        .activity-album{
            margin-top: 26/375*100vw;
            .title{
                display: flex;
                height: 28/375*100vw;
                line-height: 28/375*100vw;
                p{
                    flex: auto;
                }
                .photo{
                    font-size: 20/375*100vw;
                    color: rgba(102,102,102,1);
                    font-weight: 500;
                }
                .more{
                    text-align: right;
                    font-size: 12/375*100vw;
                    color: rgba(102,102,102,1);
                }
            }
            .content{
                width: 100%;
                height: 114/375*100vw;
                overflow: hidden;
                font-size: 0;
                .container{
                    display: inline-block;
                    width: 111/375*100vw;
                    height: 111/375*100vw;
                    box-sizing: border-box;
                    margin-left: 3/375*100vw;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                    video{
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
        .activity-description{
            margin-top: 26/375*100vw;
            .title{
                font-weight: 500;
                color: rgba(102,102,102,1);
                font-size: 20/375*100vw;
                margin-bottom: 16/375*100vw;
            }
            .container{
                font-size: 14/375*100vw;
                color: rgba(136,136,136,1);
                img{
                    width: 100%;
                }
                .title{
                    font-size: 18/375*100vw;
                    font-weight: 500;
                }
            }
        }
    }
</style>

