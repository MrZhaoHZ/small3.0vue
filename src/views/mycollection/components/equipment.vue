<template>
    <div class="equipment">
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul v-if="equipmentData.length!=0">
            <li class="list" v-for="(item, index) in equipmentData" :key="index + '_equipmentData'">
                <img v-lazy="item.cover_url">
                <div class="right">
                    <p>{{item.name}}</p>
                    <p>{{item.address}}</p>
                </div>
            </li>
        </ul>
        <div class="blank" v-else>
            <img src="../../../assets/img/mycollection/blank.png">
            <p>你收藏的装备空空如也</p>
        </div>
        </mt-loadmore>
    </div>
</template>

<script>
import { getCollectList } from '@/http/api'
import { Loadmore, Toast, Indicator, Lazyload } from 'mint-ui';
import cookie from '../../../lib/cookie'
export default {
    data(){
        return{
            equipmentData: [],
            pageNum: 1,
            allLoaded: false
        }
    },
    created(){
        this.getEquipment();
    },
    methods: {
        getEquipment(){
            let param = {
                object_type: 3,
                openId: cookie.getCookie('openId') == undefined ? '' : cookie.getCookie('openId'),
                page: this.pageNum,
                size: 5,
                userId: cookie.getCookie('userId') == undefined ? '' : cookie.getCookie('userId')
            }
            getCollectList(param).then(res => {
                console.log(res);
                if(res && res.code == 0){
                    if(res.data.collectList.length > 0){
                        this.activityData = this.activityData.concat(res.data.collectList)
                    }else{
                        this.$refs.loadmore.onBottomLoaded();
                        this.allLoaded = true
                    }
                }
            })
        },
        loadBottom(){
            this.pageNum ++;
            console.log(this.pageNum)
            this.getActivity()
        }
    }
}
</script>

<style lang="scss" scoped>
    .equipment{
        ul{
            margin: 0 18/375*100vw;
            margin-top: 15/375*100vw;
            .list{
                width: 100%;
                height: 91/375*100vw;
                box-shadow: 2/375*100vw 6/375*100vw 20/375*100vw 0 rgba(75,72,73,0.13);
                margin-bottom: 12/375*100vw;
                border-radius: 6/375*100vw;
                img{
                    display: inline-block;
                    width: 120/375*100vw;
                    height: 80/375*100vw;
                    margin-top: 5/375*100vw;
                    margin-left: 13/375*100vw;
                    border-radius: 6/375*100vw;
                    vertical-align: middle;
                }
                .right{
                    display: inline-block;
                    width: 180/375*100vw;
                    vertical-align: middle;
                    margin-left: 10/375*100vw;
                    p:first-child{
                        font-size: 16/375*100vw;
                        font-weight:500;
                        color: #1C1C1C;
                        overflow: hidden;
                        white-space: nowrap;
                    }
                    p:last-child{
                        font-size: 12/375*100vw;
                        color: #9B9B9B;
                        overflow: hidden;
                        white-space: nowrap;
                    }
                }
            }
        }
        .blank{
            text-align: center;
            img{
                margin-top: 30/375*100vw;
            }
        }
    }
</style>

