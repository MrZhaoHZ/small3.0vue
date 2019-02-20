<template>
    <div class="description">
        <h3>活动描述</h3>
        <p @click="descriptionIt">{{description==''?'精彩的描述更利于报名呦':description}}</p>
    </div>
</template>

<script>
export default {
    data(){
        return{
            description: '精彩的描述更利于报名呦'
        }
    },
    created(){
        this.getDescription();
    },
    methods: {
        descriptionIt(){
            this.$router.push('/acdescription');
        },
        getDescription(){
            if(this.$store.state.release.secondStep.descriptionData.richtext){
                this.description = '';
                let data = this.$store.state.release.secondStep.descriptionData.richtext;
                for(let i = 0, len = data.length; i < len; i ++){
                    if(data[i].type.indexOf('text') != -1 && data[i].text != ''){
                        this.description = '';
                        this.description += data[i].src;
                        return false
                    }else if(data[i].type == 'image' && data[i].type.indexOf('text') == -1 ){
                        this.description = '图片已添加'
                    }
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .description{
        padding-top: 26/375*100vw;
        h3{
            font-size: 15/375*100vw;
            color: #333333;
            margin: 0;
            margin-bottom: 12/375*100vw;
        }
        p{
            width: 310/375*100vw;
            height: 50/375*100vw;
            color: #CCCCCC;
            border: 1px solid #CCCCCC;
            border-radius: 6/375*100vw;
            line-height: 50/375*100vw;
            background: #f9f9f9;
            overflow: hidden;
            &::before{
                content: '';
                display: inline-block;
                width: 10/375*100vw;
                height: 10/375*100vw;
            }
        }
    }
</style>

