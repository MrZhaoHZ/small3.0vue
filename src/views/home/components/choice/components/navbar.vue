<template>
    <div class="navbar">
        <div class="navbar-right" @click="goEcommerce">
            <img src="../../../../../assets/img/home/snatch.png">
        </div>
        <div class="navbar-left">
            <img src="../../../../../assets/img/home/classification.png" @click="activityList">
            <img src="../../../../../assets/img/home/equipment.png" @click="equipmentList">
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    data(){
        return {

        }
    },
    methods: {
        goEcommerce(){
            // Toast('请前往微信搜索一起玩电商')
            window.location.href = 'https://100000266743.retail.n.weimob.com/saas/retail/100000266743/63831743/shop/index'
        },
        activityList(){
            this.$router.push('/find')
        },
        equipmentList(){

        }
    }
}
</script>

<style lang="scss" scoped>
    .navbar{
        margin: 0 20/375*100vw;
        margin-top: 34/375*100vw;
        .navbar-right, .navbar-left{
            display: inline-block;
        }
        .navbar-right{
            width: 157/375*100vw;
            height: 137/375*100vw;
            box-shadow:0px 2px 12px 0px rgba(82,87,104,0.1);
            img{
                width: 100%;
            }
        }
        .navbar-left{
            width: 170/375*100vw;
            img{
                width: 100%;
                height: 66/375*100vw;
                box-shadow:0px 2px 12px 0px rgba(82,87,104,0.1);
            }
        }
    }
</style>

