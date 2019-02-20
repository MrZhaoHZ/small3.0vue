<template>
    <div class="ac-people">
        <h3>活动人数</h3>
        <div class="text">
            <input type="number"  placeholder="请输入活动人数" v-model="num" @change="numChange">
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            num: '', //活动人数
        }
    },
    created(){
        this.num = this.$store.state.release.secondStep.numData.num
    },
    methods: {
        numChange(){
            this.$store.commit('secondStepNum', {num: this.num});
        }
    }
}
</script>

<style lang="scss" scoped>
    .ac-people{
        h3{
            font-size: 15/375*100vw;
            color: #333333;
            margin: 0;
            margin-bottom: 12/375*100vw;
            margin-top: 26/375*100vw;
        }
        .text{
            // width: 290/375*100vw;
            // height: 50/375*100vw;
            font-size: 14/375*100vw;
            color: #333;
            border: 1px solid #ccc;
            border-radius: 4/375*100vw;
            background: #F9F9F9;
            padding-left: 20/375*100vw;
            // line-height: 50/375*100vw;
            text-align: center;
            padding: 10/375*100vw 0;
            margin: 0 auto;
            box-sizing: border-box;
            input{
                background: #F9F9F9;
                outline: none;
                width: 270/375*100vw;
                height: 30/375*100vw;
                border: none;
                font-size: 14/375*100vw;
                caret-color:#52D89A; 
				-webkit-tap-highlight-color:rgba(0,0,0,0);
            }
        }
    }
</style>

