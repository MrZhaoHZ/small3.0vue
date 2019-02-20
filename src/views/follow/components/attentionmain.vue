<template>
    <div class="attentionmain">
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul>
            <li v-for="(item, index) in listData" :key="index + '_attentionmain'">
                <img :src="item.icon">
                <div class="content">
                    <p class="name">{{item.name}}</p>
                    <span class="fans">粉丝数{{item.fans_cnt}}</span>
                    <span class="activity">{{item.activity_total}}场活动</span>
                </div>
                <span class="status" @click="changeStatus(item, index)">{{item.status == 1 ? '已关注':'互相关注'}}</span>
                <!-- <span class="status" v-else-if="item.status == 2">互相关注</span> -->
            </li>
        </ul>
        </mt-loadmore>
    </div>
</template>

<script>
import { followUserList, fansUserList, unfollowUser, followUser } from '@/http/api'
import cookie from '../../../lib/cookie'
import { Loadmore, Toast, Indicator } from 'mint-ui';
export default {
    data(){
        return{
            page: 1,
            size: 10,
            listData: [],
            allLoaded: false

        }
    },
    props: {
        id: Number
    },
    created(){
        if(this.$props.id == 1){
            this.getList();
        }else{
            this.getFanSList();
        }
        
    },
    methods: {
        getList(){
            let param = {
                page: this.page,
                size: this.size,
                userId: cookie.getCookie('userId') == 'undefined' ? '' : cookie.getCookie('userId')
            }
            followUserList(param).then( res => {
                console.log(res);
                if(res && res.code == 0){
                    if(res.data.followUserList.length != 0){
                        this.listData = this.listData.concat(res.data.followUserList)
                        // this.$refs.loadmore.onBottomLoaded()
                    }else{
                        this.allLoaded = true
                        this.$refs.loadmore.onBottomLoaded()
                    }
                }
            })
        },
        getFanSList(){
            let param = {
                page: this.page,
                size: 10,
                userId: cookie.getCookie('userId') == 'undefined' ? '' : cookie.getCookie('userId')
            }
            fansUserList(param).then( res => {
                console.log(res);
                if(res && res.code == 0){
                    if(res.data.fansUserList.length != 0){
                        this.listData = this.listData.concat(res.data.fansUserList)
                    }else{
                        this.allLoaded = true
                        this.$refs.loadmore.onBottomLoaded()
                    }
                }
            })
        },
        loadBottom(){
            this.page ++ ;
            // console.log(this.page)
            this.getList();
        },
        //取消关注，关注
        changeStatus(item, index){
            console.log(item)
            if(this.$props.id == 1){ //取消关注
                let param = {
                    objUserId: item.obj_user_id,
                    openId: cookie.getCookie('openId') == 'undefined' ? '' : cookie.getCookie('openId'),
                    userId: cookie.getCookie('userId') == 'undefined' ? '' : cookie.getCookie('userId')
                }
                unfollowUser(param).then( res => {
                    console.log(res)
                    if(res && res.code == 0){
                        this.listData.splice(index, 1)
                    }else{
                        Toast(res.msg)
                    }
                })
            }else{ //关注
                if(item.status == 2){
                    return false
                }
                let param = {
                    objUserId: item.user_id,
                    openId: cookie.getCookie('openId') == 'undefined' ? '' : cookie.getCookie('openId'),
                    userId: cookie.getCookie('userId') == 'undefined' ? '' : cookie.getCookie('userId')
                }
                followUser(param).then( res => {
                    console.log(res)
                    if(res && res.code == 0){
                        this.listData[index].status = 2
                    }
                })
            }
        }
    },
    watch: {
        id : function(newVal, oldVal){
            this.listData = [];
            this.page = 1;
            if(newVal == 0){
                this.getFanSList();
            }else{
                this.getList();
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .attentionmain{
        margin: 0 18/375*100vw;
        ul{
            width: 100%;
            li{
                height: 60/375*100vw;
                margin: 15/375*100vw 0;
                img{
                    display: inline-block;
                    width: 60/375*100vw;
                    height: 60/375*100vw;
                    border-radius: 50%;
                    vertical-align: middle;
                    margin-right: 14/375*100vw;
                }
                .content{
                    display: inline-block;
                    vertical-align: middle;
                    width: 180/375*100vw;
                    overflow: hidden;
                    white-space: nowrap;
                    .name{
                        font-size: 16/375*100vw;
                        color: #4A4A4A;
                    }
                    .fans, .activity{
                        font-size: 13/375*100vw;
                        color: #9B9B9B;
                        margin-right: 10/375*100vw;
                    }
                }
                .status{
                    float: right;
                    width: 74/375*100vw;
                    height: 30/375*100vw;
                    background: #f9f9f9;
                    border-radius: 15/375*100vw;
                    margin-top: 15/375*100vw;
                    text-align: center;
                    line-height: 30/375*100vw;
                    font-size: 10/375*100vw;
                    color: #565A5C;
                }
            }
        }
    }
</style>

