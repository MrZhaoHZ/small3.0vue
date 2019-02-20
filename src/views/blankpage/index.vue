<template>
    <div class="blankPage">
        <img src="../../assets/img/blankpage/icon@2x.png">
        <p class="title" v-if="$route.query.id==0">发布成功，等待审核!</p>
        <p class="title" v-else>报名成功！</p>
        <p class="content" v-if="$route.query.id==0">您可以微信搜索”一起玩精选“小程序或登录”一起玩“官网管理活动哦。</p>
        <p class="content content-apply" v-else>你可以微信”一起玩精选“小程序查看电子票呦。</p>
    </div>
</template>

<script>
export default {
    name: "blankpage"
}
</script>

<style lang="scss" scoped>
    .blankPage{
        margin-top: 84/375*100vw;
        padding: 20/375*100vw;
        text-align: center;
        img{
            width: 73/375*100vw;
            height: 86/375*100vw;
        }
        .title{
            margin-top: 15/375*100vw;
            text-align: center;
            font-size: 18/375*100vw;
            color: #333;
        }
        .content{
            width: 245/375*100vw;
            margin: 0 auto;
            margin-top: 18/375*100vw;
            font-size: 14/375*100vw;
            color:rgba(102,102,102,1);
        }
        .content-apply{
            width: 207/375*100vw;
        }
    }
</style>

