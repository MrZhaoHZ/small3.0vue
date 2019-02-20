<template>
    <div class="userprotocol">
        <img src="../../assets/img/userprotocol/userprotocol1.jpg">
        <img src="../../assets/img/userprotocol/userprotocol2.jpg">
        <img src="../../assets/img/userprotocol/userprotocol3.jpg">
        <img src="../../assets/img/userprotocol/userprotocol4.jpg">
        <img src="../../assets/img/userprotocol/userprotocol5.jpg">
        <img src="../../assets/img/userprotocol/userprotocol6.jpg">
        <img src="../../assets/img/userprotocol/userprotocol7.jpg">
        <div class="foot" @click="goback">
            返回
        </div>
    </div>
</template>

<script>
export default {
    name: 'userprotocol',
    methods: {
        goback(){
            this.$router.go(-1);
        }
    }
}
</script>

<style lang="scss" scoped>
    .userprotocol{
        font-size: 0;
        margin-bottom: 100/375*100vw;
        img{
            width: 100%;
        }
        .foot{
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 40/375*100vw;
            background:linear-gradient(133deg,rgba(121,233,172,1) 0%,rgba(52,202,140,1) 100%);
            font-size: 16/375*100vw;
            text-align: center;
            line-height: 40/375*100vw;
            color: #fff;
        }
    }
</style>

