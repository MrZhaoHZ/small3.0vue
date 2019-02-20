<template>
    <div class="eventalbum" v-if="albumData">
        <eventalbumHead :albumHeadData = 'albumData' v-on:edit= 'editImg'></eventalbumHead>
        <eventalbumMain :albumMainData = 'albumData.photoList' :id = 'albumData.id' :isEditImg = 'isEdit'></eventalbumMain>
    </div>
</template>

<script>
import { getProductPhoto } from '@/http/api'
import cookie from '../../lib/cookie';
import { Toast, Indicator } from 'mint-ui';

import eventalbumHead from './components/head'
import eventalbumMain from './components/main'
export default {
    name: 'eventalbum',
    data(){
        return{
            pageNum: 1,
            pageSize: 9,
            productId: null,
            albumData: null,
            isEdit: false
        }
    },
    components: {
        eventalbumHead,
        eventalbumMain
    },
    created(){
        this.productId = this.$route.query.productId
        this.getData()
    },
    methods: {
        getData(){
            Indicator.open();
            let param = {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                productId: this.productId,
                userId: cookie.getCookie('userId') == 'undefined' ? '' : cookie.getCookie('userId')
            }
            getProductPhoto(param).then( res => {
                Indicator.close();
                console.log(res)
                if(res && res.code == 0){
                    this.albumData = res.data.productPhotoList
                }else{
                    Toast(res.msg)
                }
            })
        },
        editImg(data){
            console.log(data)
            this.isEdit = data
        }
    }
}
</script>

<style lang="scss" scoped>

</style>

