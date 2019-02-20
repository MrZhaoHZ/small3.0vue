<template>
    <div class="ownerhomepage">
        <ownerhead :headData = 'userData'></ownerhead>
        <ownermain v-on:selectType = 'getType'></ownermain>
        <ownerfoot :footData = 'listData' :getType = 'getMainType'></ownerfoot>
    </div>
</template>

<script>
import ownerhead from './components/head'
import ownermain from './components/main'
import ownerfoot from './components/foot'

import {indexPage} from '@/http/api'
import cookie from '../../lib/cookie';
import { Toast, Indicator } from 'mint-ui';
export default {
    name: 'ownerhomepage',
    data(){
        return{
            allianUserId: null,
            pageNum: 1,
            type: 1,
            listData: null, //列表
            userData: null, //盟主信息
            getMainType: 1,
        }
    },
    created(){
        if(this.$route.query.allianUserId){
            this.allianUserId = this.$route.query.allianUserId
        }else{
            this.allianUserId = cookie.getCookie('userId') == 'undefined' ? '' : cookie.getCookie('userId')
        }
        this.getData();
    },
    methods: {
        getData(){
            Indicator.open();
            let param = {
                allianUserId: this.allianUserId,
                openId: cookie.getCookie('openId') == 'undefined' ? '' : cookie.getCookie('openId'),
                pageNum: String(this.pageNum),
                pageSize: 5,
                source: '3',
                type: this.type,
                userId: cookie.getCookie('userId') == 'undefined' ? '' : cookie.getCookie('userId')
            }
            indexPage(param).then( res => {
                // console.log(res)
                Indicator.close();
                if(res && res.code == 0){
                    this.listData = res.data.list
                    this.userData = res.data.user
                }else{
                    Toast(res.msg)
                }
            })
        },
        getType(data){
            this.getMainType = data;
        }
    },
    components: {
       ownerhead,
       ownermain,
       ownerfoot
    }
}
</script>

<style lang="scss" scoped>

</style>

