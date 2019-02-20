<template>
    <div class="ownertribe" v-if="ownertribeData">
        <ownertribeHead :headData = 'ownertribeData'></ownertribeHead>
        <ownertribeNav :navData = 'ownertribeData.tribeGroup'></ownertribeNav>
        <ownertribeMain :mainData = 'ownertribeData.tribeDynamicDkList'></ownertribeMain>
        <ownertribeFoot :footData = 'ownertribeData.tribeDynamicList' :userMsg = 'ownertribeData.tribe'></ownertribeFoot>
    </div>
</template>

<script>
import { pageIndex } from '@/http/api'
import cookie from '../../lib/cookie';

import ownertribeHead from './components/head'
import ownertribeNav from './components/member'
import ownertribeMain from './components/main'
import ownertribeFoot from './components/foot'

import { Indicator, Toast } from 'mint-ui';
export default {
    name: 'ownertribe',
    data(){
        return{
            pageNum: 1,
            ownertribeData: null
        }
    },
    components: {
        ownertribeHead,
        ownertribeNav,
        ownertribeMain,
        ownertribeFoot
    },
    created(){
        this.getData();
    },
    methods: {
        getData(){
            Indicator.open();
            let param = {
                id: '12',
                pageNum: this.pageNum,
                pageSize: 10,
                userId: cookie.getCookie('userId') == 'undefined' ? '' : cookie.getCookie('userId')
            }
            pageIndex(param).then( res => {
                Indicator.close()
                if(res && res.code == 0){
                    this.ownertribeData = res.data
                }else{
                    Toast(res.msg)
                }
            })
        }
    }
}
</script>

<style>

</style>
