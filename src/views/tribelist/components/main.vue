<template>
    <div class="tribelistmain">
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul>
            <li v-for="(item, index) in tribelistData" :key="index + '_tribelistData'">
                <img class="avatar" :src="item.icoUrl">
                <div class="content">
                    <p class="name">{{item.name}}</p>
                    <div class="member">
                        <img v-for="(userIcoUrl, i) in item.userIcoUrl" :key="i + '_userIcoUrl'" class="memberAvatar" :src="userIcoUrl">
                        <span class="count">{{item.count}}人已加入</span>
                    </div>
                </div>
                <span class="unjoin" v-if="item.status == 0" @click="joinTribe(item, index)">加入</span>
                <span class="join" v-else>已加入</span>
            </li>
        </ul>
        </mt-loadmore>
    </div>
</template>

<script>
import {getTribeList} from '@/http/api'
import cookie from '@/lib/cookie';
import { Toast, Loadmore } from 'mint-ui';
export default {
    data(){
        return{
            tribelistData: [],
            pageNum: 1,
            allLoaded: false
        }
    },
    created(){
        this.getData()
    },
    methods: {
        getData(){
            let param = {
                pageNum: this.pageNum,
                pageSize: 10,
                userId: cookie.getCookie('userId') == 'undefined' ? '' : cookie.getCookie('userId')
            }
            getTribeList(param).then(res => {
                if(res && res.code == 0){
                    if(res.data.tribeList.length > 0){
                        this.tribelistData = this.tribelistData.concat(res.data.tribeList)
                    }else{
                        this.$refs.loadmore.onBottomLoaded();
                        this.allLoaded = true
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
        //加入部落
        joinTribe(item, index){
            console.log(item)
        }
    }
}
</script>

<style lang="scss" scoped>
    .tribelistmain{
        ul{
            margin: 0 12/375*100vw;
            margin-top: 10/375*100vw;
            li{
                height: 104/375*100vw;
                margin-bottom: 12/375*100vw;
                box-shadow: 2/375*100vw 6/375*100vw 20/375*100vw 0 rgba(75,72,73,0.13);
                border-radius: 10/375*100vw;
                .avatar{
                    display: inline-block;
                    width: 80/375*100vw;
                    height: 80/375*100vw;
                    border-radius: 8/375*100vw;
                    vertical-align: middle;
                    margin: 0 12/375*100vw;
                }
                .content{
                    display: inline-block;
                    height: 104/375*100vw;
                    vertical-align: middle;
                    .name{
                        color: #333333;
                        font-size: 18/375*100vw;
                        font-weight: 500;
                        padding-top: 22/375*100vw;
                    }
                    .member{
                        margin-top: 14/375*100vw;
                        .memberAvatar{
                            display: inline-block;
                            width: 18/375*100vw;
                            height: 18/375*100vw;
                            border-radius: 50%;
                            margin-left: -9/375*100vw;
                            vertical-align: middle;
                            &:first-child{
                                margin-left: 0;
                            }
                        }
                        .count{
                            display: inline-block;
                            color: #999;
                            font-size: 12/375*100vw;
                            vertical-align: middle;
                            margin-left: 5/3758100vw;
                        }
                    }
                }
                .unjoin, .join{
                    float: right;
                    margin-top: 34/375*100vw;
                    margin-right: 14/375*100vw;
                    width: 66/375*100vw;
                    height: 34/375*100vw;
                    text-align: center;
                    line-height: 34/375*100vw;
                    border-radius: 22/375*100vw;
                }
                .unjoin{
                    color: #fff;
                    background: linear-gradient(133deg,rgba(121,233,172,1) 0%,rgba(52,202,140,1) 100%);
                }
                .join{
                    color: #666666;
                    background: #F9F9F9;
                }
            }
        }
    }
</style>

