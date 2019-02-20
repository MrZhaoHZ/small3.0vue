<template>
    <div class="nextstep">
        <div class="btn" @click="nextStep">下一步(1/3)</div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
    data(){
        return{
            cover_url: null,
            name: null,
            catalogId: null
        }
    },
    created(){
        
    },
    methods: {
        nextStep(){
            this.cover_url = this.$store.state.release.firstStep.posterData.cover_url;
            this.name = this.$store.state.release.firstStep.titleData.name;
            this.catalogId = this.$store.state.release.firstStep.typeData.catalogId;
            switch(true){
                case this.cover_url == null:
                    Toast('漂亮的海报让更多人关注')
                    return false
                break;
                case this.name.length == 0:
                    Toast('给你的活动起个名吧')
                    return false
                break;
                case this.name.length > 30 || this.name.length < 6:
                    Toast('活动字数6-30字')
                    return false
                break;
            }
            this.$router.push('/release/secondStep')
        }
    }
}
</script>

<style lang="scss" scoped>
    .nextstep{
        margin-top: 77/375*100vw;
        margin-bottom: 200/375*100vw;
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

