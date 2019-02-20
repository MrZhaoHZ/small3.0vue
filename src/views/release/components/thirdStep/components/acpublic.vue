<template>
    <div class="acpublic">
        <p class="review" @click="goReviewstandard"><span>查看</span>《活动审核标准》</p>
        <p class="content">
            <span class="prompt">{{value==true?'公开活动':'私密活动'}}</span>
            <mt-switch v-model="value" @change="isPublic"></mt-switch>
        </p>
        <p class="publicize">{{value==true?'希望平台协助推广':'只有通过你的分享链接才能看到你的活动'}}</p>
    </div>
</template>

<script>
import { Switch } from 'mint-ui';
export default {
    data(){
        return{
            value: true,
            ispublic: '0'
        }
    },
    created(){
        this.ispublic = this.$store.state.release.thirdStep.acpublicData.ispublic;
        if(this.ispublic == '0'){
            this.value = true
        }else{
            this.value = false
        }
    },
    methods: {
        isPublic(){
            if(this.value){
                this.ispublic = '0'
            }else{
                this.ispublic = '1'
            }
            this.$store.commit('thirdStepPublic', {ispublic: this.ispublic})
        },
        goReviewstandard(){
            this.$router.push('/reviewstandard')
        }
    }
}
</script>

<style lang="scss" scoped>
    .acpublic{
        padding-top: 26/375*100vw;
        .review{
            display: inline-block;
            // vertical-align: bottom;
            font-size: 12/375*100vw;
            color: #3F4658;
            margin-top: 10/375*100vw;
            &::after{
                content: '';
                display: inline-block;
                width: 10/375*100vw;
                height: 10/375*100vw;
                background: url('../../../../../assets/img/release/left-icon.png') no-repeat;
                background-size: 100% 100%;
            }
            span{
                color: #A3A9B2;
            }
        }
        .content{
            float: right;
            // display: inline-block;
            text-align: right;
            .prompt{
                display: inline-block;
                vertical-align: middle;
                margin-left: 25/375*100vw;
                font-size: 14/375*100vw;
                color: #404852;
            }
        }
        .publicize{
            text-align: right;
            color: #A3A9B2;
            font-size: 12/375*100vw;
            margin-top: 14/375*100vw;
        }
    }
</style>
<style lang="scss">
    .acpublic{
        .mint-switch{
            display: inline-block;
            vertical-align: middle;           
        }
        .mint-switch-input:checked + .mint-switch-core{
            background:linear-gradient(to right, #79E9AC , #34CA8C);
            border-color: #34CA8C;
        }
    }
</style>
