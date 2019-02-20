<template>
    <div class="mycollectionhead">
        <ul>
            <li v-for="(item, index) in list" :key="index + '_list'" :class="{liChoose: index==isSelect}" @click="showCollection(item, index)">
                {{item.name}}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return{
            list: [{name: '活动', id: 0}, {name: '装备', id: 1}],
            isSelect: 0
        }
    },
    methods: {
        showCollection(item, index){
            this.isSelect = index;
            if(item.id == 0){
                this.$emit('showCollection', true)
            }else{
                this.$emit('showCollection', false)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .mycollectionhead{
        font-size: 0;
        li{
            display: inline-block;
            width: 50%;
            height: 57/375*100vw;
            font-size: 14/375*100vw;
            line-height: 57/375*100vw;
            text-align: center;
        }
        .liChoose{
            background: #52D89A;
            color: #fff;
            // border-bottom: 1/375*100vw solid #aaa;
        }
    }
</style>

