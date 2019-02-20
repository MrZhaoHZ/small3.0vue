<template>
    <div class="amount" v-if="recoverAmountSum">
        <p class="title">总收入（元）</p>
        <p class="content">
            ¥{{recoverAmountSum.recoverAmountSum}}
        </p>
    </div>
</template>

<script>
export default {
    data(){
        return{
            
        }
    },
    props: {
        recoverAmountSum: Object
    },
    created(){
        
    },
    methods: {
        
    }
}
</script>

<style lang="scss" scoped>
    .amount{
        margin: 0 16/375*100vw;
        height: 150/375*100vw;
        background:linear-gradient(180deg,rgba(78,214,152,1) 0%,rgba(52,202,140,1) 100%);
        border-radius: 16/375*100vw;
        margin-top: 27/375*100vw;
        .title{
            color: #fff;
            font-size: 16/375*100vw;
            padding: 30/375*100vw 0 0 18/375*100vw;
        }
        .content{
            color: #fff;
            font-size: 48/375*100vw;
            padding: 14/375*100vw 0 0 18/375*100vw;
        }
    }
</style>

