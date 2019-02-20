<template>
    <div class="choiceBanner" v-if="bannerData">
        <mt-swipe :auto="3000">
            <mt-swipe-item v-for="(item, index) in bannerData" :key="index + '_bannerData'">
                <img :src="item.banner_image_url" @click="goActivity(item, index)">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
import { getIndexPage } from '@/http/api'
import { Swipe, SwipeItem, Toast } from 'mint-ui';
export default {
    data() {
        return {
            bannerData: null
        }
    },
    created(){
        this.getBanner();
    },
    methods: {
        getBanner(){
            let param = {
                city_id: 935
            }
            getIndexPage(param).then(res => {
                // console.log(res)
                if(res && res.code == 0){
                    this.bannerData = res.data.banners
                }else{
                    Toast(res.msg)
                }
            })
        },
        goActivity(item, index){
            console.log(item)
            if(item.banner_target == 1){
                this.$router.push({
                    path: '/activitydetails',
                    query: {
                        productId: item.banner_target_params
                    }
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .choiceBanner{
        margin: 0 17/375*100vw;
        margin-top: 17/375*100vw;
        box-shadow:0px 2px 12px 0px rgba(82,87,104,0.1);
        .mint-swipe{
            height: 150/375*100vw;
            border-right: 4/375*100vw;
            img{
                width: 100%;
                height: 150/375*100vw;
            }
        }
    }
</style>
