<template>
    <div class="secondstep">
        <div class="btn" @click="secondstep">下一步(2/3)</div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
    data(){
        return{
            richtext: [], //活动详情
            startDate: null, //开始时间
            endDate: null, //结束时间
            num: null, //活动人数
            long_latitude: null, //经纬度
            address: null, //详细地址
            area: null, //市
        }
    },
    created(){
        // console.log(this.$store.state.release.secondStep.addressData.location.poiaddress)
    },
    methods: {
        secondstep(){
            this.richtext = this.$store.state.release.secondStep.descriptionData.richtext;
            this.startDate = this.$store.state.release.secondStep.timeData.startDate;
            this.endDate = this.$store.state.release.secondStep.timeData.endDate;
            this.num = this.$store.state.release.secondStep.numData.num;
            if(this.$store.state.release.secondStep.addressData.location){
                this.address = this.$store.state.release.secondStep.addressData.location.poiaddress;
                this.area = this.$store.state.release.secondStep.addressData.location.cityname;
                this.long_latitude = this.$store.state.release.secondStep.addressData.location.latlng.lat + ',' + this.$store.state.release.secondStep.addressData.location.latlng.lng
            }
            switch(true){
                case this.richtext.length == 0:
                    Toast('精彩的描述更有利于报名呦')
                    return false
                break;
                case this.startDate=='开始时间':
                    Toast('请选择活动开始时间')
                    return false
                break;
                case this.endDate=='结束时间':
                    Toast('请选择活动开始时间')
                    return false
                break;
                case this.num < 1 || this.num > 9999 || isNaN(Number(this.num)):
                    Toast('活动人数在1～9999之间，且为数字')
                    return false
                break;
                case this.area == null:
                    Toast('请选择你的活动举办地')
                    return false
                break
            }
            
            this.$router.push('/release/thirdStep')
        },
    }
}
</script>

<style lang="scss" scoped>
    .secondstep{
        margin-top: 77/375*100vw;
        padding-bottom: 100/375*100vw;
        .btn{
            margin: 0 auto;
            width: 310/375*100vw;
            height: 56/375*100vw;
            background: linear-gradient(to right, #79E9AC , #34CA8C);
            border-radius: 6/375*100vw;
            color: #fff;
            text-align: center;
            line-height: 56/375*100vw;
        }
    }
</style>