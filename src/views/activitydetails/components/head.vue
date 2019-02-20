<template>
    <div class="head">
        <img :src="headData.cover_url">
    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    props: {
        headData: Object
    }
}
</script>

<style lang="scss" scoped>
    .head{
        width: 100%;
        height: 246/375*100vw;
        img{
            width: 100%;
        }
    }
</style>

