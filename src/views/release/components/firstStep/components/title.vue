<template>
    <div class="title">
        <h3>活动标题</h3>
        <div class="text">
            <input type="text" placeholder="一句话介绍你的活动,6-30字" v-model="name" @change="titleData">
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            name: '',
        }
    },
    created(){
        if(this.$store.state.release.firstStep.titleData){
            this.name = this.$store.state.release.firstStep.titleData.name;
        }
    },
    methods: {
        titleData(){
            // this.$emit('titleData', this.name);
            this.$store.commit('firstStepTitle', {name: this.name})
        }
    }
}
</script>

<style lang="scss" scoped>
    .title{
        h3{
            margin: 0;
            margin-bottom: 12/375*100vw;
            font-size: 15/375*100vw;
        }
        .text{
            width: 290/375*100vw;
            font-size: 14/375*100vw;
            color: #333;
            border: 1px solid #ccc;
            background: #F9F9F9;
            border-radius: 4/375*100vw;
            padding: 10/375*100vw 0;
            padding-left: 20/375*100vw;
            input{
                width: 270/375*100vw;
                height: 30/375*100vw;
                background: #F9F9F9;
                border: none;
                outline: none;
                caret-color:#52D89A; 
				-webkit-tap-highlight-color:rgba(0,0,0,0);
            }
        }
    }
</style>

