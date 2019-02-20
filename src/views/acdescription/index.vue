<template>
    <div class="acdescription">
        <div class="line"></div>
        <richtext></richtext>
    </div>
</template>

<script>
import richtext from './components/richtext'
export default {
    data(){
        return{

        }
    },
    components: {
        richtext
    }
}
</script>

<style lang="scss" scoped>
    .acdescription{
        width: 100%;
        height: 100%;
        background: linear-gradient(#34CA8C , #fff 50vh);
        .line{
            height: 1px;
        }
    }
</style>

