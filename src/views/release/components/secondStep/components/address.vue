<template>
    <div class="ac-address">
        <h3>活动地址</h3>
        <p class="text" @click="showmap">{{text}}</p>
    </div>
</template>

<script>
export default {
    data(){
        return{
            text: '请选择你的活动举办地点'

        }
    },
    created(){
        if(this.$store.state.release.secondStep.addressData.location){
            this.text = this.$store.state.release.secondStep.addressData.location.poiaddress
        }
    },
    methods: {
        showmap(){
            this.$router.push('/acmap');
        },
    }
}
</script>

<style lang="scss" scoped>
    .ac-address{
        h3{
            font-size: 15/375*100vw;
            color: #333333;
            margin: 0;
            margin-bottom: 12/375*100vw;
            margin-top: 26/375*100vw;
        }
        .text{
            width: 250/375*100vw;
            height: 50/375*100vw;
            font-size: 14/375*100vw;
            background: #F9F9F9;
            color: #CCCCCC;
            line-height: 50/375*100vw;
            border-radius: 6/375*100vw;
            overflow: hidden;
            position: relative;
            padding-right: 60/375*100vw;
            &::before{
                content: "";
                display: inline-block;
                width: 10/375*100vw;
                height: 10/375*100vw;
            }
            &::after{
                content: '';
                position: absolute;
                right: 10/375*100vw;
                top: 10/375*100vw;
                width: 30/375*100vw;
                height: 30/375*100vw;
                background: url('../../../../../assets/img/release/address.png') no-repeat;
                background-size: 100% 100%;
                border-radius: 50%;
            }
        }
    }
</style>
