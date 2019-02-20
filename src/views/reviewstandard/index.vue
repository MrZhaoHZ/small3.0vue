<template>
    <div class="reviewstandard">
        <img src="../../assets/img/reviewstandard/reviewstandard1.jpg">
        <img src="../../assets/img/reviewstandard/reviewstandard2.jpg">
        <div class="foot" @click="goback">
            返回
        </div>
    </div>
</template>

<script>
export default {
    name: 'reviewstandard',
    methods: {
        goback(){
            this.$router.go(-1);
        }
    }
}
</script>

<style lang="scss" scoped>
    .reviewstandard{
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

