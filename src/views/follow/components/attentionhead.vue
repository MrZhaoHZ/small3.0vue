<template>
    <div class="attentionhead">
        <ul>
            <li v-for="(item, index) in listData" :key="index + '_attentionhead'" @click="fansAttention(item, index)">
                <span :class="{'selectspan': index == isSelect}">{{item.name}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return{
            listData: [{name: '我的粉丝', id: 0}, {name: '我关注的', id: 1}],
            isSelect: 1
        }
    },
    created(){
        if(this.$route.query){
            this.isSelect = this.$route.query.id
        }
    },
    methods: {
        fansAttention(item, index){
            this.isSelect = index;
            this.$emit('fansAttention', item.id)
        }
    }
}
</script>

<style lang="scss" scoped>
    .attentionhead{
        width: 100%;
        height: 57/375*100vw;
        // background: #E5E5E5;
        border-bottom: 1/375*100vw solid #E5E5E5;
        text-align: center;
        font-size: 0;
        box-sizing: border-box;
        li{
            display: inline-block;
            width: 50%;
            line-height: 57/375*100vw;
            font-size: 14/375*100vw;
        }
        .selectspan{
            color: #34CA8C;
            width: 80/375*100vw;
            height: 57/375*100vw;
            display: inline-block;
            border-bottom: 3/375*100vw solid #34CA8C;
            box-sizing: border-box;
        }
    }
</style>

